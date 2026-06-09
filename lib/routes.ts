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

export function normalizeSlug(slug?: string | null) {
  return String(slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

export function asAbsolutePath(path?: string | null) {
  const clean = String(path ?? "").trim();
  if (!clean) return "/";
  if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("tel:") || clean.startsWith("mailto:")) {
    return clean;
  }
  return clean.startsWith("/") ? clean : `/${clean}`;
}

export function getCitySlugFromPathname(pathname?: string | null) {
  const firstSegment = normalizeSlug(pathname).split("/").filter(Boolean)[0];
  if (!firstSegment) return null;
  return KNOWN_CITY_SLUGS.has(firstSegment) ? firstSegment : null;
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

export function getSmartServicesHref(pathname?: string | null) {
  const citySlug = getCitySlugFromPathname(pathname);
  return citySlug ? getCityServicesHref(citySlug) : "/services";
}
