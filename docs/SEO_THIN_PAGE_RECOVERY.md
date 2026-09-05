# Fiixup Thin-Page Recovery Rules

## Non-destructive rule

Never hard-delete an SEO page, service, location-service, city-service page, or area record as part of SEO consolidation.

When a URL is confirmed to overlap a stronger URL:

1. Keep the source record in Supabase.
2. Set the source `is_active = false`.
3. Add an active permanent redirect from the old path to the selected winner.
4. Confirm the inactive URL is removed from XML sitemaps.
5. Confirm the winner is self-canonical and remains `is_active = true` / `is_indexed = true`.
6. Preserve useful source content by merging it into the winner before deactivation when appropriate.

`is_active = false` without a redirect is not a merge. Some frontend routes resolve inactive SEO records as `notFound()`, which can turn the old URL into a 404 and discard accumulated signals.

## Do not deactivate only because traffic is low

A page is not a consolidation candidate merely because it has zero clicks or few impressions. Retain it when it has a distinct search intent, meaningful local content, backlinks, conversions, or evidence that Google already ranks it for the intended local query.

Use at least the following evidence before consolidation:

- 90-day Google Search Console page and query performance
- query ownership / cannibalization comparison
- live content uniqueness
- backlinks or external citations
- internal-link role
- availability of a clearly stronger destination URL

## City-category indexability

`/{city}/services/{category}` pages must not be automatically treated as thin only because the current city-level `location_services` list is empty.

A city-category page can remain indexable when its active `city_service_pages` / `seo_pages` record contains substantive editorial content, for example:

- a non-empty SEO introduction,
- multiple useful SEO/content sections,
- meaningful about copy,
- FAQs, pricing, or other customer-facing category information.

This matters for pages that already have proven organic demand. A known example from the Sep 2026 GSC review is `/hyderabad/services/puncture`, which had strong organic performance even while the current Hyderabad puncture child-service list was empty.

Recommended indexability rule:

```ts
const hasEditorialContent = Boolean(
  dbPage?.data.seoIntroBody?.trim() ||
  (dbPage?.data.seoSections?.length ?? 0) >= 3 ||
  dbPage?.data.aboutPara1?.trim()
);

const shouldIndex = hasActiveChildServices || hasEditorialContent;
```

If no child service cards exist but rich editorial content does, omit the public `services are being set up` placeholder and show the editorial category content plus a neutral availability CTA instead.

## Claims and data quality

Do not generate or substitute unsupported locality/customer counts, ratings, satisfaction percentages, fixed ETA guarantees, or prices. If a value is not backed by a current authoritative data source, omit it or use conservative wording.

Examples:

- Prefer `Availability and arrival time depend on your exact location, traffic and technician availability.` over a fixed 20-minute guarantee unless operational data supports it.
- Prefer `Pricing is confirmed before paid work or dispatch.` over an invented starting price.
- Do not replace missing customer counts with `0+`, `10,000+`, or another fallback number.

## Target architecture

- City hub: `/{city}`
- Core city service intent: `/{city}/{service}`
- Selected locality hub: `/{city}/{area}`
- Locality-service URL only when the page has distinct intent/value: `/{city}/{area}/{service}`

The objective is not fewer URLs for its own sake. The objective is one clear primary URL per meaningful search intent, with strong content and internal-link support.