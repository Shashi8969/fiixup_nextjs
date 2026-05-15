// middleware.ts
// ─────────────────────────────────────────────────────────────────────────────
// Runtime redirect handler — reads from Supabase `redirects` table.
// Caches results for 5 minutes so Supabase is not hit on every request.
// Handles simple path redirects (no wildcards — those go in next.config.ts).
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RedirectRow {
  source: string;
  destination: string;
  is_permanent: boolean;
}

// In-memory cache (per Edge runtime instance — resets on cold start)
let redirectCache: RedirectRow[] = [];
let cacheExpiry = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getRedirects(): Promise<RedirectRow[]> {
  if (Date.now() < cacheExpiry && redirectCache.length > 0) {
    return redirectCache;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) return redirectCache; // return stale on missing config

    const res = await fetch(
      `${supabaseUrl}/rest/v1/redirects?select=source,destination,is_permanent&is_active=eq.true`,
      {
        headers: {
          apikey:        serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
        // next: { revalidate: 0 } is default in middleware — always fresh from Supabase
      }
    );

    if (!res.ok) {
      console.warn("[middleware] Redirects fetch failed:", res.status);
      return redirectCache; // stale cache on error — never crash middleware
    }

    const data: RedirectRow[] = await res.json();

    // Only cache simple (non-wildcard) redirects — wildcard handled by next.config.ts
    redirectCache = data.filter(
      (r) => !r.source.includes(":path*") && !r.source.includes("*")
    );
    cacheExpiry = Date.now() + CACHE_TTL_MS;
  } catch {
    // Return stale cache — never crash middleware
  }

  return redirectCache;
}

// IMPORTANT: Next.js 16 requires this exported as `proxy` (not `middleware`)
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const redirects = await getRedirects();
  const match = redirects.find((r) => r.source === pathname);

  if (match) {
    const url = request.nextUrl.clone();
    // Support both absolute and relative destinations
    if (match.destination.startsWith("http")) {
      return NextResponse.redirect(match.destination, {
        status: match.is_permanent ? 301 : 302,
      });
    }
    url.pathname = match.destination;
    return NextResponse.redirect(url, {
      status: match.is_permanent ? 301 : 302,
    });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|site.webmanifest|assets/).*)",
  ],
};
