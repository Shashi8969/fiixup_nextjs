//app/[citySlug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCities, getCityBySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/constants";
import { cityPageSchema } from "@/lib/schema";
import { CityHero } from "@/components/city/CityHero";
import { CityAbout } from "@/components/city/CityAbout";
import { CityAreas } from "@/components/city/CityAreas";
import { CityContact } from "@/components/city/CityContact";
import { CityFAQ } from "@/components/city/CityFAQ";
import { CityServices } from "@/components/city/CityServices";
import { CityTestimonials } from "@/components/city/CityTestimonials";

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title:       city.metaTitle,
    description: city.metaDescription,
    keywords:    city.metaKeywords,
    alternates:  { canonical: `${SITE_URL}/${city.slug}` },
    openGraph: {
      title:       city.metaTitle,
      description: city.metaDescription,
      url:         `${SITE_URL}/${city.slug}`,
      type:        "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return notFound();

  const allFaqs = city.faqCategories.flatMap((cat: any) => cat.faqs);

  const areas = city.areas.map((a: any) =>
    typeof a === "string" ? a : a.name
  );

  // cityPageSchema = AutoRepair + LocalBusiness + BreadcrumbList + FAQPage in one call
  const schemas = cityPageSchema({
    name:        city.name,
    slug:        city.slug,
    state:       (city as any).state ?? "India",
    postalCode:  (city as any).postalCode ?? "000000",
    lat:         (city as any).lat ?? 0,
    lng:         (city as any).lng ?? 0,
    phone:       city.phone ?? "",
    email:       city.email ?? "",
    reviewCount: 500,
    areas,
  }, allFaqs);

  return (
    <>
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
