// next.config.ts
import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// HARDCODED_REDIRECTS — always applied even if Supabase is unreachable.
// Once the `redirects` table is populated (run redirects_setup.sql), these
// can eventually be removed here — the DB becomes the single source of truth.
// ─────────────────────────────────────────────────────────────────────────────
const HARDCODED_REDIRECTS = [
  { source: "/Car-Repair-Service",     destination: "/services/car-general-repair",     permanent: true },
  { source: "/Break-Down-Service",     destination: "/services/car-breakdown-service",   permanent: true },
  { source: "/break-down-service",     destination: "/services/car-breakdown-service",   permanent: true },
  { source: "/bengaluru",              destination: "/bangalore",                         permanent: true },
  { source: "/bengaluru/:path*",       destination: "/bangalore/:path*",                 permanent: true },
  { source: "/car-jump-start-near-me-bengaluru",         destination: "/services/car-battery-jumpstart-near-me", permanent: true },
  { source: "/car-jumpstart-service-chennai",            destination: "/services/car-battery-jumpstart-near-me", permanent: true },
  { source: "/car-jumpstart-near-me-bengaluru",          destination: "/services/car-battery-jumpstart-near-me", permanent: true },
  { source: "/car-jumpstart-service-tips",               destination: "/blog/how-to-jump-start-car-safely",      permanent: true },
  { source: "/how-to-jump-start-a-car-in-bengaluru",     destination: "/blog/how-to-jump-start-car-safely",      permanent: true },
  { source: "/car-tyre-puncture-repair",                 destination: "/services/car-puncture-repair-near-me",   permanent: true },
  { source: "/tyre-puncture-repair-near-me-bengaluru",   destination: "/services/car-puncture-repair-near-me",   permanent: true },
  { source: "/tyre-puncture-repair-near-me-chennai",     destination: "/services/car-puncture-repair-near-me",   permanent: true },
  { source: "/bike-puncture-repair-near-me-chennai",     destination: "/services/bike-puncture-repair-near-me",  permanent: true },
  { source: "/bangalore-towing-service",                 destination: "/services/car-towing-service-near-me",    permanent: true },
  { source: "/car-towing-service-chennai",               destination: "/services/car-towing-service-near-me",    permanent: true },
  { source: "/bike-towing-service-near-me-in-bengaluru", destination: "/services/bike-towing-service-near-me",   permanent: true },
  { source: "/bike-towing-service-chennai",              destination: "/services/bike-towing-service-near-me",   permanent: true },
  { source: "/roadside-assistance-in-bangalore",         destination: "/services/roadside-assistance-near-me",   permanent: true },
  { source: "/roadside-assistance-chennai",              destination: "/services/roadside-assistance-near-me",   permanent: true },
  { source: "/on-road-mechanic-for-car-bike-bengaluru-fixup", destination: "/services/mobile-mechanic-near-me",  permanent: true },
  { source: "/car-oil-change-near-me-bengaluru-fiixup-24-7-doorstep", destination: "/services/car-oil-change-at-home", permanent: true },
  { source: "/royal-enfield-service-bengaluru",          destination: "/blog/royal-enfield-service-bangalore",   permanent: true },
  { source: "/bike-mechanic-near-me-bangalore",          destination: "/bangalore/bike-mechanic-near-me",         permanent: true },
  { source: "/bike-mechanic-near-me-chennai",            destination: "/chennai/bike-mechanic-near-me",           permanent: true },
  { source: "/bike-mechanic-in-hsr-layout",              destination: "/bangalore/hsr-layout/bike-mechanic-near-me", permanent: true },
  { source: "/24-7-bike-mechanic-in-hsr-layout",         destination: "/bangalore/hsr-layout/bike-mechanic-near-me", permanent: true },
  { source: "/24-hours-bike-repair-koramangala",          destination: "/bangalore/koramangala/bike-mechanic-near-me", permanent: true },
  { source: "/24-7-bike-mechanic-rr-nagar-bangalore",    destination: "/bangalore/bike-mechanic-near-me",         permanent: true },
  { source: "/mechanic-in-electronic-city",              destination: "/bangalore/electronic-city/mechanic-near-me", permanent: true },
  { source: "/garage-near-me-bengaluru",                 destination: "/bangalore/car-garage-near-me",            permanent: true },
  { source: "/bike-garage-near-me-bengaluru",            destination: "/bangalore/bike-garage-near-me",           permanent: true },
  { source: "/bike-garage-near-me-in-chennai-fiixups-24-7-doorstep-solutions", destination: "/chennai/bike-garage-near-me", permanent: true },
  { source: "/car-mechanics-bangalore",                  destination: "/bangalore/car-mechanic-near-me",          permanent: true },
  { source: "/car-mechanic-in-chennai-24-7-emergency-car-repair", destination: "/chennai/car-mechanic-near-me",  permanent: true },
  { source: "/car-breakdown-service-chennai",            destination: "/chennai/car-breakdown-service-near-me",   permanent: true },
  { source: "/motor-mechanic-near-me-chennai",           destination: "/chennai/mechanic-near-me",                permanent: true },
  { source: "/bike-mechanic-in-bangaluru",               destination: "/bangalore/bike-mechanic-near-me",         permanent: true },
  { source: "/bike-car-doorstep-service-chennai",        destination: "/chennai",                                  permanent: true },
  { source: "/book-bike-service",                        destination: "/contact#contact-form",                     permanent: true },
  { source: "/tips-for-car-breakdown",                   destination: "/blog/doorstep-car-service-vs-garage",      permanent: true },
  { source: "/fastest-royal-enfield-servicing-near-me-hsr-fiixup-24-7", destination: "/bangalore/hsr-layout/bike-mechanic-near-me", permanent: true },
];

const nextConfig: NextConfig = {
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
