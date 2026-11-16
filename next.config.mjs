// JavaScript config is intentional.
//
// Hostinger's current Linux build image uses glibc older than 2.29. Next.js
// 16.3.x can fall back to SWC WASM for Webpack, but Turbopack requires the
// native SWC binding. Keeping this config as .mjs also avoids Next.js having
// to transpile next.config.ts before the build starts on that older host.
//
import { getSupabaseHost, buildSecurityHeaders, buildContentSecurityPolicy } from "./lib/security-policy.mjs";

const securityHeaders = buildSecurityHeaders();

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/admin-preview/:path*",
        headers: [
          { key: "Content-Security-Policy", value: buildContentSecurityPolicy({ analytics: false }) },
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      ...["/api/leads", "/api/chat", "/api/revalidate"].map(source => ({
        source, headers: [{ key: "Cache-Control", value: "no-store" }],
      })),
    ];
  },

  images: {
    dangerouslyAllowSVG: false,
    dangerouslyAllowLocalIP: false,
    maximumRedirects: 0,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600],
    qualities: [50, 75, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: getSupabaseHost(),
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  trailingSlash: false,

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
