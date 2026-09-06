// app/[citySlug]/services/[serviceSlug]/page.tsx
//
// City service-category routes, e.g. /mumbai/services/bike.
// A category page is a real landing page in its own right. City-level child
// service cards enrich it, but their absence must never make an active,
// editorially-approved category look unavailable or "under setup".

import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import { Phone, MapPin, Clock, Shield, Zap, Wrench } from "lucide-react";

import { getAllServiceCategories, getServiceCategoryBySlug } from "@/lib/data/serviceCategory";
import { getCityServicesByCategory, hasAnyCityServiceInCategory } from "@/lib/locationServices";
import { getCityBySlug, getAllCities } from "@/lib/cities";
import { getCityServiceCategoryPage } from "@/lib/cityPages";
import { getServiceBySlug } from "@/lib/services";

import { TrustStrip as IconTrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import PricingTable from "@/components/service/PricingTable";
import BrandsGrid from "@/components/service/BrandsGrid";
import CompleteGuideSection from "@/components/service/CompleteGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { CspSeoContent } from "@/components/city-service/CspSeoContent";
import { CityServiceCard } from "@/components/ui/CityServiceCard";
import { getSmartAreasForCityCategory } from "@/lib/smart-internal-links";

import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

export const revalidate = 3600;
export const dynamicParams = true;

const heroTheme: Record<string, {
  gradient: string;
  iconBg: string;
  iconText: string;
  btn: string;
}> = {
  blue: { gradient: "from-blue-50 to-blue-100", iconBg: "bg-blue-100", iconText: "text-blue-700", btn: "bg-blue-600 hover:bg-blue-700" },
  red: { gradient: "from-red-50 to-red-100", iconBg: "bg-red-100", iconText: "text-red-700", btn: "bg-red-600 hover:bg-red-700" },
  amber: { gradient: "from-amber-50 to-amber-100", iconBg: "bg-amber-100", iconText: "text-amber-700", btn: "bg-amber-600 hover:bg-amber-700" },
  green: { gradient: "from-green-50 to-green-100", iconBg: "bg-green-100", iconText: "text-green-700", btn: "bg-green-600 hover:bg-green-700" },
  orange: { gradient: "from-orange-50 to-orange-100", iconBg: "bg-orange-100", iconText: "text-orange-700", btn: "bg-orange-600 hover:bg-orange-700" },
  purple: { gradient: "from-purple-50 to-purple-100", iconBg: "bg-purple-100", iconText: "text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  teal: { gradient: "from-teal-50 to-teal-100", iconBg: "bg-teal-100", iconText: "text-teal-700", btn: "bg-teal-600 hover:bg-teal-700" },
};

export async function generateStaticParams() {
  const [cities, categories] = await Promise.all([
    getAllCities(),
    getAllServiceCategories(),
  ]);

  const params: { citySlug: string; serviceSlug: string }[] = [];
  for (const city of cities) {
    for (const cat of categories) {
      params.push({ citySlug: city.slug, serviceSlug: cat.slug });
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
  const [city, cat] = await Promise.all([
    getCityBySlug(citySlug),
    getServiceCategoryBySlug(serviceSlug),
  ]);

  if (!city) return {};

  if (cat) {
    const geo = { region: city.state, placename: city.name };
    const hasContent = await hasAnyCityServiceInCategory(citySlug, cat.categorySlug);
    const dbPage = await getCityServiceCategoryPage(citySlug, serviceSlug);

    if (dbPage) {
      return metadataFromBasicSeo({
        title: dbPage.seo.meta_title,
        description: dbPage.seo.meta_description,
        keywords: dbPage.seo.meta_keywords,
        canonical: dbPage.seo.canonical_url,
        path: `/${citySlug}/services/${serviceSlug}`,
        ogImage: dbPage.seo.og_image_url,
        ogImageAlt: dbPage.seo.meta_title,
        geo,
        index: hasContent,
      });
    }

    const title = `${cat.title} in ${city.name} | Fiixup`;
    const desc = `Book ${cat.title.toLowerCase()} in ${city.name} with Fiixup. Doorstep, roadside and partner-garage support are available depending on the job. Starting prices and any additional work are confirmed before approval.`;
    const canonical = `${SITE_URL}/${city.slug}/services/${cat.slug}`;

    return metadataFromBasicSeo({
      title,
      description: desc,
      keywords: `${cat.title.toLowerCase()} ${city.name}, doorstep vehicle service ${city.name}`,
      canonical,
      path: `/${city.slug}/services/${cat.slug}`,
      ogImageAlt: title,
      geo,
      index: hasContent,
    });
  }

  const service = await getServiceBySlug(serviceSlug);
  if (service) {
    return metadataFromBasicSeo({
      title: service.metaTitle,
      description: service.metaDescription,
      keywords: service.metaKeywords,
      canonical: `${SITE_URL}/${city.slug}/${service.slug}`,
      path: `/${city.slug}/${service.slug}`,
      index: false,
    });
  }

  return {};
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}) {
  const { citySlug, serviceSlug } = await params;
  const [city, cat] = await Promise.all([
    getCityBySlug(citySlug),
    getServiceCategoryBySlug(serviceSlug),
  ]);

  if (!city) return notFound();

  if (cat) {
    const theme = heroTheme[cat.color] ?? heroTheme.blue;
    const CategoryIcon = cat.icon;
    const accentColor = (cat.color === "blue" ? "blue" : cat.color) as "blue" | "red";

    const [cityServices, dbPage, smartCategoryAreas] = await Promise.all([
      getCityServicesByCategory(citySlug, cat.categorySlug),
      getCityServiceCategoryPage(citySlug, serviceSlug),
      getSmartAreasForCityCategory(citySlug, cat.categorySlug),
    ]);

    const categoryAreas = smartCategoryAreas.length
      ? smartCategoryAreas
      : ((city.areas as { name: string; slug: string }[] | undefined) ?? []).map((area) => ({
          ...area,
          href: `/${city.slug}/${area.slug}`,
        }));

    const fallbackSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/${city.slug}` },
            { "@type": "ListItem", position: 3, name: "Services", item: `${SITE_URL}/${city.slug}/services` },
            { "@type": "ListItem", position: 4, name: cat.title, item: `${SITE_URL}/${city.slug}/services/${cat.slug}` },
          ],
        },
        {
          "@type": "Service",
          name: `${cat.title} in ${city.name}`,
          description: cat.description,
          url: `${SITE_URL}/${city.slug}/services/${cat.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "City", name: city.name },
          ...(cityServices.length > 0 && {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${cat.title} options in ${city.name}`,
              itemListElement: cityServices.map((s) => ({
                "@type": "Offer",
                name: s.serviceName,
                url: s.canonicalUrl,
                ...(s.pricingRows[0] && {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: s.pricingRows[0].priceFrom,
                    priceCurrency: "INR",
                  },
                }),
              })),
            },
          }),
        },
      ],
    };

    return (
      <>
        <JsonLd data={dbPage?.seo.schema_json ?? fallbackSchema} />

        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li><Link href={`/${city.slug}`} className="hover:text-blue-600 transition-colors">{city.name}</Link></li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li><Link href={`/${city.slug}/services`} className="hover:text-blue-600 transition-colors">Services</Link></li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li className="text-gray-900 font-semibold">{cat.title}</li>
            </ol>
          </div>
        </nav>

        <section className={`py-16 bg-gradient-to-br ${theme.gradient}`}>
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Serving all of {city.name}
            </div>

            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${theme.iconBg} mb-5`}>
              <CategoryIcon className={`w-8 h-8 ${theme.iconText}`} aria-hidden="true" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {cat.title} in {city.name}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              {cat.description}
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-3">
              {[
                { icon: Clock, text: "20-Min Quick Arrival*" },
                { icon: Shield, text: "30-day eligible repair warranty" },
                { icon: Zap, text: "Starting prices" },
                { icon: Wrench, text: "Doorstep, roadside or partner garage" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-green-500" aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 max-w-3xl mx-auto mb-8 leading-5">
              *After booking confirmation for eligible doorstep/roadside requests. Arrival can be affected by exceptional traffic, weather, distance, access or technician availability. Displayed prices are starting/indicative; additional labour, parts or repair work is confirmed before approval.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className={`${theme.btn} text-white px-8 py-3 rounded-lg transition-colors font-semibold`}
              >
                Book a Service
              </Link>
              <a
                href={`tel:${city.phone ?? MAIN_PHONE}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {city.phone ?? MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <IconTrustStrip />

        {cityServices.length > 0 ? (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {cat.title} Options in {city.name}
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Choose a listed service, or contact Fiixup if you are not sure which option matches the problem.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityServices.map((svc) => (
                  <CityServiceCard
                    key={svc.id}
                    citySlug={city.slug}
                    cityName={city.name}
                    serviceSlug={svc.serviceSlug}
                    serviceName={svc.serviceName}
                    serviceCategory={svc.serviceCategory}
                    tagline={svc.heroSubheading}
                    pricingRows={svc.pricingRows}
                    duration={svc.duration}
                    rating={svc.schemaAggregateRating}
                    reviewCount={svc.schemaReviewCount}
                    categoryIcon={CategoryIcon}
                    theme={{ iconBg: theme.iconBg, iconText: theme.iconText }}
                    variant="detailed"
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-14 bg-white">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Need {cat.title} in {city.name}?
              </h2>
              <p className="text-gray-600 leading-7 mb-6">
                This category is available in {city.name}. The exact service depends on your vehicle, symptoms and whether the work is suitable for doorstep or roadside repair, or needs partner-garage equipment. Tell us what happened and where the vehicle is; Fiixup will confirm the suitable service, availability and starting price before work or dispatch.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact#contact-form"
                  className={`${theme.btn} text-white px-8 py-3 rounded-lg font-semibold`}
                >
                  Describe Your Vehicle Problem
                </Link>
                <a
                  href={`tel:${city.phone ?? MAIN_PHONE}`}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {city.phone ?? MAIN_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </section>
        )}

        {cat.benefits?.length > 0 && (
          <ServiceBenefits
            benefits={cat.benefits}
            serviceTitle={`${cat.title} in ${city.name}`}
            accentColor={accentColor}
          />
        )}
        {cat.pricingSummary && (
          <PricingTable
            pricing={cat.pricingSummary}
            serviceTitle={`${cat.title} in ${city.name}`}
            accentColor={accentColor}
          />
        )}
        {cat.brands?.length > 0 && (
          <BrandsGrid
            brands={cat.brands}
            heading={`${cat.title} Brands We Service in ${city.name}`}
            accentColor={accentColor}
          />
        )}
        {cat.guide && <CompleteGuideSection guide={cat.guide} />}

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How {cat.title} Works in {city.name}
            </h2>
            <HowItWorks />
          </div>
        </section>

        <WhyChooseDoorstep />

        {categoryAreas.length ? (
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {cat.title} Near You in {city.name}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Fiixup accepts {cat.title.toLowerCase()} requests across these major areas. Exact service availability is confirmed for the individual booking.
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={area.href}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
                  >
                    <MapPin className="w-3 h-3 text-gray-400" aria-hidden="true" />
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {dbPage && <CspSeoContent data={dbPage.data} />}

        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Book {cat.title} in {city.name}?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Tell Fiixup what the vehicle is doing and where it is located. We will confirm the right service path, availability and starting price before paid work or dispatch.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Book Service Now
              </Link>
              <a
                href={`tel:${city.phone ?? MAIN_PHONE}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {city.phone ?? MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  const service = await getServiceBySlug(serviceSlug ?? "");
  if (service) permanentRedirect(`/${city.slug}/${service.slug}`);

  return notFound();
}
