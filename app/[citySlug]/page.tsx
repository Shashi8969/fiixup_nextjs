//app\[citySlug]\page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import cities, { getCityBySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/constants";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CityHero } from "@/components/city/CityHero";
import { CityServices } from "@/components/city/CityServices";
import { CityAbout } from "@/components/city/CityAbout";
import { CityTestimonials } from "@/components/city/CityTestimonials";
import { CityContact } from "@/components/city/CityContact";
import { CityFAQ } from "@/components/city/CityFAQ";
import { CityAreas } from "@/components/city/CityAreas";

// Pre-render all city pages at build time (SSG)
export function generateStaticParams() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

// Unique metadata per city — injected server-side
export async function generateMetadata(
  { params }: { params: { citySlug: string } }
): Promise<Metadata> {
  const {citySlug} = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: city.metaKeywords,
    alternates: { canonical: `${SITE_URL}/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `${SITE_URL}/${city.slug}`,
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ citySlug: string }> }) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const allFaqs = city.faqCategories.flatMap((cat) => cat.faqs);

  const schemas = [
    localBusinessSchema({ cityName: city.name, phone: city.phone, slug: city.slug, areas: city.areas.map((a) => typeof a === "string" ? a : a.name) }),
    breadcrumbSchema([{ name: "Home", url: "/" }, { name: `Fiixup ${city.name}`, url: `/${city.slug}` }]),
    faqSchema(allFaqs),
  ];

  return (
    <>
      {/* Server-side JSON-LD — Googlebot sees this instantly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CityHero city={city} />
      <CityServices city={city} />
      <CityAreas city={city} />
      <CityAbout city={city} />
      <CityTestimonials city={city} />
      <CityFAQ city={city} />
      <CityContact city={city} />
    </>
  );
}
