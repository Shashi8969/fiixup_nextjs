import { createClient } from "@supabase/supabase-js";

// Noisy SEO-tool/scraper crawlers only. Deliberately excludes Googlebot,
// Bingbot, etc. — their 404 hits are the most actionable signal here, not
// noise to filter out.
const BAD_BOT_UA_SUBSTRINGS = [
  "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "petalbot",
  "bytespider", "gptbot", "ccbot", "seekportbot", "serpstatbot",
];

function normalizeBrokenPath(pathname: string | null): string | null {
  if (!pathname) return null; // missing x-pathname must not mislabel "/" as broken
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pathOnly = withSlash.split("?")[0].split("#")[0];
  const stripped = pathOnly.length > 1 ? pathOnly.replace(/\/+$/, "") : pathOnly;
  return (stripped || "/").toLowerCase();
}

function isNoisyUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BAD_BOT_UA_SUBSTRINGS.some((needle) => ua.includes(needle));
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function logBrokenLinkHit(input: {
  pathname: string | null;
  referrer: string | null;
  userAgent: string | null;
  forwardedFor: string | null;
  realIp: string | null;
}) {
  try {
    if (isNoisyUserAgent(input.userAgent)) return;

    const path = normalizeBrokenPath(input.pathname);
    if (!path) return;

    const ip = input.forwardedFor?.split(",")[0]?.trim() || input.realIp || null;

    const sb = getServiceClient();
    if (!sb) return;

    await sb.rpc("record_broken_link_hit", {
      p_path: path,
      p_ip: ip,
      p_referrer: input.referrer,
      p_user_agent: input.userAgent,
    });
  } catch (error) {
    console.warn("[not-found] Failed to record broken link hit:", error);
  }
}
