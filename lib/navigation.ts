import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { FooterNavigationGroups, NavigationArea, NavigationLink } from "@/lib/navigation-types";
import { fallbackFooterGroups, fallbackHeaderLinks } from "@/lib/navigation-fallbacks";

const AREAS: NavigationArea[] = [
  "header",
  "footer_car_services",
  "footer_bike_services",
  "footer_cities",
  "footer_quick_links",
];

function normalizeHref(href?: string | null) {
  const value = String(href ?? "").trim();
  if (!value) return "/";
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("tel:") ||
    value.startsWith("mailto:") ||
    value.startsWith("#")
  ) {
    return value;
  }
  return value.startsWith("/") ? value : `/${value}`;
}

function normalizeScopeType(value?: unknown) {
  const raw = String(value ?? "global").trim().toLowerCase();
  return ["global", "city", "area", "path"].includes(raw) ? raw : "global";
}

function normalizeLink(row: Record<string, any>): NavigationLink | null {
  const label = String(row.label ?? row.title ?? "").trim();
  const href = normalizeHref(row.href ?? row.url ?? row.path);
  const navArea = String(row.nav_area ?? row.area ?? "").trim() as NavigationArea;

  if (!label || !href || !AREAS.includes(navArea)) return null;

  return {
    id: row.id,
    label,
    href,
    nav_area: navArea,
    sort_order: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : 0,
    opens_new_tab: Boolean(row.opens_new_tab ?? row.open_new_tab ?? false),
    is_active: row.is_active !== false,
    scope_type: normalizeScopeType(row.scope_type),
    scope_city_slug: row.scope_city_slug ?? null,
    scope_area_slug: row.scope_area_slug ?? null,
    scope_path: row.scope_path ?? null,
    link_mode: row.link_mode ?? "manual",
    target_type: row.target_type ?? null,
    target_id: row.target_id ?? null,
  };
}

function bySortThenLabel(a: NavigationLink, b: NavigationLink) {
  const sortDiff = Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0);
  if (sortDiff !== 0) return sortDiff;
  return a.label.localeCompare(b.label);
}

const NAVIGATION_SELECT = [
  "id",
  "label",
  "href",
  "nav_area",
  "sort_order",
  "opens_new_tab",
  "is_active",
  "scope_type",
  "scope_city_slug",
  "scope_area_slug",
  "scope_path",
  "link_mode",
  "target_type",
  "target_id",
].join(",");

const fetchNavigationLinks = unstable_cache(
  async (): Promise<NavigationLink[]> => {
    try {
      const { data, error } = await supabase
        .from("navigation_links")
        .select(NAVIGATION_SELECT)
        .eq("is_active", true)
        .order("nav_area", { ascending: true })
        .order("scope_type", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error || !data) return [];

      return data
        .map((row) => normalizeLink(row))
        .filter(Boolean) as NavigationLink[];
    } catch {
      return [];
    }
  },
  ["navigation-links"],
  { revalidate: 3600, tags: ["navigation-links"] }
);

export async function getHeaderNavigationLinks() {
  const rows = await fetchNavigationLinks();
  const headerLinks = rows.filter((link) => link.nav_area === "header").sort(bySortThenLabel);

  if (!headerLinks.length) return fallbackHeaderLinks;
  return headerLinks;
}

export async function getFooterNavigationGroups(): Promise<FooterNavigationGroups> {
  const rows = await fetchNavigationLinks();

  const group = async (area: NavigationArea, fallback: NavigationLink[]) => {
    const links = rows.filter((link) => link.nav_area === area).sort(bySortThenLabel);
    if (!links.length) return fallback;
    return links;
  };

  const [carServices, bikeServices, cities, quickLinks] = await Promise.all([
    group("footer_car_services", fallbackFooterGroups.carServices),
    group("footer_bike_services", fallbackFooterGroups.bikeServices),
    group("footer_cities", fallbackFooterGroups.cities),
    group("footer_quick_links", fallbackFooterGroups.quickLinks),
  ]);

  return { carServices, bikeServices, cities, quickLinks };
}
