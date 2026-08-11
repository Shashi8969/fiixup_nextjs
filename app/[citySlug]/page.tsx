// app/[citySlug]/page.tsx
// ── UNIFIED SLUG RESOLVER ────────────────────────────────────────────────────
//  Priority:  1. cities table  →  CityPageView (existing)
//             2. global_service_pages table  →  GlobalServicePage
//             3. notFound()

import { notFound }       from 'next/navigation';
import type { Metadata }  from 'next';
import { SITE_URL }       from '@/lib/constants';

// ── City hub imports (unchanged) ─────────────────────────────────────────────
import { getCityHubPage, getAllCityHubParams } from '@/lib/cityPages';
import { cityHubSchema }                       from '@/lib/schema';
import { CityHeroDynamic }        from '@/components/city/CityHeroDynamic';
import { CityServicesDynamic }    from '@/components/city/CityServicesDynamic';
import { CityAreasDynamic }       from '@/components/city/CityAreasDynamic';
import { CityAboutDynamic }       from '@/components/city/CityAboutDynamic';
import { CityTestimonialsDynamic} from '@/components/city/CityTestimonialsDynamic';
import { CityFAQDynamic }         from '@/components/city/CityFAQDynamic';
import { CityContactDynamic }     from '@/components/city/CityContactDynamic';
import { CityBlogPosts }          from '@/components/city/CityBlogPosts';

// ── Global service page imports ───────────────────────────────────────────────
import { getGlobalServicePage, getAllGlobalServiceSlugs } from '@/lib/global-service';
import { GlobalServicePage } from '@/components/global-service/GlobalServicePage';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 3600;
export const dynamicParams = true;

// ── Known city slugs — O(1) check, avoids a DB round-trip for 99% of traffic ─
const CITY_SLUGS = new Set(['bangalore', 'chennai', 'hyderabad', 'mumbai']);

// ── Static params — city slugs UNION global service slugs ────────────────────
export async function generateStaticParams() {
  const cityParams    = await getAllCityHubParams();             // [{ citySlug: 'bangalore' }, …]
  const globalServiceSlugs = await getAllGlobalServiceSlugs();
  const globalServiceParams = globalServiceSlugs.map((s) => ({ citySlug: s }));
  return [...cityParams, ...globalServiceParams];
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;

  // ── Path A: city hub ──
  if (CITY_SLUGS.has(citySlug)) {
    const page = await getCityHubPage(citySlug);
    if (!page) return {};
    const { seo, data } = page;
    const ogImage = seo.og_image_url ?? `${SITE_URL}/assets/og-image.webp`;
    return {
      title:       seo.meta_title,
      description: seo.meta_description,
      keywords:    seo.meta_keywords ?? undefined,
      alternates:  { canonical: seo.canonical_url },
      openGraph: {
        title:       seo.meta_title,
        description: seo.meta_description,
        url:         seo.canonical_url,
        type:        'website',
        locale:      'en_IN',
        siteName:    'Fiixup',
        images: [{ url: ogImage, width: 1200, height: 630,
          alt: `Doorstep car and bike repair in ${data.cityName} — Fiixup` }],
      },
      twitter: {
        card:        'summary_large_image',
        title:       seo.meta_title,
        description: seo.meta_description,
        images:      [ogImage],
      },
      robots: {
        index: true, follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      },
    };
  }

  // ── Path B: global service page ──
  const servicePage = await getGlobalServicePage(citySlug);
  if (!servicePage) return {};

  const ogImage = servicePage.og_image_url || `${SITE_URL}/assets/og-image.webp`;
  const canonical = servicePage.canonical_url || `${SITE_URL}/${servicePage.service_slug}`;

  return {
    title:       servicePage.meta_title,
    description: servicePage.meta_description,
    keywords:    servicePage.meta_keywords || undefined,
    alternates:  { canonical },
    openGraph: {
      title:       servicePage.meta_title,
      description: servicePage.meta_description,
      url:         canonical,
      type:        'website',
      locale:      'en_IN',
      siteName:    'Fiixup',
      images: [{ url: ogImage, width: 1200, height: 630, alt: servicePage.meta_title }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       servicePage.meta_title,
      description: servicePage.meta_description,
      images:      [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PATH A — City hub page
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (CITY_SLUGS.has(citySlug)) {
    const page = await getCityHubPage(citySlug);
    if (!page) return notFound();

    const { seo, data } = page;

    const schema = cityHubSchema({
      name:        data.cityName,
      slug:        data.citySlug,
      state:       data.cityState   ?? 'India',
      postalCode:  data.postalCode  ?? undefined,
      lat:         data.latitude    ?? undefined,
      lng:         data.longitude   ?? undefined,
      phone:       data.cityPhone,
      email:       data.cityEmail,
      reviewCount: data.schemaReviewCount     ?? 500,
      rating:      data.schemaAggregateRating ?? 4.9,
      areas:       data.areas       ?? [],
      faqs:        data.faqs        ?? [],
      heroHeading: data.heroHeading,
      metaTitle:   seo.meta_title,
      metaDesc:    seo.meta_description,
      ogImageUrl:  seo.og_image_url,
    });

    return (
      <>
        {/* Breadcrumb JSON-LD already lives inside this @graph (BreadcrumbList
            node, referenced by WebPage.breadcrumb) — a second standalone
            script from seo.breadcrumbs_json used to duplicate it verbatim. */}
        <JsonLd data={seo.schema_json ?? schema} />

        <CityHeroDynamic        data={data} />
        <CityServicesDynamic    data={data} />
        <CityAreasDynamic       data={data} />
        <CityAboutDynamic       data={data} />
        <CityTestimonialsDynamic data={data} />
        {data.relatedPostSlugs?.length > 0 && (
          <CityBlogPosts slugs={data.relatedPostSlugs} cityName={data.cityName} />
        )}
        <CityFAQDynamic    data={data} />
        <CityContactDynamic data={data} />
      </>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PATH B — Global service page
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const servicePage = await getGlobalServicePage(citySlug);
  if (!servicePage) return notFound();

  return (
    <>
      <JsonLd data={servicePage.schema_json} />
      <GlobalServicePage data={servicePage} />
    </>
  );
}
