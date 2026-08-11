// lib/locationServicePageSections.ts
// Canonical registry of the reorderable / hideable / heading-overridable
// sections on a location-service page (components/location-service/LocationServicePage.tsx).
// Hero, Trust Strip, About, and the closing CTA are NOT in this list — those
// stay fixed at the top/bottom of the page; everything below About and above
// the closing CTA is driven by this list + `location_services.page_layout`.
//
// The admin's PageLayoutEditor (fiixup-admin, a separate repo/package) keeps
// its own copy of these ids in sync by hand — same duplication the blog
// block type list already has between the two repos.

export const LOCATION_SERVICE_SECTION_IDS = [
  "why_choose",
  "how_it_works",
  "seo_content",
  "pricing",
  "testimonials",
  "faqs",
  "nearby_areas",
  "related_services",
] as const;

export type LocationServiceSectionId = typeof LOCATION_SERVICE_SECTION_IDS[number];

export type PageLayoutRow = { id: string; visible: boolean; heading: string | null };

function isKnownSectionId(id: string): id is LocationServiceSectionId {
  return (LOCATION_SERVICE_SECTION_IDS as readonly string[]).includes(id);
}

// Merges a saved (possibly empty, possibly partial) layout over the
// registry's default order. Any known section missing from `saved` — every
// row today, since this is a new column, or a future section type added
// after a row was last saved — is appended at the end, visible by default,
// so nothing silently disappears from the page.
export function resolveSectionOrder(saved: PageLayoutRow[]): { id: LocationServiceSectionId; visible: boolean; heading: string | null }[] {
  const savedKnown = saved.filter((row): row is PageLayoutRow & { id: LocationServiceSectionId } => isKnownSectionId(row.id));
  const known = new Set(savedKnown.map((r) => r.id));
  const missing = LOCATION_SERVICE_SECTION_IDS
    .filter((id) => !known.has(id))
    .map((id) => ({ id, visible: true, heading: null }));
  return [...savedKnown, ...missing];
}
