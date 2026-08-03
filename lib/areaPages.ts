// lib/areaPages.ts
// Data layer for area hub pages (/[citySlug]/[areaSlug]).
//
// ARCHITECTURE (mirrors lib/cityPages.ts):
//   - Reads ONLY from seo_pages (1 query per render, ISR-cached)
//   - seo_pages.page_data is pre-assembled by fn_build_area_seo_page(), rolled up from
//     areas + cities + that area's own location_services/ls_faqs/ls_testimonials rows —
//     NOT a copy of the city-wide template, so it stays area-specific and needs no
//     manual per-area content authorship to scale to new areas/cities.
//   - DB triggers (on areas, location_services, ls_faqs, ls_testimonials, cities) keep
//     the cached row fresh automatically — unlike location_services/city_service_pages,
//     which rely on the admin panel calling fn_build_*_seo_page manually on save.

import { cache } from 'react';
import { supabase } from '@/lib/supabase';
import { normalizeSeoSections } from '@/lib/cms-guards';

export interface AreaHubPageData {
  citySlug: string;
  cityName: string;
  cityState: string | null;
  cityPhone: string;
  cityWhatsapp: string;
  cityEmail: string | null;

  areaSlug: string;
  areaName: string;
  latitude: number | null;
  longitude: number | null;
  vehiclesServiced: number | null;

  heroHeading: string;
  heroSubheading: string;
  aboutHeading: string;
  aboutPara1: string;
  aboutPara2: string;
  localInsight: string | null;

  statsCustomers: string | null;
  statsSatisfaction: string | null;
  statsCoverage: string | null;
  trustPoints: string[];

  testimonials: {
    name: string; rating: number; text: string;
    vehicle: string; area: string; date: string;
  }[];
  faqs: { q: string; a: string }[];
  services: { name: string; slug: string }[];
  relatedPosts: { slug: string; title: string; category: string }[];

  seoIntroHeading: string | null;
  seoIntroBody: string | null;
  seoSections: { heading: string; body: string }[];
  seoConclusion: string | null;
}

export interface AreaHubSeo {
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_image_url: string | null;
  is_active: boolean;
  is_indexed: boolean;
}

export const getAreaHubPage = cache(async (
  citySlug: string,
  areaSlug: string
): Promise<{ seo: AreaHubSeo; data: AreaHubPageData } | null> => {
  const urlPath = `/${citySlug.toLowerCase()}/${areaSlug.toLowerCase()}`;

  const { data, error } = await supabase
    .from('seo_pages')
    .select('meta_title, meta_description, canonical_url, og_image_url, is_active, is_indexed, page_data')
    .eq('url_path', urlPath)
    .eq('page_type', 'area_hub')
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) return null;

  const pd = (data.page_data ?? {}) as Record<string, unknown>;

  return {
    seo: {
      meta_title: data.meta_title,
      meta_description: data.meta_description,
      canonical_url: data.canonical_url,
      og_image_url: data.og_image_url,
      is_active: data.is_active,
      is_indexed: data.is_indexed,
    },
    data: {
      citySlug: String(pd.citySlug ?? citySlug),
      cityName: String(pd.cityName ?? ''),
      cityState: (pd.cityState as string) ?? null,
      cityPhone: String(pd.cityPhone ?? ''),
      cityWhatsapp: String(pd.cityWhatsapp ?? ''),
      cityEmail: (pd.cityEmail as string) ?? null,

      areaSlug: String(pd.areaSlug ?? areaSlug),
      areaName: String(pd.areaName ?? ''),
      latitude: pd.latitude != null ? Number(pd.latitude) : null,
      longitude: pd.longitude != null ? Number(pd.longitude) : null,
      vehiclesServiced: pd.vehiclesServiced != null ? Number(pd.vehiclesServiced) : null,

      heroHeading: String(pd.heroHeading ?? ''),
      heroSubheading: String(pd.heroSubheading ?? ''),
      aboutHeading: String(pd.aboutHeading ?? ''),
      aboutPara1: String(pd.aboutPara1 ?? ''),
      aboutPara2: String(pd.aboutPara2 ?? ''),
      localInsight: (pd.localInsight as string) ?? null,

      statsCustomers: (pd.statsCustomers as string) ?? null,
      statsSatisfaction: (pd.statsSatisfaction as string) ?? null,
      statsCoverage: (pd.statsCoverage as string) ?? null,
      trustPoints: Array.isArray(pd.trustPoints) ? (pd.trustPoints as string[]) : [],

      testimonials: Array.isArray(pd.testimonials) ? (pd.testimonials as AreaHubPageData['testimonials']) : [],
      faqs: Array.isArray(pd.faqs) ? (pd.faqs as AreaHubPageData['faqs']) : [],
      services: Array.isArray(pd.services) ? (pd.services as AreaHubPageData['services']) : [],
      relatedPosts: Array.isArray(pd.relatedPosts) ? (pd.relatedPosts as AreaHubPageData['relatedPosts']) : [],

      seoIntroHeading: (pd.seoIntroHeading as string) ?? null,
      seoIntroBody: (pd.seoIntroBody as string) ?? null,
      seoSections: normalizeSeoSections(pd.seoSections),
      seoConclusion: (pd.seoConclusion as string) ?? null,
    },
  };
});

/**
 * getAllAreaHubUrlPaths — for generateStaticParams on area hub pages
 */
export async function getAllAreaHubUrlPaths(): Promise<{ citySlug: string; areaSlug: string }[]> {
  const { data } = await supabase
    .from('seo_pages')
    .select('url_path')
    .eq('page_type', 'area_hub')
    .eq('is_active', true);

  return (data ?? []).flatMap((r) => {
    const parts = typeof r.url_path === 'string' ? r.url_path.split('/').filter(Boolean) : [];
    if (!parts[0] || !parts[1]) return [];
    return [{ citySlug: parts[0], areaSlug: parts[1] }];
  });
}
