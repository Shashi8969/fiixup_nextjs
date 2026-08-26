// lib/data/brandPages.ts
// Data layer for brand pages (/brands, /brands/[brandSlug]).
// Catalog-style pages like /services — reads directly from `brand_pages`,
// no seo_pages cache layer needed at this scale (~20 pages, not thousands).

import { cache } from "react";
import { supabase } from "@/lib/supabase";
import type { BrandData, BrandListItem, BrandServiceLink } from "@/lib/models/brand.model";

function rowToBrand(row: any): BrandData {
  return {
    slug: row.slug,
    brandName: row.brand_name,
    vehicleType: row.vehicle_type,
    logoUrl: row.logo_url ?? null,
    logoAlt: row.logo_alt ?? null,
    logoTitle: row.logo_meta?.title ?? null,
    tagline: row.tagline ?? null,
    heroHeading: row.hero_heading?.trim() || `${row.brand_name} ${row.vehicle_type === "car" ? "Car" : "Bike"} Repair at Your Doorstep`,
    heroSubheading: row.hero_subheading?.trim() ||
      `Certified mechanics for every ${row.brand_name} model, at your home or office.`,
    description: row.description ?? "",
    models: Array.isArray(row.models) ? row.models : [],
    commonIssues: Array.isArray(row.common_issues) ? row.common_issues : [],
    sections: Array.isArray(row.sections) ? row.sections : [],
    faqs: Array.isArray(row.faqs) ? row.faqs : [],
    metaTitle: row.meta_title || `${row.brand_name} ${row.vehicle_type === "car" ? "Car" : "Bike"} Service at Home | Fiixup`,
    metaDescription: row.meta_description || row.description || "",
    metaKeywords: row.meta_keywords ?? null,
    schemaJson: row.schema_json ?? undefined,
  };
}

export async function getAllBrandPages(): Promise<BrandListItem[]> {
  const { data, error } = await supabase
    .from("brand_pages")
    .select("slug, brand_name, vehicle_type, logo_url, logo_alt, tagline")
    .eq("is_active", true)
    .order("vehicle_type")
    .order("sort_order");

  if (error) {
    console.error("getAllBrandPages error:", error.message);
    return [];
  }
  return (data ?? []).map((row) => ({
    slug: row.slug,
    brandName: row.brand_name,
    vehicleType: row.vehicle_type,
    logoUrl: row.logo_url ?? null,
    logoAlt: row.logo_alt ?? null,
    tagline: row.tagline ?? null,
  }));
}

export const getBrandPageBySlug = cache(async (slug: string): Promise<BrandData | undefined> => {
  const { data, error } = await supabase
    .from("brand_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return undefined;
  return rowToBrand(data);
});

/**
 * getServicesForBrand — the services actually offered for this brand,
 * sourced live from `service_brands` (joined to `services`) so this list
 * never drifts out of sync with the real catalog.
 */
export async function getServicesForBrand(
  brandName: string,
  vehicleType: "car" | "bike"
): Promise<BrandServiceLink[]> {
  const { data: brandRows, error: brandError } = await supabase
    .from("service_brands")
    .select("service_id")
    .eq("brand_name", brandName)
    .eq("vehicle_type", vehicleType);

  if (brandError || !brandRows?.length) return [];

  const serviceIds = brandRows.map((r) => r.service_id).filter(Boolean);
  if (!serviceIds.length) return [];

  const { data, error } = await supabase
    .from("services")
    .select("slug, short_title, tagline, price, duration, icon")
    .in("id", serviceIds)
    .order("title");

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    shortTitle: row.short_title,
    tagline: row.tagline,
    price: row.price,
    duration: row.duration,
    icon: row.icon,
  }));
}

/** Other brands of the same vehicle type, for "Related brands" links. */
export async function getRelatedBrands(
  vehicleType: "car" | "bike",
  excludeSlug: string,
  limit = 6
): Promise<BrandListItem[]> {
  const { data, error } = await supabase
    .from("brand_pages")
    .select("slug, brand_name, vehicle_type, logo_url, logo_alt, tagline")
    .eq("vehicle_type", vehicleType)
    .eq("is_active", true)
    .neq("slug", excludeSlug)
    .order("sort_order")
    .limit(limit);

  if (error || !data) return [];
  return data.map((row) => ({
    slug: row.slug,
    brandName: row.brand_name,
    vehicleType: row.vehicle_type,
    logoUrl: row.logo_url ?? null,
    logoAlt: row.logo_alt ?? null,
    tagline: row.tagline ?? null,
  }));
}
