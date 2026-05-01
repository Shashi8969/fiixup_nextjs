// lib/models/service.model.ts

export interface ServiceFAQ {
  q: string;
  a: string;
}

export type ServiceCategory =
  | "car"
  | "bike"
  | "battery"
  | "towing"
  | "puncture"
  | "roadside"
  | "mechanic";

export interface PricingRow {
  label: string;        // e.g. "Bike Jumpstart"
  vehicle: "bike" | "car" | "both";
  priceFrom: number;    // numeric for comparisons
  priceTo?: number;
  note?: string;        // e.g. "parts extra"
}

export interface CompetitorRow {
  competitor: string;
  theirPrice: string;
  ourPrice: string;
  advantage: string;    // e.g. "Save ₹300"
}

export interface GuideSection {
  heading: string;
  body: string;         // plain prose paragraph(s)
}

export interface ServiceGuide {
  title: string;
  intro: string;
  sections: GuideSection[];
  conclusion: string;
}

export interface ServiceData {
  slug: string;               // URL slug → /services/car-brake-service
  title: string;              // Page H1
  shortTitle: string;         // Card / listing title
  category: ServiceCategory;
  icon: string;               // Lucide icon name
  tagline: string;            // One-liner under H1
  description: string;        // SEO paragraph (About section)
  price: string;              // Starting price string e.g. "₹499"
  priceNumeric: number;       // Starting price as number for sorting
  duration: string;           // e.g. "1–2 hrs"
  features: string[];         // What's included checklist
  stats: { value: string; label: string }[];   // Hero stats row
  heroChecks: string[];       // Short trust checks under hero H1

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricingRows: PricingRow[];
  competitorPricing: CompetitorRow[];
  pricingDisclaimer: string;

  // ── Brands ────────────────────────────────────────────────────────────────
  carBrands?: string[];
  bikeBrands?: string[];

  // ── Guide ─────────────────────────────────────────────────────────────────
  guide: ServiceGuide;

  // ── FAQs ──────────────────────────────────────────────────────────────────
  faqs: ServiceFAQ[];

  // ── Testimonials (service-specific, optional) ─────────────────────────────
  testimonials?: {
    name: string;
    area: string;
    vehicle: string;
    rating: number;
    text: string;
    date: string;
  }[];

  // ── SEO ───────────────────────────────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // ── Related ───────────────────────────────────────────────────────────────
  relatedSlugs: string[];
}
