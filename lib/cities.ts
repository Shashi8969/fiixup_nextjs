// lib/cities.ts
// ─────────────────────────────────────────────────────────────────────────────
// All city data now comes from Supabase.
// Return shape is IDENTICAL to the old static TS array — zero component changes.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from "./supabase";
import type { CityData } from "./models/city.model";

// ── Raw Supabase row → CityData shape ────────────────────────────────────────
function rowToCity(row: any): CityData {
  return {
    slug:                     row.slug,
    name:                     row.name,
    state:                    row.state,
    phone:                    row.phone,
    whatsapp:                 row.whatsapp,
    email:                    row.email,
    areas:                    row.areas ?? [],
    heroTagline:              row.hero_tagline,
    metaTitle:                row.meta_title,
    metaDescription:          row.meta_description,
    metaKeywords:             row.meta_keywords,
    aboutHeading:             row.about_heading,
    aboutPara1:               row.about_para1,
    aboutPara2:               row.about_para2,
    aboutBullets:             row.about_bullets ?? [],
    statsLabel:               row.stats_label,
    servicesSectionHeading:   row.services_section_heading,
    servicesSectionSubtext:   row.services_section_subtext,
    carServicesHeading:       row.car_services_heading,
    bikeServicesHeading:      row.bike_services_heading,
    cityServiceHighlights:    row.city_service_highlights ?? [],
    testimonialsHeading:      row.testimonials_heading,
    testimonialsSubtext:      row.testimonials_subtext,
    testimonials:             row.testimonials ?? [],
    faqCategories:            row.faq_categories ?? [],
  };
}

// ── Get all cities ────────────────────────────────────────────────────────────
export async function getAllCities(): Promise<CityData[]> {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("name");

  if (error) {
    console.error("getAllCities error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToCity);
}

// ── Get one city by slug ──────────────────────────────────────────────────────
export async function getCityBySlug(slug: string | undefined): Promise<CityData | undefined> {
  // Guard — if slug is undefined or empty, return immediately
  if (!slug) return undefined;

  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug.toLowerCase())
    .single();

  if (error || !data) return undefined;
  return rowToCity(data);
}

// ── Get area inside a city ────────────────────────────────────────────────────
export async function getAreaBySlug(citySlug: string, areaSlug: string) {
  const city = await getCityBySlug(citySlug);
  if (!city) return null;

  const area = city.areas.find((a: any) =>
    typeof a === "string"
      ? a.toLowerCase().replace(/ /g, "-") === areaSlug
      : a.slug === areaSlug
  );

  return area ? { city, area } : null;
}
