import { NextRequest, NextResponse } from "next/server";

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();
let lastCleanup = 0;

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function cleanupBucketsIfDue(now: number) {
  if (now - lastCleanup <= 60_000) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Checks a rate-limit bucket without consuming it. Lets callers decide
 * (e.g. skip counting a request that's about to be rejected as a bot).
 */
export function peekRateLimit(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) return { count: 0, resetAt: now };
  return existing;
}

export function rateLimitKey(
  request: NextRequest,
  namespace: string,
  options: { limit: number; windowMs: number },
  identity?: string
) {
  const now = Date.now();
  cleanupBucketsIfDue(now);

  const key = `${namespace}:${identity || getClientIp(request)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  existing.count += 1;

  if (existing.count > options.limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return { retryAfter: Math.max(retryAfter, 1) };
  }

  return null;
}

export function rateLimitRequest(
  request: NextRequest,
  namespace: string,
  options: { limit: number; windowMs: number }
) {
  const limited = rateLimitKey(request, namespace, options);
  if (!limited) return null;

  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(limited.retryAfter),
        "Cache-Control": "no-store",
      },
    }
  );
}

/** Normalizes an Indian mobile number (or any phone string) to bare digits for dedupe/rate-limit keys. */
export function normalizePhoneKey(phone: string | undefined | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? digits : null;
}

/**
 * Same-origin guard for state-changing API routes. Browsers attach Origin
 * (or at least Referer) on fetch/XHR POSTs; direct script/bot hits to the
 * endpoint from outside the site generally omit or mismatch both.
 */
export function isSameOriginRequest(request: NextRequest, allowedHosts: string[]): boolean {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return allowedHosts.includes(new URL(origin).host);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return allowedHosts.includes(new URL(referer).host);
    } catch {
      return false;
    }
  }

  // Neither header present: browsers virtually always send at least one on
  // a same-origin fetch POST, but some privacy tooling strips both. Fail
  // open here rather than risk dropping a real customer's lead — the
  // honeypot, timing trap, and rate limits carry the rest of the load.
  return true;
}

// Logs the real error server-side but never forwards internal details
// (query structure, column names, driver messages) to the client.
export function safeErrorResponse(context: string, error: unknown, status = 500) {
  console.error(`[${context}]`, error);
  return NextResponse.json(
    { success: false, error: "Something went wrong. Please try again later." },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export async function readJsonBody<T>(
  request: NextRequest,
  options: { maxBytes: number }
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (Number.isFinite(contentLength) && contentLength > options.maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Request body is too large." },
        { status: 413, headers: { "Cache-Control": "no-store" } }
      ),
    };
  }

  try {
    const raw = await request.text();
    if (raw.length > options.maxBytes) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Request body is too large." },
          { status: 413, headers: { "Cache-Control": "no-store" } }
        ),
      };
    }

    const data = JSON.parse(raw || "{}");
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "Invalid JSON payload." },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        ),
      };
    }

    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      ),
    };
  }
}
