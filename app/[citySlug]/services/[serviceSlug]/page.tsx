// app/[citySlug]/services/[serviceSlug]/page.tsx
//
// THIS FILE HANDLES CITY CATEGORY ROUTES ONLY:
//   /bangalore/services/battery   → Category page (shows all battery services IN BANGALORE)
//
// Individual service URLs must live at /{citySlug}/{serviceSlug}.
// If someone opens /{citySlug}/services/{serviceSlug}, this page redirects there.
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
import { notFound, permanentRedirect } from "next/navigation";
import Link               from "next/link";
import {
  Phone, MapPin, Clock,
  CheckCircle, Shield, Zap,
} from "lucide-react";

import { getAllServiceCategories, getServiceCategoryBySlug } from "@/lib/data/serviceCategory";
import { getCityServicesByCategory, hasAnyCityServiceInCategory } from "@/lib/locationServices";
import { getCityBySlug, getAllCities }                       from "@/lib/cities";
import { getCityServiceCategoryPage } from "@/lib/cityPages";
import { getServiceBySlug } from "@/lib/services";

import { TrustStrip as IconTrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks                        from "@/components/ui/HowItWorks";
import WhyChooseDoorstep                 from "@/components/ui/WhyChooseDoorstep";
import ServiceBenefits                  from "@/components/service/ServiceBenefits";
import PricingTable                      from "@/components/service/PricingTable";
import BrandsGrid                        from "@/components/service/BrandsGrid";
import CompleteGuideSection              from "@/components/service/CompleteGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { CspSeoContent } from "@/components/city-service/CspSeoContent";
import { CityServiceCard } from "@/components/ui/CityServiceCard";
import { getSmartAreasForCityCategory } from "@/lib/smart-internal-links";

import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

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
  const [cities, categories] = await Promise.all([
    getAllCities(),
    getAllServiceCategories(),
  ]);

  const params: { citySlug: string; serviceSlug: string }[] = [];

  for (const city of cities) {
    // One param per city × category
    for (const cat of categories) {
      params.push({ citySlug: city.slug, serviceSlug: cat.slug });
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
    const geo = { region: city.state, placename: city.name };
    // No location_services rows yet for this city+category → the page body
    // renders nothing but a "being set up, call us" placeholder (see the
    // empty-state branch below). Don't ask Google to index a page with no
    // real content — see SEO_AUDIT.md F2. Self-healing: flips back to
    // indexable the moment an admin adds a location_services row here.
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

    const title    = `${cat.title} in ${city.name} — Doorstep Service | Fiixup`;
    const desc     = `Get doorstep ${cat.title.toLowerCase()} in ${city.name}. Certified mechanics reach you in 20 minutes. Transparent pricing, 30-day warranty. Call ${city.phone}.`;
    const canonical = `${SITE_URL}/${city.slug}/services/${cat.slug}`;
    return metadataFromBasicSeo({
      title,
      description: desc,
      keywords: `${cat.title.toLowerCase()} ${city.name}, doorstep vehicle repair ${city.name}`,
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
        <JsonLd data={dbPage?.seo.schema_json ?? schema} />

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
                { icon: Clock,       text: "20 min arrival" },
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
        {categoryAreas.length ? (
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {cat.title} Near You in {city.name}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                We provide doorstep {cat.title.toLowerCase()} across all major areas:
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

        {/* ── SEO CONTENT — from city_service_pages.content_blocks / seo_* ─── */}
        {dbPage && <CspSeoContent data={dbPage.data} />}

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
  // BRANCH B: INDIVIDUAL SERVICE PAGE
  // Individual city services must live at /{citySlug}/{serviceSlug}.
  // This keeps /{citySlug}/services/{slug} category-only and prevents duplicate SEO pages.
  // ══════════════════════════════════════════════════════════════════════════
  const service = await getServiceBySlug(serviceSlug ?? "");
  if (service) permanentRedirect(`/${city.slug}/${service.slug}`);

  return notFound();
}
