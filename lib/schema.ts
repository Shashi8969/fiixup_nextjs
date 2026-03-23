import { SITE_URL, MAIN_PHONE, MAIN_EMAIL } from "./constants";

/** Homepage / global AutoRepair LocalBusiness schema */
export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Fiixup — Doorstep Car & Bike Repair",
    description: "24/7 doorstep car and bike repair service across India. Certified technicians at your home or office.",
    url: SITE_URL,
    telephone: MAIN_PHONE,
    email: MAIN_EMAIL,
    openingHours: "Mo-Su 00:00-24:00",
    areaServed: ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"],
    priceRange: "₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10000",
      bestRating: "5",
    },
  };
}

/** City-specific LocalBusiness schema */
export function localBusinessSchema({
  cityName, phone, slug, areas,
}: { cityName: string; phone: string; slug: string; areas: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: `Fiixup ${cityName} — Doorstep Car & Bike Repair`,
    description: `24/7 doorstep car and bike repair in ${cityName}. Certified technicians across ${areas.slice(0, 3).join(", ")}.`,
    url: `${SITE_URL}/${slug}`,
    telephone: phone,
    email: `${cityName.toLowerCase()}@fiixup.in`,
    openingHours: "Mo-Su 00:00-24:00",
    areaServed: { "@type": "City", name: cityName },
    priceRange: "₹₹",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200", bestRating: "5" },
  };
}

/** BreadcrumbList schema */
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

/** FAQPage schema */
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

/** Service schema */
export function serviceSchema({ name, description, slug, price }: {
  name: string; description: string; slug: string; price: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}/services/${slug}`,
    provider: { "@type": "AutoRepair", name: "Fiixup", url: SITE_URL, telephone: MAIN_PHONE },
    areaServed: ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"],
    offers: { "@type": "Offer", priceCurrency: "INR", price, availability: "https://schema.org/InStock" },
  };
}
