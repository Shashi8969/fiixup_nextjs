// app/[citySlug]/services/page.tsx
// Route:  /bangalore/services  /mumbai/services  /chennai/services  /hyderabad/services
//
// DATA SOURCE: location_services table
//   WHERE city_slug = $citySlug AND area_slug IS NULL AND is_active = true
//   These are the city-level service pages — one row per service per city.
//
// SEO HIERARCHY:
//   /bangalore                    → city hub  (trust, areas, reviews)
//   /bangalore/services           → THIS PAGE (all services in bangalore — topical index)
//   /bangalore/services/battery   → category page  (city_service_pages table)
//   /bangalore/koramangala/battery → area-service page  (location_services, area_slug set)

import { notFound }      from "next/navigation";
import type { Metadata } from "next";
import Link              from "next/link";
import {
  Phone, MapPin, ArrowRight,
  Clock, Shield, Zap, CheckCircle, Star,
} from "lucide-react";

import { getCityBySlug, getAllCities }      from "@/lib/cities";
import { getCityServices }                  from "@/lib/locationServices";
import { getAllServiceCategories }          from "@/lib/data/serviceCategory";
import { TrustStrip }                      from "@/components/ui/TrustStrip";
import HowItWorks                          from "@/components/ui/HowItWorks";
import WhyChooseDoorstep                   from "@/components/ui/WhyChooseDoorstep";
import { iconMap }                         from "@/lib/icons";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";

export const revalidate = 3600;

// ── Color theme map ───────────────────────────────────────────────────────────
const THEME: Record<string, {
  sectionBg: string;
  iconBg: string; iconText: string;
  badgeBg: string; badgeText: string;
  linkText: string; border: string;
}> = {
  blue:   { sectionBg: "bg-white",          iconBg: "bg-blue-50",   iconText: "text-blue-600",   badgeBg: "bg-blue-100",   badgeText: "text-blue-800",   linkText: "text-blue-600",   border: "hover:border-blue-200"   },
  red:    { sectionBg: "bg-red-50/40",       iconBg: "bg-red-50",    iconText: "text-red-600",    badgeBg: "bg-red-100",    badgeText: "text-red-800",    linkText: "text-red-600",    border: "hover:border-red-200"    },
  amber:  { sectionBg: "bg-amber-50/40",     iconBg: "bg-amber-50",  iconText: "text-amber-600",  badgeBg: "bg-amber-100",  badgeText: "text-amber-800",  linkText: "text-amber-600",  border: "hover:border-amber-200"  },
  green:  { sectionBg: "bg-green-50/40",     iconBg: "bg-green-50",  iconText: "text-green-600",  badgeBg: "bg-green-100",  badgeText: "text-green-800",  linkText: "text-green-600",  border: "hover:border-green-200"  },
  orange: { sectionBg: "bg-orange-50/40",    iconBg: "bg-orange-50", iconText: "text-orange-600", badgeBg: "bg-orange-100", badgeText: "text-orange-800", linkText: "text-orange-600", border: "hover:border-orange-200" },
  purple: { sectionBg: "bg-purple-50/40",    iconBg: "bg-purple-50", iconText: "text-purple-600", badgeBg: "bg-purple-100", badgeText: "text-purple-800", linkText: "text-purple-600", border: "hover:border-purple-200" },
  teal:   { sectionBg: "bg-teal-50/40",      iconBg: "bg-teal-50",   iconText: "text-teal-600",   badgeBg: "bg-teal-100",   badgeText: "text-teal-800",   linkText: "text-teal-600",   border: "hover:border-teal-200"   },
};

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((c) => ({ citySlug: c.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  const title     = `All Car & Bike Services in ${city.name} — Doorstep Repair | Fiixup`;
  const desc      = `Browse every doorstep car and bike repair service available in ${city.name}. Battery replacement, tyre puncture, oil change, bike service, towing, roadside assistance & more. Certified mechanics reach you in 30–60 minutes. Call ${city.phone}.`;
  const canonical = `${SITE_URL}/${city.slug}/services`;

  return {
    title,
    description: desc,
    keywords:    `car repair ${city.name}, bike repair ${city.name}, doorstep mechanic ${city.name}, battery replacement ${city.name}, tyre puncture ${city.name}, car service at home ${city.name}, mobile mechanic ${city.name}`,
    alternates:  { canonical },
    openGraph: {
      title, description: desc, url: canonical,
      type: "website", locale: "en_IN", siteName: "Fiixup",
    },
    twitter: { card: "summary_large_image", title, description: desc },
    robots:  { index: true, follow: true },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CityServicesPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;

  // Parallel fetch: city meta + all city-level location_services + categories for icons/colors
  const [city, cityServices, categories] = await Promise.all([
    getCityBySlug(citySlug),
    getCityServices(citySlug),       // ← location_services WHERE city_slug=x AND area_slug IS NULL
    getAllServiceCategories(),        // for icons, colors, category labels
  ]);

  if (!city) return notFound();

  // Build a lookup: categorySlug → category meta (icon, color, title, description)
  const catMeta = Object.fromEntries(
    categories.map((c) => [c.categorySlug, c])
  );

  // Group city services by service_category
  const grouped = cityServices.reduce<Record<string, typeof cityServices>>(
    (acc, svc) => {
      const key = svc.serviceCategory;
      if (!acc[key]) acc[key] = [];
      acc[key].push(svc);
      return acc;
    },
    {}
  );

  // Preserve category display order from service_categories table
  const orderedCategories = categories
    .map((c) => c.categorySlug)
    .filter((slug) => grouped[slug]?.length);

  const totalServices = cityServices.length;

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":           "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",      item: SITE_URL },
          { "@type": "ListItem", position: 2, name: city.name,   item: `${SITE_URL}/${city.slug}` },
          { "@type": "ListItem", position: 3, name: "Services",  item: `${SITE_URL}/${city.slug}/services` },
        ],
      },
      {
        "@type":         "ItemList",
        name:            `Vehicle Repair Services in ${city.name}`,
        description:     `All doorstep car and bike repair services in ${city.name}`,
        numberOfItems:   totalServices,
        itemListElement: cityServices.map((svc, i) => ({
          "@type":    "ListItem",
          position:   i + 1,
          name:       svc.serviceName,
          url:        svc.canonicalUrl,
        })),
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li>
              <Link href={`/${city.slug}`} className="hover:text-blue-600 transition-colors">
                {city.name}
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-300">/</li>
            <li className="text-gray-900 font-semibold">Services</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">

            {/* City badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              Serving all of {city.name}
            </div>

            {/* H1 — city-specific */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              All Car &amp; Bike Services in {city.name}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-7 leading-relaxed">
              {totalServices} doorstep services available across {city.name} — certified
              mechanics come to your home, office, or roadside location in 30–60 minutes, 24/7.
            </p>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-sm text-gray-600 mb-8">
              {[
                { icon: Clock,       text: "30–60 min mechanic arrival"      },
                { icon: Shield,      text: "30-day warranty on all repairs"  },
                { icon: Zap,         text: "Transparent pricing — always"    },
                { icon: CheckCircle, text: "All car & bike brands covered"   },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book a Service Now
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
        </div>
      </section>

      {/* ── TRUST STRIP ────────────────────────────────────────────────── */}
      <TrustStrip />

      {/* ── SERVICES — grouped by category ─────────────────────────────── */}
      {/* One section per category, each card links to the city-level       */}
      {/* location_service page: /{city}/{serviceSlug}                      */}
      {orderedCategories.map((catSlug) => {
        const cat      = catMeta[catSlug];
        const services = grouped[catSlug] ?? [];
        if (!cat || services.length === 0) return null;

        const theme   = THEME[cat.color] ?? THEME.blue;
        const CatIcon = cat.icon;

        return (
          <section
            key={catSlug}
            id={catSlug}
            className={`py-12 border-t border-gray-100 ${theme.sectionBg}`}
          >
            <div className="container mx-auto px-4">

              {/* Category header */}
              <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${theme.iconBg} flex-shrink-0`}>
                    <CatIcon className={`w-6 h-6 ${theme.iconText}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      {cat.title} in {city.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{cat.description}</p>
                  </div>
                </div>

                {/* Link to city-service-category page if it exists */}
                <Link
                  href={`/${city.slug}/services/${cat.slug}`}
                  className={`text-sm font-bold ${theme.linkText} hover:underline flex items-center gap-1.5 flex-shrink-0 mt-1`}
                >
                  See pricing &amp; reviews
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Service cards — from location_services table */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((svc) => {
                  // Get icon from global iconMap — falls back gracefully
                  const SvcIcon = iconMap[svc.serviceSlug] ?? iconMap[catSlug] ?? null;

                  // Starting price from pricing_rows (first row's priceFrom)
                  const startPrice = svc.pricingRows?.[0]?.priceFrom;

                  return (
                    <Link
                      key={svc.id}
                      href={`/${city.slug}/${svc.serviceSlug}`}
                      className={`group bg-white border border-gray-100 ${theme.border} rounded-xl p-5 flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5`}
                    >
                      {/* Icon */}
                      {SvcIcon && (
                        <div className={`mb-3 p-2 rounded-lg ${theme.iconBg} w-fit group-hover:scale-105 transition-transform`}>
                          <SvcIcon className={`w-5 h-5 ${theme.iconText}`} aria-hidden="true" />
                        </div>
                      )}

                      {/* Service name — city in H3 for SEO */}
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                        {svc.serviceName}
                      </h3>

                      {/* Tagline from hero_subheading */}
                      <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
                        {svc.heroSubheading}
                      </p>

                      {/* Price + rating + CTA */}
                      <div className="pt-3 border-t border-gray-100 space-y-2">

                        {/* Rating row */}
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= Math.round(svc.schemaAggregateRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">
                            {svc.schemaAggregateRating.toFixed(1)} ({svc.schemaReviewCount}+)
                          </span>
                        </div>

                        {/* Price + book */}
                        <div className="flex items-center justify-between">
                          {startPrice ? (
                            <div>
                              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">
                                Starting from
                              </p>
                              <p className={`text-sm font-extrabold ${theme.iconText}`}>
                                ₹{startPrice.toLocaleString("en-IN")}
                              </p>
                            </div>
                          ) : (
                            <p className={`text-xs font-semibold ${theme.linkText}`}>
                              Get quote
                            </p>
                          )}
                          <span
                            className={`text-xs font-bold ${theme.linkText} flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}
                          >
                            Book
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Category footer link */}
              <div className="mt-5 flex justify-end">
                <Link
                  href={`/${city.slug}/services/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors"
                >
                  See all {cat.title} pricing, reviews &amp; FAQs for {city.name}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── AREA QUICK LINKS ────────────────────────────────────────────── */}
      {(city.areas as { name: string; slug: string }[] | undefined)?.length ? (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-1.5">
              Doorstep Service Across {city.name}
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              Click your area to see services, pricing, and mechanics available near you.
            </p>
            <div className="flex flex-wrap gap-2">
              {(city.areas as { name: string; slug: string }[]).map((area) => (
                <Link
                  key={area.slug}
                  href={`/${city.slug}/${area.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-sm font-medium px-3.5 py-2 rounded-lg transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How Doorstep Repair Works in {city.name}
            </h2>
            <p className="text-gray-500">
              From booking to back on the road — here&apos;s what to expect when you call Fiixup.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ── WHY CHOOSE ──────────────────────────────────────────────────── */}
      <WhyChooseDoorstep />

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-3">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Call us — describe the problem and we&apos;ll tell you exactly what&apos;s
            needed and send the right mechanic anywhere in {city.name}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#contact-form"
              className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${city.phone ?? MAIN_PHONE}`}
              className="bg-red-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
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
