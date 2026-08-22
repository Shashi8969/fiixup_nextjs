// app/services/[serviceSlug]/page.tsx
// Individual + category service page — fully data-driven from Supabase.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

import CityCoverage      from "@/components/service/ServiceCities";
import ServiceFAQ        from "@/components/service/ServiceFAQ";
import Hero              from "@/components/service/ServiceHero";
import TrustStrip        from "@/components/service/ServiceTrustStrip";
import { Testimonials }  from "@/components/Testimonials";
import BookingCTA        from "@/components/ui/BookingCTA";
import HowItWorks        from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";
import { TrustStrip as IconTrustStrip } from "@/components/ui/TrustStrip";

import PricingTable         from "@/components/service/PricingTable";
import BrandsGrid           from "@/components/service/BrandsGrid";
import CompleteGuideSection from "@/components/service/CompleteGuide";
import ServiceTestimonials  from "@/components/service/ServiceTestimonials";
import ServiceBenefits      from "@/components/service/ServiceBenefits";

import { iconMap } from "@/lib/icons";
import { getAllServices, getServiceBySlug, getServicesByCategory } from "@/lib/services";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { serviceDetailSchema, serviceCategorySchema, jsonLdString } from "@/lib/schema";
import { getAllServiceCategories, getServiceCategoryBySlug } from "@/lib/data/serviceCategory";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

export const revalidate = 3600;

const heroTheme: Record<string, { gradient: string; iconBg: string; iconText: string; btn: string }> = {
  blue:   { gradient: "from-blue-50 to-blue-100",     iconBg: "bg-blue-100",   iconText: "text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  red:    { gradient: "from-red-50 to-red-100",       iconBg: "bg-red-100",    iconText: "text-red-700",    btn: "bg-red-600 hover:bg-red-700" },
  amber:  { gradient: "from-amber-50 to-amber-100",   iconBg: "bg-amber-100",  iconText: "text-amber-700",  btn: "bg-amber-600 hover:bg-amber-700" },
  green:  { gradient: "from-green-50 to-green-100",   iconBg: "bg-green-100",  iconText: "text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  orange: { gradient: "from-orange-50 to-orange-100", iconBg: "bg-orange-100", iconText: "text-orange-700", btn: "bg-orange-600 hover:bg-orange-700" },
  purple: { gradient: "from-purple-50 to-purple-100", iconBg: "bg-purple-100", iconText: "text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  teal:   { gradient: "from-teal-50 to-teal-100",     iconBg: "bg-teal-100",   iconText: "text-teal-700",   btn: "bg-teal-600 hover:bg-teal-700" },
};

export async function generateStaticParams() {
  const [categories, allServices] = await Promise.all([
    getAllServiceCategories(),
    getAllServices(),
  ]);

  return [
    ...categories.map((c) => ({ serviceSlug: c.slug })),
    ...allServices.map((s) => ({ serviceSlug: s.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;

  const cat = await getServiceCategoryBySlug(serviceSlug);
  if (cat) {
    const title = cat.metaTitle || `${cat.title} — Doorstep Vehicle Repair`;
    const description = cat.metaDescription || cat.description;
    const canonical = `${SITE_URL}/services/${cat.slug}`;

    return metadataFromBasicSeo({
      title,
      description,
      keywords: cat.keywords || undefined,
      canonical,
      path: `/services/${cat.slug}`,
      ogImageAlt: title,
    });
  }

  const service = await getServiceBySlug(serviceSlug);
  if (service) {
    return metadataFromBasicSeo({
      title:       service.metaTitle,
      description: service.metaDescription,
      keywords:    service.metaKeywords,
      canonical:   `${SITE_URL}/services/${service.slug}`,
      path:        `/services/${service.slug}`,
      ogImageAlt:  service.metaTitle,
    });
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;

  // ── Category landing page ──────────────────────────────────────────────────
  const cat = await getServiceCategoryBySlug(serviceSlug);
  if (cat) {
    const theme = heroTheme[cat.color] ?? heroTheme.blue;
    const CategoryIcon = cat.icon;
    const accentColor = (cat.slug === "car" ? "blue" : cat.color) as "blue" | "red";

    // Fetch services for this category from Supabase
    const catServices = await getServicesByCategory(cat.categorySlug as any);

    const catSchema = serviceCategorySchema({
      categoryName: cat.title,
      categorySlug: cat.slug,
      description:  cat.description,
      services:     catServices.map((s) => ({
        name: s.title, slug: s.slug, description: s.description,
        minPrice: parseInt(s.price.replace(/[^\d]/g, ""), 10) || undefined,
      })),
      faqs: cat.faqs ?? [],
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(catSchema) }}
        />
        <section className={`py-16 bg-gradient-to-br ${theme.gradient}`}>
          <div className="container mx-auto px-4 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${theme.iconBg} mb-6`}>
              <CategoryIcon className={`w-8 h-8 ${theme.iconText}`} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{cat.title}</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">{cat.description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className={`${theme.btn} text-white px-8 py-3 rounded-lg transition-colors font-semibold`}
              >
                Book a Service
              </Link>
              <a
                href={`tel:${MAIN_PHONE}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <IconTrustStrip />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">All {cat.title}</h2>
            <p className="text-gray-600 mb-8">{cat.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catServices.map((s) => (
                <ServiceCardPrice
                  key={s.slug}
                  slug={s.slug}
                  title={s.shortTitle}
                  tagline={s.tagline}
                  price={s.price}
                  duration={s.duration}
                  accentColor={cat.color}
                  icon={iconMap[s.icon]}
                />
              ))}
            </div>
          </div>
        </section>

        {cat.benefits && (
          <ServiceBenefits benefits={cat.benefits} serviceTitle={cat.title} accentColor={accentColor} />
        )}

        {cat.pricingSummary && (
          <PricingTable pricing={cat.pricingSummary} serviceTitle={cat.title} accentColor={accentColor} />
        )}

        {cat.brands && (
          <BrandsGrid brands={cat.brands} heading={`${cat.title} Brands We Service`} accentColor={accentColor} />
        )}

        {cat.guide && <CompleteGuideSection guide={cat.guide} />}

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
            <HowItWorks />
          </div>
        </section>

        <WhyChooseDoorstep />

        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-white mb-8 text-lg">
              Certified technicians come to you — at home, office, or anywhere your vehicle is parked.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact#contact-form" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Book Service Now
              </Link>
              <a href={`tel:${MAIN_PHONE}`} className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── Individual service page ────────────────────────────────────────────────
  const service = await getServiceBySlug(serviceSlug ?? "");
  if (!service) return notFound();

  const Icon = iconMap[service.icon];
  const isCar = service.category === "car";

  const accentBlue   = isCar ? "text-blue-600"   : "text-red-600";
  const bgAccent     = isCar ? "bg-blue-600"     : "bg-red-600";
  const borderAccent = isCar ? "border-blue-300" : "border-red-300";
  const bgLight      = isCar ? "bg-blue-50"      : "bg-red-50";
  const accentColor  = (isCar ? "blue" : "red") as "blue" | "red";

  // Related services from Supabase
  const relatedSlugs = service.relatedSlugs ?? [];
  const sameCategory = await getServicesByCategory(service.category as any);
  const related = sameCategory
    .filter((s) => s.slug !== service.slug)
    .filter((s) => relatedSlugs.length === 0 || relatedSlugs.includes(s.slug))
    .slice(0, 3);

  const brands = isCar ? (service.carBrands ?? []) : (service.bikeBrands ?? []);

  // Derive minPrice/maxPrice from pricing rows; fall back to parsing the price string
  const pricingRows = service.pricing?.rows ?? [];
  const minPrice = pricingRows.length > 0
    ? Math.min(...pricingRows.map((r) => r.priceFrom))
    : parseInt(service.price.replace(/[^\d]/g, ""), 10) || 499;
  const maxPrice = pricingRows.length > 0
    ? Math.max(...pricingRows.map((r) => r.priceTo ?? r.priceFrom))
    : minPrice * 3;

  // serviceDetailSchema = Service + AutoRepair/LocalBusiness + HowTo + BreadcrumbList + FAQPage
  const serviceSchemaData = serviceDetailSchema({
    name:         service.title,
    slug:         service.slug,
    description:  service.description,
    minPrice,
    maxPrice,
    faqs:         service.faqs,
    features:     service.features,
    duration:     service.duration,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(service.schemaJson ?? serviceSchemaData) }}
      />

      <Hero service={service} Icon={Icon} isCar={isCar} bgAccent={bgAccent} accentBlue={accentBlue} bgLight={bgLight} />

      <TrustStrip />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Service</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.description}</p>
          </div>
          <div className={`${bgLight} rounded-2xl p-8`}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">What&apos;s Included</h2>
            <ul className="space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">✔</span>
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.benefits && service.benefits.length > 0 && (
        <ServiceBenefits benefits={service.benefits} serviceTitle={service.shortTitle} accentColor={accentColor} />
      )}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Doorstep {service.shortTitle} Works
          </h2>
          <HowItWorks />
        </div>
      </section>

      {service.pricing && (
        <PricingTable pricing={service.pricing} serviceTitle={service.shortTitle} accentColor={accentColor} />
      )}

      {brands.length > 0 && (
        <BrandsGrid
          brands={brands}
          heading={`${isCar ? "Car" : "Bike"} Brands We Service`}
          subtext={`Our certified mechanics are trained to service all popular ${isCar ? "car" : "bike"} brands available in India.`}
          accentColor={accentColor}
        />
      )}

      <CityCoverage service={service} borderAccent={borderAccent} accentBlue={accentBlue} />

      {service.testimonials && service.testimonials.length > 0 ? (
        <ServiceTestimonials testimonials={service.testimonials} serviceTitle={service.shortTitle} />
      ) : (
        <Testimonials />
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {service.shortTitle} — Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Common questions about our doorstep {service.shortTitle.toLowerCase()} service.
          </p>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>
      <WhyChooseDoorstep />

      {service.guide && <CompleteGuideSection guide={service.guide} />}

      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              Other {isCar ? "Car" : "Bike"} Services You May Need
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((s) => {
                const RelIcon = iconMap[s.icon] || iconMap["default"];
                if (!RelIcon) return null;
                return (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="bg-white p-6 border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} />
                    <h3 className="font-bold mb-1 text-gray-900">{s.shortTitle}</h3>
                    <p className="text-sm text-gray-500 mb-3">{s.tagline}</p>
                    <p className={`text-sm font-bold ${accentBlue}`}>From {s.price}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      

      <BookingCTA serviceTitle={service.shortTitle} bgAccent={bgAccent} />
    </>
  );
}
