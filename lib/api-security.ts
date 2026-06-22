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

export function rateLimitRequest(
  request: NextRequest,
  namespace: string,
  options: { limit: number; windowMs: number }
) {
  const now = Date.now();

  if (now - lastCleanup > 60_000) {
    lastCleanup = now;
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  const key = `${namespace}:${getClientIp(request)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  existing.count += 1;

  if (existing.count > options.limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(retryAfter, 1)),
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return null;
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
