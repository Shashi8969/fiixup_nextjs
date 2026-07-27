// lib/cityPages.ts
// Data layer for city hub (/[citySlug]) and city-service-category pages
// (/[citySlug]/services/[categorySlug]).
//
// ARCHITECTURE:
//   - Both page types read ONLY from seo_pages (1 query per render, ISR-cached)
//   - seo_pages.page_data contains ALL content pre-assembled by PostgreSQL triggers
//   - React.cache deduplicates within a single Next.js request
//   - generateMetadata() + Page component share the SAME Supabase call (0 extra queries)
//
// DATA FLOW:
//   Editor edits cities / city_service_pages / child tables
//   → PostgreSQL trigger calls fn_build_city_seo_page() / fn_build_csp_seo_page()
//   → seo_pages row updated automatically
//   → ISR cache invalidated (revalidateTag)
//   → Next.js re-renders page within 1 ISR window (3600s)

import { cache } from 'react';
import { supabase } from '@/lib/supabase';
import { cleanPath, splitPath } from '@/lib/cms-guards';
import type { SeoPage } from '@/lib/seo-pages';

// ─── City Hub Page Data ──────────────────────────────────────────────────────

export interface CityHubPageData {
  // Identity
  cityId:        string;
  citySlug:      string;
  cityName:      string;
  cityState:     string;
  cityPhone:     string;
  cityWhatsapp:  string;
  cityEmail:     string;

  // Hero
  heroTagline:    string;
  heroHeading:    string;
  heroSubheading: string | null;
  heroBullets:   string[];
  heroStats:     { value: string; label: string }[];
  heroImageUrl:  string | null;
  heroImageAlt:  string | null;
  ogImageUrl:    string | null;

  // About
  aboutHeading:  string;
  aboutPara1:    string;
  aboutPara2:    string;
  aboutBullets:  { heading: string; text: string }[];
  aboutImageUrl: string | null;
  aboutImageAlt: string | null;

  // Stats bar
  statsLabel:        string;
  statsCustomers:    string;
  statsSatisfaction: string;
  statsCoverage:     string | null;

  // Services section headings
  servicesSectionHeading: string;
  servicesSectionSubtext: string;
  carServicesHeading:     string;
  bikeServicesHeading:    string;

  // Trust
  trustPoints: string[];

  // Content collections
  areas:             { name: string; slug: string; highlight: string }[];
  serviceHighlights: { title: string; description: string }[];
  testimonials:      {
    name: string; area: string; vehicle: string;
    rating: number; body: string; date_label: string;
  }[];
  faqs:              { q: string; a: string }[];

  // Related blog
  relatedPostSlugs:  string[];

  // Contact
  testimonialsHeading: string;
  testimonialsSubtext: string;
  mapEmbedUrl:         string | null;
  addressLine1:        string | null;
  addressLine2:        string | null;

  // Schema
  schemaAggregateRating: number;
  schemaReviewCount:     number;
  latitude:              number | null;
  longitude:             number | null;
  postalCode:            string | null;
}

// ─── City-Service Category Page Data ────────────────────────────────────────

export interface CityServiceCategoryPageData {
  // Identity
  citySlug:     string;
  cityName:     string;
  cityState:    string;
  cityPhone:    string;
  cityWhatsapp: string;
  categorySlug:        string;
  categoryTitle:       string;
  categoryDescription: string;
  categoryColor:       string;
  categoryIcon:        string;

  // Hero
  heroHeading:     string;
  heroSubheading:  string;
  heroBadgeText:   string | null;
  ogImageUrl:      string | null;

  // About section
  aboutHeading:   string;
  aboutPara1:     string;
  aboutPara2:     string;
  aboutBullets:   { heading: string; text: string }[];

  // Highlights + why choose
  serviceHighlights: { title: string; description: string }[];
  whyChoosePoints:   { icon: string; title: string; desc: string }[];

  // Pricing
  pricingIntro:      string | null;
  pricingDisclaimer: string | null;
  pricingRows:       {
    label: string; priceFrom: number; priceTo?: number;
    note?: string; highlight?: boolean;
  }[];

  // Process
  processSteps: { step: number; title: string; desc: string }[] | null;

  // SEO long-form
  seoIntroHeading: string | null;
  seoIntroBody:    string | null;
  seoSections:     { heading: string; body: string }[] | null;
  seoConclusion:   string | null;

  // Schema
  schemaAggregateRating: number;
  schemaReviewCount:     number;

  // Collections
  services: {
    slug: string; title: string; short_title: string; tagline: string;
    price: string; price_from_int: number | null; icon: string;
    category: string; duration: string;
  }[];
  testimonials: {
    name: string; area: string | null; vehicle: string | null;
    rating: number; body: string; date_label: string | null;
  }[];
  faqs:           { q: string; a: string }[];
  relatedServices:{ slug: string; name: string; category: string | null }[];
  areas:          { name: string; slug: string }[];
}

// ─── Fetch helpers (React.cache) ─────────────────────────────────────────────

/**
 * getCityHubPage — single seo_pages query for /{citySlug}
 * React.cache deduplicates: generateMetadata() + Page component = 1 Supabase call.
 */
export const getCityHubPage = cache(async (citySlug: string): Promise<{
  seo: Pick<SeoPage, 'meta_title'|'meta_description'|'meta_keywords'|'canonical_url'|'og_image_url'|'schema_json'|'breadcrumbs_json'|'is_active'>;
  data: CityHubPageData;
} | null> => {
  const urlPath = `/${citySlug.toLowerCase()}`;

  const { data, error } = await supabase
    .from('seo_pages')
    .select('meta_title, meta_description, meta_keywords, canonical_url, og_image_url, schema_json, breadcrumbs_json, is_active, page_data')
    .eq('url_path', urlPath)
    .eq('page_type', 'city_hub')
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  const pd = data.page_data as Record<string, unknown>;

  return {
    seo: {
      meta_title:       data.meta_title,
      meta_description: data.meta_description,
      meta_keywords:    data.meta_keywords,
      canonical_url:    data.canonical_url,
      og_image_url:     data.og_image_url,
      schema_json:      data.schema_json,
      breadcrumbs_json: data.breadcrumbs_json,
      is_active:        data.is_active,
    },
    data: pd as unknown as CityHubPageData,
  };
});

/**
 * getCityServiceCategoryPage — single seo_pages query for /{citySlug}/services/{categorySlug}
 */
export const getCityServiceCategoryPage = cache(async (
  citySlug: string,
  categorySlug: string
): Promise<{
  seo: Pick<SeoPage, 'meta_title'|'meta_description'|'meta_keywords'|'canonical_url'|'og_image_url'|'schema_json'|'breadcrumbs_json'|'is_active'>;
  data: CityServiceCategoryPageData;
} | null> => {
  const urlPath = `/${citySlug.toLowerCase()}/services/${categorySlug.toLowerCase()}`;

  const { data, error } = await supabase
    .from('seo_pages')
    .select('meta_title, meta_description, meta_keywords, canonical_url, og_image_url, schema_json, breadcrumbs_json, is_active, page_data')
    .eq('url_path', urlPath)
    .eq('page_type', 'city_service_category')
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  const pd = data.page_data as Record<string, unknown>;

  return {
    seo: {
      meta_title:       data.meta_title,
      meta_description: data.meta_description,
      meta_keywords:    data.meta_keywords,
      canonical_url:    data.canonical_url,
      og_image_url:     data.og_image_url,
      schema_json:      data.schema_json,
      breadcrumbs_json: data.breadcrumbs_json,
      is_active:        data.is_active,
    },
    data: pd as unknown as CityServiceCategoryPageData,
  };
});

/**
 * getAllCityHubParams — for generateStaticParams on city hub
 */
export async function getAllCityHubParams(): Promise<{ citySlug: string }[]> {
  const { data } = await supabase
    .from('seo_pages')
    .select('url_path')
    .eq('page_type', 'city_hub')
    .eq('is_active', true);

  return (data ?? [])
    .map((r) => cleanPath(r.url_path))
    .filter((urlPath): urlPath is string => Boolean(urlPath))
    .map((urlPath) => ({ citySlug: urlPath.replace('/', '') }));
}

/**
 * getAllCityServiceCategoryParams — for generateStaticParams on city-service-category pages
 */
export async function getAllCityServiceCategoryParams(): Promise<{
  citySlug: string;
  serviceSlug: string;
}[]> {
  const { data } = await supabase
    .from('seo_pages')
    .select('url_path')
    .eq('page_type', 'city_service_category')
    .eq('is_active', true);

  return (data ?? []).flatMap((r) => {
    // url_path = /bangalore/services/battery
    const parts = typeof r.url_path === 'string'
      ? r.url_path.split('/').filter(Boolean)
      : []

    if (!parts[0] || !parts[2]) return []

    return [{ citySlug: parts[0], serviceSlug: parts[2] }]
  });
}
