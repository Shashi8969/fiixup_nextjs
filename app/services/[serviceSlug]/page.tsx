<<<<<<< HEAD
"use client";

import { use } from "react";
import { notFound } from "next/navigation";

import CityCoverage from "@/components/service/ServiceCities";
import FAQ from "@/components/service/ServiceFAQ";
import Hero from "@/components/service/ServiceHero";
import TrustStrip from "@/components/service/ServiceTrustStrip";
import { Testimonials } from "@/components/Testimonials";
import BookingCTA from "@/components/ui/BookingCTA";
import HowItWorks from "@/components/ui/HowItWorks";

import { iconMap } from "@/lib/icons";
import { getServiceBySlug, carServices, bikeServices } from "@/lib/services";

// ✅ add missing brand lists
const carBrands = ['Maruti','Hyundai','Tata','Honda','Toyota','Kia','MG','Mahindra','Volkswagen','Skoda'];
const bikeBrands = ['Honda','Bajaj','TVS','Royal Enfield','Yamaha','Hero','Suzuki','KTM'];

export default function Page({
=======
// app/services/[serviceSlug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";

import CityCoverage from "@/components/service/ServiceCities";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import Hero from "@/components/service/ServiceHero";
import TrustStrip from "@/components/service/ServiceTrustStrip";
import PricingTable from "@/components/service/PricingTable";
import BrandsGrid from "@/components/service/BrandsGrid";
import CompleteGuideSection from "@/components/service/CompleteGuide";
import ServiceTestimonials from "@/components/service/ServiceTestimonials";
import ServiceBenefits from "@/components/service/ServiceBenefits";
import BookingCTA from "@/components/ui/BookingCTA";
import HowItWorks from "@/components/ui/HowItWorks";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";
import { TrustStrip as IconTrustStrip } from "@/components/ui/TrustStrip";

import { iconMap } from "@/lib/icons";
import {
  getServiceBySlug,
  carServices,
  bikeServices,
  allServicesOrdered,
} from "@/lib/services";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { getCategorySEO } from "@/lib/data/seo";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

// Category hero themes mapped to the colors in serviceCategory.ts[cite: 1, 2]
const heroTheme: Record<string, { gradient: string; iconBg: string; iconText: string; btn: string }> = {
  blue:   { gradient: "from-blue-50 to-blue-100",     iconBg: "bg-blue-100",   iconText: "text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  red:    { gradient: "from-red-50 to-red-100",       iconBg: "bg-red-100",    iconText: "text-red-700",    btn: "bg-red-600 hover:bg-red-700" },
  amber:  { gradient: "from-amber-50 to-amber-100",   iconBg: "bg-amber-100",  iconText: "text-amber-700",  btn: "bg-amber-600 hover:bg-amber-700" },
  green:  { gradient: "from-green-50 to-green-100",   iconBg: "bg-green-100",  iconText: "text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  orange: { gradient: "from-orange-50 to-orange-100", iconBg: "bg-orange-100", iconText: "text-orange-700", btn: "bg-orange-600 hover:bg-orange-700" },
  purple: { gradient: "from-purple-50 to-purple-100", iconBg: "bg-purple-100", iconText: "text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  teal:   { gradient: "from-teal-50 to-teal-100",     iconBg: "bg-teal-100",   iconText: "text-teal-700",   btn: "bg-teal-600 hover:bg-teal-700" },
};

export function generateStaticParams() {
  return [
    ...serviceCategories.map((c) => ({ serviceSlug: c.slug })),
    ...allServicesOrdered.map((s) => ({ serviceSlug: s.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;

  const cat = serviceCategories.find((c) => c.slug === serviceSlug);
  if (cat) {
    const seo = getCategorySEO(cat.slug);
    return {
      title:       seo?.title       ?? `${cat.title} — Doorstep Vehicle Repair | Fiixup`,
      description: seo?.description ?? cat.description,
      keywords:    seo?.keywords,
      alternates:  { canonical: seo?.canonical ?? `${SITE_URL}/services/${cat.slug}` },
      openGraph: {
        title:       seo?.ogTitle       ?? seo?.title       ?? cat.title,
        description: seo?.ogDescription ?? seo?.description ?? cat.description,
        url:         seo?.canonical     ?? `${SITE_URL}/services/${cat.slug}`,
      },
    };
  }

  const service = getServiceBySlug(serviceSlug);
  if (service) {
    return {
      title:       service.metaTitle,
      description: service.metaDescription,
      keywords:    service.metaKeywords,
      alternates:  { canonical: `${SITE_URL}/services/${service.slug}` },
      openGraph: {
        title:       service.metaTitle,
        description: service.metaDescription,
        url:         `${SITE_URL}/services/${service.slug}`,
      },
    };
  }

  return {};
}

export default async function Page({
>>>>>>> 8dcb818 (reconect github)
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
<<<<<<< HEAD
  const { serviceSlug } = use(params);

  // ✅ FIXED
  const service = getServiceBySlug(serviceSlug ?? "");

  if (!service) return notFound();

  const Icon = iconMap[service.icon];
  const isCar = service.category === "car";

  // ✅ SAME LOGIC (unchanged)
  const accentBlue = isCar ? "text-blue-600" : "text-red-600";
  const bgAccent = isCar ? "bg-blue-600" : "bg-red-600";
  const borderAccent = isCar ? "border-blue-300" : "border-red-300";
  const bgLight = isCar ? "bg-blue-50" : "bg-red-50";

  // ✅ FIXED
  const brands = isCar ? carBrands : bikeBrands;

  const related = (isCar ? carServices : bikeServices)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
=======
  const { serviceSlug } = await params;

  // ── 1. Category landing page ──────────────────────────────────────────────────
  const cat = serviceCategories.find((c) => c.slug === serviceSlug);
  if (cat) {
    const theme = heroTheme[cat.color] ?? heroTheme.blue;
    const CategoryIcon = cat.icon;

    return (
      <>
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
              {cat.data.map((s) => (
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

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
            <HowItWorks />
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
            <p className="text-white mb-8 text-lg">
              Certified technicians come to you — at home, office, or anywhere your vehicle is parked.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Book Service Now
              </Link>
              <a
                href={`tel:${MAIN_PHONE}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── 2. Individual service page ────────────────────────────────────────────────
  const service = getServiceBySlug(serviceSlug ?? "");
  if (!service) return notFound();

  // FIX: Identify the parent category to get the correct theme and labels[cite: 1, 2]
  const parentCategory = serviceCategories.find((c) => c.slug === service.category);
  const colorKey = parentCategory?.color || "blue";
  const theme = heroTheme[colorKey] || heroTheme.blue;
  
  const Icon = iconMap[service.icon];
  const isCar = service.category === "car";

  // Dynamic values based on category configuration[cite: 1, 2]
  const accentBlue   = theme.iconText;
  const bgAccent     = theme.btn.split(' ')[0]; // Extract the primary color class
  const bgLight      = theme.gradient.split(' ')[1].replace('to-', 'bg-'); 
  const borderAccent = isCar ? "border-blue-300" : "border-red-300";
  const accentColor  = colorKey as any;

  const relatedSlugs = service.relatedSlugs ?? [];
  const related = (isCar ? carServices : bikeServices)
    .filter((s) => s.slug !== service.slug && (relatedSlugs.length === 0 || relatedSlugs.includes(s.slug)))
    .slice(0, 3);

  // JSON-LD schemas
  const schemas = [
    serviceSchema({ name: service.title, description: service.description, slug: service.slug, price: service.price }),
    faqSchema(service.faqs),
    breadcrumbSchema([
      { name: "Home",     url: "/" },
      { name: "Services", url: "/services" },
      { name: service.shortTitle, url: `/services/${service.slug}` },
    ]),
  ];

  const brands = isCar ? (service.carBrands ?? []) : (service.bikeBrands ?? []);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero with dynamic category data[cite: 1, 2] */}
>>>>>>> 8dcb818 (reconect github)
      <Hero
        service={service}
        Icon={Icon}
        isCar={isCar}
<<<<<<< HEAD
=======
        categoryTitle={parentCategory?.title}
>>>>>>> 8dcb818 (reconect github)
        bgAccent={bgAccent}
        accentBlue={accentBlue}
        bgLight={bgLight}
      />

<<<<<<< HEAD
      {/* TRUST STRIP */}
      <TrustStrip />

      {/* DESCRIPTION + INCLUDED */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          
          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Service</h2>
            <p className="text-gray-700 text-lg mb-8">
              {service.description}
            </p>

            <h3 className="font-bold mb-3">
              {isCar ? "Car Brands We Service" : "Bike Brands We Service"}
            </h3>

            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <span key={b} className="bg-gray-100 px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className={`${bgLight} rounded-2xl p-8`}>
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-green-600">✔</span>
                  <span>{f}</span>
=======
      <TrustStrip />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
              About This Service
            </span>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {service.shortTitle} — How It Works
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
          </div>

          <div className={`${bgLight} rounded-2xl p-8`}>
            <h2 className="text-xl font-bold mb-6 text-gray-900">What&apos;s Included</h2>
            <ul className="space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">✔</span>
                  <span className="text-gray-700">{f}</span>
>>>>>>> 8dcb818 (reconect github)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
=======
      {service.benefits && service.benefits.length > 0 && (
        <ServiceBenefits
          benefits={service.benefits}
          serviceTitle={service.shortTitle}
          accentColor={accentColor}
        />
      )}

      <section className="py-16 bg-white">
>>>>>>> 8dcb818 (reconect github)
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Doorstep {service.shortTitle} Works
          </h2>
<<<<<<< HEAD
          <HowItWorks />
        </div>
      </section>

      {/* CITY COVERAGE */}
      <CityCoverage
        service={service}
        borderAccent={borderAccent}
        accentBlue={accentBlue}
      />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
=======
          <HowItWorks steps={service.steps} />
        </div>
      </section>

      {service.pricing && (
        <PricingTable
          pricing={service.pricing}
          serviceTitle={service.shortTitle}
          accentColor={accentColor}
        />
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

      <ServiceTestimonials
        testimonials={service.testimonials}
        serviceTitle={service.shortTitle}
      />

>>>>>>> 8dcb818 (reconect github)
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {service.shortTitle} — Frequently Asked Questions
          </h2>
<<<<<<< HEAD

          <p className="text-gray-500 text-center mb-10">
            Common questions about our doorstep{" "}
            {service.shortTitle.toLowerCase()} service.
          </p>

          <FAQ faqs={service.faqs} />
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            Other {isCar ? "Car" : "Bike"} Services You May Need
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((s) => {
const RelIcon = iconMap[s.icon] || iconMap["default"];

if (!RelIcon) {
    console.error("Missing icon for:", s.icon);
    return null; // prevents crash
  }

              return (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-white p-6 border rounded-xl hover:shadow-lg transition-all"
                >
                  <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} />
                  <h3 className="font-bold mb-1">{s.shortTitle}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {s.tagline}
                  </p>
                  <p className={`text-sm font-bold ${accentBlue}`}>
                    From {s.price}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <BookingCTA
        serviceTitle={service.shortTitle}
        bgAccent={bgAccent}
      />
=======
          <p className="text-gray-500 text-center mb-10">
            Common questions about our doorstep {service.shortTitle.toLowerCase()} service.
          </p>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>

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
>>>>>>> 8dcb818 (reconect github)
    </>
  );
}