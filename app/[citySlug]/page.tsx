// app/[citySlug]/page.tsx

import { notFound }          from 'next/navigation';
import type { Metadata }     from 'next';
import { SITE_URL }          from '@/lib/constants';
import { getCityHubPage, getAllCityHubParams } from '@/lib/cityPages';
import { cityHubSchema }     from '@/lib/schema';

// City sections — all Server Components
import { CityHeroDynamic }        from '@/components/city/CityHeroDynamic 3';
import { CityServicesDynamic }    from '@/components/city/CityServicesDynamic';
import { CityAreasDynamic }       from '@/components/city/CityAreasDynamic';
import { CityAboutDynamic }       from '@/components/city/CityAboutDynamic';
import { CityTestimonialsDynamic} from '@/components/city/CityTestimonialsDynamic';
import { CityFAQDynamic }         from '@/components/city/CityFAQDynamic';
import { CityContactDynamic }     from '@/components/city/CityContactDynamic';
import { CityBlogPosts }          from '@/components/city/CityBlogPosts';

export const revalidate = 3600;

// ── Static params — from seo_pages (no extra DB query at runtime) ─────────────
export async function generateStaticParams() {
  return getAllCityHubParams();
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
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
      images: [{
        url:    ogImage,
        width:  1200,
        height: 630,
        alt:    `Doorstep car and bike repair in ${data.cityName} — Fiixup`,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       seo.meta_title,
      description: seo.meta_description,
      images:      [ogImage],
    },
    robots: {
      index:  true,
      follow: true,
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

  // Single Supabase query — React.cache deduplicates with generateMetadata
  const page = await getCityHubPage(citySlug);
  if (!page) return notFound();

  const { seo, data } = page;

  // Build JSON-LD schema from page_data (no additional DB queries)
  const schema = cityHubSchema({
    name:        data.cityName,
    slug:        data.citySlug,
    state:       data.cityState   ?? 'India',
    postalCode:  data.postalCode  ?? '000000',
    lat:         data.latitude    ?? 0,
    lng:         data.longitude   ?? 0,
    phone:       data.cityPhone   ?? '',
    email:       data.cityEmail   ?? '',
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
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb JSON-LD (pre-built by PostgreSQL trigger) */}
      {seo.breadcrumbs_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context':      'https://schema.org',
              '@type':         'BreadcrumbList',
              itemListElement: (seo.breadcrumbs_json as { name: string; url: string }[]).map((b, i) => ({
                '@type':  'ListItem',
                position: i + 1,
                name:     b.name,
                item:     b.url,
              })),
            }),
          }}
        />
      )}

      {/* ── 1. HERO — unique H1, city-specific tagline, inline callback form ── */}
      <CityHeroDynamic data={data} />

      {/* ── 2. SERVICES GRID — service categories linking to /{city}/services/{cat} ── */}
      <CityServicesDynamic data={data} />

      {/* ── 3. AREAS — neighbourhood grid with internal links ── */}
      <CityAreasDynamic data={data} />

      {/* ── 4. ABOUT — city-specific copy, stats, service highlights ── */}
      <CityAboutDynamic data={data} />

      {/* ── 5. TESTIMONIALS — city-specific reviews ── */}
      <CityTestimonialsDynamic data={data} />

      {/* ── 6. RELATED BLOG POSTS — matched to city ── */}
      {data.relatedPostSlugs?.length > 0 && (
        <CityBlogPosts slugs={data.relatedPostSlugs} cityName={data.cityName} />
      )}

      {/* ── 7. FAQ — city-specific questions, FAQPage schema injected above ── */}
      <CityFAQDynamic data={data} />

      {/* ── 8. CONTACT — city phone, whatsapp, address ── */}
      <CityContactDynamic data={data} />
    </>
  );
}
