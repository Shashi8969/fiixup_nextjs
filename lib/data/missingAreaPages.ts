// lib/data/missingAreaPages.ts
// ─────────────────────────────────────────────────────────────────────────────
// Data for all 404 area pages found in the SEO audit.
// Adding a new area = add an entry here. The dynamic route handles rendering.
// ─────────────────────────────────────────────────────────────────────────────

export interface AreaServiceLink {
  label: string;
  slug: string;
  price: string;
}

export interface AreaPageData {
  citySlug: string;
  cityName: string;
  areaSlug: string;
  areaName: string;
  headline: string;
  subtext: string;
  services: AreaServiceLink[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  nearbyAreas: { name: string; slug: string }[];
}

const BANGALORE_SERVICES: AreaServiceLink[] = [
  { label: "Car Repair",           slug: "car-general-repair",          price: "₹499" },
  { label: "Bike Service",         slug: "bike-service-at-home",        price: "₹349" },
  { label: "Towing Service",       slug: "car-towing-service-near-me",  price: "₹499" },
  { label: "Jump Start",           slug: "car-battery-jumpstart-near-me",price: "₹399" },
  { label: "Puncture Repair",      slug: "car-puncture-repair-near-me", price: "₹199" },
  { label: "Roadside Assistance",  slug: "roadside-assistance-near-me", price: "₹299" },
  { label: "Mobile Mechanic",      slug: "mobile-mechanic-near-me",     price: "₹299" },
  { label: "Royal Enfield Service",slug: "bike-service-at-home",        price: "₹599" },
  { label: "Bike Mechanic",        slug: "mobile-mechanic-near-me",     price: "₹299" },
  { label: "Garage Near Me",       slug: "car-service-at-home",         price: "₹999" },
  { label: "Breakdown Service",    slug: "car-breakdown-service",       price: "₹299" },
];

export const missingAreaPages: AreaPageData[] = [

  // ── KORAMANGALA ──────────────────────────────────────────────────────────
  {
    citySlug: "bangalore", cityName: "Bengaluru",
    areaSlug: "koramangala", areaName: "Koramangala",
    headline: "Doorstep Car & Bike Repair in Koramangala, Bengaluru",
    subtext: "Fiixup brings certified mechanics directly to your home, office, or apartment in Koramangala. No garage queues. 24/7 service.",
    services: BANGALORE_SERVICES,
    metaTitle: "Car & Bike Mechanic in Koramangala | 24/7 Doorstep Service — Fiixup",
    metaDescription: "Doorstep car and bike repair in Koramangala, Bengaluru. Certified mechanics for oil change, breakdown, towing, puncture & more. 24/7. Call +91 8197459732.",
    keywords: "mechanic near me Koramangala, car repair Koramangala, bike service Koramangala, doorstep mechanic Koramangala Bengaluru, car mechanic near me Koramangala",
    nearbyAreas: [
      { name: "HSR Layout",    slug: "hsr-layout" },
      { name: "Indiranagar",   slug: "indiranagar" },
      { name: "BTM Layout",    slug: "btm-layout" },
    ],
  },

  // ── INDIRANAGAR ──────────────────────────────────────────────────────────
  {
    citySlug: "bangalore", cityName: "Bengaluru",
    areaSlug: "indiranagar", areaName: "Indiranagar",
    headline: "Doorstep Car & Bike Repair in Indiranagar, Bengaluru",
    subtext: "Premium doorstep auto care in Indiranagar. Certified mechanics for all car and bike brands — at your home or office in 30–60 minutes.",
    services: BANGALORE_SERVICES,
    metaTitle: "Car & Bike Mechanic in Indiranagar | Doorstep Service — Fiixup",
    metaDescription: "Doorstep car and bike repair in Indiranagar, Bengaluru. Oil change, breakdown, towing, puncture & AC service. 24/7. Call +91 8197459732.",
    keywords: "mechanic near me Indiranagar, car repair Indiranagar, bike service Indiranagar, doorstep mechanic Indiranagar Bengaluru, car mechanic Indiranagar",
    nearbyAreas: [
      { name: "Koramangala", slug: "koramangala" },
      { name: "HSR Layout",  slug: "hsr-layout" },
      { name: "Whitefield",  slug: "whitefield" },
    ],
  },

  // ── ANNA NAGAR (CHENNAI) ─────────────────────────────────────────────────
  {
    citySlug: "chennai", cityName: "Chennai",
    areaSlug: "anna-nagar", areaName: "Anna Nagar",
    headline: "Doorstep Car & Bike Repair in Anna Nagar, Chennai",
    subtext: "Fiixup sends certified mechanics to your location in Anna Nagar, Chennai. Same-day service, transparent pricing, 30-day warranty.",
    services: [
      { label: "Car Repair",           slug: "car-general-repair",          price: "₹499" },
      { label: "Bike Service",         slug: "bike-service-at-home",        price: "₹349" },
      { label: "Towing Service",       slug: "car-towing-service-near-me",  price: "₹499" },
      { label: "Jump Start",           slug: "car-battery-jumpstart-near-me",price: "₹399" },
      { label: "Puncture Repair",      slug: "car-puncture-repair-near-me", price: "₹199" },
      { label: "Roadside Assistance",  slug: "roadside-assistance-near-me", price: "₹299" },
      { label: "Mobile Mechanic",      slug: "mobile-mechanic-near-me",     price: "₹299" },
    ],
    metaTitle: "Car & Bike Mechanic in Anna Nagar Chennai | Doorstep Service — Fiixup",
    metaDescription: "Doorstep car and bike repair in Anna Nagar, Chennai. Oil change, towing, breakdown, puncture repair. 24/7. Call +91 8197459732.",
    keywords: "mechanic near me Anna Nagar Chennai, car repair Anna Nagar, bike service Anna Nagar Chennai, doorstep mechanic Anna Nagar",
    nearbyAreas: [
      { name: "Velachery",   slug: "velachery" },
      { name: "T Nagar",     slug: "t-nagar" },
      { name: "Adyar",       slug: "adyar" },
    ],
  },
];

// Helper
export function getAreaPage(citySlug: string, areaSlug: string): AreaPageData | undefined {
  return missingAreaPages.find(
    (p) => p.citySlug === citySlug && p.areaSlug === areaSlug
  );
}

// All area params for generateStaticParams
export function getAllAreaParams() {
  return missingAreaPages.map((p) => ({
    citySlug: p.citySlug,
    areaSlug: p.areaSlug,
  }));
}
