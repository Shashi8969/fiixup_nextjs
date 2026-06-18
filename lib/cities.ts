// lib/cities.ts
// Areas now come from the `areas` table, not cities.areas JSONB.
// CityData shape is unchanged — zero component changes needed.

import { cache } from "react";
import { supabase } from "./supabase";
import type { CityData } from "./models/city.model";

function rowToCity(row: any): CityData {
  return {
    slug:                   row.slug,
    name:                   row.name,
    state:                  row.state,
    phone:                  row.phone,
    whatsapp:               row.whatsapp,
    email:                  row.email,
    areas:                  row.areas ?? [],       // populated below from areas table
    heroTagline:            row.hero_tagline,
    metaTitle:              row.meta_title,
    metaDescription:        row.meta_description,
    metaKeywords:           row.meta_keywords,
    aboutHeading:           row.about_heading,
    aboutPara1:             row.about_para1,
    aboutPara2:             row.about_para2,
    aboutBullets:           row.about_bullets ?? [],
    statsLabel:             row.stats_label,
    servicesSectionHeading: row.services_section_heading,
    servicesSectionSubtext: row.services_section_subtext,
    carServicesHeading:     row.car_services_heading,
    bikeServicesHeading:    row.bike_services_heading,
    cityServiceHighlights:  row.city_service_highlights ?? [],
    testimonialsHeading:    row.testimonials_heading,
    testimonialsSubtext:    row.testimonials_subtext,
    testimonials:           row.testimonials ?? [],
    faqCategories:          row.faq_categories ?? [],
  };
}

// ── Get all cities (with areas from areas table) ──────────────────────────────
export async function getAllCities(): Promise<CityData[]> {
  const [citiesRes, areasRes] = await Promise.all([
    supabase.from("cities").select("*").order("name"),
    supabase.from("areas").select("city_slug, slug, name, highlight").eq("is_active", true).order("sort_order"),
  ]);

  if (citiesRes.error) {
    console.error("getAllCities error:", citiesRes.error.message);
    return [];
  }

  const areasByCitySlug: Record<string, { name: string; slug: string; highlight: string }[]> = {};
  for (const area of areasRes.data ?? []) {
    if (!areasByCitySlug[area.city_slug]) areasByCitySlug[area.city_slug] = [];
    areasByCitySlug[area.city_slug].push({ name: area.name, slug: area.slug, highlight: area.highlight ?? "" });
  }

  return (citiesRes.data ?? []).map((row) => ({
    ...rowToCity(row),
    areas: areasByCitySlug[row.slug] ?? [],
  }));
}

// ── Get one city by slug (with areas from areas table) ────────────────────────
export const getCityBySlug = cache(async (slug: string | undefined): Promise<CityData | undefined> => {
  if (!slug) return undefined;

  const [cityRes, areasRes] = await Promise.all([
    supabase.from("cities").select("*").eq("slug", slug.toLowerCase()).single(),
    supabase.from("areas").select("slug, name, highlight").eq("city_slug", slug.toLowerCase()).eq("is_active", true).order("sort_order"),
  ]);

  if (cityRes.error || !cityRes.data) return undefined;

  return {
    ...rowToCity(cityRes.data),
    areas: (areasRes.data ?? []).map((a) => ({ name: a.name, slug: a.slug, highlight: a.highlight ?? "" })),
  };
});

// ── Get area inside a city ────────────────────────────────────────────────────
export async function getAreaBySlug(citySlug: string, areaSlug: string) {
  const { data, error } = await supabase
    .from("areas")
    .select("slug, name, highlight, city_slug")
    .eq("city_slug", citySlug.toLowerCase())
    .eq("slug", areaSlug.toLowerCase())
    .maybeSingle();

  if (error || !data) return null;
  return data;
}
