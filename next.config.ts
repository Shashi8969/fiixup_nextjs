// next.config.ts
// ─────────────────────────────────────────────────────────────────────────────
// Redirects for all legacy WordPress URLs and 404s found in SEO audit.
// Add new redirects here — no other file changes needed.
// ─────────────────────────────────────────────────────────────────────────────

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600],
  },

  async redirects() {
    return [
      // ── Legacy WordPress URL casing fixes ────────────────────────────────
      {
        source: "/Car-Repair-Service",
        destination: "/services/car-general-repair",
        permanent: true,
      },
      {
        source: "/Break-Down-Service",
        destination: "/services/car-breakdown-service",
        permanent: true,
      },
      {
        source: "/break-down-service",
        destination: "/services/car-breakdown-service",
        permanent: true,
      },

      // ── Old service URLs → new slugs ─────────────────────────────────────
      {
        source: "/car-jump-start-near-me-bengaluru",
        destination: "/services/car-battery-jumpstart-near-me",
        permanent: true,
      },
      {
        source: "/car-jumpstart-service-chennai",
        destination: "/services/car-battery-jumpstart-near-me",
        permanent: true,
      },
      {
        source: "/car-jumpstart-service-tips",
        destination: "/blog/how-to-jump-start-car-safely",
        permanent: true,
      },
      {
        source: "/how-to-jump-start-a-car-in-bengaluru",
        destination: "/blog/how-to-jump-start-car-safely",
        permanent: true,
      },
      {
        source: "/car-tyre-puncture-repair",
        destination: "/services/car-puncture-repair-near-me",
        permanent: true,
      },
      {
        source: "/tyre-puncture-repair-near-me-bengaluru",
        destination: "/services/car-puncture-repair-near-me",
        permanent: true,
      },
      {
        source: "/tyre-puncture-repair-near-me-chennai",
        destination: "/services/car-puncture-repair-near-me",
        permanent: true,
      },
      {
        source: "/bike-puncture-repair-near-me-chennai",
        destination: "/services/bike-puncture-repair-near-me",
        permanent: true,
      },
      {
        source: "/bangalore-towing-service",
        destination: "/services/car-towing-service-near-me",
        permanent: true,
      },
      {
        source: "/car-towing-service-chennai",
        destination: "/services/car-towing-service-near-me",
        permanent: true,
      },
      {
        source: "/bike-towing-service-near-me-in-bengaluru",
        destination: "/services/bike-towing-service-near-me",
        permanent: true,
      },
      {
        source: "/bike-towing-service-chennai",
        destination: "/services/bike-towing-service-near-me",
        permanent: true,
      },
      {
        source: "/roadside-assistance-in-bangalore",
        destination: "/services/roadside-assistance-near-me",
        permanent: true,
      },
      {
        source: "/roadside-assistance-chennai",
        destination: "/services/roadside-assistance-near-me",
        permanent: true,
      },
      {
        source: "/on-road-mechanic-for-car-bike-bengaluru-fixup",
        destination: "/services/mobile-mechanic-near-me",
        permanent: true,
      },
      {
        source: "/car-oil-change-near-me-bengaluru-fiixup-24-7-doorstep",
        destination: "/services/car-oil-change-at-home",
        permanent: true,
      },
      {
        source: "/royal-enfield-service-bengaluru",
        destination: "/blog/royal-enfield-service-bangalore",
        permanent: true,
      },
      {
        source: "/bike-mechanic-near-me-bangalore",
        destination: "/services/mobile-mechanic-near-me",
        permanent: true,
      },
      {
        source: "/bike-mechanic-near-me-chennai",
        destination: "/services/mobile-mechanic-near-me",
        permanent: true,
      },
      {
        source: "/bike-mechanic-in-hsr-layout",
        destination: "/bangalore/hsr-layout",
        permanent: true,
      },
      {
        source: "/24-7-bike-mechanic-in-hsr-layout",
        destination: "/bangalore/hsr-layout",
        permanent: true,
      },
      {
        source: "/24-hours-bike-repair-koramangala",
        destination: "/bangalore/koramangala",
        permanent: true,
      },
      {
        source: "/24-7-bike-mechanic-rr-nagar-bangalore",
        destination: "/bangalore",
        permanent: true,
      },
      {
        source: "/mechanic-in-electronic-city",
        destination: "/bangalore/electronic-city",
        permanent: true,
      },
      {
        source: "/garage-near-me-bengaluru",
        destination: "/services/car-service-at-home",
        permanent: true,
      },
      {
        source: "/bike-garage-near-me-bengaluru",
        destination: "/services/bike-service-at-home",
        permanent: true,
      },
      {
        source: "/bike-garage-near-me-in-chennai-fiixups-24-7-doorstep-solutions",
        destination: "/services/bike-service-at-home",
        permanent: true,
      },
      {
        source: "/car-mechanics-bangalore",
        destination: "/services/car-general-repair",
        permanent: true,
      },
      {
        source: "/car-mechanic-in-chennai-24-7-emergency-car-repair",
        destination: "/services/car-general-repair",
        permanent: true,
      },
      {
        source: "/car-breakdown-service-chennai",
        destination: "/services/car-breakdown-service",
        permanent: true,
      },
      {
        source: "/motor-mechanic-near-me-chennai",
        destination: "/services/mobile-mechanic-near-me",
        permanent: true,
      },
      {
        source: "/bike-mechanic-in-bangaluru",
        destination: "/services/mobile-mechanic-near-me",
        permanent: true,
      },
      {
        source: "/bike-car-doorstep-service-chennai",
        destination: "/chennai",
        permanent: true,
      },
      {
        source: "/book-bike-service",
        destination: "/contact#contact-form",
        permanent: true,
      },
      {
        source: "/tips-for-car-breakdown",
        destination: "/blog/doorstep-car-service-vs-garage",
        permanent: true,
      },
      {
        source: "/fastest-royal-enfield-servicing-near-me-hsr-fiixup-24-7",
        destination: "/bangalore/hsr-layout",
        permanent: true,
      },
      {
        source: "/car-jumpstart-near-me-bengaluru",
        destination: "/services/car-battery-jumpstart-near-me",
        permanent: true,
      },

      // ── 404 area sub-pages from SEO audit ───────────────────────────────
      {
        source: "/bangalore/koramangala/towing-service-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/car-repair-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/bike-service-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/mechanic-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/garage-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/royal-enfield-service-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/koramangala/car-mechanic-near-me",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
      {
        source: "/bangalore/hsr-layout/jump-start-service-near-me",
        destination: "/bangalore/hsr-layout",
        permanent: false,
      },
      {
        source: "/bangalore/hsr-layout/doorstep-mechanic-near-me",
        destination: "/bangalore/hsr-layout",
        permanent: false,
      },
      {
        source: "/bangalore/indiranagar",
        destination: "/bangalore/koramangala",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
