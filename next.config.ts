import type { NextConfig } from "next";
import { STATIC_SECURITY_HEADERS, getSupabaseHost } from "./lib/security-headers";

const securityHeaders = STATIC_SECURITY_HEADERS;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600],
    // Must include every value CmsImage's admin-controlled quality setting
    // can pass (Fast/Balanced/High = 50/75/90) — Next.js 16 rejects any
    // `quality` prop not in this allowlist.
    qualities: [50, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: getSupabaseHost(),
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  trailingSlash: false, // Aligns served URL with the no-slash canonical + sitemap the DB already emits; framework-level 308s the /x/ duplicates.

  // The DB-driven `redirects` table is handled by proxy.ts instead of here
  // — next.config.ts's redirects() only runs at build time, so a
  // Supabase-fetched redirect list here would need a full redeploy to pick
  // up any change. proxy.ts runs per-request and refreshes on a short TTL
  // (REDIRECT_CACHE_TTL_SECONDS, 60s floor — see proxy.ts).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.fiixup.in",
          },
        ],
        destination: "https://fiixup.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;