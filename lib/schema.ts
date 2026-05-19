// lib/schema.ts — Fiixup Complete JSON-LD Schema Library
// ─────────────────────────────────────────────────────────────────────────────
// EVERY schema outputs a single @graph array so Google reads one coherent
// document per page instead of multiple disconnected fragments.
//
// PAGE → FUNCTION MAP
//  /                                        homeSchema()
//  /bangalore                               cityPageSchema(city, faqs)
//  /bangalore/koramangala                   areaPageSchema(opts)
//  /bangalore/car-mechanic-near-me          locationServiceSchema(opts)   ← city-level
//  /bangalore/koramangala/bike-mechanic     locationServiceSchema(opts)   ← area-level
//  /services                                servicesListingSchema(services)
//  /services/car                            serviceCategorySchema(opts)
//  /services/car-oil-change-at-home         serviceDetailSchema(opts)
//  /bangalore/services/car-oil-change       serviceDetailSchema(opts + city)
//  /blog                                    blogListingSchema(posts)
//  /blog/[slug]                             blogPostSchema(opts)
//  /faq                                     faqPageSchema(faqs)
//  /about                                   aboutPageSchema()
//  /contact                                 contactPageSchema()
//
// BACKWARD-COMPAT ALIASES (old names still exported — no page breaks)
//  localBusinessSchema → cityPageSchema
//  serviceSchema       → serviceDetailSchema
//  faqSchema           → faqPageSchema
//  breadcrumbSchema    → _breadcrumb (standalone export)
// ─────────────────────────────────────────────────────────────────────────────

import { SITE_URL, MAIN_PHONE, MAIN_EMAIL } from "./constants";

// ── Constants ────────────────────────────────────────────────────────────────
const LOGO     = `${SITE_URL}/assets/logo.webp`;
const OG_IMAGE = `${SITE_URL}/assets/og-image.webp`;
const ORG_ID   = `${SITE_URL}/#organization`;   // anchor for all @id cross-links
const SITE_ID  = `${SITE_URL}/#website`;

// ─────────────────────────────────────────────────────────────────────────────
// CITY_DATA — canonical geo data for the 4 live cities
// Used by locationServiceSchema so area pages have accurate coordinates.
// ─────────────────────────────────────────────────────────────────────────────
export const CITY_DATA = {
  bangalore: {
    name: "Bangalore", slug: "bangalore", state: "Karnataka",
    postalCode: "560001", lat: 12.9716, lng: 77.5946,
    phone: MAIN_PHONE, email: "bangalore@fiixup.in", reviewCount: 1200,
    areas: ["Koramangala","Whitefield","Indiranagar","HSR Layout","Marathahalli",
      "Electronic City","Jayanagar","JP Nagar","Rajajinagar","Banashankari",
      "Hebbal","Yelahanka","Sarjapur"] as string[],
  },
  chennai: {
    name: "Chennai", slug: "chennai", state: "Tamil Nadu",
    postalCode: "600001", lat: 13.0827, lng: 80.2707,
    phone: MAIN_PHONE, email: "chennai@fiixup.in", reviewCount: 800,
    areas: ["Anna Nagar","T. Nagar","OMR","Velachery","Adyar",
      "Porur","Tambaram","Sholinganallur","Perambur","Guindy"] as string[],
  },
  hyderabad: {
    name: "Hyderabad", slug: "hyderabad", state: "Telangana",
    postalCode: "500001", lat: 17.3850, lng: 78.4867,
    phone: MAIN_PHONE, email: "hyderabad@fiixup.in", reviewCount: 600,
    areas: ["Hitech City","Gachibowli","Banjara Hills","Jubilee Hills",
      "Madhapur","Kondapur","Kukatpally","Secunderabad","LB Nagar"] as string[],
  },
  mumbai: {
    name: "Mumbai", slug: "mumbai", state: "Maharashtra",
    postalCode: "400001", lat: 19.0760, lng: 72.8777,
    phone: MAIN_PHONE, email: "mumbai@fiixup.in", reviewCount: 400,
    areas: ["Andheri","Bandra","Powai","Thane","Borivali",
      "Malad","Goregaon","Kurla","Navi Mumbai","Mulund"] as string[],
  },
};
export type CityKey = keyof typeof CITY_DATA;

// Plain interface — accepts data from Supabase without `as const` narrowing issues
export interface LocalBusinessCity {
  name: string; slug: string; state: string; postalCode: string;
  lat: number;  lng: number;  phone: string; email: string;
  reviewCount: number; areas: readonly string[] | string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────
function _breadcrumb(crumbs: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${crumbs[crumbs.length - 1].url}/#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type":  "ListItem",
      position: i + 1,
      name:     c.name,
      item:     c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

function _faqItems(faqs: { q: string; a: string }[]) {
  return faqs.map((f) => ({
    "@type": "Question",
    name:    f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

function _avgRating(testimonials: { rating: number }[]) {
  if (testimonials.length === 0) return "4.9";
  return (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. homeSchema() ─ app/page.tsx ONLY
//
//  Signals:  Organization + WebSite (Sitelinks search box)
//  Why:      Establishes the national brand entity. Every city/service schema
//            @id-links back to ORG_ID — Google traces E-E-A-T from one root.
//  Rich results unlocked:
//    ✓ Sitelinks Search Box
//    ✓ Knowledge Panel (Organization)
//    ✓ Brand SERP features
// ═════════════════════════════════════════════════════════════════════════════
export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":      "Organization",
        "@id":        ORG_ID,
        name:         "Fiixup",
        url:          SITE_URL,
        logo:         { "@type": "ImageObject", url: LOGO, width: 200, height: 60 },
        image:        OG_IMAGE,
        description:  "India's 24/7 doorstep car and bike repair service. Certified mechanics at your home or office in Bangalore, Chennai, Hyderabad and Mumbai.",
        telephone:    MAIN_PHONE,
        email:        MAIN_EMAIL,
        foundingDate: "2020",
        areaServed:   { "@type": "Country", name: "India" },
        sameAs: [
          "https://www.facebook.com/fiixup1/",
          "https://www.instagram.com/fiixup_in/",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9", reviewCount: "10000",
          bestRating: "5", worstRating: "1",
        },
        contactPoint: {
          "@type":           "ContactPoint",
          telephone:         MAIN_PHONE,
          contactType:       "customer service",
          availableLanguage: ["English","Hindi","Kannada","Tamil","Telugu"],
          hoursAvailable:    "Mo-Su 00:00-24:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name:    "Vehicle Repair Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car Repair at Home" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bike Repair at Home" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car Towing Service" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roadside Assistance" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Car Battery Replacement" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tyre Puncture Repair" } },
          ],
        },
      },
      {
        "@type":     "WebSite",
        "@id":       SITE_ID,
        url:         SITE_URL,
        name:        "Fiixup",
        description: "24/7 Doorstep Car & Bike Repair in India",
        publisher:   { "@id": ORG_ID },
        inLanguage:  "en-IN",
        potentialAction: {
          "@type":       "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. cityPageSchema() ─ app/[citySlug]/page.tsx
//
//  Signals:  AutoRepair + LocalBusiness + BreadcrumbList + FAQPage (if faqs)
//  Why:      AutoRepair schema = Google Maps / Local Pack eligibility.
//            areaServed neighbourhoods captures every "mechanic in [area]" query
//            without needing individual area pages.
//            FAQPage = expandable rich snippets in SERP.
//  Rich results unlocked:
//    ✓ Local Pack / Map Pack
//    ✓ FAQ rich snippets
//    ✓ Breadcrumbs in SERP
// ═════════════════════════════════════════════════════════════════════════════
export function cityPageSchema(
  city: LocalBusinessCity,
  faqs: { q: string; a: string }[]
) {
  const graph: object[] = [
    {
      "@type":      ["AutoRepair", "LocalBusiness"],
      "@id":        `${SITE_URL}/${city.slug}/#business`,
      name:         `Fiixup ${city.name}`,
      url:          `${SITE_URL}/${city.slug}`,
      image:        OG_IMAGE,
      telephone:    city.phone,
      email:        city.email,
      openingHours: "Mo-Su 00:00-24:00",
      priceRange:   "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted:    "Cash, UPI, Credit Card, Debit Card",
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion:   city.state,
        postalCode:      city.postalCode,
        addressCountry:  "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lng },
      areaServed: [
        { "@type": "City", name: city.name },
        ...city.areas.map((a) => ({ "@type": "Place", name: String(a) })),
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: String(city.reviewCount),
        bestRating: "5", worstRating: "1",
      },
      parentOrganization: { "@id": ORG_ID },
      hasMap: `https://www.google.com/maps/search/Fiixup+${encodeURIComponent(city.name)}`,
    },
    _breadcrumb([
      { name: "Home",     url: "/" },
      { name: city.name,  url: `/${city.slug}` },
    ]),
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${SITE_URL}/${city.slug}/#faq`,
      mainEntity: _faqItems(faqs),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. areaPageSchema() ─ app/[citySlug]/[areaSlug]/page.tsx
//    (Only for plain area hub pages — NOT for location_service driven pages)
//
//  Signals:  AutoRepair + LocalBusiness (area-scoped) + BreadcrumbList + FAQPage
//  Why:      Hyper-local trust signal for "mechanic near me in [area]" searches.
//            streetAddress = area name for maximum local relevance.
//  Rich results unlocked:
//    ✓ Local Pack with neighbourhood-level relevance
//    ✓ FAQ snippets
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function areaPageSchema(opts: {
  cityName: string; citySlug: string; cityState: string;
  cityPhone: string; cityEmail: string;
  cityLat: number;  cityLng: number;
  areaName: string; areaSlug: string;
  reviewCount: number;
  faqs: { q: string; a: string }[];
}) {
  const graph: object[] = [
    {
      "@type":      ["AutoRepair", "LocalBusiness"],
      "@id":        `${SITE_URL}/${opts.citySlug}/${opts.areaSlug}/#business`,
      name:         `Fiixup ${opts.areaName}, ${opts.cityName}`,
      url:          `${SITE_URL}/${opts.citySlug}/${opts.areaSlug}`,
      image:        OG_IMAGE,
      telephone:    opts.cityPhone,
      email:        opts.cityEmail,
      openingHours: "Mo-Su 00:00-24:00",
      priceRange:   "₹₹",
      address: {
        "@type":         "PostalAddress",
        streetAddress:   opts.areaName,
        addressLocality: opts.cityName,
        addressRegion:   opts.cityState,
        addressCountry:  "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: opts.cityLat, longitude: opts.cityLng },
      areaServed: { "@type": "Place", name: `${opts.areaName}, ${opts.cityName}` },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: String(opts.reviewCount),
        bestRating: "5", worstRating: "1",
      },
      parentOrganization: { "@id": ORG_ID },
    },
    _breadcrumb([
      { name: "Home",         url: "/" },
      { name: opts.cityName,  url: `/${opts.citySlug}` },
      { name: opts.areaName,  url: `/${opts.citySlug}/${opts.areaSlug}` },
    ]),
  ];

  if (opts.faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${SITE_URL}/${opts.citySlug}/${opts.areaSlug}/#faq`,
      mainEntity: _faqItems(opts.faqs),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. locationServiceSchema() ─ THE MOST IMPORTANT SCHEMA
//    app/[citySlug]/[areaSlug]/page.tsx    (city-level: /bangalore/car-mechanic-near-me)
//    app/[citySlug]/[areaSlug]/[serviceSlug]/page.tsx  (area-level)
//
//  Signals:  AutoRepair(LocalBusiness) + Service + Review[] + FAQPage + BreadcrumbList
//  Why:      Combined LocalBusiness + Service = appears in BOTH local pack AND organic.
//            Review[] from real testimonials = star rating snippets in SERP (huge CTR).
//            FAQPage = expandable questions below result.
//            nearbyAreas in areaServed = captures surrounding area searches.
//  Rich results unlocked:
//    ✓ Star ratings in SERP (from Review[])
//    ✓ Local Pack eligibility
//    ✓ Price snippet (from PriceSpecification)
//    ✓ FAQ rich snippets
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function locationServiceSchema(opts: {
  serviceName:     string;
  serviceSlug:     string;
  serviceCategory: string;
  canonicalUrl:    string;
  heroHeading:     string;
  aboutPara1:      string;
  cityName:        string;
  citySlug:        string;
  cityState?:      string;
  areaName?:       string | null;
  areaSlug?:       string | null;
  pricingRows?:    { label: string; priceFrom: number; priceTo?: number }[];
  testimonials?:   { name: string; rating: number; text: string; date?: string; vehicle?: string }[];
  faqs?:           { q: string; a: string }[];
  reviewCount?:    number | string | null;
  ratingValue?:    number | string | null;
  nearbyAreas?:    { name: string; slug: string }[];
  cityLat?:        number;
  cityLng?:        number;
  cityPhone?:      string;
  cityEmail?:      string;
  cityPostalCode?: string;
}) {
  const {
    serviceName, serviceSlug, serviceCategory, canonicalUrl,
    heroHeading, aboutPara1,
    cityName, citySlug, cityState = "India",
    areaName, areaSlug,
    pricingRows = [], testimonials = [], faqs = [],
    reviewCount, ratingValue,
    cityLat = 0, cityLng = 0,
    cityPhone = MAIN_PHONE, cityEmail = MAIN_EMAIL,
    cityPostalCode = "000000",
    nearbyAreas = [],
  } = opts;

  const isArea   = Boolean(areaSlug && areaName);
  const locLabel = isArea ? `${areaName}, ${cityName}` : cityName;
  const pageUrl  = canonicalUrl.startsWith("http") ? canonicalUrl : `${SITE_URL}${canonicalUrl}`;

  // Price derivation
  const prices   = pricingRows.map((r) => r.priceFrom).filter(Boolean);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 499;
  const maxPrices = pricingRows.map((r) => r.priceTo ?? r.priceFrom);
  const maxPrice  = maxPrices.length > 0 ? Math.max(...maxPrices) : minPrice * 3;

  // Rating derivation
  const totalReviews = reviewCount ?? (testimonials.length > 0 ? testimonials.length * 30 : 200);
  const avgRating    = ratingValue  ?? _avgRating(testimonials);

  // Build Review[] — max 5 to stay within reasonable JSON-LD size
  const reviews = testimonials.slice(0, 5).map((t) => ({
    "@type":  "Review",
    author:   { "@type": "Person", name: t.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating), bestRating: "5", worstRating: "1",
    },
    reviewBody: t.text,
    ...(t.date    && { datePublished: t.date }),
    ...(t.vehicle && { description: `Vehicle: ${t.vehicle}` }),
  }));

  // Breadcrumb path
  const crumbs = isArea
    ? [
        { name: "Home",          url: "/" },
        { name: cityName,        url: `/${citySlug}` },
        { name: areaName!,       url: `/${citySlug}/${areaSlug}` },
        { name: serviceName,     url: canonicalUrl },
      ]
    : [
        { name: "Home",          url: "/" },
        { name: cityName,        url: `/${citySlug}` },
        { name: serviceName,     url: canonicalUrl },
      ];

  const graph: object[] = [
    // LocalBusiness — drives Local Pack
    {
      "@type":      ["AutoRepair", "LocalBusiness"],
      "@id":        `${pageUrl}/#business`,
      name:         `${serviceName} in ${locLabel} — Fiixup`,
      url:          pageUrl,
      image:        OG_IMAGE,
      telephone:    cityPhone,
      email:        cityEmail,
      openingHours: "Mo-Su 00:00-24:00",
      priceRange:   "₹₹",
      address: {
        "@type":         "PostalAddress",
        ...(isArea && { streetAddress: areaName! }),
        addressLocality: cityName,
        addressRegion:   cityState,
        postalCode:      cityPostalCode,
        addressCountry:  "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: cityLat, longitude: cityLng },
      areaServed: [
        { "@type": "Place", name: locLabel },
        ...nearbyAreas.slice(0, 5).map((a) => ({ "@type": "Place", name: a.name })),
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(avgRating),
        reviewCount: String(totalReviews),
        bestRating: "5", worstRating: "1",
      },
      ...(reviews.length > 0 && { review: reviews }),
      parentOrganization: { "@id": ORG_ID },
      hasMap: `https://www.google.com/maps/search/${encodeURIComponent(`${serviceName} ${locLabel}`)}`,
    },
    // Service — drives organic rich results
    {
      "@type":      "Service",
      "@id":        `${pageUrl}/#service`,
      name:         `${serviceName} in ${locLabel}`,
      description:  aboutPara1,
      url:          pageUrl,
      serviceType:  heroHeading,
      category:     serviceCategory,
      provider:     { "@id": ORG_ID },
      areaServed:   { "@type": "Place", name: locLabel },
      offers: {
        "@type":        "Offer",
        priceCurrency:  "INR",
        availability:   "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice, maxPrice, priceCurrency: "INR",
        },
      },
    },
    _breadcrumb(crumbs),
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${pageUrl}/#faq`,
      mainEntity: _faqItems(faqs),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ═════════════════════════════════════════════════════════════════════════════
// 5. servicesListingSchema() ─ app/services/page.tsx
//
//  Signals:  WebPage + ItemList + BreadcrumbList
//  Why:      ItemList = sitelinks for subcategory pages.
//            WebPage ties to org for E-E-A-T signal.
//  Rich results unlocked:
//    ✓ Sitelinks for service subcategories
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function servicesListingSchema(
  services: { name: string; slug: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":       "WebPage",
        "@id":         `${SITE_URL}/services/#webpage`,
        url:           `${SITE_URL}/services`,
        name:          "Doorstep Car & Bike Repair Services — Fiixup",
        description:   "All car and bike repair services at your doorstep in Bangalore, Chennai, Hyderabad and Mumbai. 24/7 certified mechanics. No garage visit needed.",
        isPartOf:      { "@id": SITE_ID },
        about:         { "@id": ORG_ID },
        breadcrumb:    { "@id": `${SITE_URL}/services/#breadcrumb` },
      },
      {
        "@type":         "ItemList",
        "@id":           `${SITE_URL}/services/#itemlist`,
        name:            "Vehicle Repair Services by Fiixup",
        numberOfItems:   services.length,
        itemListElement: services.map((s, i) => ({
          "@type":    "ListItem",
          position:   i + 1,
          name:       s.name,
          description: s.description,
          url:        `${SITE_URL}/services/${s.slug}`,
        })),
      },
      _breadcrumb([
        { name: "Home",     url: "/" },
        { name: "Services", url: "/services" },
      ]),
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 6. serviceCategorySchema() ─ /services/car, /services/bike etc.
//    Also used for /[citySlug]/services/[categorySlug]
//
//  Signals:  Service + OfferCatalog + BreadcrumbList + FAQPage
//  Why:      OfferCatalog lists all sub-services = individual service pages
//            get discovered/indexed via parent category.
//  Rich results unlocked:
//    ✓ Service rich result with offer list
//    ✓ FAQ snippets
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function serviceCategorySchema(opts: {
  categoryName: string;
  categorySlug: string;
  description:  string;
  services:     { name: string; slug: string; description: string; minPrice?: number }[];
  faqs?:        { q: string; a: string }[];
  cityName?:    string;
  citySlug?:    string;
}) {
  const { categoryName, categorySlug, description, services, faqs = [], cityName, citySlug } = opts;
  const isCity  = Boolean(cityName && citySlug);
  const baseUrl = isCity
    ? `${SITE_URL}/${citySlug}/services/${categorySlug}`
    : `${SITE_URL}/services/${categorySlug}`;
  const label   = isCity ? `${categoryName} in ${cityName}` : categoryName;

  const crumbs = isCity
    ? [
        { name: "Home",         url: "/" },
        { name: cityName!,      url: `/${citySlug}` },
        { name: categoryName,   url: `/${citySlug}/services/${categorySlug}` },
      ]
    : [
        { name: "Home",         url: "/" },
        { name: "Services",     url: "/services" },
        { name: categoryName,   url: `/services/${categorySlug}` },
      ];

  const graph: object[] = [
    {
      "@type":    "Service",
      "@id":      `${baseUrl}/#service`,
      name:       label,
      description,
      url:        baseUrl,
      provider:   { "@id": ORG_ID },
      areaServed: isCity
        ? { "@type": "City", name: cityName }
        : ["Bangalore","Chennai","Hyderabad","Mumbai"].map((n) => ({ "@type": "City", name: n })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:    `${label} Options`,
        itemListElement: services.map((s) => ({
          "@type":      "Offer",
          name:         s.name,
          url:          `${SITE_URL}/services/${s.slug}`,
          description:  s.description,
          ...(s.minPrice && {
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: s.minPrice,
              priceCurrency: "INR",
            },
          }),
        })),
      },
    },
    _breadcrumb(crumbs),
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${baseUrl}/#faq`,
      mainEntity: _faqItems(faqs),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ═════════════════════════════════════════════════════════════════════════════
// 7. serviceDetailSchema() ─ /services/[slug] individual service pages
//    Also used for /[citySlug]/services/[serviceSlug]
//
//  Signals:  Service + AggregateRating + Review[] + HowTo + BreadcrumbList + FAQPage
//  Why:      AggregateRating + Review[] = ⭐⭐⭐⭐⭐ stars in SERP (biggest CTR boost).
//            HowTo = rich result for "how to book [service]" featured snippets.
//            FAQPage = expandable questions.
//  Rich results unlocked:
//    ✓ Star rating snippets in organic results
//    ✓ HowTo rich result / featured snippet
//    ✓ Price range snippet
//    ✓ FAQ snippets
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function serviceDetailSchema(opts: {
  name:         string;
  slug:         string;
  description:  string;
  minPrice:     number;
  maxPrice:     number;
  duration?:    string;
  features?:    string[];
  faqs?:        { q: string; a: string }[];
  testimonials?: {
    name: string; rating: number; review: string;
    location?: string; vehicle?: string; date?: string;
  }[];
  cityName?:    string;
  citySlug?:    string;
}) {
  const {
    name, slug, description, minPrice, maxPrice,
    duration, features = [], faqs = [], testimonials = [],
    cityName, citySlug,
  } = opts;

  const isCity  = Boolean(cityName && citySlug);
  const baseUrl = isCity
    ? `${SITE_URL}/${citySlug}/services/${slug}`
    : `${SITE_URL}/services/${slug}`;
  const label   = isCity ? `${name} in ${cityName}` : name;

  const crumbs = isCity
    ? [
        { name: "Home",      url: "/" },
        { name: cityName!,   url: `/${citySlug}` },
        { name: name,        url: `/${citySlug}/services/${slug}` },
      ]
    : [
        { name: "Home",      url: "/" },
        { name: "Services",  url: "/services" },
        { name: name,        url: `/services/${slug}` },
      ];

  const totalRatings = testimonials.length > 0 ? testimonials.length * 25 : 500;
  const avgRating    = _avgRating(testimonials) || "4.9";

  const reviews = testimonials.slice(0, 10).map((t) => ({
    "@type":  "Review",
    author: {
      "@type": "Person",
      name: t.name,
      ...(t.location && { address: { "@type": "PostalAddress", addressLocality: t.location } }),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating), bestRating: "5", worstRating: "1",
    },
    reviewBody: t.review,
    ...(t.date    && { datePublished: t.date }),
    ...(t.vehicle && { description: `Vehicle: ${t.vehicle}` }),
  }));

  const graph: object[] = [
    {
      "@type":    "Service",
      "@id":      `${baseUrl}/#service`,
      name:       label,
      description,
      url:        baseUrl,
      provider:   { "@id": ORG_ID },
      areaServed: isCity
        ? { "@type": "City", name: cityName }
        : ["Bangalore","Chennai","Hyderabad","Mumbai"].map((n) => ({ "@type": "City", name: n })),
      offers: {
        "@type":       "Offer",
        priceCurrency: "INR",
        availability:  "https://schema.org/InStock",
        ...(duration && { deliveryTime: duration }),
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice, maxPrice, priceCurrency: "INR",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: String(totalRatings),
        bestRating: "5", worstRating: "1",
      },
      ...(reviews.length > 0  && { review: reviews }),
      ...(features.length > 0 && {
        serviceOutput: features.map((f) => ({ "@type": "Thing", name: f })),
      }),
    },
    _breadcrumb(crumbs),
  ];

  // HowTo schema — only for global (non-city) pages, adds HowTo featured snippet
  if (!isCity && features.length >= 3) {
    graph.push({
      "@type":       "HowTo",
      "@id":         `${baseUrl}/#howto`,
      name:          `How to Book ${name} at Your Doorstep — Fiixup`,
      description:   `Book ${name} at your home in 3 easy steps. Certified mechanic arrives in 30–60 min.`,
      totalTime:     "PT60M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "INR", minValue: minPrice, maxValue: maxPrice },
      step: [
        {
          "@type": "HowToStep", position: 1,
          name: "Call or Book Online",
          text: `Call ${MAIN_PHONE} or fill the online booking form with your vehicle details and location.`,
        },
        {
          "@type": "HowToStep", position: 2,
          name: "Certified Mechanic Dispatched",
          text: "A certified mechanic is dispatched to your exact location within 30–60 minutes.",
        },
        {
          "@type": "HowToStep", position: 3,
          name: "Service Completed at Doorstep",
          text: `${name} completed at your home or office. 30-day service warranty included.`,
        },
      ],
    });
  }

  if (faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${baseUrl}/#faq`,
      mainEntity: _faqItems(faqs),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ═════════════════════════════════════════════════════════════════════════════
// 8. blogListingSchema() ─ app/blog/page.tsx
//
//  Signals:  Blog + ItemList + BreadcrumbList
//  Why:      Blog entity = E-E-A-T authoritativeness.
//            ItemList = individual posts get sitelink treatment.
//  Rich results unlocked:
//    ✓ Blog entity in Knowledge Panel
//    ✓ Post sitelinks
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function blogListingSchema(
  posts: { title: string; slug: string; excerpt: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":     "Blog",
        "@id":       `${SITE_URL}/blog/#blog`,
        name:        "Fiixup Blog — Car & Bike Maintenance Guides",
        description: "Expert car and bike maintenance tips, repair guides, city-specific advice and emergency how-tos from India's leading doorstep auto service.",
        url:         `${SITE_URL}/blog`,
        publisher:   { "@id": ORG_ID },
        inLanguage:  "en-IN",
        blogPost:    posts.slice(0, 10).map((p) => ({
          "@type":       "BlogPosting",
          headline:      p.title,
          url:           `${SITE_URL}/blog/${p.slug}`,
          description:   p.excerpt,
          datePublished: p.date,
          author:        { "@id": ORG_ID },
        })),
      },
      {
        "@type":         "ItemList",
        "@id":           `${SITE_URL}/blog/#itemlist`,
        name:            "Latest Articles",
        numberOfItems:   posts.length,
        itemListElement: posts.map((p, i) => ({
          "@type":    "ListItem",
          position:   i + 1,
          name:       p.title,
          url:        `${SITE_URL}/blog/${p.slug}`,
        })),
      },
      _breadcrumb([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
      ]),
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 9. blogPostSchema() ─ app/blog/[id]/page.tsx
//
//  Signals:  Article + BreadcrumbList
//  Why:      datePublished + author + publisher = Google News / Discover eligibility.
//            Pass author name + role from posts table for Person entity E-E-A-T.
//            isPartOf links back to Blog entity.
//  Rich results unlocked:
//    ✓ Article rich result
//    ✓ Google Discover eligibility
//    ✓ Google News eligibility
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function blogPostSchema(opts: {
  title:       string;
  slug:        string;
  description: string;
  coverImage:  string;
  publishedAt: string;
  updatedAt?:  string;
  tags?:       string[];
  author?:     string;
  authorRole?: string;
  category?:   string;
}) {
  const { title, slug, description, coverImage, publishedAt, updatedAt, tags, author, authorRole, category } = opts;
  const pageUrl = `${SITE_URL}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":        "Article",
        "@id":          `${pageUrl}/#article`,
        headline:       title,
        description,
        image:          { "@type": "ImageObject", url: coverImage, width: 1200, height: 630 },
        datePublished:  publishedAt,
        dateModified:   updatedAt ?? publishedAt,
        author: author
          ? {
              "@type": "Person",
              name: author,
              ...(authorRole && { jobTitle: authorRole }),
              worksFor: { "@id": ORG_ID },
            }
          : { "@id": ORG_ID },
        publisher: {
          "@type": "Organization",
          "@id":   ORG_ID,
          name:    "Fiixup",
          logo:    { "@type": "ImageObject", url: LOGO },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        inLanguage:       "en-IN",
        isPartOf:         { "@id": `${SITE_URL}/blog/#blog` },
        ...(tags && tags.length > 0 && { keywords: tags.join(", ") }),
        ...(category && { articleSection: category }),
      },
      _breadcrumb([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: title,  url: `/blog/${slug}` },
      ]),
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 10. faqPageSchema() ─ app/faq/page.tsx
//     Also called internally by city/area/service/location-service schemas.
//
//  Signals:  FAQPage
//  Why:      Direct FAQ rich result = expanded SERP entry = significantly higher CTR.
//  Rich results unlocked:
//    ✓ FAQ rich snippets (expandable in SERP)
// ═════════════════════════════════════════════════════════════════════════════
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: _faqItems(faqs),
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 11. aboutPageSchema() ─ app/about/page.tsx
//
//  Signals:  AboutPage + Organization + BreadcrumbList
//  Why:      AboutPage = E-E-A-T signal for Google's quality raters.
//            Full Organization block with knowsAbout = expertise signal.
//  Rich results unlocked:
//    ✓ Knowledge Panel additions
//    ✓ E-E-A-T trust signal
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":      "AboutPage",
        "@id":        `${SITE_URL}/about/#webpage`,
        url:          `${SITE_URL}/about`,
        name:         "About Fiixup — India's 24/7 Doorstep Car & Bike Repair",
        description:  "Fiixup was founded in 2020 to bring professional auto repair directly to vehicle owners across India. 50+ certified mechanics, 10,000+ happy customers.",
        isPartOf:     { "@id": SITE_ID },
        about:        { "@id": ORG_ID },
        mainEntity:   { "@id": ORG_ID },
      },
      {
        "@type":       "Organization",
        "@id":         ORG_ID,
        name:          "Fiixup",
        url:           SITE_URL,
        logo:          { "@type": "ImageObject", url: LOGO, width: 200, height: 60 },
        foundingDate:  "2020",
        description:   "India's leading 24/7 doorstep car and bike repair service in Bangalore, Chennai, Hyderabad and Mumbai.",
        telephone:     MAIN_PHONE,
        email:         MAIN_EMAIL,
        areaServed:    { "@type": "Country", name: "India" },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 500 },
        knowsAbout:    [
          "Car Repair","Bike Repair","Auto Maintenance","Roadside Assistance",
          "Tyre Service","Battery Service","Car Towing","EV Service",
        ],
        sameAs: [
          "https://www.facebook.com/fiixup1/",
          "https://www.instagram.com/fiixup_in/",
        ],
      },
      _breadcrumb([
        { name: "Home",  url: "/" },
        { name: "About", url: "/about" },
      ]),
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// 12. contactPageSchema() ─ app/contact/page.tsx
//
//  Signals:  ContactPage + AutoRepair (national) + multiple ContactPoints + BreadcrumbList
//  Why:      Multiple ContactPoints = Google indexes your phone number correctly.
//            ContactPage = E-E-A-T trust. AutoRepair areaServed = all 4 cities.
//  Rich results unlocked:
//    ✓ Phone number rich snippet
//    ✓ E-E-A-T trust signal
//    ✓ Breadcrumbs
// ═════════════════════════════════════════════════════════════════════════════
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":      "ContactPage",
        "@id":        `${SITE_URL}/contact/#webpage`,
        url:          `${SITE_URL}/contact`,
        name:         "Contact Fiixup — 24/7 Car & Bike Repair Booking",
        description:  "Book doorstep car or bike repair in Bangalore, Chennai, Hyderabad and Mumbai. Call, WhatsApp or fill the form. Available 24/7.",
        isPartOf:     { "@id": SITE_ID },
        about:        { "@id": ORG_ID },
      },
      {
        "@type":       "AutoRepair",
        "@id":         `${SITE_URL}/#localbusiness`,
        name:          "Fiixup",
        url:           SITE_URL,
        image:         OG_IMAGE,
        telephone:     MAIN_PHONE,
        email:         MAIN_EMAIL,
        openingHours:  "Mo-Su 00:00-24:00",
        priceRange:    "₹₹",
        areaServed: [
          { "@type": "City", name: "Bangalore" },
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Mumbai" },
        ],
        parentOrganization: { "@id": ORG_ID },
        contactPoint: [
          {
            "@type": "ContactPoint", telephone: MAIN_PHONE,
            contactType: "customer support",
            hoursAvailable: "Mo-Su 00:00-24:00",
            availableLanguage: ["English","Hindi","Kannada","Tamil","Telugu"],
          },
          {
            "@type": "ContactPoint", telephone: MAIN_PHONE,
            contactType: "emergency",
            hoursAvailable: "Mo-Su 00:00-24:00",
          },
        ],
      },
      _breadcrumb([
        { name: "Home",    url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
    ],
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// BACKWARD COMPATIBILITY ALIASES
// All existing page files continue to work without changes.
// ═════════════════════════════════════════════════════════════════════════════

/** @deprecated — use cityPageSchema() */
export function localBusinessSchema(city: LocalBusinessCity) {
  return cityPageSchema(city, []);
}

/** @deprecated — use serviceDetailSchema() */
export function serviceSchema(opts: {
  name: string; description: string; slug: string;
  minPrice: number; maxPrice: number;
  reviews?: { author: string; rating: number; body: string }[];
}) {
  return serviceDetailSchema({
    name: opts.name, slug: opts.slug, description: opts.description,
    minPrice: opts.minPrice, maxPrice: opts.maxPrice,
    testimonials: opts.reviews?.map((r) => ({
      name: r.author, rating: r.rating, review: r.body,
    })),
  });
}

/** @deprecated — use faqPageSchema() */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return faqPageSchema(faqs);
}

/** @deprecated — included automatically in all schema functions */
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return _breadcrumb(crumbs);
}

export function cityHubSchema(opts: {
  name:        string;
  slug:        string;
  state:       string;
  postalCode:  string;
  lat:         number;
  lng:         number;
  phone:       string;
  email:       string;
  reviewCount: number;
  rating:      number;
  areas:       { name: string; slug: string }[];
  faqs:        { q: string; a: string }[];
  heroHeading: string;
  metaTitle:   string;
  metaDesc:    string;
  ogImageUrl:  string | null;
}) {
  const pageUrl = `${SITE_URL}/${opts.slug}`;
  const image   = opts.ogImageUrl ?? OG_IMAGE;

  const graph: object[] = [
    // ── WebPage ──────────────────────────────────────────────
    {
      "@type":           "WebPage",
      "@id":             `${pageUrl}/#webpage`,
      url:               pageUrl,
      name:              opts.metaTitle,
      description:       opts.metaDesc,
      inLanguage:        "en-IN",
      isPartOf:          { "@id": `${SITE_URL}/#website` },
      about:             { "@id": `${pageUrl}/#localbusiness` },
      primaryImageOfPage: { "@id": `${pageUrl}/#heroimage` },
      breadcrumb:        { "@id": `${pageUrl}/#breadcrumb` },
    },

    // ── ImageObject ──────────────────────────────────────────
    {
      "@type": "ImageObject",
      "@id":   `${pageUrl}/#heroimage`,
      url:     image,
      width:   1200,
      height:  630,
    },

    // ── AutoRepair + LocalBusiness ───────────────────────────
    {
      "@type":     ["AutoRepair", "LocalBusiness"],
      "@id":       `${pageUrl}/#localbusiness`,
      name:        `Fiixup — Doorstep Auto Repair in ${opts.name}`,
      url:         pageUrl,
      image,
      telephone:   opts.phone,
      email:       opts.email ?? MAIN_EMAIL,
      description: `24/7 doorstep car and bike repair service in ${opts.name}, ${opts.state}. Certified mechanics come to you.`,
      parentOrganization: { "@id": ORG_ID },
      address: {
        "@type":           "PostalAddress",
        addressLocality:   opts.name,
        addressRegion:     opts.state,
        postalCode:        opts.postalCode || "000000",
        addressCountry:    "IN",
      },
      geo: {
        "@type":     "GeoCoordinates",
        latitude:    opts.lat,
        longitude:   opts.lng,
      },
      areaServed: [
        { "@type": "City",  name: opts.name, containedInPlace: { "@type": "State", name: opts.state } },
        ...opts.areas.slice(0, 20).map((a) => ({
          "@type": "Neighborhood",
          name:    a.name,
          url:     `${SITE_URL}/${opts.slug}/${a.slug}`,
        })),
      ],
      openingHours: "Mo-Su 00:00-24:00",
      priceRange:   "₹₹",
      aggregateRating: {
        "@type":       "AggregateRating",
        ratingValue:   String(opts.rating),
        reviewCount:   String(opts.reviewCount),
        bestRating:    "5",
        worstRating:   "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name:    `Vehicle Repair Services in ${opts.name}`,
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Car Mechanic at Home in ${opts.name}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Bike Repair in ${opts.name}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Car Battery Replacement in ${opts.name}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Tyre Puncture Repair in ${opts.name}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Car Towing Service in ${opts.name}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: `Roadside Assistance in ${opts.name}` } },
        ],
      },
    },

    // ── BreadcrumbList ───────────────────────────────────────
    {
      "@type":   "BreadcrumbList",
      "@id":     `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",     item: SITE_URL },
        { "@type": "ListItem", position: 2, name: opts.name,  item: pageUrl  },
      ],
    },
  ];

  // ── FAQPage (only if FAQs exist) ──────────────────────────
  if (opts.faqs.length > 0) {
    graph.push({
      "@type":      "FAQPage",
      "@id":        `${pageUrl}/#faq`,
      name:         `FAQs — Doorstep Vehicle Repair in ${opts.name}`,
      mainEntity:   opts.faqs.slice(0, 10).map((f) => ({
        "@type":         "Question",
        name:            f.q,
        acceptedAnswer:  { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function cityServiceCategorySchema(opts: {
  cityName:     string;
  citySlug:     string;
  categoryName: string;
  categorySlug: string;
  metaTitle:    string;
  metaDesc:     string;
  rating:       number;
  reviewCount:  number;
  phone:        string;
  ogImageUrl:   string | null;
  services: { slug: string; title: string; tagline: string; price: string }[];
  faqs:     { q: string; a: string }[];
}) {
  const pageUrl   = `${SITE_URL}/${opts.citySlug}/services/${opts.categorySlug}`;
  const image     = opts.ogImageUrl ?? OG_IMAGE;
  const cityPageUrl = `${SITE_URL}/${opts.citySlug}`;

  const graph: object[] = [
    // ── WebPage ──────────────────────────────────────────────
    {
      "@type":       "WebPage",
      "@id":         `${pageUrl}/#webpage`,
      url:           pageUrl,
      name:          opts.metaTitle,
      description:   opts.metaDesc,
      inLanguage:    "en-IN",
      isPartOf:      { "@id": `${SITE_URL}/#website` },
      breadcrumb:    { "@id": `${pageUrl}/#breadcrumb` },
    },

    // ── ItemList (services carousel) ─────────────────────────
    {
      "@type":           "ItemList",
      "@id":             `${pageUrl}/#servicelist`,
      name:              `${opts.categoryName} in ${opts.cityName}`,
      description:       opts.metaDesc,
      numberOfItems:     opts.services.length,
      itemListElement:   opts.services.slice(0, 20).map((s, i) => ({
        "@type":    "ListItem",
        position:   i + 1,
        name:       `${s.title} in ${opts.cityName}`,
        url:        `${SITE_URL}/${opts.citySlug}/${s.slug}`,
        description: s.tagline,
        item: {
          "@type":    "Service",
          name:       `${s.title} in ${opts.cityName}`,
          url:        `${SITE_URL}/${opts.citySlug}/${s.slug}`,
          description: s.tagline,
          offers: {
            "@type":      "Offer",
            price:        s.price.replace(/[₹\s]/g, ''),
            priceCurrency: "INR",
          },
        },
      })),
    },

    // ── LocalBusiness (city-category combo) ──────────────────
    {
      "@type":     ["AutoRepair", "LocalBusiness"],
      "@id":       `${pageUrl}/#localbusiness`,
      name:        `Fiixup ${opts.categoryName} in ${opts.cityName}`,
      url:         pageUrl,
      image,
      telephone:   opts.phone,
      description: opts.metaDesc,
      parentOrganization: { "@id": ORG_ID },
      sameAs:      cityPageUrl,
      openingHours: "Mo-Su 00:00-24:00",
      priceRange:  "₹₹",
      aggregateRating: {
        "@type":     "AggregateRating",
        ratingValue:  String(opts.rating),
        reviewCount:  String(opts.reviewCount),
        bestRating:  "5",
        worstRating: "1",
      },
    },

    // ── BreadcrumbList ───────────────────────────────────────
    {
      "@type":   "BreadcrumbList",
      "@id":     `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",                 item: SITE_URL },
        { "@type": "ListItem", position: 2, name: opts.cityName,           item: cityPageUrl },
        { "@type": "ListItem", position: 3, name: opts.categoryName,       item: pageUrl },
      ],
    },
  ];

  // ── FAQPage ──────────────────────────────────────────────
  if (opts.faqs.length > 0) {
    graph.push({
      "@type":    "FAQPage",
      "@id":      `${pageUrl}/#faq`,
      mainEntity: opts.faqs.slice(0, 10).map((f) => ({
        "@type":        "Question",
        name:           f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
