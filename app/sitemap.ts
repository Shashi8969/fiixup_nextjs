// app/sitemap.ts
// Reads from seo_pages — single query, scales to millions of URLs
// Split into per-type sitemaps to stay under Google's 50k URL limit per file

import type { MetadataRoute } from 'next'
import { getSitemapUrls } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSitemapUrls()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/services`,lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/blog`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/faq`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = pages.map(p => ({
    url:             `${SITE_URL}${p.url_path}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority:        p.page_type === 'area_service' ? 0.8
                   : p.page_type === 'city_service' ? 0.9
                   : 0.7,
  }))

  return [...staticPages, ...dynamicPages]
}
