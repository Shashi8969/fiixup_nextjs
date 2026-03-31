// app\[citySlug]\services\[serviceSlug]\page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import { getCityBySlug } from "@/lib/cities";
import cities from "@/lib/cities";
import services from "@/lib/services";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
import { CityServiceDetail } from "@/components/city/CityServiceDetail";

export function generateStaticParams() {
  const params: { citySlug: string; serviceSlug: string }[] = [];
  for (const city of cities) {
    for (const service of services) {
      params.push({ citySlug: city.slug, serviceSlug: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  return {
    title: `${service.shortTitle} in ${city.name} | Doorstep Service | Fiixup`,
    description: `${service.description} Serving ${city.areas.slice(0, 3).join(", ")} & all of ${city.name}. Call ${city.phone}. Available 24/7.`,
    alternates: { canonical: `${SITE_URL}/${city.slug}/services/${service.slug}` },
    openGraph: {
      title: `${service.shortTitle} in ${city.name} | Fiixup`,
      description: `Professional ${service.shortTitle.toLowerCase()} at your doorstep in ${city.name}. 24/7 service.`,
      url: `${SITE_URL}/${city.slug}/services/${service.slug}`,
    },
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}) {
  const { citySlug, serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const schemas = [
    serviceSchema({
      name: `${service.title} in ${city.name}`,
      description: `${service.description} Serving all areas of ${city.name}.`,
      slug: `${city.slug}/services/${service.slug}`,
      price: service.price,
    }),
    breadcrumbSchema([
      { name: "Home",             url: "/"                                       },
      { name: city.name,          url: `/${city.slug}`                           },
      { name: service.shortTitle, url: `/${city.slug}/services/${service.slug}`  },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CityServiceDetail service={service} city={city} />
    </>
  );
}