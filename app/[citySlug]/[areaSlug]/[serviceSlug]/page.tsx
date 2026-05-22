// app/[citySlug]/[areaSlug]/[serviceSlug]/page.tsx
// Reads from seo_pages — ONE Supabase query per render
// generateMetadata + Page component share the same cached result

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageByPath, getAllActiveUrlPaths } from '@/lib/seo-pages'
import { LocationServicePage } from '@/components/location-service/LocationServicePage'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 3600
export const dynamicParams = true

type Params = Promise<{ citySlug: string; areaSlug: string; serviceSlug: string }>

// ONE query at build time — replaces the old N+1 city loop
export async function generateStaticParams() {
  const paths = await getAllActiveUrlPaths('area_service')
  return paths.map(p => {
    const [, citySlug, areaSlug, serviceSlug] = p.split('/')
    return { citySlug, areaSlug, serviceSlug }
  })
}

// generateMetadata — React.cache means NO extra DB call
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { citySlug, areaSlug, serviceSlug } = await params
  const page = await getPageByPath(`/${citySlug}/${areaSlug}/${serviceSlug}`)
  if (!page) return {}

  return {
    title:       page.meta_title,
    description: page.meta_description,
    keywords:    page.meta_keywords ?? undefined,
    alternates:  { canonical: page.canonical_url },
    openGraph: {
      title:       page.meta_title,
      description: page.meta_description,
      url:         page.canonical_url,
      type:        'website',
      images: page.og_image_url ? [{
        url:    page.og_image_url,
        width:  page.og_image_width  ?? 1200,
        height: page.og_image_height ?? 630,
        alt:    page.meta_title,
      }] : [{ url: `${SITE_URL}/assets/og-image.webp`, width: 1200, height: 630 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       page.meta_title,
      description: page.meta_description,
    },
  }
}

// Page — same cached result, zero extra DB query
export default async function AreaServicePage({ params }: { params: Params }) {
  const { citySlug, areaSlug, serviceSlug } = await params
  const page = await getPageByPath(`/${citySlug}/${areaSlug}/${serviceSlug}`)
  if (!page) return notFound()

  const data = page.page_data

  return (
    <>
      {/* Schema injected server-side — precomputed in PostgreSQL */}
      {page.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_json) }}
        />
      )}
      <LocationServicePage
        data={{
          id:                    0,
          citySlug:              data.citySlug,
          cityName:              data.cityName,
          areaSlug:              data.areaSlug,
          areaName:              data.areaName,
          isCityLevel:           data.isCityLevel,
          serviceSlug:           data.serviceSlug,
          serviceName:           data.serviceName,
          serviceCategory:       data.serviceCategory,
          metaTitle:             page.meta_title,
          metaDescription:       page.meta_description,
          metaKeywords:          page.meta_keywords ?? '',
          canonicalUrl:          page.canonical_url,
          heroHeading:           data.heroHeading,
          heroSubheading:        data.heroSubheading,
          heroBadgeText:         data.heroBadgeText,
          aboutHeading:          data.aboutHeading,
          aboutPara1:            data.aboutPara1,
          aboutPara2:            data.aboutPara2,
          aboutBullets:          data.aboutBullets ?? [],
          serviceHighlights:     data.serviceHighlights ?? [],
          whyChoosePoints:       data.whyChoosePoints ?? [],
          pricingRows:           data.pricingRows ?? [],
          pricingDisclaimer:     data.pricingDisclaimer,
          seoIntroHeading:       data.seoIntroHeading,
          seoIntroBody:          data.seoIntroBody,
          seoSections:           data.seoSections ?? [],
          seoConclusion:         data.seoConclusion,
          testimonials:          data.testimonials ?? [],
          faqs:                  data.faqs ?? [],
          nearbyAreas:           data.nearbyAreas ?? [],
          relatedServices:       data.relatedServices ?? [],
          schemaAggregateRating: data.schemaAggregateRating,
          schemaReviewCount:     data.schemaReviewCount,
          displayLocation:       data.displayLocation,
          locationHeading:       data.locationHeading,
        }}
        city={{
          slug:     data.city.slug,
          name:     data.city.name,
          phone:    data.city.phone,
          whatsapp: data.city.whatsapp,
        } as any}
        breadcrumbs={page.breadcrumbs_json ?? []}
      />
      
    </>
  )
}
