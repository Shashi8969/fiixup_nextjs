import type { NavigationArea, NavigationLink } from "@/lib/navigation-types";
import { normalizePublicRoute } from "@/lib/routes";

export type NavigationScopeContext = {
  pathname: string;
  citySlug: string | null;
  areaSlug: string | null;
};

const AREA_VALUES: NavigationArea[] = [
  "header",
  "footer_car_services",
  "footer_bike_services",
  "footer_cities",
  "footer_quick_links",
];

const NON_AREA_SECOND_SEGMENTS = new Set(["services", "blog"]);

function clean(value?: string | null) {
  return String(value ?? "").trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

export function getNavigationScopeContext(pathname?: string | null): NavigationScopeContext {
  const path = normalizePublicRoute(pathname || "/");
  const parts = path.split("/").filter(Boolean);
  const citySlug = parts[0] ?? null;
  const second = parts[1] ?? null;
  const areaSlug = second && !NON_AREA_SECOND_SEGMENTS.has(second) ? second : null;

  return {
    pathname: path,
    citySlug: citySlug ? clean(citySlug) : null,
    areaSlug: areaSlug ? clean(areaSlug) : null,
  };
}

function linkArea(link: NavigationLink) {
  return String(link.nav_area || "") as NavigationArea;
}

function getSpecificity(link: NavigationLink, context: NavigationScopeContext) {
  const scopeType = clean(link.scope_type || "global");
  const city = clean(link.scope_city_slug);
  const area = clean(link.scope_area_slug);
  const scopePath = normalizePublicRoute(link.scope_path || "");

  if (scopeType === "path") {
    return scopePath && scopePath === context.pathname ? 4 : -1;
  }

  if (scopeType === "area") {
    return city && area && city === context.citySlug && area === context.areaSlug ? 3 : -1;
  }

  if (scopeType === "city") {
    return city && city === context.citySlug ? 2 : -1;
  }

  return 1;
}

function bySortThenLabel(a: NavigationLink, b: NavigationLink) {
  const diff = Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0);
  if (diff !== 0) return diff;
  return a.label.localeCompare(b.label);
}

function uniqueByHrefAndLabel(links: NavigationLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    const key = `${normalizePublicRoute(link.href)}::${link.label.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function selectScopedNavigationLinks(
  links: NavigationLink[] | undefined,
  pathname: string | null | undefined,
  navArea?: NavigationArea
) {
  const candidates = (links ?? []).filter((link) => {
    if (link.is_active === false) return false;
    if (navArea && linkArea(link) !== navArea) return false;
    return !navArea || AREA_VALUES.includes(linkArea(link));
  });

  if (!candidates.length) return [];

  const context = getNavigationScopeContext(pathname);
  const scored = candidates
    .map((link) => ({ link, score: getSpecificity(link, context) }))
    .filter((item) => item.score > 0);

  if (!scored.length) return [];

  const bestScore = Math.max(...scored.map((item) => item.score));
  const selected = scored
    .filter((item) => item.score === bestScore)
    .map((item) => item.link)
    .sort(bySortThenLabel);

  return uniqueByHrefAndLabel(selected);
}
