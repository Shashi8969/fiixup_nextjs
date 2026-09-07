// JavaScript config is intentional.
//
// Hostinger's current Linux build image uses glibc older than 2.29. Next.js
// 16.3.x can fall back to SWC WASM for Webpack, but Turbopack requires the
// native SWC binding. Keeping this config as .mjs also avoids Next.js having
// to transpile next.config.ts before the build starts on that older host.
//
// The CSP helpers below mirror lib/security-headers.ts. They are kept local to
// this config so Node can load the config without importing/transpiling TS.

function getSupabaseHost() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "vpnztzzsyzgesnpihxsu.supabase.co";
  try {
    return new URL(url).host;
  } catch {
    return "vpnztzzsyzgesnpihxsu.supabase.co";
  }
}

function getAdminPreviewOrigins() {
  return [
    process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL,
    "https://fiixup-admin.vercel.app",
    process.env.NODE_ENV !== "production" ? "http://localhost:3001" : undefined,
  ]
    .filter(Boolean)
    .join(" ");
}

function buildContentSecurityPolicy() {
  const supabaseHost = getSupabaseHost();
  const adminPreviewOrigins = getAdminPreviewOrigins();

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    `frame-ancestors 'self' ${adminPreviewOrigins}`,
    "frame-src 'self' https://www.google.com",
    "form-action 'self'",
    `img-src 'self' data: blob: https://${supabaseHost} https://www.google-analytics.com https://www.googletagmanager.com`,
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    `connect-src 'self' https://${supabaseHost} https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com`,
    "upgrade-insecure-requests",
  ].join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
];

const nextConfig = {
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
    ];
  },

  images: {
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
