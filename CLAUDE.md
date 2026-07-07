# Fiixup — Project Context

## Overview

- Doorstep car & bike repair + 24/7 roadside assistance platform for India
- Live cities: Bangalore, Chennai, Hyderabad, Mumbai — scaling toward 100+ cities, 1000+ areas, 2000+ service pages
- Production: https://fiixup.in · Admin: https://admin.fiixup.in
- Two repos, one Supabase project: `fiixup` (public site) and `fiixup-admin` (CMS)

## Critical rules

- **Never push content changes to GitHub.** All content lives in Supabase, edited via the admin panel.
- Supabase is the single source of truth. Hardcoded fallback constants (`CITIES_LIST`, `MAIN_PHONE`, `fallbackHeaderLinks`, etc.) exist only as last-resort defaults if a DB fetch fails — never the primary path. Keep them in sync with `site_settings` / `navigation_links`, or better, remove them once you're confident the DB fetch never fails silently.

## Tech stack

- Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS, Tailwind Merge + CVA, Radix UI, React Hook Form, Sonner
- Supabase Postgres (Singapore region) + Storage (`images` bucket) + Auth (admin login only)
- Lead capture: `/api/leads` route handler → service-role insert + duplicate-phone detection → SMTP notification via `nodemailer`. **No EmailJS.**
- Deploy: GitHub → Hostinger, auto-deploy on push to `main`

## Data model (high level — verify against `lib/models/database.types.ts` before relying on this for column-level detail)

- `cities` → `areas` (geo-tagged with lat/lng) — city and area landing pages
- `service_categories` → `services`, with normalized `service_faqs` / `service_testimonials` / `service_brands`
- `city_service_pages` (CSP) — a service category scoped to one city
- `location_services` (LS) — one service at one city/area; the highest-volume page template at scale
- `posts` (+ `post_tags` → `tags`) — blog, with manually-curated `nearby_areas_json` / `related_services_json` / `internal_links_json` for internal linking
- `navigation_links` — scope-aware (global / city / area / exact-path) header & footer links; prefer `link_mode: db_page` over manual URLs to avoid broken links (`lib/public-links.ts` filters dead links automatically)
- `media_library` — Storage-backed asset manager with per-image SEO metadata (alt text, focal point, crop ratio)
- `leads` — CRM inbox for form submissions, with duplicate-phone detection
- `site_settings` — global business info (phone, email, hours, social) — intended source for `lib/schema.ts`'s Organization/LocalBusiness constants
- `seo_pages` — denormalized per-page content/SEO cache, rebuilt via `fn_build_*_seo_page()` Postgres functions on save, read by the frontend for near-zero-query page renders
- Self-audit: `cms_integrity_issues` view, surfaced in the admin `/cms-health` and `/project-audit` pages — check these before assuming something is dead code

## Known in-progress migration

`cities`, `location_services`, and `posts` (possibly others) still carry legacy JSONB columns alongside normalized replacement tables — explicitly commented "Legacy... still on DB rows" in `database.types.ts`. Prefer the normalized tables. The JSONB columns and their fallback branches (in `cache.ts`'s enrichment functions) should be dropped once the CMS Health "legacy rows" counter hits zero — not before.

## Folder structure

Regenerate and paste in rather than trusting this file, using:

```
find app components lib -type f \( -name "*.ts" -o -name "*.tsx" \) | sort
```

This file gets stale fast — if you're an AI agent reading this and something here contradicts the actual source, trust the source and flag the contradiction rather than repeating it.
