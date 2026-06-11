import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { FooterNavigationGroups, NavigationArea, NavigationLink } from "@/lib/navigation-types";
import { fallbackFooterGroups, fallbackHeaderLinks } from "@/lib/navigation-fallbacks";
import { filterValidNavigationLinks, getPublicLinkRegistry } from "@/lib/public-links";

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
  };
}

function bySortThenLabel(a: NavigationLink, b: NavigationLink) {
  const sortDiff = Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0);
  if (sortDiff !== 0) return sortDiff;
  return a.label.localeCompare(b.label);
}

const fetchNavigationLinks = unstable_cache(
  async (): Promise<NavigationLink[]> => {
    try {
    const { data, error } = await supabase
      .from("navigation_links")
      .select("id,label,href,nav_area,sort_order,opens_new_tab,is_active")
      .eq("is_active", true)
      .order("nav_area", { ascending: true })
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
  const [rows, registry] = await Promise.all([fetchNavigationLinks(), getPublicLinkRegistry()]);
  const headerLinks = rows.filter((link) => link.nav_area === "header").sort(bySortThenLabel);
  const sourceLinks = headerLinks.length ? headerLinks : fallbackHeaderLinks;
  const validLinks = filterValidNavigationLinks(sourceLinks, registry.activePaths, "header navigation");
  return validLinks.length ? validLinks : fallbackHeaderLinks;
}

export async function getFooterNavigationGroups(): Promise<FooterNavigationGroups> {
  const [rows, registry] = await Promise.all([fetchNavigationLinks(), getPublicLinkRegistry()]);

  const group = (area: NavigationArea, fallback: NavigationLink[]) => {
    const links = rows.filter((link) => link.nav_area === area).sort(bySortThenLabel);
    const sourceLinks = links.length ? links : fallback;
    const validLinks = filterValidNavigationLinks(sourceLinks, registry.activePaths, `${area} footer navigation`);
    return validLinks.length ? validLinks : fallback;
  };

  return {
    carServices: group("footer_car_services", fallbackFooterGroups.carServices),
    bikeServices: group("footer_bike_services", fallbackFooterGroups.bikeServices),
    cities: group("footer_cities", fallbackFooterGroups.cities),
    quickLinks: group("footer_quick_links", fallbackFooterGroups.quickLinks),
  };
}
