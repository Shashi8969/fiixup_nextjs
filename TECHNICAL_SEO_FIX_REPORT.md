# Fiixup — Technical SEO Fix Report

**Date:** 2026-08-29
**Type:** Delta pass — verify the full technical-SEO checklist against current code, fix genuinely-open code-level items only, no mass content/URL changes.
**Verification:** `next build` (Turbopack, production) — clean, 312/312 static pages, TypeScript check passes. Blog metadata change verified in a live browser against `next dev`.

---

## 1. Executive summary

This codebase has already been through two thorough technical-SEO passes in the last week — [`SEO_AUDIT.md`](SEO_AUDIT.md) (2026-08-26) and [`FINAL_REPORT.md`](FINAL_REPORT.md). The canonical-URL system, `www`→apex redirect, sitemap, `robots.txt`, structured-data library, empty-page `noindex` handling, dynamic-route 404s, and the DB-driven per-request redirect engine were all already implemented and were re-verified here as correct.

This pass found the site's SEO fundamentals in good shape. Three genuinely-open **code-level** defects were found and fixed, all in the blog-post template:

1. Blog post pages emitted **no `og:image` and no Twitter Card tags** — every blog article shared to social/Slack/WhatsApp rendered a blank preview.
2. `posts.updated_at` was fetched from the DB but **dropped during row mapping**, so `Article.dateModified` (and the new `article:modified_time`) always equalled the publish date even for genuinely-edited posts.
3. `article:published_time` / schema dates on the fallback path were emitted as the raw display string (`"August 7, 2026"`) instead of ISO 8601.

Nothing was deleted, redirected, or newly `noindex`ed. No URLs changed. No Supabase content was touched.

---

## 2. Critical problems found

**None new.** The two items previously classed Critical in `SEO_AUDIT.md` (F1 malformed sitemap URL, F2 empty city-service pages indexed) were both verified as fixed in code:

- `lib/seo/sitemap.ts` `collapseSlashes()` + `lib/seo/metadata.ts` `absoluteUrl()` slash-collapse — present and correct.
- `app/[citySlug]/services/[serviceSlug]/page.tsx` returns `index:false` when the city+category has zero backing `location_services` rows — present and correct.

---

## 3. High-priority problems fixed

### H1 — Blog posts had no social-share image or Twitter Card

| | |
|---|---|
| **Problem** | `app/blog/[id]/page.tsx` `generateMetadata()` hand-rolled a minimal `Metadata` object (title, description, canonical, partial OG) instead of routing through the shared `metadataFromBasicSeo()` generator that every other page type uses. Result: **no `og:image`, no `twitter:card`, no `twitter:image`, no `robots` directives, no `keywords`.** |
| **SEO / distribution impact** | Every blog URL shared on WhatsApp, Slack, LinkedIn, X, Facebook, iMessage rendered a blank/text-only card — measurable CTR loss on the channel blog content is most often shared through. Also missing the `max-image-preview:large` / `max-snippet:-1` robots hints the rest of the site sends. |
| **Files** | `app/blog/[id]/page.tsx` |
| **Fix** | `generateMetadata()` now calls `metadataFromBasicSeo({ type: "article", ogImage: post.image, ogImageAlt, publishedTime, modifiedTime, keywords: post.tags, canonical, path })`. This inherits the shared OG image (1200×630), `summary_large_image` Twitter card, `buildRobots(true)` directives, and absolute-canonical normalization. |
| **Verification** | `next dev` + browser: `/blog/car-jumpstart-cost-in-major-cities` now emits `og:image`, `twitter:card=summary_large_image`, `twitter:image`, `og:type=article`, `robots="index, follow"` with googleBot extras. Confirmed exactly 2 JSON-LD blocks (Organization/WebSite from layout + Article/Breadcrumb/FAQPage from post) — no duplication. |

### H2 — `posts.updated_at` dropped in row mapping → `dateModified` always == `datePublished`

| | |
|---|---|
| **Problem** | `lib/posts.ts` `POST_SELECT` fetches `updated_at`, but `rowToPost()` never mapped it onto the returned `BlogPost`. The template's `updatedAt: (post as any).updatedAt ?? post.date` therefore always resolved to `post.date`. `Article.dateModified` on the code-generated (fallback) schema path could never reflect a real edit. |
| **SEO impact** | Genuinely-updated articles signalled no freshness to Google (`dateModified` is a ranking/Discover freshness input). Conversely this was *safe* (never fabricated a fake modification) — so severity is "missing signal", not "wrong signal". |
| **Files** | `lib/models/blog.model.ts` (added `updatedAt?: string`), `lib/posts.ts` (`updatedAt: row.updated_at ?? undefined` in `rowToPost`) |
| **Fix + follow-through** | `updatedAt` now flows through. `app/blog/[id]/page.tsx` uses `post.updatedAt ?? post.date` (removed the `as any`) and passes it as `article:modified_time`. **Per Phase 23**, this is edit-driven, not deploy-driven — `updated_at` only moves when the row is actually saved in the admin. |
| **Verification** | Browser: `article:modified_time = 2026-08-22T05:57:05.609Z` (a real `updated_at`, distinct from `article:published_time = 2026-08-06T18:30:00.000Z`). |

---

## 4. Medium-priority problems fixed

### M1 — Non-ISO dates in `article:*_time` / schema on the fallback path

| | |
|---|---|
| **Problem** | `posts.date` is stored in mixed formats (some ISO, some `"August 7, 2026"` — see `project_blog_data_quality` note). The old code passed it straight into `openGraph.publishedTime`. OG protocol and schema.org date fields require ISO 8601; a display string is invalid to machine consumers. |
| **SEO impact** | Invalid `article:published_time` / `datePublished` on any post whose `date` isn't already ISO — parsers may ignore the date entirely, costing Article/Discover eligibility. |
| **Files** | `app/blog/[id]/page.tsx` (local `toIsoDate()` helper) |
| **Fix** | `toIsoDate()` coerces via `new Date(value).toISOString()`, falling back to the raw string only when unparseable. Applied to `publishedTime`, `modifiedTime`, and the fallback `blogPostSchema()` `publishedAt`/`updatedAt`. Does **not** touch admin-authored `schema_json` (which is already ISO). |
| **Verification** | Browser: `article:published_time` changed from `"August 7, 2026"` → `2026-08-06T18:30:00.000Z` after the fix. |
| **Residual** | The underlying `posts.date` column normalization is a **CMS data task**, not a code fix — flagged in §21. |

---

## 5. Low-priority improvements

- Removed a stray `as any` cast in `app/blog/[id]/page.tsx` now that `BlogPost.updatedAt` is typed.
- No other low-priority code changes made this pass, to keep churn minimal and avoid entangling with the uncommitted in-progress work in the tree (see §18).

---

## 6. Canonicalization changes

**None required.** Verified correct as-is:

- `lib/seo/metadata.ts` — single centralized `absoluteUrl()` / `metadataFromBasicSeo()` / `metadataFromSeoPage()`. Collapses duplicate slashes even on already-absolute inputs. Every route's `generateMetadata()` produces one self-referencing absolute `https://fiixup.in/...` canonical via `alternates.canonical`.
- Spot-checked in-browser: `/blog/<slug>` canonical = `https://fiixup.in/blog/<slug>` (non-www, https, no params, no trailing slash). Homepage, city, area, area-service, service routes all pass through the same helper or an equivalent `${SITE_URL}/...` literal.
- The blog fix (H1) moved `/blog/[id]` onto the shared helper, so its canonical is now normalized the same way as everything else (previously a raw `${SITE_URL}/blog/${slug}` literal — happened to be correct, now defensively normalized).

---

## 7. WWW redirect changes

**None required** (scope decision: code-level mechanism + document the host-level belt-and-braces).

Current mechanism — `next.config.ts` `redirects()`:

```ts
{ source: "/:path*", has: [{ type: "host", value: "www.fiixup.in" }],
  destination: "https://fiixup.in/:path*", permanent: true }   // 308
```

`SEO_AUDIT.md` F8 verified live production: `https://www.fiixup.in/` → `308 → https://fiixup.in`, `https://fiixup.in/bangalore/` → `308 → /bangalore`. The App Router also self-canonicalises trailing slashes (`trailingSlash: false`).

**Recommended belt-and-braces at Hostinger** (not a blocker — the Next redirect already covers it, but a server-level rule means the request never reaches Node): add to the site's Apache vhost / `.htaccess`, or nginx `server` block:

Apache (`.htaccess`):
```apache
RewriteEngine On
# Force HTTPS + non-www in a single hop
RewriteCond %{HTTP_HOST} ^www\.fiixup\.in$ [NC,OR]
RewriteCond %{HTTPS} off
RewriteRule ^ https://fiixup.in%{REQUEST_URI} [R=301,L]
```

nginx:
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name www.fiixup.in fiixup.in;
    if ($host = www.fiixup.in) { return 301 https://fiixup.in$request_uri; }
    if ($scheme = http)        { return 301 https://fiixup.in$request_uri; }
    # ... proxy_pass to the Next server ...
}
```

Note the `next.config.ts` rule uses `permanent: true` which Next emits as **308**, not 301. 308 is semantically correct (method-preserving permanent) and Google treats 301/308 identically for SEO. If you specifically want a 301 in the response for tooling that flags 308, the Hostinger-level rule above delivers that.

---

## 8. Sitemap changes

**None required.** Verified:

- `app/sitemap.ts` → `getSitemapUrls()` (`lib/seo-pages.ts`) filters `is_active = true AND is_indexed = true`; `buildSitemapEntries()` (`lib/seo/sitemap.ts`) collapses repeated slashes, drops anything not under `https://fiixup.in`, drops `/api /admin-preview /_next /debug`, dedups by URL, sorts, assigns per-`page_type` priority + changefreq.
- `lastModified` comes from `seo_pages.updated_at` (real timestamp), not `new Date()` per-request unless the row genuinely lacks one.
- Absolute `https://fiixup.in` URLs only. No `www`, no `http`, no thank-you/preview/auth URLs.
- `revalidate = 3600`.

No sitemap-index split needed at current volume (~208 URLs).

---

## 9. Robots changes

**None required.** `app/robots.ts`:

- `User-agent: *` → `Allow: /`, `Disallow: /api/ /admin-preview/ /debug/ /_next/`.
- Explicit allow-list block for AI/LLM crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`, …) with the same disallow set.
- `Sitemap: https://fiixup.in/sitemap.xml` + `Host: https://fiixup.in` declared.
- No CSS/JS blocked. No blanket `Disallow: /`.
- `/admin-preview/*` is **both** robots-disallowed **and** `robots: { index:false, follow:false }` in its `generateMetadata()` — correct (robots.txt alone doesn't deindex).

---

## 10. Metadata changes

| File | Change |
|---|---|
| `app/blog/[id]/page.tsx` | `generateMetadata()` routed through `metadataFromBasicSeo()` → adds `og:image`, `og:image:alt`, `twitter:card`, `twitter:image`, `og:type=article`, `article:published_time` (ISO), `article:modified_time` (ISO, real `updated_at`), `keywords` (post tags), `robots` directives. Canonical now slash-normalized via shared helper. |

Verified unchanged and correct elsewhere: home, `/services`, `/services/[serviceSlug]`, `/[citySlug]`, `/[citySlug]/services`, `/[citySlug]/services/[serviceSlug]`, `/[citySlug]/[areaSlug]`, `/[citySlug]/[areaSlug]/[serviceSlug]`, `/brands`, `/brands/[brandSlug]`, `/blog/tag/[tag]`, static pages — all emit unique title + description + self canonical, and all dynamic routes call `notFound()` on invalid params.

Root `app/layout.tsx` `title.template` is `"%s"` (child pages own the full title string) with a sensible `default` — intentional, left as-is.

---

## 11. Structured data changes

**None required.** `lib/schema.ts` audited in full:

- One `@graph` per page. `Organization` + `WebSite` rendered on every page via the root layout so cross-references (`@id`) resolve.
- **No `AggregateRating` / `Review`** anywhere — deliberately removed under Google's self-serving-reviews policy (6 in-code comments document it). Confirmed still absent.
- `GeoCoordinates` omitted rather than faked when real lat/lng is unavailable.
- `jsonLdString()` escapes `<` → `<` on every injection site (XSS fix from `FINAL_REPORT`) — confirmed in use in `app/layout.tsx`, `components/seo/JsonLd.tsx`, `components/ui/Breadcrumb.tsx`, blog/home pages.
- Breadcrumb JSON-LD + visible breadcrumbs present on service/area/blog templates; `components/ui/Breadcrumb.tsx` also emits microdata (`itemscope`/`itemprop`).

**Flagged, not changed** (see §17 / §21):
- `siteOrganizationSchema()` hardcodes `foundingDate: "2020"` and `numberOfEmployees: { minValue: 50, maxValue: 500 }`. `foundingDate` matches the About page copy. `numberOfEmployees` corresponds to nothing visible and is unverifiable — **REQUIRES BUSINESS CONFIRMATION**; recommend removing the property if a real headcount isn't published.
- `lib/schema.ts` `cityServiceCategorySchema()` and `cityHubSchema()` — `cityServiceCategorySchema` is **not imported anywhere** (dead code); it also contains a `price: s.price.replace(/[₹\s]/g,'')` line that would produce an invalid non-numeric `price` (`"599–799"`) if it were used. Left in place (dead), flagged for removal.

---

## 12. Location-page architecture findings

No change (blanket `noindex` / blanket canonical-to-city is explicitly out of bounds, and not warranted).

- City hub → area hubs → area-service pages, plus city-service-category pages, are all backed by `seo_pages` rows and render distinct DB-authored content. Distinct search intents (`car mechanic` / `car service` / `car garage` / `car repair` / `roadside` / `towing` / `jumpstart`) are treated as distinct pages — correct.
- The one deliberate indexation control already in code: `/{city}/services/{category}` pages with **zero** backing `location_services` rows return `index:false` and self-heal when rows are added. 17 such pages were flipped in the 2026-08-26 pass (listed in `SEO_AUDIT.md` §4). No new ones added or removed this pass.
- `SEO_URL_MAP.csv` (194 `KEEP` rows) — all still intact, none renamed/redirected/noindexed.

---

## 13. Duplicate-content findings

Full programmatic similarity analysis across all generated pages was **not run** this pass (out of scope for a delta code pass — it needs a built crawl + GSC query data to action responsibly, per Phase 24). The prior pass's finding stands:

- **F6 (open):** `/services/roadside-assistance-near-me` (global), `/bangalore/services/roadside` (city category), `/bangalore/car-breakdown-service-near-me` (city service) target overlapping "roadside assistance Bangalore" intent from three templates. **Not merged** — needs GSC query-ownership data to decide which URL should own the intent. **REQUIRES BUSINESS INPUT + GSC EXPORT.**

DOM-level template duplication (carousel cloning of brand logos / reviews / "how it works") from Phase 8 was **not re-audited** here — flagged as still open for a dedicated component pass.

---

## 14. Internal-link changes

**None.** Internal linking goes through `lib/public-links.ts` (filters dead links against the live `seo_pages` path list), `lib/smart-internal-links.ts`, `lib/routes.ts`, and `navigation_links` with `link_mode: db_page` preferred. Spot-checked: links resolve to canonical non-www paths. A full crawl-based orphan/broken-link audit of all ~208 live URLs belongs in the automated suite (Phase 27), not a code pass.

---

## 15. Performance improvements

**None this pass.** `FINAL_REPORT` already covered the code-side perf items (server-component conversions, `sharp` dedupe, GTM deferral, forced-reflow loop fix on area pages). Actual LCP/INP/CLS field numbers require Lighthouse/CrUX against the live deploy — out of scope here.

One observation (not changed): `components/ui/Breadcrumb.tsx` is `"use client"` with no hooks/interactivity — it could be a Server Component to shave a little client JS. It is imported by exactly one server route today. Low value; left alone to minimise churn.

---

## 16. 404 / status improvements

**None required for HTTP status.** `app/not-found.tsx` returns a real HTTP 404 (App Router default) with a full custom UI. All dynamic routes (`[citySlug]`, `[areaSlug]`, `[serviceSlug]`, `[id]`, `[tag]`, `[brandSlug]`, `[token]`) call `notFound()` for params not in the DB — verified via grep. `/{city}/{fake-area}/{fake-service}` → 404, not a soft-200.

**Flagged, not changed:** `app/not-found.tsx` renders `<NotFoundRedirect />`, a client component that auto-`router.push("/")` after an 8-second countdown (with a "Stay on this page" opt-out). The HTTP status is still 404 so **crawler impact is negligible** (Googlebot doesn't run the timer), but it is a client-side auto-redirect-to-homepage pattern, which the brief explicitly discourages, and it's an accessibility/UX smell (unexpected navigation). It was a deliberate "retain every visitor" product decision, so it's left for a product call — **recommend removing the automatic `router.push`** and keeping the rest of the 404 UI. See §21.

---

## 17. NAP / contact consistency

No code change — the architecture is already right, but there are unverified hardcoded values.

- **Source of truth:** `site_settings` (Supabase) → `getPublicSiteSettings()` feeds header, footer, `siteOrganizationSchema()`, contact schema. `lib/constants.ts` (`MAIN_PHONE = +918197459732`, `MAIN_EMAIL = support@fiixup.in`, `WHATSAPP_NUMBER`) is fallback-only, per `CLAUDE.md`.
- **No `support@fiixup.com` anywhere** — the `.in` address is used consistently. Per-city addresses (`bangalore@fiixup.in` etc.) exist in `lib/schema.ts` `CITY_DATA`.
- `app/not-found.tsx` uses the hardcoded `MAIN_PHONE` constant directly rather than `site_settings` — acceptable for a fallback file, but worth noting if the number ever changes it must be updated in two places (`constants.ts` + `site_settings`).

**REQUIRES BUSINESS CONFIRMATION** (carried over from `SEO_AUDIT.md` §6, still unresolved):
1. Real per-city response-time SLA — `"20 minutes"` is hardcoded site-wide (`lib/constants.ts` `TRUST_BADGES`, `HOW_IT_WORKS_STEPS`, `app/not-found.tsx`, `app/blog/[id]/page.tsx` CTA, schema `HowTo` steps), but Mumbai FAQs say 45–90 min and the global `services` row for roadside says "30 min".
2. Warranty term — `TRUST_BADGES` / multiple templates say "30-day warranty"; `app/terms-and-conditions/page.tsx` has `WARRANTY_DAYS = 7` with a comment flagging the mismatch. **Live user-visible contradiction.**
3. Customer/review counts — `10,000+ happy customers`, `98% satisfaction`, About-page schema `"10,000+ happy customers"`, `CITY_DATA` per-city `reviewCount` (1200/800/600/400).
4. `numberOfEmployees: 50–500` and `foundingDate: 2020` in Organization schema.
5. "Certified & background-verified technicians" claim.

None of these were invented or changed. Centralising them into one config is a ~30-minute job once the real numbers are confirmed.

---

## 18. Files changed

```
MODIFIED (this pass):
  app/blog/[id]/page.tsx      — generateMetadata via metadataFromBasicSeo; toIsoDate() helper;
                                 use post.updatedAt; ISO-coerce schema dates
  lib/models/blog.model.ts    — add BlogPost.updatedAt?: string
  lib/posts.ts                — map row.updated_at -> updatedAt in rowToPost()

NEW (this pass):
  TECHNICAL_SEO_FIX_REPORT.md — this file
```

**Pre-existing uncommitted work in the tree (NOT touched by this pass, left intact):**
`components/city-service/CspPricing.tsx`, `components/global-service/GlobalServicePage.tsx`, `components/location-service/LocationServicePage.tsx`, `components/service/PricingTable.tsx`, `components/ui/BlockRenderer.tsx`, `lib/cms-guards.ts`, `lib/utils.ts`, `lib/seo/editorial-scaffold.ts` (untracked) — this is an in-progress wiring of `stripEditorialScaffold()` into block renderers + `formatPriceRange()` ("₹0+" → "Free") into pricing tables, from the 2026-08-27 AI-visibility follow-up. Coherent and half-complete; finish and commit it separately. `next-env.d.ts` / `tsconfig.tsbuildinfo` are framework-generated churn.

---

## 19. Tests performed

| Check | Result |
|---|---|
| `next build` (Turbopack, production) | **PASS** — compiled clean, TypeScript check passed, 312/312 static pages generated, exit 0 |
| `next dev` + browser, `/blog/car-jumpstart-cost-in-major-cities` `<head>` | `og:image` ✅, `twitter:card=summary_large_image` ✅, `twitter:image` ✅, `og:type=article` ✅, canonical `https://fiixup.in/blog/...` ✅, `robots="index, follow"` ✅, `article:published_time=2026-08-06T18:30:00.000Z` (ISO) ✅, `article:modified_time=2026-08-22T05:57:05.609Z` (real `updated_at`) ✅ |
| JSON-LD on that page | 2 blocks, no duplication: Organization+WebSite (layout) / Article+BreadcrumbList+FAQPage (post); `datePublished`/`dateModified` ISO ✅ |
| `eslint .` | **7 pre-existing errors** in files not touched this pass — see §21 |
| Regression: home / city / area metadata | Untouched by these edits; build regenerated all routes clean |

---

## 20. Build results

```
▲ Next.js 16.2.10 (Turbopack)
✓ Compiled successfully in 6.9s
  Finished TypeScript in 12.0s
✓ Generating static pages using 7 workers (312/312) in 11.7s
=== BUILD EXIT: 0 ===
```

Note: a stale `.next/dev/types/` directory (leftover from an interrupted `next dev`) was breaking `tsc`/`next build` with parser errors in generated files — deleted it once; it regenerates correctly. Not a code issue.

---

## 21. Remaining manual actions

**Code / lint debt (pre-existing, not SEO, not fixed to keep this pass scoped):**
- `components/blog/CategoryPlaceholder.tsx` — 5× `react-hooks/static-components` ("component created during render"). Same class of bug `FINAL_REPORT` fixed in `CityServiceCard.tsx`; fix by resolving the icon via property lookup instead of a function call assigned to a capitalized variable.
- `components/ui/BlockRenderer.tsx` — 5× `react/jsx-key` (missing `key` in `.map()` at lines 139/326/395/408/431). This file has uncommitted WIP — fix alongside finishing that work.
- `eslint .` is currently red because of the above; `next build` is green (it doesn't run eslint).

**Content / CMS (Supabase — do via admin, not code):**
- Normalise `posts.date` to ISO across all rows (mixed formats today). The `toIsoDate()` guard added this pass is a safety net, not a substitute.
- Update `seo_pages.is_indexed` for the 17 empty `/{city}/services/{category}` pages so they also drop from the sitemap (the `<meta robots>` already says noindex; the sitemap flag is separate CMS data).

**Business facts to confirm** (then centralise into one config) — see §17: response-time SLA per city, warranty term (7 vs 30 days — live contradiction), customer/satisfaction/review counts, `numberOfEmployees`, technician-credential wording, and the F6 roadside-assistance keyword owner.

**Product decision:** whether to keep the auto-redirect-to-homepage on the 404 page (§16).

**Not done this pass (need a build+crawl harness, Phase 8/13/18/27):** DOM-level carousel duplication audit, full internal-link/orphan crawl, programmatic page-similarity report, automated SEO test suite, Core Web Vitals field measurement.

---

## 22. Search Console actions after deployment

1. **Sitemaps report** — resubmit `https://fiixup.in/sitemap.xml`; confirm processed count and no new errors.
2. **URL Inspection** on 2–3 blog posts (e.g. `/blog/car-jumpstart-cost-in-major-cities`) → "Test live URL" → check the rendered `og:image`, `twitter:card`, and `article:modified_time` now appear, and the Article rich result still validates.
3. **Rich Results Test** (search.google.com/test/rich-results) on one blog post, one service page, one area page — confirm no new structured-data errors from the metadata change (there shouldn't be — schema output is unchanged; only `<head>` meta tags changed).
4. **Removals / Page Indexing** — nothing to submit; no URLs were removed or newly noindexed this pass.
5. **Crawl `www.fiixup.in`** via URL Inspection to reconfirm it reports the `www`→apex redirect (should already, per `SEO_AUDIT.md` F8). If Hostinger-level rules from §7 are added, re-verify with `curl -I https://www.fiixup.in/bangalore`.
6. **Performance report** — after ~2 weeks, filter to `/blog/*` and watch impressions/CTR for a lift now that share cards render with images (indirect signal via referral traffic; GSC won't show social directly).

---

## A–I quick answers

**A. Exact files changed**
`app/blog/[id]/page.tsx`, `lib/models/blog.model.ts`, `lib/posts.ts` (+ new `TECHNICAL_SEO_FIX_REPORT.md`). Pre-existing uncommitted WIP in 8 other files was left untouched.

**B. Exact technical SEO problems fixed**
1. Blog posts emitted no `og:image` / `twitter:card` / `twitter:image` / robots hints / keywords (hand-rolled metadata bypassing the shared generator).
2. `posts.updated_at` dropped in mapping → `Article.dateModified` & `article:modified_time` always equalled publish date.
3. `article:published_time` / fallback schema dates emitted as display strings, not ISO 8601.

**C. Redirects implemented**
None added. Existing `www`→apex 308 in `next.config.ts` verified. Hostinger-level Apache/nginx snippets provided in §7 as optional belt-and-braces (and to force a literal 301 if desired).

**D. Number of URLs crawled**
No full crawl this pass (delta code pass). 1 blog URL inspected live in-browser for verification; `next build` generated/type-checked all 312 routes.

**E. Duplicate / cannibalisation candidates found**
No new programmatic analysis. Carried-over: F6 — three overlapping roadside-assistance URLs (global service / city category / city service). Not merged; needs GSC query data.

**F. Pages changed to noindex**
**None.** (The 17 empty city-service pages were noindexed in the prior 2026-08-26 pass and were not modified here.)

**G. Pages canonicalised elsewhere**
**None.** All canonicals remain self-referencing.

**H. Build / test result**
`next build` → **exit 0**, clean, TypeScript passes, 312/312 pages. Browser verification of the blog metadata change → all target tags present and correct. `eslint .` → 7 pre-existing errors in untouched files (§21).

**I. Remaining Search Console steps**
Resubmit sitemap; URL-inspect + Rich Results Test a few blog/service/area pages to confirm the new `<head>` tags and unchanged schema; reconfirm `www` redirect; watch `/blog/*` performance for a share-card lift. Full list in §22.
