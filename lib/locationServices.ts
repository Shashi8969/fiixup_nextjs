import { supabase } from "./supabase";
import { normalizeImageMeta, type ImageMeta } from "./seo-pages";

export interface LocationServiceData {
  id: number;
  citySlug: string;
  cityName: string;
  areaSlug: string | null;
  areaName: string | null;
  isCityLevel: boolean;
  serviceSlug: string;
  serviceName: string;
  serviceCategory: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  heroHeading: string;
  heroSubheading: string;
  heroBadgeText: string;
  aboutHeading: string;
  aboutPara1: string;
  aboutPara2: string;
  aboutBullets: { heading: string; text: string }[];
  serviceHighlights: { title: string; description: string }[];
  whyChoosePoints: { icon: string; title: string; desc: string }[];
  pricingRows: { label: string; priceFrom: number; priceTo?: number; note?: string }[];
  pricingDisclaimer: string;
  testimonials: { name: string; rating: number; text: string; date: string; vehicle: string; area: string }[];
  faqs: { q: string; a: string }[];
  nearbyAreas: { name: string; slug: string }[];
  relatedServices: { name: string; slug: string; category: string }[];
  seoIntroHeading: string | null;
  seoIntroBody: string | null;
  seoSections: { heading: string; body: string }[];
  seoConclusion: string | null;
  contentBlocks: unknown[];
  heroImageUrl: string | null;
  heroImageAlt: string | null;
  heroImageMeta: ImageMeta | null;
  pageLayout: { id: string; visible: boolean; heading: string | null }[];
  schemaAggregateRating: number;
  schemaReviewCount: number;
  displayLocation: string;
  locationHeading: string;
  availability?: string;
  arrival_time?: string;
  warranty?: string;
}

function verifiedRating(value: unknown): number {
  if (value == null || value === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 5 ? parsed : 0;
}

function verifiedReviewCount(value: unknown): number {
  if (value == null || value === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

function rowToLocationService(row: any): LocationServiceData {
  const isCity = !row.area_slug;
  return {
    id:                    row.id,
    citySlug:              row.city_slug,
    cityName:              row.city_name,
    areaSlug:              row.area_slug ?? null,
    areaName:              row.area_name ?? null,
    isCityLevel:           isCity,
    serviceSlug:           row.service_slug,
    serviceName:           row.service_name,
    serviceCategory:       row.service_category,
    metaTitle:             row.meta_title,
    metaDescription:       row.meta_description,
    metaKeywords:          row.meta_keywords ?? "",
    canonicalUrl:          row.canonical_url,
    heroHeading:           row.hero_heading,
    heroSubheading:        row.hero_subheading,
    heroBadgeText:         row.hero_badge_text ?? "",
    aboutHeading:          row.about_heading,
    aboutPara1:            row.about_para1,
    aboutPara2:            row.about_para2,
    aboutBullets:          row.about_bullets ?? [],
    serviceHighlights:     row.service_highlights ?? [],
    whyChoosePoints:       row.why_choose_points ?? [],
    pricingRows:           row.pricing_rows ?? [],
    pricingDisclaimer:     row.pricing_disclaimer ?? "",
    testimonials:          row.testimonials ?? [],
    faqs:                  (row.faqs ?? []).filter((f: any) => f?.q && f?.a),
    nearbyAreas:           row.nearby_areas ?? [],
    relatedServices:       row.related_services ?? [],
    seoIntroHeading:       row.seo_intro_heading ?? null,
    seoIntroBody:          row.seo_intro_body ?? null,
    seoSections:           row.seo_sections ?? [],
    seoConclusion:         row.seo_conclusion ?? null,
    contentBlocks:         row.content_blocks ?? [],
    heroImageUrl:          row.hero_image_url ?? null,
    heroImageAlt:          row.hero_image_alt ?? null,
    heroImageMeta:         normalizeImageMeta(row.hero_image_meta),
    pageLayout:            row.page_layout ?? [],
    // Never manufacture trust metrics. Missing/unusable values stay at zero;
    // UI/schema callers can then omit rating output until a verified source is wired in.
    schemaAggregateRating: verifiedRating(row.schema_aggregate_rating),
    schemaReviewCount:     verifiedReviewCount(row.schema_review_count),
    displayLocation:       isCity ? row.city_name : `${row.area_name}, ${row.city_name}`,
    locationHeading:       isCity ? row.city_name : (row.area_name ?? row.city_name),
  };
}

export async function getCityLocationService(
  citySlug: string,
  serviceSlug: string
): Promise<LocationServiceData | null> {
  const { data, error } = await supabase
    .from("location_services")
    .select("*")
    .eq("city_slug", citySlug.toLowerCase())
    .eq("service_slug", serviceSlug.toLowerCase())
    .is("area_slug", null)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;
  return rowToLocationService(data);
}

export async function getAreaLocationService(
  citySlug: string,
  areaSlug: string,
  serviceSlug: string
): Promise<LocationServiceData | null> {
  const { data, error } = await supabase
    .from("location_services")
    .select("*")
    .eq("city_slug", citySlug.toLowerCase())
    .eq("area_slug", areaSlug.toLowerCase())
    .eq("service_slug", serviceSlug.toLowerCase())
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;
  return rowToLocationService(data);
}

export async function getAllCityServiceSlugs(citySlug: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("location_services")
    .select("service_slug")
    .eq("city_slug", citySlug.toLowerCase())
    .is("area_slug", null)
    .eq("is_active", true);
  if (error || !data) return [];
  return (data ?? [])
    .map((r) => typeof r.service_slug === "string" ? r.service_slug.trim() : "")
    .filter((slug): slug is string => Boolean(slug));
}

export interface AreaServiceListItem {
  id: number;
  serviceSlug: string;
  serviceName: string;
  serviceCategory: string;
  heroSubheading: string;
  canonicalUrl: string;
}

export async function getAreaServices(
  citySlug: string,
  areaSlug: string
): Promise<AreaServiceListItem[]> {
  const { data, error } = await supabase
    .from("location_services")
    .select("id, service_slug, service_name, service_category, hero_subheading, canonical_url")
    .eq("city_slug", citySlug.toLowerCase())
    .eq("area_slug", areaSlug.toLowerCase())
    .eq("is_active", true)
    .order("service_name");

  if (error) {
    console.error("getAreaServices error:", error.message);
    return [];
  }

  return (data ?? []).flatMap((row) => {
    const serviceSlug = typeof row.service_slug === "string" ? row.service_slug.trim() : "";
    const serviceName = typeof row.service_name === "string" ? row.service_name.trim() : "";
    if (!serviceSlug || !serviceName) return [];

    return [{
      id: row.id,
      serviceSlug,
      serviceName,
      serviceCategory: row.service_category ?? "",
      heroSubheading: row.hero_subheading ?? "",
      canonicalUrl: row.canonical_url ?? `/${citySlug}/${areaSlug}/${serviceSlug}`,
    }];
  });
}

export async function getAllAreaServiceParams(
  citySlug: string
): Promise<{ areaSlug: string; serviceSlug: string }[]> {
  const { data, error } = await supabase
    .from("location_services")
    .select("area_slug, service_slug")
    .eq("city_slug", citySlug.toLowerCase())
    .not("area_slug", "is", null)
    .eq("is_active", true);
  if (error || !data) return [];
  return (data ?? []).flatMap((r) => {
    const areaSlug = typeof r.area_slug === 'string' ? r.area_slug.trim() : '';
    const serviceSlug = typeof r.service_slug === 'string' ? r.service_slug.trim() : '';
    return areaSlug && serviceSlug ? [{ areaSlug, serviceSlug }] : [];
  });
}

export async function getAllLocationServices(): Promise<
  { citySlug: string; areaSlug: string | null; serviceSlug: string; canonicalUrl: string }[]
> {
  const { data, error } = await supabase
    .from("location_services")
    .select("city_slug, area_slug, service_slug, canonical_url")
    .eq("is_active", true);
  if (error || !data) return [];
  return data.map((r) => ({
    citySlug:     r.city_slug,
    areaSlug:     r.area_slug ?? null,
    serviceSlug:  r.service_slug,
    canonicalUrl: r.canonical_url,
  }));
}

export async function getServiceKeywords(): Promise<
  { slug: string; name: string; category: string }[]
> {
  const { data, error } = await supabase
    .from("service_keywords")
    .select("slug, name, category")
    .eq("is_active", true)
    .order("sort_order");
  if (error || !data) return [];
  return data;
}

export interface CityServiceListItem {
  id:              number;
  serviceSlug:     string;
  serviceName:     string;
  serviceCategory: string;
  heroSubheading:  string;
  pricingRows:     { label: string; priceFrom: number; priceTo?: number; highlight?: boolean }[];
  schemaAggregateRating: number;
  schemaReviewCount:     number;
  canonicalUrl:    string;
}

export async function getCityServices(
  citySlug: string
): Promise<CityServiceListItem[]> {
  const { data, error } = await supabase
    .from("location_services")
    .select(
      `id, service_slug, service_name, service_category,
       hero_subheading, pricing_rows,
       schema_aggregate_rating, schema_review_count,
       canonical_url`
    )
    .eq("city_slug", citySlug.toLowerCase())
    .is("area_slug", null)
    .eq("is_active", true)
    .order("service_category")
    .order("service_name");

  if (error) {
    console.error("getCityServices error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id:              row.id,
    serviceSlug:     row.service_slug,
    serviceName:     row.service_name,
    serviceCategory: row.service_category,
    heroSubheading:  row.hero_subheading ?? "",
    pricingRows:     row.pricing_rows ?? [],
    schemaAggregateRating: verifiedRating(row.schema_aggregate_rating),
    schemaReviewCount:     verifiedReviewCount(row.schema_review_count),
    canonicalUrl:    row.canonical_url,
  }));
}

export interface CityServiceCard {
  id:              number;
  serviceSlug:     string;
  serviceName:     string;
  serviceCategory: string;
  heroSubheading:  string;
  pricingRows:     { label: string; priceFrom: number; priceTo?: number; note?: string }[];
  duration:        string | null;
  schemaAggregateRating: number;
  schemaReviewCount:     number;
  canonicalUrl:    string;
}

// A city-category page is indexable when it has active city-level child services OR
// an explicitly approved editorial SEO page. This prevents a zero child-card count
// from accidentally noindexing a useful page that already has search demand.
export async function hasAnyCityServiceInCategory(
  citySlug: string,
  categorySlug: string
): Promise<boolean> {
  const normalizedCity = citySlug.toLowerCase();
  const normalizedCategory = categorySlug.toLowerCase();

  const { count, error } = await supabase
    .from("location_services")
    .select("id", { count: "exact", head: true })
    .eq("city_slug", normalizedCity)
    .eq("service_category", normalizedCategory)
    .is("area_slug", null)
    .eq("is_active", true);

  if (error) {
    console.error("hasAnyCityServiceInCategory child-service error:", error.message);
    // Fail open so a transient DB error cannot accidentally noindex a working page.
    return true;
  }

  if ((count ?? 0) > 0) return true;

  const urlPath = `/${normalizedCity}/services/${normalizedCategory}`;
  const { data: editorialPage, error: editorialError } = await supabase
    .from("seo_pages")
    .select("url_path")
    .eq("url_path", urlPath)
    .eq("page_type", "city_service_category")
    .eq("is_active", true)
    .eq("is_indexed", true)
    .contains("page_data", { editorialIndexable: true })
    .maybeSingle();

  if (editorialError) {
    console.error("hasAnyCityServiceInCategory editorial-page error:", editorialError.message);
    // Again fail open: a temporary lookup error must not inject noindex on an established page.
    return true;
  }

  return Boolean(editorialPage);
}

export async function getCityServicesByCategory(
  citySlug: string,
  categorySlug: string
): Promise<CityServiceCard[]> {
  const { data, error } = await supabase
    .from("location_services")
    .select(
      `id, service_slug, service_name, service_category,
       hero_subheading, pricing_rows,
       schema_aggregate_rating, schema_review_count,
       canonical_url`
    )
    .eq("city_slug",         citySlug.toLowerCase())
    .eq("service_category",  categorySlug.toLowerCase())
    .is("area_slug",         null)
    .eq("is_active",         true)
    .order("service_name");

  if (error) {
    console.error("getCityServicesByCategory error:", error.message);
    return [];
  }

  return (data ?? []).map((row) => ({
    id:              row.id,
    serviceSlug:     row.service_slug,
    serviceName:     row.service_name,
    serviceCategory: row.service_category,
    heroSubheading:  row.hero_subheading ?? "",
    pricingRows:     row.pricing_rows ?? [],
    duration:        null,
    schemaAggregateRating: verifiedRating(row.schema_aggregate_rating),
    schemaReviewCount:     verifiedReviewCount(row.schema_review_count),
    canonicalUrl:    row.canonical_url,
  }));
}
