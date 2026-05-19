// lib/seo-pages.ts
// Single source for all page data — reads from seo_pages table
// React.cache deduplicates calls within the same request
// so generateMetadata + Page component share ONE Supabase call

import { cache } from 'react'
import { supabase } from '@/lib/supabase'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SeoPage {
  url_path:              string
  page_type:             string
  meta_title:            string
  meta_description:      string
  meta_keywords:         string | null
  canonical_url:         string
  og_image_url:          string | null
  og_image_width:        number | null
  og_image_height:       number | null
  schema_json:           object | null
  page_data:             PageData
  breadcrumbs_json:      Breadcrumb[]
  nearby_areas_json:     { name: string; slug: string }[] | null
  related_services_json: { name: string; slug: string; category: string }[] | null
  is_active:             boolean
  is_indexed:            boolean
  updated_at:            string
}

export interface PageData {
  city: {
    slug:     string
    name:     string
    phone:    string
    whatsapp: string
  }
  serviceCategory:       string
  serviceSlug:           string
  serviceName:           string
  citySlug:              string
  cityName:              string
  areaSlug:              string | null
  areaName:              string | null
  isCityLevel:           boolean
  locationHeading:       string
  displayLocation:       string
  heroHeading:           string
  heroSubheading:        string
  heroBadgeText:         string
  aboutHeading:          string
  aboutPara1:            string
  aboutPara2:            string
  aboutBullets:          { heading: string; text: string }[]
  serviceHighlights:     { title: string; description: string }[]
  whyChoosePoints:       { icon: string; title: string; desc: string }[]
  pricingDisclaimer:     string
  schemaAggregateRating: number
  schemaReviewCount:     number
  pricingRows:           { label: string; priceFrom: number; priceTo?: number; note?: string; highlight?: boolean }[]
  testimonials:          { name: string; rating: number; text: string; vehicle: string; area: string; date: string }[]
  faqs:                  { q: string; a: string }[]
  nearbyAreas:           { name: string; slug: string }[]
  relatedServices:       { name: string; slug: string; category: string }[]
}

export interface Breadcrumb {
  name: string
  url:  string
}

// ─── Primary fetch — cached per request ──────────────────────────────────────

/**
 * getPageByPath — the ONLY query most pages need.
 * React.cache deduplicates: generateMetadata() and the Page component
 * both call this with the same path → Supabase queried ONCE per request.
 */
export const getPageByPath = cache(async (urlPath: string): Promise<SeoPage | null> => {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('url_path', urlPath)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  return data as SeoPage
})

// ─── Sitemap — lightweight, no page_data needed ───────────────────────────────

export async function getSitemapUrls(pageType?: string) {
  const q = supabase
    .from('seo_pages')
    .select('url_path, updated_at, page_type')
    .eq('is_active', true)
    .eq('is_indexed', true)
    .order('updated_at', { ascending: false })

  if (pageType) q.eq('page_type', pageType)

  const { data } = await q
  return data ?? []
}

// ─── generateStaticParams — all active URL paths by type ─────────────────────

export async function getAllActiveUrlPaths(pageType: string): Promise<string[]> {
  const { data } = await supabase
    .from('seo_pages')
    .select('url_path')
    .eq('page_type', pageType)
    .eq('is_active', true)

  return data?.map(r => r.url_path) ?? []
}
