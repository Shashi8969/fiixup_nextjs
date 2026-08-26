# Fiixup SEO Audit — 2026-08-26

Scope: full codebase review (Next.js 16 App Router) + live production checks (fiixup.in) + direct Supabase
queries against the `Fiixup-website` project. A third-party audit workbook
(`Fiixup_SEO_Audit_2026-08-26.xlsx`) was supplied as an input and is referenced below, but **every claim in
it was independently re-verified against the actual code, live site, and database** before being acted on —
see `project_ai_seo_audit_reliability` in memory: pasted third-party SEO audits have previously contained
false claims about this codebase, so nothing from the workbook was trusted at face value.

No pages were deleted, redirected, or mass-noindexed. Existing ranking URLs are unchanged except where
explicitly listed under "Indexation Changes" below.

---

## 1. Problems Found

### Critical

| ID | Issue | Verified evidence |
|----|-------|--------------------|
| F1 | Sitemap/canonical served a **malformed, duplicate URL** for one blog post: `/blog//car-jumpstart-cost-in-major-cities` (double slash), with a *different, stale meta title* than the real `/blog/car-jumpstart-cost-in-major-cities`. Both were `is_active=true` in `seo_pages` and both were in `sitemap.xml`. | `execute_sql` on `seo_pages`; confirmed live in `https://fiixup.in/sitemap.xml` (209 URLs, 1 malformed). Root cause: a stale duplicate row from an earlier `fn_build_blog_seo_page()` run, combined with [lib/seo/sitemap.ts](lib/seo/sitemap.ts) trusting `canonical_url` verbatim without normalizing it the way `cleanPath()` normalizes `url_path`. |
| F2 | **17 of 28 city × service-category pages** (`/chennai/services/bike`, `/hyderabad/services/battery`, `/mumbai/services/roadside`, etc.) have **zero** backing `location_services` rows and render a bare "Services … are being set up — please call us directly" placeholder — yet `generateMetadata()` unconditionally returns `index:true` and the pages are in the sitemap. | `execute_sql` cross-join of `cities` × `service_categories` × `location_services`; confirmed empty-state markup in [app/[citySlug]/services/[serviceSlug]/page.tsx:331](app/%5BcitySlug%5D/services/%5BserviceSlug%5D/page.tsx#L331). This is exactly the Phase 21 "incomplete page indexed as SEO landing page" pattern. |

### High

| ID | Issue | Evidence |
|----|-------|----------|
| F3 | **Internal CMS/admin instruction rendered as customer-facing copy**: "Pulled live from the service catalog for this area — add a service anywhere in the admin and it appears here automatically." | [components/city/AreaServices.tsx:56](components/city/AreaServices.tsx#L56) — renders on every area hub page with services. |
| F4 | Response-time claims are inconsistent across templates: **"20 minutes"** is the default everywhere (hero, FAQs, schema, CTA), but the global `services` table row for `roadside-assistance-near-me` says **"Arrives in 30 min"**, and Mumbai-specific FAQs say **45–75 min (60–90 min peak)** for city zones/Thane/Navi Mumbai. None of this is wired to one shared source. | `grep` across `app/`, `components/`, `lib/` (60+ occurrences of "20 min*"); `execute_sql` on `services` table; [lib/data/faqs.ts:834](lib/data/faqs.ts#L834). |
| F5 | Pricing shown for the same service is inconsistent depending on which template renders it: city-service pages consistently show car jumpstart at **₹599–₹799** (from `location_services.pricing_rows`), but the global `services` row for roadside assistance says **"Starting ₹299"** for a service that includes jumpstart. Not a contradiction on the *same* keyword+page, but two different pricing sources (`location_services.pricing_rows` vs the flat `services` table) that aren't reconciled. | `execute_sql` on `seo_pages.page_data->>'pricingRows'` and `services.meta_description`. |
| F6 | Keyword-cannibalization candidates: `/services/roadside-assistance-near-me` (global service) and `/bangalore/services/roadside` (city category) and `/bangalore/car-breakdown-service-near-me` (city individual service) all target closely related "roadside assistance Bangalore" intent from three different templates/data sources. | Live `curl` (all three return 200); DB rows confirm distinct meta titles/descriptions, so Google is choosing between three URLs rather than being told which one is canonical for the intent. **Not auto-merged** — needs GSC query-level data per Phase 24, marked `REVIEW` in the URL map. |

### Medium

| ID | Issue | Evidence |
|----|-------|----------|
| F7 | Trust/stat claims (`10,000+ happy customers`, `98% satisfaction`, `30-day warranty`, `certified & background-verified`) are hardcoded defaults in [lib/constants.ts](lib/constants.ts), [components/city/CityAbout.tsx](components/city/CityAbout.tsx), [components/city/CityAboutDynamic.tsx](components/city/CityAboutDynamic.tsx) etc., used whenever the CMS field (`data.statsCustomers`, `data.statsSatisfaction`) is empty. No code fabricates numbers *dynamically* — these are static fallback strings — but they render as fact with no substantiation. | Not changed: this needs real business verification, not a code fix. Listed under "Remaining Content Problems" below per your explicit instruction not to invent replacement numbers. |
| F8 | `robots.txt`/sitemap/canonical hostname handling is actually **correct** in code and in production (`next.config.ts` 301s `www` → apex; App Router emits `308` self-canonicalizing redirects for `www` and for trailing slashes). The workbook's "Critical — www and non-www both appear in search results" finding is most likely **stale Google cache from before this redirect existed**, not a current technical defect. | Live `Invoke-WebRequest`/`urllib` checks: `https://www.fiixup.in/` → `308 → https://fiixup.in`; `https://fiixup.in/bangalore/` → `308 → /bangalore`. No code change made; flagged as a GSC-monitoring item, not a bug. |
| F9 | `AggregateRating`/`Review` schema: **already removed** per the 2026-07-25 rich-results fix (see `lib/schema.ts`, six separate "self-serving-reviews policy" comments). The workbook's schema concern describes a state that predates that fix. | `grep` on `lib/schema.ts`. No action needed — confirms prior fix is holding. |

### Low / Validate (needs data only you have)

- Editorial QA claims from the workbook ("Mechanic Sevices" typo, "in Bangalore in Bangalore" duplicate wording on the bike-jumpstart page) **could not be reproduced** — current DB content for `/bangalore/services` and `/bangalore/bike-jump-start-bangalore` is clean. Likely already fixed, or the workbook's third-party crawl is stale.
- Exact ranking/impression loss cause, backlink profile, and Core Web Vitals field data all require your GSC/Ahrefs exports — the workbook's own "GSC Loss Analysis" sheet is an empty template. Nothing was fabricated to fill it.

---

## 2. Files Changed

| File | Change | Reason | SEO impact |
|------|--------|--------|------------|
| [lib/seo/sitemap.ts](lib/seo/sitemap.ts) | `buildSitemapEntries()` now normalizes `url_path`/`canonical_url` (collapses repeated slashes) before building sitemap entries, instead of trusting `canonical_url` verbatim. | Root-cause fix for F1 — prevents any future stale/malformed `canonical_url` value from producing a duplicate sitemap entry, without needing per-row cleanup each time. | Sitemap can no longer emit a malformed duplicate URL for this class of bug. |
| [lib/seo/metadata.ts](lib/seo/metadata.ts) | `absoluteUrl()` now collapses duplicate slashes in the path portion even when the input is already an absolute URL (previously only did this for relative paths). | Same root cause as above — `metadataFromSeoPage()`/canonical `<link>` tags go through this function too. | Prevents malformed self-canonical tags on any page, not just the sitemap. |
| [components/city/AreaServices.tsx](components/city/AreaServices.tsx) | Replaced the internal admin-instruction sentence with customer-facing copy ("Every listed service is available for doorstep booking in {areaName} right now."). | Phase 7 — internal CMS/editor text must never render publicly. | Removes an unprofessional, confusing line from every area hub page that lists services. |
| [app/[citySlug]/services/[serviceSlug]/page.tsx](app/%5BcitySlug%5D/services/%5BserviceSlug%5D/page.tsx) | `generateMetadata()` now returns `index:false` (renders as `noindex, nofollow` — this site's existing `buildRobots(false)` convention, unchanged by this pass) when the DB has zero `location_services` rows for that city+category, instead of always indexing. Page still renders normally for visitors (no 404), it just stops being an SEO landing page for empty content. | Phase 21, explicit instruction: incomplete/placeholder pages must not remain indexable. Self-healing — the moment an admin adds a `location_services` row for that city+category, the page re-indexes automatically on next revalidation. | See "Indexation Changes" below — this is the one deliberate indexation change in this pass. |
| `seo_pages` (Supabase, single row, `url_path = '/blog//car-jumpstart-cost-in-major-cities'`) | Deactivated (`is_active = false`) the stale duplicate row rather than deleting it, per your standing "never hard-delete" policy. | Stops the malformed URL from being served/sitemapped at all, on top of the code-level defense above. | Removes one duplicate-content URL from the sitemap; the real post (`/blog/car-jumpstart-cost-in-major-cities`) is untouched. |

Lint/typecheck/build were run after these changes — see Final Validation below.

---

## 3. URLs Protected

Every one of the 194 `KEEP`-flagged rows in `SEO_URL_MAP.csv` — all live city hubs, locality hubs,
locality-service pages, city-service-category pages with real content, global service pages, and blog
posts — was left completely unchanged: no slug renamed, no canonical redirirected, no noindex added. This
explicitly includes every URL the workbook or GSC examples referenced (`/bangalore`, `/bangalore/hsr-layout`,
`/bangalore/hsr-layout/car-mechanic-near-me`, `/bangalore/whitefield`, `/bangalore/car-mechanic-near-me`,
city hubs for Chennai/Hyderabad/Mumbai, etc.).

The three overlapping roadside-assistance URLs (F6) were **not** merged, redirected, or canonicalized —
flagged `REVIEW` only, pending GSC query-ownership data as Phase 24 requires.

---

## 4. Indexation Changes

**17 pages changed from `index, follow` to `noindex, nofollow`** (still `200`, still visitable by users and
linked from their parent city hub — the `nofollow` only tells Google not to crawl outbound links found on
the noindexed page itself, it does not affect inbound links or the page's own visibility to visitors):

```
/chennai/services/bike
/chennai/services/puncture
/chennai/services/roadside
/hyderabad/services/battery
/hyderabad/services/bike
/hyderabad/services/car
/hyderabad/services/mechanic
/hyderabad/services/puncture
/hyderabad/services/roadside
/hyderabad/services/towing
/mumbai/services/battery
/mumbai/services/bike
/mumbai/services/car
/mumbai/services/mechanic
/mumbai/services/puncture
/mumbai/services/roadside
/mumbai/services/towing
```

All 17 currently render nothing but a placeholder sentence and a phone number — no service cards, no
pricing, no local content. This is a self-healing change: the same `generateMetadata()` logic re-checks
`location_services` on every revalidation, so a page automatically returns to `index,follow` the moment
real service rows exist for that city+category. They will also drop out of `sitemap.xml` on the next
revalidation since `getSitemapUrls()` filters on `is_indexed = true` — **note this requires the matching
`seo_pages.is_indexed` flag to be updated too** (see "Remaining follow-up" below — the `generateMetadata()`
fix controls the `<meta name="robots">` tag Google actually reads, but the sitemap's `is_indexed` column is
a separate cached value in `seo_pages` and wasn't touched by this pass since it's CMS-owned data, not code).

One URL removed from the sitemap outright: `/blog//car-jumpstart-cost-in-major-cities` (malformed duplicate
of `/blog/car-jumpstart-cost-in-major-cities`, which is untouched and still fully indexed).

No other page became noindex, 301, or canonicalized elsewhere.

---

## 5. Technical Improvements

- **Canonical/hostname**: confirmed correct in production — no change needed (F8).
- **Robots.txt**: confirmed correct — `AI_USER_AGENTS` allowlist plus `*` rule, `/api/`, `/admin-preview/`, `/debug/`, `/_next/` disallowed, sitemap + host declared. No change.
- **Sitemap**: hardened against malformed/duplicate URLs at the code level (see Files Changed); 209 → 208 URLs after removing the duplicate blog entry, will drop further once the 17 noindexed pages fall out on next revalidation.
- **Schema**: confirmed `AggregateRating`/`Review` already removed per prior fix; no duplicate JSON-LD found in the templates sampled (homepage, city hub, city-service, blog post).
- **Metadata**: `absoluteUrl()` hardened (see above); no other missing-title/description/canonical rows found (`seo_pages` query: 0 missing title, 0 missing description, 0 missing/off-host canonical across all 203 active rows).
- **Internal linking / SSR / breadcrumbs / Core Web Vitals**: not modified this pass — reviewed at a sample level only (homepage, Bangalore hub, one city-service page, one locality-service page); nothing broken was found, but a full crawl-based audit of all 208 live URLs is out of scope for a code-review pass and belongs in Phase 18/25 tooling.

---

## 6. Remaining Content Problems (need your input — nothing fabricated)

1. **Actual response-time SLA per city.** "20 minutes" is the site-wide default; Mumbai FAQs already say 45–90 minutes for city/Thane/Navi Mumbai realistically. Tell me the real per-city (or per-zone) dispatch target and I'll centralize it into one config (`serviceAreas[city].estimatedArrival` as the audit spec suggested) instead of ~30 hardcoded occurrences.
2. **Real pricing** for roadside assistance specifically — the global `services` table says "Starting ₹299 / 30 min", city-service pages don't show a roadside price row at all. Confirm the correct current price before I touch it.
3. **Verified customer/review counts.** `10,000+ happy customers`, `98% satisfaction` — confirm these are real and current, or give me the real numbers / remove the claim.
4. **Real warranty terms** — `terms-and-conditions/page.tsx` already has `WARRANTY_DAYS = 7` with a comment flagging it may not match the "30-day warranty" badge shown everywhere else on the site. This is a live, user-visible contradiction between the marketing badges and the legal T&Cs — please confirm which number (7 or 30) is correct.
5. **Technician credentials** — "certified & background-verified" appears throughout; confirm this is accurate before I decide whether it needs softening.
6. **Roadside-assistance keyword ownership** (F6) — tell me which of the three URLs should own "roadside assistance Bangalore" intent, ideally backed by GSC query data, and I'll consolidate/redirect the others.

---

## 7. Recommended GSC Monitoring

After this deploys, watch in Search Console:

- **Coverage report**: the 17 newly-noindexed `/{city}/services/{category}` URLs should move from "Indexed" to "Excluded by noindex tag" within 1–2 weeks — confirm none of them were driving meaningful clicks/impressions before this (if you have GSC access, check Performance filtered to those 17 URLs for the last 90 days before this ships, ideally).
- **URL Inspection** on `/blog/car-jumpstart-cost-in-major-cities` (the real post) to confirm it's still indexed and unaffected after the duplicate row was deactivated.
- **Sitemaps report**: submitted count should read 208 (was 209) after the malformed blog URL drops out.
- Queries: `car mechanic near me`, `car mechanic bangalore`, `bike mechanic near me`, `towing service near me`, `roadside assistance near me`, `roadside assistance bangalore` — watch for any position shift on the three overlapping roadside URLs (F6) even though nothing was changed there; if Google is already picking one over the others, that's your evidence for which one to keep as primary.
