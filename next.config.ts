// next.config.ts
import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED_REDIRECTS — always applied even if Supabase is unreachable.
// Once the `redirects` table is populated (run redirects_setup.sql), these
// can eventually be removed here — the DB becomes the single source of truth.
// ─────────────────────────────────────────────────────────────────────────────
const HARDCODED_REDIRECTS = [
  { source: '/car-mechanic-in-bangalore', destination: '/bangalore/car-mechanic', permanent: true },
];

const ADMIN_PREVIEW_ORIGINS = [
  process.env.NEXT_PUBLIC_FIIXUP_ADMIN_URL,
  'https://admin.fiixup.in',
  'http://localhost:3001',
]
  .filter(Boolean)
  .join(' ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: `frame-ancestors 'self' ${ADMIN_PREVIEW_ORIGINS}` },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600],
    remotePatterns: [
      {
        // Supabase Storage CDN — for blog, service, city images
        protocol: "https",
        hostname:  "vpnztzzsyzgesnpihxsu.supabase.co",
        port:      "",
        pathname:  "/storage/v1/object/public/**",
      },
    ],
  },

  async redirects() {
    // ── Fetch dynamic redirects from Supabase at build time ──────────────────
    // Requires SUPABASE_SERVICE_ROLE_KEY in Vercel env vars.
    // If missing or Supabase unreachable, falls back silently to hardcoded list.
    let dbRedirects: { source: string; destination: string; permanent: boolean }[] = [];

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey) {
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/redirects?select=source,destination,is_permanent&is_active=eq.true`,
          {
            headers: {
              apikey:        serviceKey,
              Authorization: `Bearer ${serviceKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const rows = await res.json() as { source: string; destination: string; is_permanent: boolean }[];
          dbRedirects = rows.map((r) => ({
            source:      r.source,
            destination: r.destination,
            permanent:   r.is_permanent,
          }));
          console.log(`[next.config] Loaded ${dbRedirects.length} redirects from Supabase`);
        } else {
          console.warn("[next.config] Supabase redirects fetch returned:", res.status);
        }
      } catch (err) {
        console.warn("[next.config] Could not fetch Supabase redirects:", (err as Error).message);
      }
    }

    // ── Merge: DB redirects win; hardcoded fill any gaps ─────────────────────
    const dbSources = new Set(dbRedirects.map((r) => r.source));
    return [
      ...dbRedirects,
      ...HARDCODED_REDIRECTS.filter((r) => !dbSources.has(r.source)),
    ];
  },
};

export default nextConfig;
