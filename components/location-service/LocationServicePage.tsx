// components/location-service/LocationServicePage.tsx
// SERVER COMPONENT — no "use client"
// FAQAccordion is the only client island (handles useState for open/close)

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, MapPin, Star, CheckCircle,
  Clock, Shield, IndianRupee, Navigation, ArrowRight,
} from "lucide-react";
import type { LocationServiceData } from "@/lib/locationServices";
import type { CityData } from "@/lib/models/city.model";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { LocationServiceSeoContent } from "./LocationServiceSeoContent";
import { filterValidItemsByPath, getPublicPathList } from "@/lib/public-links";
import { getSmartNearbyAreasForService, getSmartRelatedServicesForLocation } from "@/lib/smart-internal-links";
import { getPageLinkOverrides } from "@/lib/page-link-overrides";
import { resolveSectionOrder, type LocationServiceSectionId } from "@/lib/locationServicePageSections";
import { formatPriceRange } from "@/lib/utils";

// ─── Theme config ────────────────────────────────────────────────────────────
const CATEGORY_THEME: Record<string, {
  bgAccent: string; btnHover: string; bgLight: string;
  accentText: string; borderClr: string; heroImage: string; badge: string;
}> = {
  car: {
    bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
    accentText: "text-blue-600", borderClr: "border-blue-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🚗 Car Service",
  },
  bike: {
    bgAccent: "bg-red-600", btnHover: "hover:bg-red-700", bgLight: "bg-red-50",
    accentText: "text-red-600", borderClr: "border-red-200",
    heroImage: "/assets/bike-mechanic-in-bangalore.webp", badge: "🏍️ Bike Service",
  },
  roadside: {
    bgAccent: "bg-red-700", btnHover: "hover:bg-red-800", bgLight: "bg-red-50",
    accentText: "text-red-700", borderClr: "border-red-200",
    heroImage: "/assets/car-emergency.webp", badge: "🆘 Roadside Assistance",
  },
  towing: {
    bgAccent: "bg-amber-600", btnHover: "hover:bg-amber-700", bgLight: "bg-amber-50",
    accentText: "text-amber-600", borderClr: "border-amber-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🚛 Towing Service",
  },
  electrical: {
    bgAccent: "bg-purple-600", btnHover: "hover:bg-purple-700", bgLight: "bg-purple-50",
    accentText: "text-purple-600", borderClr: "border-purple-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "⚡ Electrical Repair",
  },
  battery: {
    bgAccent: "bg-yellow-600", btnHover: "hover:bg-yellow-700", bgLight: "bg-yellow-50",
    accentText: "text-yellow-600", borderClr: "border-yellow-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔋 Battery Service",
  },
  puncture: {
    bgAccent: "bg-orange-600", btnHover: "hover:bg-orange-700", bgLight: "bg-orange-50",
    accentText: "text-orange-600", borderClr: "border-orange-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Puncture Repair",
  },
  mechanic: {
    bgAccent: "bg-slate-700", btnHover: "hover:bg-slate-800", bgLight: "bg-slate-50",
    accentText: "text-slate-700", borderClr: "border-slate-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔩 Mechanic Service",
  },
};

const DEFAULT_THEME = {
  bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
  accentText: "text-blue-600", borderClr: "border-blue-200",
  heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Vehicle Service",
};

const iconMap: Record<string, React.ElementType> = {
  Clock, Shield, IndianRupee, Star, Phone, MapPin, CheckCircle,
};

// Several headings — and the hero image alt/title — on this page combine
// `serviceName` with a location name (e.g. "{serviceName} in {locationHeading}").
// `serviceName` is meant to be a generic label ("Car Mechanic"), but a past
// content mistake let a location get baked into it ("Car Mechanic in HSR
// Layout"), which then doubled up everywhere that appended a location —
// "...in HSR Layout in HSR Layout". This guards every such string against
// that recurring, whatever the data.
function withLocation(serviceName: string, location: string): string {
  if (!location || serviceName.toLowerCase().includes(location.toLowerCase())) return serviceName;
  return `${serviceName} in ${location}`;
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  data: LocationServiceData;
  city: CityData;
  breadcrumbs: { name: string; url: string }[];
}

// ─── Component (Server) ──────────────────────────────────────────────────────
export async function LocationServicePage({ data, city, breadcrumbs }: Props) {
  const theme = CATEGORY_THEME[data.serviceCategory] ?? DEFAULT_THEME;
  const { bgAccent, btnHover, bgLight, accentText, borderClr, heroImage } = theme;
  // Only trust an absolute https:// URL (a real Media Library upload) — many
  // rows still carry stale local `/images/...` paths from before the Media
  // Library existed that don't correspond to any file in this repo's public/
  // folder, so anything else falls back to the category stock photo.
  const heroImageSrc = data.heroImageUrl?.trim().startsWith('https://') ? data.heroImageUrl.trim() : heroImage;
  const heroImageAltText = data.heroImageAlt?.trim() || withLocation(data.serviceName, data.displayLocation);
  const heroImageTitle = data.heroImageMeta?.title?.trim() || heroImageAltText;
  const heroImageFocal = { x: data.heroImageMeta?.focalX ?? 50, y: data.heroImageMeta?.focalY ?? 50 };
  const sourcePath = data.isCityLevel
    ? `/${data.citySlug}/${data.serviceSlug}`
    : `/${data.citySlug}/${data.areaSlug}/${data.serviceSlug}`;

  const [
    activePaths,
    overrideNearbyAreas,
    overrideRelatedServices,
    smartNearbyAreas,
    smartRelatedServices,
  ] = await Promise.all([
    getPublicPathList(),
    getPageLinkOverrides(sourcePath, "nearby_areas"),
    getPageLinkOverrides(sourcePath, "related_services"),
    getSmartNearbyAreasForService(data.citySlug, data.serviceSlug, data.areaSlug),
    getSmartRelatedServicesForLocation(
      data.citySlug,
      data.serviceSlug,
      data.serviceCategory,
      data.areaSlug
    ),
  ]);

  const configuredNearbyAreas = filterValidItemsByPath(
    data.nearbyAreas ?? [],
    (area) => `/${data.citySlug}/${area.slug}/${data.serviceSlug}`,
    activePaths,
    `${data.citySlug}/${data.areaSlug ?? data.serviceSlug} nearby area service links`,
    (area) => area.name
  );
  const overrideNearby = filterValidItemsByPath(
    overrideNearbyAreas.map((link) => ({
      name: link.label,
      slug: link.href.split("/").filter(Boolean).at(-2) ?? link.href,
      href: link.href,
    })),
    (area) => area.href,
    activePaths,
    `${sourcePath} override nearby area links`,
    (area) => area.name
  );
  const nearbyAreas = overrideNearby.length
    ? overrideNearby
    : configuredNearbyAreas.length
      ? configuredNearbyAreas
      : filterValidItemsByPath(
          smartNearbyAreas,
          (area) => area.href,
          activePaths,
          `${data.citySlug}/${data.serviceSlug} smart nearby area links`,
          (area) => area.name
        );

  const configuredRelatedServices = filterValidItemsByPath(
    data.relatedServices ?? [],
    (service) => data.isCityLevel
      ? `/${data.citySlug}/${service.slug}`
      : `/${data.citySlug}/${data.areaSlug}/${service.slug}`,
    activePaths,
    `${data.citySlug}/${data.areaSlug ?? data.serviceSlug} related service links`,
    (service) => service.name
  );
  const overrideRelated = filterValidItemsByPath(
    overrideRelatedServices.map((link) => ({
      name: link.label,
      slug: link.href.split("/").filter(Boolean).at(-1) ?? link.href,
      category: "",
      href: link.href,
    })),
    (service) => service.href,
    activePaths,
    `${sourcePath} override related service links`,
    (service) => service.name
  );
  const relatedServices = overrideRelated.length
    ? overrideRelated
    : configuredRelatedServices.length
      ? configuredRelatedServices
      : filterValidItemsByPath(
          smartRelatedServices,
          (service) => service.href,
          activePaths,
          `${data.citySlug}/${data.serviceSlug} smart related service links`,
          (service) => service.name
        );

  // The 8 sections between About and the closing CTA are reorderable,
  // hideable, and heading-overridable from the admin's Page Layout tab
  // (`location_services.page_layout`). Hero/Trust Strip/About/closing CTA
  // stay fixed — see lib/locationServicePageSections.ts for the rationale.
  const layoutRows = resolveSectionOrder(data.pageLayout ?? []);
  const layoutById = new Map(layoutRows.map((row) => [row.id, row]));
  const sectionVisible = (id: LocationServiceSectionId) => layoutById.get(id)?.visible !== false;
  const sectionHeading = (id: LocationServiceSectionId, fallback: string) => {
    const override = layoutById.get(id)?.heading;
    return override && override.trim() ? override : fallback;
  };

  const sectionRenderers: Record<LocationServiceSectionId, () => React.ReactNode> = {
    why_choose: () => data.whyChoosePoints.length === 0 ? null : (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {sectionHeading("why_choose", `Why Choose Fiixup in ${data.locationHeading}?`)}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whyChoosePoints.map((p) => {
              const I = iconMap[p.icon] ?? CheckCircle;
              return (
                <div key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className={`${bgLight} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <I className={`w-6 h-6 ${accentText}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    how_it_works: () => (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {sectionHeading("how_it_works", `How Doorstep ${withLocation(data.serviceName, data.locationHeading)} Works`)}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Book Online or Call", desc: `Call ${city.phone} or fill the form.` },
              { step: "2", title: "We Confirm & Dispatch", desc: "Nearest available technician dispatched." },
              { step: "3", title: "Tech Arrives at Door", desc: "Certified technician with tools and parts." },
              { step: "4", title: "Drive Away Happy", desc: "30-day warranty and digital receipt." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className={`w-14 h-14 ${bgAccent} text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg`}>
                  {step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),

    seo_content: () => <LocationServiceSeoContent data={data} />,

    pricing: () => data.pricingRows.length === 0 ? null : (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            {sectionHeading("pricing", `${withLocation(data.serviceName, data.locationHeading)} Cost`)}
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Transparent pricing — quoted before work begins.
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-900 text-white grid grid-cols-3 px-6 py-3 text-sm font-semibold">
                <span>Service</span>
                <span className="text-center">Price</span>
                <span className="text-right">Note</span>
              </div>
              {data.pricingRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <span className="font-medium text-gray-900">{row.label}</span>
                  <span className="text-center font-semibold text-gray-800">
                    {formatPriceRange(row.priceFrom, row.priceTo)}
                  </span>
                  <span className="text-right text-gray-500">{row.note ?? "—"}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">{data.pricingDisclaimer}</p>
            <div className="mt-6 text-center">
              <Link
                href={`/${city.slug}#contact`}
                className={`${bgAccent} ${btnHover} text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block`}
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    ),

    testimonials: () => data.testimonials.length === 0 ? null : (
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {sectionHeading("testimonials", `What ${data.locationHeading} Customers Say`)}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">&quot;{t.text}&quot;</p>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.vehicle}</p>
                  <p className="text-blue-600 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {t.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),

    faqs: () => data.faqs.length === 0 ? null : (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            {sectionHeading("faqs", `${withLocation(data.serviceName, data.locationHeading)} — FAQs`)}
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Common questions from our customers here.
          </p>
          {/* Only this component is "use client" */}
          <FAQAccordion faqs={data.faqs} accentText={accentText} />
        </div>
      </section>
    ),

    nearby_areas: () => nearbyAreas.length === 0 ? null : (
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            {sectionHeading("nearby_areas", `${data.serviceName} in Nearby Areas`)}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {nearbyAreas.map((area) => (
              <Link
                key={area.slug}
                href={(area as { href?: string }).href ?? `/${data.citySlug}/${area.slug}/${data.serviceSlug}`}
                className={`flex items-center gap-2 border-2 ${borderClr} ${accentText} font-semibold px-5 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors`}
              >
                <Navigation className="w-4 h-4" />
                {area.name}
              </Link>
            ))}
            {!data.isCityLevel && (
              <Link
                href={`/${data.citySlug}/${data.serviceSlug}`}
                className={`flex items-center gap-2 ${bgAccent} text-white font-semibold px-5 py-2 rounded-full text-sm`}
              >
                <MapPin className="w-4 h-4" /> All of {data.cityName}
              </Link>
            )}
          </div>
        </div>
      </section>
    ),

    related_services: () => relatedServices.length === 0 ? null : (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{sectionHeading("related_services", `Other Services in ${data.locationHeading}`)}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={(s as { href?: string }).href ?? (
                  data.isCityLevel
                    ? `/${data.citySlug}/${s.slug}`
                    : `/${data.citySlug}/${data.areaSlug}/${s.slug}`
                )}
                className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all group"
              >
                <h3 className={`font-bold text-gray-900 group-hover:${accentText} transition-colors mb-1`}>
                  {s.name}
                </h3>
                <p className={`text-sm font-bold ${accentText} flex items-center gap-1 mt-3`}>
                  View Details <ArrowRight className="w-3 h-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    ),
  };

  return (
    <>
      {/* HERO */}
      <section className={`${bgLight} py-6 border-b border-gray-200`}>
        <div className="container mx-auto px-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.url} className="flex items-center gap-2">
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <Link href={crumb.url} className="hover:text-blue-600 transition-colors">
                      {crumb.name}
                    </Link>
                    <span>/</span>
                  </>
                ) : (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block ${bgAccent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4`}>
                {theme.badge} — {data.locationHeading}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {data.heroHeading}
              </h1>
              <p className="text-lg text-gray-600 mb-2">{data.heroSubheading}</p>
              <p className={`text-sm ${accentText} ${bgLight} border ${borderClr} rounded-lg px-4 py-2 mb-6`}>
                {data.heroBadgeText || `📍 Serving all areas in ${data.displayLocation}`}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <p className={`text-2xl font-bold ${accentText}`}>
                    {data.availability || "24/7"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Always Available
                  </p>
                </div>

                <div className="w-px bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.arrival_time || "20 min"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Quick Arrival
                  </p>
                </div>

                <div className="w-px bg-gray-200" />

                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {data.warranty || "30-Day"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Warranty
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${city.slug}#contact`}
                  className={`${bgAccent} ${btnHover} text-white px-8 py-3 rounded-lg font-bold transition-colors`}
                >
                  Book in {data.locationHeading}
                </Link>
                <a
                  href={`tel:${city.phone}`}
                  className="bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-blue-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {city.phone}
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block relative">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[420px] w-full relative">
                <Image
                  src={heroImageSrc}
                  alt={heroImageAltText}
                  title={heroImageTitle}
                  fill
                  className="object-cover"
                  style={{ objectPosition: `${heroImageFocal.x}% ${heroImageFocal.y}%` }}
                  priority
                  sizes="50vw"
                />
              </div>
              {Number(data.schemaReviewCount) > 0 ? (
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg">
                  <p className="text-2xl font-bold">{data.schemaAggregateRating}/5</p>
                  <p className="text-xs font-semibold">{data.schemaReviewCount}+ Reviews</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: "Certified Technicians" },
              { icon: CheckCircle, label: "30-Day Warranty" },
              { icon: Clock, label: "24/7 Available" },
              { icon: IndianRupee, label: "Transparent Pricing" },
              { icon: MapPin, label: "Doorstep Service" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-2">
                <I className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{data.aboutHeading}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{data.aboutPara1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{data.aboutPara2}</p>
              <ul className="space-y-4">
                {data.aboutBullets.map((b) => (
                  <li key={b.heading} className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{b.heading}</h3>
                      <p className="text-gray-600 text-sm">{b.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${bgLight} rounded-2xl p-8 space-y-5`}>
              {data.serviceHighlights.map((h) => (
                <div key={h.title} className={`bg-white border ${borderClr} rounded-xl p-5`}>
                  <h3 className="font-bold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reorderable/hideable/heading-overridable sections — see lib/locationServicePageSections.ts */}
      {layoutRows.map((row) => (
        <Fragment key={row.id}>{sectionVisible(row.id) ? sectionRenderers[row.id]() : null}</Fragment>
      ))}

      {/* BOTTOM CTA */}
      <section className={`py-16 ${bgAccent} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">
            Book {withLocation(data.serviceName, data.locationHeading)} Now
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Certified technicians available 24/7 across {data.displayLocation}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${city.slug}#contact`}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${city.phone}`}
              className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-black/30 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {city.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
