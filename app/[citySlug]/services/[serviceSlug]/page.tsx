// app/[citySlug]/services/[serviceSlug]/page.tsx
//
// THIS FILE HANDLES TWO ROUTES:
//   /bangalore/services/battery   → Category page (shows all battery services IN BANGALORE)
//   /bangalore/services/car-oil-change  → Individual service page (if ever needed here)
//
// KEY FIX vs previous version:
//   BEFORE: Category grid fetched from getServicesByCategory() → services table (GLOBAL, not city-specific)
//   AFTER:  Category grid fetches from getCityServicesByCategory(citySlug, categorySlug)
//           → location_services WHERE city_slug='bangalore' AND service_category='battery'
//             AND area_slug IS NULL AND is_active=true
//
//   This means EVERY card on /bangalore/services/battery comes from your
//   location_services DB rows — dynamically, automatically, no hardcoding.
//   Add a new row to location_services → it appears on the page at next ISR.

import type { Metadata }  from "next";
import { notFound }       from "next/navigation";
import Link               from "next/link";
import {
  Phone, MapPin, Star, Clock,
  ArrowRight, CheckCircle, Shield, Zap,
} from "lucide-react";

import { getAllServiceCategories, getServiceCategoryBySlug } from "@/lib/data/serviceCategory";
import { getCityServicesByCategory }                         from "@/lib/locationServices";
import { getCityBySlug, getAllCities }                       from "@/lib/cities";
import { getAllServices, getServiceBySlug, getServicesByCategory } from "@/lib/services";

import { TrustStrip as IconTrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks                        from "@/components/ui/HowItWorks";
import WhyChooseDoorstep                 from "@/components/ui/WhyChooseDoorstep";
import BookingCTA                        from "@/components/ui/BookingCTA";
import ServiceBenefits                  from "@/components/service/ServiceBenefits";
import PricingTable                      from "@/components/service/PricingTable";
import BrandsGrid                        from "@/components/service/BrandsGrid";
import CompleteGuideSection              from "@/components/service/CompleteGuide";
import ServiceTestimonials               from "@/components/service/ServiceTestimonials";
import ServiceFAQ                        from "@/components/service/ServiceFAQ";
import { Testimonials }                  from "@/components/Testimonials";
import Hero                              from "@/components/service/ServiceHero";
import TrustStrip                        from "@/components/service/ServiceTrustStrip";
import CityCoverage                      from "@/components/service/ServiceCities";

import { iconMap }                       from "@/lib/icons";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";

export const revalidate  = 3600;
export const dynamicParams = true;

// ── Theme map ────────────────────────────────────────────────────────────────
const heroTheme: Record<string, {
  gradient: string; iconBg: string; iconText: string; btn: string;
}> = {
  blue:   { gradient: "from-blue-50 to-blue-100",     iconBg: "bg-blue-100",   iconText: "text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700"   },
  red:    { gradient: "from-red-50 to-red-100",       iconBg: "bg-red-100",    iconText: "text-red-700",    btn: "bg-red-600 hover:bg-red-700"     },
  amber:  { gradient: "from-amber-50 to-amber-100",   iconBg: "bg-amber-100",  iconText: "text-amber-700",  btn: "bg-amber-600 hover:bg-amber-700" },
  green:  { gradient: "from-green-50 to-green-100",   iconBg: "bg-green-100",  iconText: "text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  orange: { gradient: "from-orange-50 to-orange-100", iconBg: "bg-orange-100", iconText: "text-orange-700", btn: "bg-orange-600 hover:bg-orange-700"},
  purple: { gradient: "from-purple-50 to-purple-100", iconBg: "bg-purple-100", iconText: "text-purple-700", btn: "bg-purple-600 hover:bg-purple-700"},
  teal:   { gradient: "from-teal-50 to-teal-100",     iconBg: "bg-teal-100",   iconText: "text-teal-700",   btn: "bg-teal-600 hover:bg-teal-700"   },
};

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const [cities, categories, allServices] = await Promise.all([
    getAllCities(),
    getAllServiceCategories(),
    getAllServices(),
  ]);

  const params: { citySlug: string; serviceSlug: string }[] = [];

  for (const city of cities) {
    // One param per city × category
    for (const cat of categories) {
      params.push({ citySlug: city.slug, serviceSlug: cat.slug });
    }
    // One param per city × individual service (future use)
    for (const svc of allServices) {
      params.push({ citySlug: city.slug, serviceSlug: svc.slug });
    }
  }

  return params;
}

// ── Metadata ─────────────────────────────────────────────────────────────────
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
    const title    = `${cat.title} in ${city.name} — Doorstep Service | Fiixup`;
    const desc     = `Get doorstep ${cat.title.toLowerCase()} in ${city.name}. Certified mechanics reach you in 30–60 minutes. Transparent pricing, 30-day warranty. Call ${city.phone}.`;
    const canonical = `${SITE_URL}/${city.slug}/services/${cat.slug}`;
    return {
      title,
      description: desc,
      keywords:    `${cat.title.toLowerCase()} ${city.name}, doorstep ${cat.title.toLowerCase()} ${city.name}, ${city.name} ${cat.title.toLowerCase()} service`,
      alternates:  { canonical },
      openGraph:   { title, description: desc, url: canonical, type: "website", locale: "en_IN", siteName: "Fiixup" },
      twitter:     { card: "summary_large_image", title, description: desc },
      robots:      { index: true, follow: true },
    };
  }

  const service = await getServiceBySlug(serviceSlug);
  if (service) {
    return {
      title:       service.metaTitle,
      description: service.metaDescription,
      keywords:    service.metaKeywords,
      alternates:  { canonical: `${SITE_URL}/${city.slug}/services/${service.slug}` },
    };
  }

  return {};
}

// ── Page ──────────────────────────────────────────────────────────────────────
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

  // ══════════════════════════════════════════════════════════════════════════
  // BRANCH A: CATEGORY PAGE  e.g. /bangalore/services/battery
  // ══════════════════════════════════════════════════════════════════════════
  if (cat) {
    const theme       = heroTheme[cat.color] ?? heroTheme.blue;
    const CategoryIcon = cat.icon;
    const accentColor  = (cat.color === "blue" ? "blue" : cat.color) as "blue" | "red";

    // ── THE KEY CHANGE ────────────────────────────────────────────────────
    // Fetch city-specific services from location_services table
    // WHERE city_slug = citySlug AND service_category = cat.categorySlug
    //   AND area_slug IS NULL AND is_active = true
    // This replaces the old getServicesByCategory() which was global/static
    const cityServices = await getCityServicesByCategory(citySlug, cat.categorySlug);
    // ──────────────────────────────────────────────────────────────────────

    // JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home",        item: SITE_URL },
            { "@type": "ListItem", position: 2, name: city.name,     item: `${SITE_URL}/${city.slug}` },
            { "@type": "ListItem", position: 3, name: "Services",    item: `${SITE_URL}/${city.slug}/services` },
            { "@type": "ListItem", position: 4, name: cat.title,     item: `${SITE_URL}/${city.slug}/services/${cat.slug}` },
          ],
        },
        {
          "@type":         "ItemList",
          name:            `${cat.title} in ${city.name}`,
          description:     cat.description,
          numberOfItems:   cityServices.length,
          itemListElement: cityServices.map((s, i) => ({
            "@type":    "ListItem",
            position:   i + 1,
            name:       s.serviceName,
            url:        s.canonicalUrl,
            offers: s.pricingRows[0] ? {
              "@type":        "Offer",
              price:          String(s.pricingRows[0].priceFrom),
              priceCurrency:  "INR",
            } : undefined,
          })),
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* ── BREADCRUMB ─────────────────────────────────────────────── */}
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

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className={`py-16 bg-gradient-to-br ${theme.gradient}`}>
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Serving all of {city.name}
            </div>

            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${theme.iconBg} mb-5`}>
              <CategoryIcon className={`w-8 h-8 ${theme.iconText}`} aria-hidden="true" />
            </div>

            {/* H1 — city-specific */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {cat.title} in {city.name}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
              {cat.description}
            </p>

            {/* Trust micro-row */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-8">
              {[
                { icon: Clock,       text: "30–60 min arrival" },
                { icon: Shield,      text: "30-day warranty"   },
                { icon: Zap,         text: "Upfront pricing"   },
                { icon: CheckCircle, text: "All brands covered" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-green-500" aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>

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

        {/* ── TRUST STRIP ────────────────────────────────────────────── */}
        <IconTrustStrip />

        {/* ── SERVICE CARDS — FROM location_services ─────────────────── */}
        {cityServices.length > 0 ? (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  All {cat.title} in {city.name}
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">{cat.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityServices.map((svc) => {
                  // Get icon — try service slug, then category slug, fallback to Wrench
                  const SvcIcon = iconMap[svc.serviceSlug]
                    ?? iconMap[svc.serviceCategory]
                    ?? null;

                  // Starting price from pricing_rows
                  const startPrice = svc.pricingRows?.[0]?.priceFrom;
                  const priceLabel = startPrice
                    ? `₹${startPrice.toLocaleString("en-IN")}`
                    : "Call for quote";

                  return (
                    <Link
                      key={svc.id}
                      // Links to the city-level location_service page
                      // e.g. /bangalore/koramangala/car-battery-replacement
                      // OR if you have a city-level route: /bangalore/car-battery-replacement
                      href={`/${city.slug}/${svc.serviceSlug}`}
                      className="group relative bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Icon + title row */}
                      <div className="flex items-start gap-4 mb-4">
                        {SvcIcon ? (
                          <div className={`flex-shrink-0 p-2.5 rounded-xl ${theme.iconBg} group-hover:scale-110 transition-transform`}>
                            <SvcIcon className={`w-5 h-5 ${theme.iconText}`} aria-hidden="true" />
                          </div>
                        ) : (
                          <div className={`flex-shrink-0 p-2.5 rounded-xl ${theme.iconBg}`}>
                            <CategoryIcon className={`w-5 h-5 ${theme.iconText}`} aria-hidden="true" />
                          </div>
                        )}
                        {/* H3 — service name from location_services.service_name */}
                        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                          {svc.serviceName}
                        </h3>
                      </div>

                      {/* Tagline from location_services.hero_subheading (city-specific copy) */}
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 line-clamp-2">
                        {svc.heroSubheading}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-4">
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
                          {svc.schemaAggregateRating.toFixed(1)} ({svc.schemaReviewCount}+ reviews)
                        </span>
                      </div>

                      {/* Price + duration + CTA */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-0.5">
                            Starting from
                          </p>
                          <p className={`text-base font-extrabold ${theme.iconText}`}>
                            {priceLabel}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          30–60 min
                        </div>
                      </div>

                      {/* Hover arrow */}
                      <div
                        aria-hidden="true"
                        className={`absolute bottom-4 right-5 flex items-center gap-1 text-xs font-bold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ${theme.iconText}`}
                      >
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          // Empty state — no location_services rows yet for this city+category
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-400 text-lg mb-6">
                Services for {cat.title} in {city.name} are being set up — please call us directly.
              </p>
              <a
                href={`tel:${city.phone ?? MAIN_PHONE}`}
                className={`${theme.btn} text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2`}
              >
                <Phone className="w-4 h-4" />
                {city.phone ?? MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </section>
        )}

        {/* ── CATEGORY-LEVEL CONTENT (from service_categories table) ─── */}
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

        {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How {cat.title} Works in {city.name}
            </h2>
            <HowItWorks />
          </div>
        </section>

        <WhyChooseDoorstep />

        {/* ── AREA LINKS — internal SEO linking ──────────────────────── */}
        {(city.areas as { name: string; slug: string }[] | undefined)?.length ? (
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {cat.title} Near You in {city.name}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                We provide doorstep {cat.title.toLowerCase()} across all major areas:
              </p>
              <div className="flex flex-wrap gap-2">
                {(city.areas as { name: string; slug: string }[]).map((area) => (
                  <Link
                    key={area.slug}
                    href={`/${city.slug}/${area.slug}`}
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

        {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Book {cat.title} in {city.name}?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Certified technicians come to you — at your home, office, or anywhere
              in {city.name}.
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

  // ══════════════════════════════════════════════════════════════════════════
  // BRANCH B: INDIVIDUAL SERVICE PAGE (unchanged from original)
  // e.g. /bangalore/services/car-oil-change  (if this route is ever used)
  // ══════════════════════════════════════════════════════════════════════════
  const service = await getServiceBySlug(serviceSlug ?? "");
  if (!service) return notFound();

  const Icon         = iconMap[service.icon];
  const isCar        = service.category === "car";
  const accentBlue   = isCar ? "text-blue-600"   : "text-red-600";
  const bgAccent     = isCar ? "bg-blue-600"     : "bg-red-600";
  const borderAccent = isCar ? "border-blue-300" : "border-red-300";
  const bgLight      = isCar ? "bg-blue-50"      : "bg-red-50";
  const accentColor  = (isCar ? "blue" : "red") as "blue" | "red";

  const sameCategory = await getServicesByCategory(service.category as any);
  const relatedSlugs = service.relatedSlugs ?? [];
  const related = sameCategory
    .filter((s) => s.slug !== service.slug)
    .filter((s) => relatedSlugs.length === 0 || relatedSlugs.includes(s.slug))
    .slice(0, 3);

  const brands     = isCar ? (service.carBrands ?? []) : (service.bikeBrands ?? []);
  const pricingRows = service.pricing?.rows ?? [];
  const minPrice   = pricingRows.length > 0
    ? Math.min(...pricingRows.map((r) => r.priceFrom))
    : parseInt(service.price.replace(/[^\d]/g, ""), 10) || 499;

  return (
    <>
      <Hero service={service} Icon={Icon} isCar={isCar} bgAccent={bgAccent} accentBlue={accentBlue} bgLight={bgLight} />
      <TrustStrip />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Service</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
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
        <BrandsGrid brands={brands} heading={`${isCar ? "Car" : "Bike"} Brands We Service`} accentColor={accentColor} />
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
                const RelIcon = iconMap[s.icon];
                if (!RelIcon) return null;
                return (
                  <Link key={s.slug} href={`/${city.slug}/${s.slug}`}
                    className="bg-white p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                    <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} aria-hidden="true" />
                    <h3 className="font-bold mb-1 text-gray-900">{s.shortTitle}</h3>
                    <p className="text-sm text-gray-500 mb-3">{s.tagline}</p>
                    <p className={`text-sm font-bold ${accentBlue}`}>From {s.price}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <WhyChooseDoorstep />
      <BookingCTA serviceTitle={service.shortTitle} bgAccent={bgAccent} phoneNumber={city.phone ?? MAIN_PHONE} />
    </>
  );
}
