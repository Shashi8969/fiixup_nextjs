// Canonical registry for the reorderable sections on /services/[serviceSlug].
// Hero, Trust Strip, About, and the closing booking CTA remain fixed.

export const SERVICE_PAGE_SECTION_IDS = [
  "benefits",
  "how_it_works",
  "pricing",
  "brands",
  "city_coverage",
  "testimonials",
  "faqs",
  "why_choose",
  "seo_content",
  "guide",
  "related_services",
] as const;

export type ServicePageSectionId = typeof SERVICE_PAGE_SECTION_IDS[number];

export type ServicePageLayoutRow = {
  id: string;
  visible: boolean;
  heading: string | null;
};

function isKnownSectionId(id: string): id is ServicePageSectionId {
  return (SERVICE_PAGE_SECTION_IDS as readonly string[]).includes(id);
}

export function resolveServiceSectionOrder(
  saved: ServicePageLayoutRow[]
): { id: ServicePageSectionId; visible: boolean; heading: string | null }[] {
  const savedKnown = saved.filter(
    (row): row is ServicePageLayoutRow & { id: ServicePageSectionId } =>
      Boolean(row) && typeof row.id === "string" && isKnownSectionId(row.id)
  );
  const known = new Set(savedKnown.map((row) => row.id));
  const missing = SERVICE_PAGE_SECTION_IDS
    .filter((id) => !known.has(id))
    .map((id) => ({ id, visible: true, heading: null }));

  return [...savedKnown, ...missing];
}
