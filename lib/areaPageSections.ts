// lib/areaPageSections.ts
// Canonical registry of the reorderable / hideable / heading-overridable
// sections on an area hub page (app/[citySlug]/[areaSlug]/page.tsx's
// areaHub branch). Breadcrumb, Hero, the closing Contact/CTA band, and the
// footer are NOT in this list — those stay fixed at the top/bottom of the
// page; everything else is driven by this list + `areas.page_layout`.
//
// Mirrors lib/locationServicePageSections.ts exactly (same PageLayoutRow
// shape, same resolveSectionOrder logic) so the two page types share one
// mental model even though they don't share a section list.
//
// The admin's AreaPageLayoutEditor (fiixup-admin, a separate repo/package)
// keeps its own copy of these ids in sync by hand — same duplication
// locationServicePageSections.ts already has with PageLayoutEditor.tsx.

export const AREA_SECTION_IDS = [
  "trust_marquee",
  "services",
  "about",
  "testimonials",
  "seo_content",
  "faqs",
  "related_posts",
] as const;

export type AreaSectionId = typeof AREA_SECTION_IDS[number];

export type PageLayoutRow = { id: string; visible: boolean; heading: string | null };

function isKnownSectionId(id: string): id is AreaSectionId {
  return (AREA_SECTION_IDS as readonly string[]).includes(id);
}

// Merges a saved (possibly empty, possibly partial) layout over the
// registry's default order. Any known section missing from `saved` — every
// row today, since this is a new column, or a future section type added
// after a row was last saved — is appended at the end, visible by default,
// so nothing silently disappears from the page.
export function resolveSectionOrder(saved: PageLayoutRow[]): { id: AreaSectionId; visible: boolean; heading: string | null }[] {
  const savedKnown = saved.filter((row): row is PageLayoutRow & { id: AreaSectionId } => isKnownSectionId(row.id));
  const known = new Set(savedKnown.map((r) => r.id));
  const missing = AREA_SECTION_IDS
    .filter((id) => !known.has(id))
    .map((id) => ({ id, visible: true, heading: null }));
  return [...savedKnown, ...missing];
}
