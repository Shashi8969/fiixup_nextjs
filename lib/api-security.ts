import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { isIP } from "node:net";

type RateBucket = { count: number; resetAt: number };
const buckets = new Map<string, RateBucket>();
const MAX_BUCKETS = 10_000;
let lastCleanup = 0;

// Forwarded headers must be overwritten by the deployment's trusted proxy.
// This local limiter is a per-process backstop, not a distributed WAF.
export function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const raw = forwarded ? forwarded.split(",", 1)[0].trim() : (request.headers.get("x-real-ip") || "").trim();
  return raw.length <= 45 && isIP(raw) ? raw : "unknown";
}

function bucketKey(request: NextRequest, namespace: string, identity?: string) {
  return `${namespace}:${createHash("sha256").update(identity || getClientIp(request)).digest("hex")}`;
}
function cleanup(now: number, force = false) {
  if (!force && now - lastCleanup <= 60_000) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(key);
}
export function peekRateLimit(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);
  return existing && existing.resetAt > now ? { ...existing } : { count: 0, resetAt: now };
}
export function clearRateLimitKey(request: NextRequest, namespace: string, identity?: string) {
  buckets.delete(bucketKey(request, namespace, identity));
}
export function rateLimitKey(request: NextRequest, namespace: string, options: { limit: number; windowMs: number }, identity?: string) {
  const now = Date.now();
  cleanup(now);
  const key = bucketKey(request, namespace, identity);
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    if (!existing && buckets.size >= MAX_BUCKETS) {
      cleanup(now, true);
      // Do not let spoofed/new identities grow memory without bound or evict
      // live buckets to bypass limits. Existing visitors retain their buckets.
      if (buckets.size >= MAX_BUCKETS) return { retryAfter: 60 };
    }
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }
  if (existing.count >= options.limit) return { retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  existing.count += 1;
  return null;
}
export function rateLimitRequest(request: NextRequest, namespace: string, options: { limit: number; windowMs: number }) {
  const limited = rateLimitKey(request, namespace, options);
  return limited ? NextResponse.json({ error: "Too many requests. Please try again later." }, {
    status: 429, headers: { "Retry-After": String(limited.retryAfter), "Cache-Control": "no-store" },
  }) : null;
}
export function normalizePhoneKey(phone: string | undefined | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? digits : null;
}

export function isSameOriginRequest(request: NextRequest, allowedHosts: string[]): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  const candidate = request.headers.get("origin") || request.headers.get("referer");
  if (candidate) {
    try {
      const url = new URL(candidate);
      const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
      return !url.username && !url.password && allowedHosts.includes(url.host)
        && (url.protocol === "https:" || (local && url.protocol === "http:"));
    } catch { return false; }
  }
  // Privacy tools may strip Origin/Referer. Fetch Metadata can still establish
  // a same-origin browser request; missing all three no longer fails open.
  return fetchSite === "same-origin";
}
export function safeErrorResponse(context: string, error: unknown, status = 500) {
  console.error(`[${context}]`, error);
  return NextResponse.json({ success: false, error: "Something went wrong. Please try again later." }, {
    status, headers: { "Cache-Control": "no-store" },
  });
}
function bodyError(status: number, error: string) {
  return { ok: false as const, response: NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } }) };
}
export async function readJsonBody<T>(request: NextRequest, options: { maxBytes: number; timeoutMs?: number }): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  const type = (request.headers.get("content-type") || "").split(";", 1)[0].trim().toLowerCase();
  if (type !== "application/json" && !/^application\/[a-z0-9.+-]+\+json$/.test(type)) return bodyError(415, "Use an application/json request body.");
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > options.maxBytes)) return bodyError(413, "Request body is too large.");
  const reader = request.body?.getReader();
  if (!reader) return bodyError(400, "Invalid JSON payload.");
  let total = 0;
  let timedOut = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      timedOut = true;
      reject(new Error("Body read deadline exceeded"));
      void reader.cancel().catch(() => undefined);
    }, options.timeoutMs ?? 15_000);
  });
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      total += value.byteLength;
      if (total > options.maxBytes) {
        void reader.cancel().catch(() => undefined);
        return bodyError(413, "Request body is too large.");
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const data: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!data || typeof data !== "object" || Array.isArray(data)) return bodyError(400, "Invalid JSON payload.");
    return { ok: true, data: data as T };
  } catch { return timedOut ? bodyError(408, "Request body timed out.") : bodyError(400, "Invalid JSON payload."); }
  finally { clearTimeout(timer); reader.releaseLock(); }
}
