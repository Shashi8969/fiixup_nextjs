const HEADQUARTERS_IDS = new Set([
  "https://fiixup.in/#organization",
  "https://fiixup.in/#localbusiness",
]);

/**
 * Service-area pages are not separate Fiixup workshops. Keep their service
 * entities, but do not publish generated city-centre coordinates, postcodes,
 * or map links as physical branch locations. Root business schema is retained.
 */
export function sanitizeBusinessSchema(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitizeBusinessSchema);
  if (!value || typeof value !== "object") return value;

  const node = value as Record<string, unknown>;
  const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
  const isServiceAreaBusiness = types.some((type) => type === "LocalBusiness" || type === "AutoRepair")
    && !HEADQUARTERS_IDS.has(String(node["@id"] ?? ""));
  const isTrustClaimEntity = types.some((type) =>
    ["Organization", "LocalBusiness", "AutoRepair", "Service"].includes(String(type))
  );

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => {
        if (isServiceAreaBusiness && ["address", "geo", "hasMap"].includes(key)) return false;
        if (isTrustClaimEntity && ["aggregateRating", "review"].includes(key)) return false;
        return true;
      })
      .map(([key, child]) => [key, sanitizeBusinessSchema(child)])
  );
}
