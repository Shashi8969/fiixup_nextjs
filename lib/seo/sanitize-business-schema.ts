const HEADQUARTERS_IDS = new Set([
  "https://fiixup.in/#organization",
  "https://fiixup.in/#localbusiness",
]);

/**
 * A service-area page is not a separate Fiixup workshop. The CMS currently
 * emits city-centre coordinates and generic postcodes as if they were branch
 * premises. Keep the service-area entity, but do not publish those as a
 * physical address or business location. The organization address in the
 * root layout remains untouched.
 */
export function sanitizeBusinessSchema(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitizeBusinessSchema);
  if (!value || typeof value !== "object") return value;

  const node = value as Record<string, unknown>;
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  const isPageBusiness = types.some((type) => type === "LocalBusiness" || type === "AutoRepair")
    && !HEADQUARTERS_IDS.has(String(node["@id"] ?? ""));

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !isPageBusiness || !["address", "geo", "hasMap"].includes(key))
      .map(([key, child]) => [key, sanitizeBusinessSchema(child)])
  );
}
