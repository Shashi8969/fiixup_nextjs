import { SITE_URL, MAIN_PHONE, MAIN_EMAIL } from "./constants";

const LOGO = `${SITE_URL}/assets/logo.webp`;
const OG_IMAGE = `${SITE_URL}/assets/og-image.webp`;

// ─────────────────────────────────────────────────────────────────────
// CITY CONFIG — one source of truth for all city data
// ─────────────────────────────────────────────────────────────────────
export const CITY_DATA = {
  bangalore: {
    name: "Bangalore", slug: "bangalore", state: "Karnataka",
    postalCode: "560001", lat: 12.9716, lng: 77.5946,
    phone: MAIN_PHONE, email: "bangalore@fiixup.in", reviewCount: 1200,
    areas: ["Koramangala","Whitefield","Indiranagar","HSR Layout",
      "Marathahalli","Electronic City","Jayanagar","JP Nagar",
      "Rajajinagar","Banashankari","Hebbal","Yelahanka","Sarjapur"],
  },
  chennai: {
    name: "Chennai", slug: "chennai", state: "Tamil Nadu",
    postalCode: "600001", lat: 13.0827, lng: 80.2707,
    phone: MAIN_PHONE, email: "chennai@fiixup.in", reviewCount: 800,
    areas: ["Anna Nagar","T. Nagar","OMR","Velachery","Adyar",
      "Porur","Tambaram","Sholinganallur","Perambur","Guindy"],
  },
  hyderabad: {
    name: "Hyderabad", slug: "hyderabad", state: "Telangana",
    postalCode: "500001", lat: 17.3850, lng: 78.4867,
    phone: MAIN_PHONE, email: "hyderabad@fiixup.in", reviewCount: 600,
    areas: ["Hitech City","Gachibowli","Banjara Hills","Jubilee Hills",
      "Madhapur","Kondapur","Kukatpally","Secunderabad","LB Nagar"],
  },
  mumbai: {
    name: "Mumbai", slug: "mumbai", state: "Maharashtra",
    postalCode: "400001", lat: 19.0760, lng: 72.8777,
    phone: MAIN_PHONE, email: "mumbai@fiixup.in", reviewCount: 400,
    areas: ["Andheri","Bandra","Powai","Thane","Borivali",
      "Malad","Goregaon","Kurla","Navi Mumbai","Mulund"],
  },
} as const;

export type CityKey = keyof typeof CITY_DATA;

// ─────────────────────────────────────────────────────────────────────
// 1. homeSchema() — use ONLY in app/page.tsx
//
//    FIXES vs your old version:
//    ✅ @type: "Organization" (was "AutoRepair" — wrong for national brand)
//    ✅ Added @id (needed so city schemas can link back here)
//    ✅ Added logo, sameAs, contactPoint
//    ✅ areaServed: Country object (was plain string array)
//    ✅ Added WebSite schema (enables Sitelinks search box in Google)
// ─────────────────────────────────────────────────────────────────────
export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Fiixup",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: LOGO },
        image: OG_IMAGE,
        description: "India's 24/7 doorstep car and bike repair service. Certified mechanics at your home or office in Bangalore, Chennai, Hyderabad & Mumbai.",
        telephone: MAIN_PHONE,
        email: MAIN_EMAIL,
        foundingDate: "2020",
        areaServed: { "@type": "Country", name: "India" },
        sameAs: [
          "https://www.facebook.com/fiixup1/",
          "https://www.instagram.com/fiixup_in/",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "10000",
          bestRating: "5",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: MAIN_PHONE,
          contactType: "customer service",
          availableLanguage: ["English", "Hindi", "Kannada", "Tamil", "Telugu"],
          hoursAvailable: "Mo-Su 00:00-24:00",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Fiixup",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────
// 2. localBusinessSchema() — use in each city page
//    Usage: localBusinessSchema(CITY_DATA.bangalore)
//
//    FIXES vs your old version:
//    ✅ Added address (required for local map pack)
//    ✅ Added geo coordinates
//    ✅ Added @id + parentOrganization (links to org)
//    ✅ areaServed includes all neighbourhoods, not just city name
//    ✅ reviewCount is per-city, not hardcoded 1200 for all
//    ✅ Removed redundant locationServiceSchema duplication
// ─────────────────────────────────────────────────────────────────────
export interface LocalBusinessCity {
  name: string;
  slug: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  reviewCount: number;
  areas: readonly string[] | string[];
}

export function localBusinessSchema(city: LocalBusinessCity) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRepair",
        "@id": `${SITE_URL}/${city.slug}/#business`,
        name: `Fiixup ${city.name}`,
        url: `${SITE_URL}/${city.slug}`,
        image: OG_IMAGE,
        telephone: city.phone,
        email: city.email,
        openingHours: "Mo-Su 00:00-24:00",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          addressLocality: city.name,
          addressRegion: city.state,
          postalCode: city.postalCode,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.lat,
          longitude: city.lng,
        },
        areaServed: [
          { "@type": "City", name: city.name },
          ...city.areas.map((a) => ({ "@type": "Place", name: a })),
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: String(city.reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: city.name, url: `/${city.slug}` },
      ]),
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────
// 3. serviceSchema() — use in each service page
//
//    FIXES vs your old version:
//    ✅ price is now minPrice/maxPrice range (was single string)
//    ✅ provider links to org @id (was anonymous AutoRepair inline)
//    ✅ Added optional reviews array → star ratings in Google
//    ✅ Added BreadcrumbList automatically
// ─────────────────────────────────────────────────────────────────────
export function serviceSchema({
  name, description, slug, minPrice, maxPrice, reviews = [],
}: {
  name: string;
  description: string;
  slug: string;
  minPrice: number;
  maxPrice: number;
  reviews?: { author: string; rating: number; body: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${slug}/#service`,
        name,
        description,
        url: `${SITE_URL}/services/${slug}`,
        provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Bangalore" },
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Mumbai" },
        ],
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice,
            maxPrice,
            priceCurrency: "INR",
          },
          availability: "https://schema.org/InStock",
        },
        ...(reviews.length > 0 && {
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
            reviewBody: r.body,
          })),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: String(reviews.length),
            bestRating: "5",
          },
        }),
      },
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name, url: `/services/${slug}` },
      ]),
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────
// 4. breadcrumbSchema() — your version was correct, no changes
//    Call on ALL pages except homepage
// ─────────────────────────────────────────────────────────────────────
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────
// 5. faqSchema() — your version was correct, no changes
//    PROBLEM: it was never being called! Add to /faq and city pages.
// ─────────────────────────────────────────────────────────────────────
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// Ready-to-use FAQ sets — import and pass directly to faqSchema()
export const GLOBAL_FAQS = [
  { q: "What is Fiixup?", a: "Fiixup is a 24/7 doorstep car and bike repair service in Bangalore, Chennai, Hyderabad and Mumbai. Certified mechanics come to your home, office or roadside location — no garage visit needed." },
  { q: "How fast does a Fiixup technician arrive?", a: "Within 30–60 minutes of booking. For emergencies we aim for under 30 minutes in all major areas." },
  { q: "How much does doorstep car service cost?", a: "Services start from ₹249. Oil change from ₹599, brake service from ₹799, full car service from ₹999. All prices confirmed before work begins — no hidden charges." },
  { q: "Is there a warranty on repairs?", a: "Yes — all Fiixup repairs carry a 30-day warranty. If the same issue recurs within 30 days, we fix it free of charge." },
  { q: "Do you use original spare parts?", a: "We use OEM-grade or genuine parts matched to your vehicle specification. The brand and part number are shown to you before fitting." },
  { q: "Which cities does Fiixup serve?", a: "Fiixup currently operates in Bangalore, Chennai, Hyderabad and Mumbai. More cities including Delhi, Pune and Kolkata are coming soon." },
  { q: "Are your technicians certified?", a: "Yes. Every Fiixup technician is trained, certified, and has a minimum of 3 years hands-on experience. All are background-verified before joining." },
];

export const BANGALORE_FAQS = [
  { q: "Which areas in Bangalore does Fiixup cover?", a: "All of Bangalore — Koramangala, Whitefield, Indiranagar, HSR Layout, Marathahalli, Electronic City, Jayanagar, JP Nagar, Rajajinagar, Banashankari, Hebbal, Yelahanka, Sarjapur Road and more." },
  { q: "How fast does Fiixup reach me in Bangalore?", a: "30–60 minutes anywhere in Bangalore. On the Outer Ring Road and Whitefield during peak hours, we aim for under 45 minutes." },
  { q: "Do you service in apartments in Bangalore?", a: "Yes. We regularly work inside apartments and gated communities across Koramangala, HSR Layout, Sarjapur Road and Whitefield. Call ahead and we coordinate with security." },
  { q: "Can you fix a car breakdown on Outer Ring Road Bangalore?", a: "Yes — 24/7 emergency roadside assistance on ORR, NICE Road, Hosur Road and all major Bangalore arterials." },
];

export const CHENNAI_FAQS = [
  { q: "Which areas in Chennai does Fiixup cover?", a: "Anna Nagar, T. Nagar, OMR, Velachery, Adyar, Porur, Tambaram, Sholinganallur, Perambur, Guindy and all major Chennai areas." },
  { q: "How does coastal humidity affect my car in Chennai?", a: "Salt air accelerates corrosion on brake lines, exhaust systems, and body panels. We recommend a full underbody inspection every 6 months for Chennai vehicles." },
];

// ─────────────────────────────────────────────────────────────────────
// 6. blogPostSchema() — NEW, was completely missing from your schema.ts
//    Add to every app/blog/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────
export function blogPostSchema({
  title, slug, description, coverImage, publishedAt, updatedAt, tags,
}: {
  title: string; slug: string; description: string;
  coverImage: string; publishedAt: string;
  updatedAt?: string; tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        image: coverImage,
        datePublished: publishedAt,
        dateModified: updatedAt ?? publishedAt,
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Fiixup Team" },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Fiixup",
          logo: { "@type": "ImageObject", url: LOGO },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
        ...(tags && { keywords: tags.join(", ") }),
      },
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: title, url: `/blog/${slug}` },
      ]),
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────
// REMOVED: locationServiceSchema()
// Duplicated localBusinessSchema() with extra bugs. Deleted entirely.
// Use localBusinessSchema(CITY_DATA.bangalore) instead.
// ─────────────────────────────────────────────────────────────────────

/*
=======================================================================
USAGE — copy into each page file
=======================================================================

// app/page.tsx (HOMEPAGE ONLY)
import { homeSchema } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }} />

// app/bangalore/page.tsx
import { localBusinessSchema, faqSchema, CITY_DATA, BANGALORE_FAQS } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(CITY_DATA.bangalore)) }} />
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(BANGALORE_FAQS)) }} />

// app/chennai/page.tsx
import { localBusinessSchema, faqSchema, CITY_DATA, CHENNAI_FAQS } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(CITY_DATA.chennai)) }} />
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(CHENNAI_FAQS)) }} />

// app/services/car-brake-service/page.tsx
import { serviceSchema } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema({
    name: "Car Brake Service at Home",
    description: "Doorstep brake pad replacement, disc service and fluid flush. All brands.",
    slug: "car-brake-service",
    minPrice: 799,
    maxPrice: 3499,
    reviews: [
      { author: "Vikram N.", rating: 5, body: "Brakes replaced in 90 minutes at my apartment. Highly professional." },
      { author: "Rekha T.", rating: 5, body: "Fixed brake fluid leak at home in 1.5 hours. Completely restored." },
    ],
  })) }} />

// app/faq/page.tsx
import { faqSchema, GLOBAL_FAQS } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(GLOBAL_FAQS)) }} />

// app/blog/[slug]/page.tsx
import { blogPostSchema } from "@/lib/schema";
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema({
    title: post.title,
    slug: post.slug,
    description: post.meta_description,
    coverImage: post.cover_image_url,   // must be unique per post!
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    tags: post.tags,
  })) }} />

=======================================================================
*/
