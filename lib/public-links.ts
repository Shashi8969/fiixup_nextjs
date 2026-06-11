import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { NavigationLink } from "@/lib/navigation-types";

type SeoPathRow = {
  url_path: string | null;
  page_type: string | null;
  page_data?: Record<string, unknown> | null;
};

type ServiceCategoryRow = {
  slug: string | null;
};

export type PublicLinkRegistry = {
  activePaths: string[];
  citySlugs: string[];
  serviceCategorySlugs: string[];
};

const STATIC_PUBLIC_PATHS = ["/", "/services", "/about", "/blog", "/faq", "/contact"];
const EXTERNAL_PREFIXES = ["http://", "https://", "tel:", "mailto:", "#"];

export function normalizePublicPath(value?: string | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return "/";
  if (EXTERNAL_PREFIXES.some((prefix) => raw.startsWith(prefix))) return raw;
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const clean = withSlash.replace(/\/+/g, "/").replace(/\/$/, "");
  return clean || "/";
}

export function isExternalLikeHref(value?: string | null) {
  const href = String(value ?? "").trim();
  return EXTERNAL_PREFIXES.some((prefix) => href.startsWith(prefix));
}

export function isInternalPublicHref(value?: string | null) {
  const href = String(value ?? "").trim();
  return Boolean(href) && !isExternalLikeHref(href);
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function getCitySlugFromPath(path: string, pageData?: Record<string, unknown> | null) {
  const fromData = asString(pageData?.citySlug);
  if (fromData) return fromData.toLowerCase();

  const parts = normalizePublicPath(path).split("/").filter(Boolean);
  return parts[0]?.toLowerCase() || "";
}

export const getPublicLinkRegistry = unstable_cache(
  async (): Promise<PublicLinkRegistry> => {
    const [seoResult, categoryResult] = await Promise.all([
      supabase
        .from("seo_pages")
        .select("url_path,page_type,page_data")
        .eq("is_active", true),
      supabase
        .from("service_categories")
        .select("slug"),
    ]);

    const activePaths = new Set<string>(STATIC_PUBLIC_PATHS);
    const citySlugs = new Set<string>();
    const serviceCategorySlugs = new Set<string>();

    const seoRows = (seoResult.data ?? []) as SeoPathRow[];
    for (const row of seoRows) {
      const path = normalizePublicPath(row.url_path);
      if (!path || path === "//") continue;

      activePaths.add(path);

      if (row.page_type === "city_hub") {
        const citySlug = getCitySlugFromPath(path, row.page_data);
        if (citySlug) {
          citySlugs.add(citySlug);
          activePaths.add(`/${citySlug}/services`);
        }
      }
    }

    const categories = (categoryResult.data ?? []) as ServiceCategoryRow[];
    for (const row of categories) {
      const slug = asString(row.slug).toLowerCase();
      if (!slug) continue;

      serviceCategorySlugs.add(slug);
      activePaths.add(`/services/${slug}`);

      for (const citySlug of citySlugs) {
        const cityCategoryPath = `/${citySlug}/services/${slug}`;
        if (activePaths.has(cityCategoryPath)) continue;
      }
    }

    return {
      activePaths: unique(Array.from(activePaths)),
      citySlugs: unique(Array.from(citySlugs)),
      serviceCategorySlugs: unique(Array.from(serviceCategorySlugs)),
    };
  },
  ["public-link-registry"],
  { revalidate: 3600, tags: ["seo-pages", "navigation-links", "services", "service-categories", "cities", "areas"] }
);

export async function getPublicPathList() {
  const registry = await getPublicLinkRegistry();
  return registry.activePaths;
}

export function isKnownPublicPath(href: string, activePaths: string[]) {
  if (!isInternalPublicHref(href)) return true;
  return activePaths.includes(normalizePublicPath(href));
}

export function warnBrokenPublicLink(context: string, href: string, label?: string) {
  if (process.env.NODE_ENV === "production") return;
  const name = label ? ` (${label})` : "";
  console.warn(`[Fiixup link warning] ${context}${name} points to inactive/missing path: ${href}`);
}

export function filterValidNavigationLinks(
  links: NavigationLink[],
  activePaths: string[],
  context: string
) {
  const seen = new Set<string>();

  return links.filter((link) => {
    const href = normalizePublicPath(link.href);
    const key = `${href}::${link.label.toLowerCase()}`;

    if (seen.has(key)) {
      warnBrokenPublicLink(`${context} duplicate link skipped`, href, link.label);
      return false;
    }
    seen.add(key);

    if (!isKnownPublicPath(href, activePaths)) {
      warnBrokenPublicLink(context, href, link.label);
      return false;
    }

    link.href = href;
    return true;
  });
}

export function filterValidItemsByPath<T>(
  items: T[],
  getHref: (item: T) => string,
  activePaths: string[],
  context: string,
  getLabel?: (item: T) => string
) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const href = normalizePublicPath(getHref(item));
    const label = getLabel?.(item);

    if (seen.has(href)) {
      warnBrokenPublicLink(`${context} duplicate item skipped`, href, label);
      return false;
    }
    seen.add(href);

    if (!isKnownPublicPath(href, activePaths)) {
      warnBrokenPublicLink(context, href, label);
      return false;
    }

    return true;
  });
}
