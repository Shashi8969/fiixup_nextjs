// lib/seo-pages.ts
// DB-first SEO page access with safe CMS normalization.

import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { asArray, asBoolean, asNumber, asObject, asString, cleanPath, normalizeJsonLd, normalizeSeoSections } from '@/lib/cms-guards'

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
  schema_json:           unknown[] | null
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
    slug: string; name: string; phone: string; whatsapp: string
    email?: string; state?: string; postalCode?: string
    latitude?: number; longitude?: number
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
  seoIntroHeading:       string | null
  seoIntroBody:          string | null
  seoSections:           { heading: string; body: string }[]
  seoConclusion:         string | null
  contentBlocks:         unknown[]
  heroImageUrl:          string | null
  heroImageAlt:          string | null
  pageLayout:            { id: string; visible: boolean; heading: string | null }[]
  [key: string]: unknown
}

export interface Breadcrumb { name: string; url: string }

type SeoPageRow = Record<string, unknown>

function normalizeArrayObject<T extends Record<string, unknown>>(
  value: unknown,
  map: (item: Record<string, unknown>) => T
): T[] {
  return asArray<unknown>(value).flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return []
    }

    const mapped = map(item as Record<string, unknown>)
    return mapped ? [mapped] : []
  })
}

function normalizePageData(value: unknown): PageData {
  const pd = asObject(value)
  const city = asObject(pd.city)

  return {
    ...pd,
    city: {
      slug: asString(city.slug ?? pd.citySlug),
      name: asString(city.name ?? pd.cityName),
      phone: asString(city.phone),
      whatsapp: asString(city.whatsapp),
      email: city.email != null ? asString(city.email) : undefined,
      state: city.state != null ? asString(city.state) : undefined,
      postalCode: city.postalCode != null ? asString(city.postalCode) : undefined,
      latitude: city.latitude != null ? asNumber(city.latitude) : undefined,
      longitude: city.longitude != null ? asNumber(city.longitude) : undefined,
    },
    serviceCategory: asString(pd.serviceCategory),
    serviceSlug: asString(pd.serviceSlug),
    serviceName: asString(pd.serviceName),
    citySlug: asString(pd.citySlug ?? city.slug),
    cityName: asString(pd.cityName ?? city.name),
    areaSlug: asString(pd.areaSlug) || null,
    areaName: asString(pd.areaName) || null,
    isCityLevel: asBoolean(pd.isCityLevel, !asString(pd.areaSlug)),
    locationHeading: asString(pd.locationHeading ?? pd.displayLocation),
    displayLocation: asString(pd.displayLocation ?? pd.locationHeading),
    heroHeading: asString(pd.heroHeading),
    heroSubheading: asString(pd.heroSubheading),
    heroBadgeText: asString(pd.heroBadgeText),
    aboutHeading: asString(pd.aboutHeading),
    aboutPara1: asString(pd.aboutPara1),
    aboutPara2: asString(pd.aboutPara2),
    aboutBullets: normalizeArrayObject(pd.aboutBullets, (item) => ({ heading: asString(item.heading), text: asString(item.text ?? item.desc) })),
    serviceHighlights: normalizeArrayObject(pd.serviceHighlights, (item) => ({ title: asString(item.title), description: asString(item.description ?? item.text) })),
    whyChoosePoints: normalizeArrayObject(pd.whyChoosePoints, (item) => ({ icon: asString(item.icon), title: asString(item.title), desc: asString(item.desc ?? item.text ?? item.description) })),
    pricingDisclaimer: asString(pd.pricingDisclaimer),
    schemaAggregateRating: asNumber(pd.schemaAggregateRating, 4.9),
    schemaReviewCount: asNumber(pd.schemaReviewCount, 150),
    pricingRows: normalizeArrayObject(pd.pricingRows, (item) => ({
      label: asString(item.label),
      priceFrom: asNumber(item.priceFrom ?? item.price_from, 0),
      priceTo: item.priceTo ?? item.price_to ? asNumber(item.priceTo ?? item.price_to) : undefined,
      note: asString(item.note),
      highlight: asBoolean(item.highlight, false),
    })),
    testimonials: normalizeArrayObject(pd.testimonials, (item) => ({
      name: asString(item.name),
      rating: asNumber(item.rating, 5),
      text: asString(item.text ?? item.body),
      vehicle: asString(item.vehicle),
      area: asString(item.area),
      date: asString(item.date ?? item.date_label),
    })),
    faqs: normalizeArrayObject(pd.faqs, (item) => ({ q: asString(item.q ?? item.question), a: asString(item.a ?? item.answer) }))
      .filter((faq) => faq.q && faq.a),
    nearbyAreas: normalizeArrayObject(pd.nearbyAreas, (item) => ({ name: asString(item.name), slug: asString(item.slug) })),
    relatedServices: normalizeArrayObject(pd.relatedServices, (item) => ({ name: asString(item.name), slug: asString(item.slug), category: asString(item.category) })),
    seoIntroHeading: asString(pd.seoIntroHeading) || null,
    seoIntroBody: asString(pd.seoIntroBody) || null,
    seoSections: normalizeSeoSections(pd.seoSections),
    seoConclusion: asString(pd.seoConclusion) || null,
    contentBlocks: asArray(pd.contentBlocks),
    heroImageUrl: asString(pd.heroImageUrl) || null,
    heroImageAlt: asString(pd.heroImageAlt) || null,
    pageLayout: normalizeArrayObject(pd.pageLayout, (item) => ({
      id: asString(item.id),
      visible: asBoolean(item.visible, true),
      heading: asString(item.heading) || null,
    })).filter((row) => row.id),
  }
}

export function normalizeSeoPage(row: SeoPageRow): SeoPage | null {
  const urlPath = cleanPath(row.url_path)
  if (!urlPath) return null

  const schemas = normalizeJsonLd(row.schema_json)

  return {
    url_path: urlPath,
    page_type: asString(row.page_type),
    meta_title: asString(row.meta_title),
    meta_description: asString(row.meta_description),
    meta_keywords: asString(row.meta_keywords) || null,
    canonical_url: asString(row.canonical_url),
    og_image_url: asString(row.og_image_url) || null,
    og_image_width: row.og_image_width == null ? null : asNumber(row.og_image_width, 1200),
    og_image_height: row.og_image_height == null ? null : asNumber(row.og_image_height, 630),
    schema_json: schemas.length ? schemas : null,
    page_data: normalizePageData(row.page_data),
    breadcrumbs_json: normalizeArrayObject(row.breadcrumbs_json, (item) => ({ name: asString(item.name), url: asString(item.url ?? item.item) })),
    nearby_areas_json: normalizeArrayObject(row.nearby_areas_json, (item) => ({ name: asString(item.name), slug: asString(item.slug) })),
    related_services_json: normalizeArrayObject(row.related_services_json, (item) => ({ name: asString(item.name), slug: asString(item.slug), category: asString(item.category) })),
    is_active: asBoolean(row.is_active, true),
    is_indexed: asBoolean(row.is_indexed, true),
    updated_at: asString(row.updated_at),
  }
}

export const getPageByPath = unstable_cache(
  async (urlPath: string): Promise<SeoPage | null> => {
  const safePath = cleanPath(urlPath)
  if (!safePath) return null

  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('url_path', safePath)
    .eq('is_active', true)
    .maybeSingle()

    if (error || !data) return null
    return normalizeSeoPage(data as SeoPageRow)
  },
  ['seo-page-by-path'],
  { revalidate: 3600, tags: ['seo-pages'] }
)

export const getSitemapUrls = unstable_cache(
  async (pageType?: string) => {
  const q = supabase
    .from('seo_pages')
    .select('url_path, canonical_url, updated_at, page_type')
    .eq('is_active', true)
    .eq('is_indexed', true)
    .order('updated_at', { ascending: false })

  if (pageType) q.eq('page_type', pageType)

    const { data } = await q
    return (data ?? [])
      .map((row) => ({ ...row, url_path: cleanPath(row.url_path) }))
      .filter((row): row is { url_path: string; canonical_url: string | null; updated_at: string | null; page_type: string | null } => Boolean(row.url_path))
  },
  ['seo-pages-sitemap-urls'],
  { revalidate: 3600, tags: ['seo-pages'] }
)

export const getAllActiveUrlPaths = unstable_cache(
  async (pageType: string): Promise<string[]> => {
  const { data } = await supabase
    .from('seo_pages')
    .select('url_path')
    .eq('page_type', pageType)
    .eq('is_active', true)

    return (data ?? [])
      .map((row) => cleanPath(row.url_path))
      .filter((urlPath): urlPath is string => Boolean(urlPath))
  },
  ['seo-pages-active-url-paths'],
  { revalidate: 3600, tags: ['seo-pages'] }
)
