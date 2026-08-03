import { supabase } from "./supabase";

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
  schemaAggregateRating: number;
  schemaReviewCount: number;
  displayLocation: string;
  locationHeading: string;
   // Stats Fields
  availability?: string;
  arrival_time?: string;
  warranty?: string;
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
    schemaAggregateRating: parseFloat(row.schema_aggregate_rating) || 4.9,
    schemaReviewCount:     row.schema_review_count ?? 150,
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
    const areaSlug = typeof r.area_slug === 'string' ? r.area_slug.trim() : ''
    const serviceSlug = typeof r.service_slug === 'string' ? r.service_slug.trim() : ''
    return areaSlug && serviceSlug ? [{ areaSlug, serviceSlug }] : []
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
  heroSubheading:  string;   // used as the card tagline
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
    schemaAggregateRating: parseFloat(row.schema_aggregate_rating) || 4.9,
    schemaReviewCount:     row.schema_review_count ?? 150,
    canonicalUrl:    row.canonical_url,
  }));
}
 
export interface CityServiceCard {
  id:              number;
  serviceSlug:     string;
  serviceName:     string;
  serviceCategory: string;
  heroSubheading:  string;   // tagline shown on card
  pricingRows:     { label: string; priceFrom: number; priceTo?: number; note?: string }[];
  duration:        string | null;
  schemaAggregateRating: number;
  schemaReviewCount:     number;
  canonicalUrl:    string;
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
    .eq("service_category",  categorySlug.toLowerCase())   // matches the category_slug column
    .is("area_slug",         null)                         // city-level only
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
    pricingRows:     row.pricing_rows    ?? [],
    duration:        null,   // location_services has no duration column — shown as "20 min"
    schemaAggregateRating: parseFloat(row.schema_aggregate_rating) || 4.9,
    schemaReviewCount:     row.schema_review_count ?? 150,
    canonicalUrl:    row.canonical_url,
  }));
}
