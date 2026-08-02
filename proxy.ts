// proxy.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fiixup Advanced Runtime Redirect Proxy
//
// Supports:
// 1. Exact redirects
//    /tag/car-mechanic-bangalore -> /bangalore/car-mechanic-near-me
//
// 2. Wildcard/master redirects
//    /tag/*       -> /blog
//    /tag/:path*  -> /blog
//
// 3. Exact redirect priority over wildcard
//    If exact /tag/car-mechanic-bangalore exists, it wins.
//    Other /tag/... URLs follow /tag/* or /tag/:path*.
//
// 4. Path preserve redirects
//    /chennai/:path* -> /bangalore/:path*
//
// 5. Trailing slash normalization
//    /whitefield and /whitefield/ both work.
//
// 6. Low Supabase requests
//    Uses in-memory cache + single refresh promise.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RedirectRow {
  source: string;
  destination: string;
  is_permanent: boolean;
}

interface WildcardRedirectRow extends RedirectRow {
  prefix: string;
}

// 60s, not 24h: Next.js runs this proxy in a separate runtime from API
// routes/route handlers, so the admin panel's "clear cache" action cannot
// reach into this module's memory to force an instant refresh (verified —
// resetRedirectCache() below only resets its own, disconnected module
// instance when called from app/api/revalidate). A short TTL is the only
// reliable way to make redirect-table edits show up quickly. Override via
// REDIRECT_CACHE_TTL_SECONDS (60s floor enforced in getCacheTtlMs()) if a
// longer window is ever preferred for Supabase-load reasons.
const DEFAULT_CACHE_TTL_MS = 60 * 1000;
const MAX_REDIRECT_ROWS = 5000;

const STATIC_FILE_REGEX =
  /\.(?:avif|webp|png|jpe?g|gif|svg|ico|css|js|mjs|map|txt|xml|json|woff2?|ttf|otf|eot|pdf|docx?|xlsx?|csv)$/i;

let exactRedirectMap = new Map<string, RedirectRow>();
let wildcardRedirects: WildcardRedirectRow[] = [];
let cacheExpiry = 0;
let refreshPromise: Promise<void> | null = null;

function getCacheTtlMs() {
  const raw = process.env.REDIRECT_CACHE_TTL_SECONDS;
  const seconds = raw ? Number(raw) : NaN;

  // Minimum 60 seconds safety so wrong env does not overload Supabase
  if (Number.isFinite(seconds) && seconds >= 60) {
    return seconds * 1000;
  }

  return DEFAULT_CACHE_TTL_MS;
}

function stripTrailingSlash(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

function normalizeSourcePath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return stripTrailingSlash(new URL(trimmed).pathname).toLowerCase();
    }
  } catch {
    return "";
  }

  const pathOnly = trimmed.split("?")[0].split("#")[0];
  const withSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  return stripTrailingSlash(withSlash).toLowerCase();
}

function isWildcardSource(source: string) {
  return source.includes(":path*") || source.includes("*");
}

function getWildcardPrefix(source: string) {
  const normalized = normalizeSourcePath(source);
  if (!normalized) return "";

  if (normalized.includes(":path*")) {
    return stripTrailingSlash(normalized.split(":path*")[0]);
  }

  if (normalized.includes("*")) {
    return stripTrailingSlash(normalized.split("*")[0]);
  }

  return "";
}

function isSafeAbsoluteUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function shouldSkipProxy(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/site.webmanifest" ||
    STATIC_FILE_REGEX.test(pathname)
  );
}

// Next.js doesn't expose the current pathname to Server Components directly —
// this is the standard way to make it available via headers().get("x-pathname"),
// so app/not-found.tsx can know which URL actually 404'd.
function passThroughWithPathname(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

function buildDestinationUrl(
  row: RedirectRow,
  requestUrl: string,
  capturedPath = ""
) {
const rawDestination = String(row.destination || "").trim();

if (isSafeAbsoluteUrl(rawDestination)) {
  return new URL(rawDestination);
}

  const safeCapturedPath = capturedPath.replace(/^\/+/, "");

  let destination = rawDestination.startsWith("/")
    ? rawDestination
    : `/${rawDestination}`;

  // Supports destination templates:
  // /bangalore/:path*
  // /bangalore/*
  if (destination.includes(":path*")) {
    destination = destination.replace(":path*", safeCapturedPath);
  }

  if (destination.includes("*")) {
    destination = destination.replace("*", safeCapturedPath);
  }

  destination = destination.replace(/\/{2,}/g, "/");

  return new URL(destination, requestUrl);
}

async function refreshRedirects() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.warn("[proxy] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
      return;
    }

    const res = await fetch(
      `${supabaseUrl}/rest/v1/redirects?select=source,destination,is_permanent&is_active=eq.true&limit=${MAX_REDIRECT_ROWS}`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.warn("[proxy] Redirect fetch failed:", res.status);
      return;
    }

    const data: RedirectRow[] = await res.json();

    const nextExactMap = new Map<string, RedirectRow>();
    const nextWildcardRows: WildcardRedirectRow[] = [];

    for (const row of data) {
      if (!row?.source || !row?.destination) continue;

      if (isWildcardSource(row.source)) {
        const prefix = getWildcardPrefix(row.source);
        if (!prefix) continue;

        nextWildcardRows.push({
          ...row,
          prefix,
        });

        continue;
      }

      const normalizedSource = normalizeSourcePath(row.source);
      if (!normalizedSource) continue;

      nextExactMap.set(normalizedSource, row);
    }

    // Longest wildcard first.
    // Example:
    // /tag/car/:path* wins before /tag/:path*
    nextWildcardRows.sort((a, b) => b.prefix.length - a.prefix.length);

    exactRedirectMap = nextExactMap;
    wildcardRedirects = nextWildcardRows;
    cacheExpiry = Date.now() + getCacheTtlMs();
  } catch (error) {
    console.warn("[proxy] Redirect fetch error:", error);
  }
}

// Best-effort: proxy.ts runs in a separate runtime instance from
// app/api/revalidate (verified empirically — a call from there resets a
// disconnected copy of this module's state, not the one actually serving
// requests), so this does NOT reliably force an instant refresh in
// production. Kept as a harmless no-cost call in case a future Next.js/
// deployment configuration ends up sharing the module registry; the real
// fix is DEFAULT_CACHE_TTL_MS above.
export function resetRedirectCache() {
  cacheExpiry = 0;
}

async function ensureRedirectCache() {
  const hasCache = exactRedirectMap.size > 0 || wildcardRedirects.length > 0;

  if (Date.now() < cacheExpiry && hasCache) {
    return;
  }

  // Prevent multiple Supabase calls when many users hit at same time
  if (!refreshPromise) {
    refreshPromise = refreshRedirects().finally(() => {
      refreshPromise = null;
    });
  }

  await refreshPromise;
}

function findWildcardMatch(pathname: string) {
  for (const row of wildcardRedirects) {
    const prefix = row.prefix;

    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const capturedPath =
        pathname === prefix
          ? ""
          : pathname.slice(prefix.length).replace(/^\/+/, "");

      return {
        row,
        capturedPath,
      };
    }
  }

  return null;
}

// IMPORTANT: Next.js 16 uses proxy(), not middleware()
export async function proxy(request: NextRequest) {
  const rawPathname = request.nextUrl.pathname;

  if (shouldSkipProxy(rawPathname)) {
    return passThroughWithPathname(request);
  }

  await ensureRedirectCache();

  const pathname = normalizeSourcePath(rawPathname);

  // 1. Exact redirect priority
  const exactMatch = exactRedirectMap.get(pathname);

  if (exactMatch) {
    const destinationUrl = buildDestinationUrl(exactMatch, request.url);

    return NextResponse.redirect(destinationUrl, {
      status: exactMatch.is_permanent ? 301 : 302,
    });
  }

  // 2. Wildcard/master redirect fallback
  const wildcardMatch = findWildcardMatch(pathname);

  if (wildcardMatch) {
    const destinationUrl = buildDestinationUrl(
      wildcardMatch.row,
      request.url,
      wildcardMatch.capturedPath
    );

    return NextResponse.redirect(destinationUrl, {
      status: wildcardMatch.row.is_permanent ? 301 : 302,
    });
  }

  return passThroughWithPathname(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|site.webmanifest|assets/).*)",
  ],
};