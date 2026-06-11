// lib/routes.ts
// Centralized public route helpers for Fiixup.
// Keep page URL decisions here so components do not accidentally link
// city users back to global service pages.

export const DEFAULT_CITY_SLUG = "bangalore";

const KNOWN_CITY_SLUGS = new Set([
  "bangalore",
  "bengaluru",
  "chennai",
  "hyderabad",
  "mumbai",
]);

const EXTERNAL_PREFIXES = ["http://", "https://", "tel:", "mailto:", "#"];

export function normalizeSlug(slug?: string | null) {
  return String(slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

export function asAbsolutePath(path?: string | null) {
  const clean = String(path ?? "").trim();
  if (!clean) return "/";
  if (EXTERNAL_PREFIXES.some((prefix) => clean.startsWith(prefix))) {
    return clean;
  }
  return clean.startsWith("/") ? clean : `/${clean}`;
}

export function normalizePublicRoute(path?: string | null) {
  const absolute = asAbsolutePath(path);
  if (EXTERNAL_PREFIXES.some((prefix) => absolute.startsWith(prefix))) return absolute;
  const clean = absolute.replace(/\/+/g, "/").replace(/\/$/, "");
  return clean || "/";
}

export function getCitySlugFromPathname(pathname?: string | null) {
  const firstSegment = normalizeSlug(pathname).split("/").filter(Boolean)[0];
  if (!firstSegment) return null;
  return KNOWN_CITY_SLUGS.has(firstSegment) ? firstSegment : null;
}

function hasActivePath(path: string, activePaths?: string[] | null) {
  if (!activePaths?.length) return true;
  return activePaths.includes(normalizePublicRoute(path));
}

export function getCityServicesHref(citySlug?: string | null) {
  const city = normalizeSlug(citySlug) || DEFAULT_CITY_SLUG;
  return `/${city}/services`;
}

export function getCityServiceCategoryHref(citySlug: string | null | undefined, categorySlug: string) {
  const city = normalizeSlug(citySlug) || DEFAULT_CITY_SLUG;
  return `/${city}/services/${normalizeSlug(categorySlug)}`;
}

export function getCityServiceHref(citySlug: string | null | undefined, serviceSlug: string) {
  const city = normalizeSlug(citySlug) || DEFAULT_CITY_SLUG;
  return `/${city}/${normalizeSlug(serviceSlug)}`;
}

export function getAreaServiceHref(citySlug: string, areaSlug: string, serviceSlug: string) {
  return `/${normalizeSlug(citySlug)}/${normalizeSlug(areaSlug)}/${normalizeSlug(serviceSlug)}`;
}

export function getGlobalServiceHref(serviceSlug: string) {
  return `/services/${normalizeSlug(serviceSlug)}`;
}

export function getSmartServicesHref(pathname?: string | null, activePaths?: string[] | null) {
  const citySlug = getCitySlugFromPathname(pathname);
  const cityServicesPath = citySlug ? getCityServicesHref(citySlug) : null;
  return cityServicesPath && hasActivePath(cityServicesPath, activePaths) ? cityServicesPath : "/services";
}

export function getContextAwareHref(href?: string | null, pathname?: string | null, activePaths?: string[] | null) {
  const safeHref = normalizePublicRoute(href);
  if (EXTERNAL_PREFIXES.some((prefix) => safeHref.startsWith(prefix))) return safeHref;

  const citySlug = getCitySlugFromPathname(pathname);
  if (!citySlug) return safeHref;

  if (safeHref === "/services") {
    return getSmartServicesHref(pathname, activePaths);
  }

  const parts = safeHref.split("/").filter(Boolean);
  if (parts[0] !== "services" || !parts[1]) return safeHref;

  const slug = normalizeSlug(parts[1]);
  const cityCategoryHref = getCityServiceCategoryHref(citySlug, slug);
  if (hasActivePath(cityCategoryHref, activePaths)) return cityCategoryHref;

  const cityServiceHref = getCityServiceHref(citySlug, slug);
  if (hasActivePath(cityServiceHref, activePaths)) return cityServiceHref;

  return safeHref;
}
