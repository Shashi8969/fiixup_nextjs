import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export type SmartAreaLink = { name: string; slug: string; href: string };
export type SmartServiceLink = { name: string; slug: string; category: string; href: string };

function clean(value?: string | null) {
  return String(value ?? "").trim().toLowerCase();
}

function uniqueByHref<T extends { href: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.href || seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export const getSmartNearbyAreasForService = unstable_cache(
  async (citySlug: string, serviceSlug: string): Promise<SmartAreaLink[]> => {
    const city = clean(citySlug);
    const service = clean(serviceSlug);
    if (!city || !service) return [];

    const { data, error } = await supabase
      .from("location_services")
      .select("area_slug, area_name, city_slug, service_slug")
      .eq("city_slug", city)
      .eq("service_slug", service)
      .not("area_slug", "is", null)
      .eq("is_active", true)
      .order("area_name", { ascending: true });

    if (error || !data) return [];

    return uniqueByHref(
      data
        .map((row: any) => ({
          name: String(row.area_name ?? row.area_slug ?? "").trim(),
          slug: String(row.area_slug ?? "").trim(),
          href: `/${row.city_slug}/${row.area_slug}/${row.service_slug}`,
        }))
        .filter((row) => row.name && row.slug)
    );
  },
  ["smart-nearby-areas"],
  { revalidate: 3600, tags: ["seo-pages", "location-services", "areas"] }
);

export const getSmartRelatedServicesForLocation = unstable_cache(
  async (
    citySlug: string,
    serviceSlug: string,
    serviceCategory: string,
    areaSlug?: string | null
  ): Promise<SmartServiceLink[]> => {
    const city = clean(citySlug);
    const service = clean(serviceSlug);
    const category = clean(serviceCategory);
    const area = clean(areaSlug);
    if (!city || !service) return [];

    let query = supabase
      .from("location_services")
      .select("service_slug, service_name, service_category, city_slug, area_slug")
      .eq("city_slug", city)
      .neq("service_slug", service)
      .eq("is_active", true)
      .order("service_name", { ascending: true })
      .limit(9);

    if (area) query = query.eq("area_slug", area);
    else query = query.is("area_slug", null);

    if (category) query = query.eq("service_category", category);

    const { data, error } = await query;
    if (error || !data?.length) return [];

    return uniqueByHref(
      data
        .map((row: any) => ({
          name: String(row.service_name ?? row.service_slug ?? "").trim(),
          slug: String(row.service_slug ?? "").trim(),
          category: String(row.service_category ?? "").trim(),
          href: area
            ? `/${row.city_slug}/${area}/${row.service_slug}`
            : `/${row.city_slug}/${row.service_slug}`,
        }))
        .filter((row) => row.name && row.slug)
    );
  },
  ["smart-related-services"],
  { revalidate: 3600, tags: ["seo-pages", "location-services", "services"] }
);

export const getSmartAreasForCityCategory = unstable_cache(
  async (citySlug: string, serviceCategory: string): Promise<SmartAreaLink[]> => {
    const city = clean(citySlug);
    const category = clean(serviceCategory);
    if (!city || !category) return [];

    const { data, error } = await supabase
      .from("location_services")
      .select("area_slug, area_name, city_slug")
      .eq("city_slug", city)
      .eq("service_category", category)
      .not("area_slug", "is", null)
      .eq("is_active", true)
      .order("area_name", { ascending: true });

    if (error || !data) return [];

    return uniqueByHref(
      data
        .map((row: any) => ({
          name: String(row.area_name ?? row.area_slug ?? "").trim(),
          slug: String(row.area_slug ?? "").trim(),
          href: `/${row.city_slug}/${row.area_slug}`,
        }))
        .filter((row) => row.name && row.slug)
    );
  },
  ["smart-category-areas"],
  { revalidate: 3600, tags: ["seo-pages", "location-services", "areas"] }
);
