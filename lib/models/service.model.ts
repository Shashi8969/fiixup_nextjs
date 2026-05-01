// lib/models/service.model.ts
// All new fields are OPTIONAL so existing services without them still build fine.

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

// ── Pricing ───────────────────────────────────────────────────────────────────

export interface PricingRow {
  label: string;
  priceFrom: number;
  priceTo?: number;
  note?: string;
  highlight?: boolean;
}

export interface CompetitorRow {
  name: string;
  price: string;
  arrivalTime: string;
  warranty?: string;
  doorstep: boolean;
}

export interface PricingData {
  rows: PricingRow[];
  competitors: CompetitorRow[];
  disclaimer: string;
}

// ── Guide ─────────────────────────────────────────────────────────────────────

export interface GuideSection {
  heading: string;
  body: string;
  tips?: string[];
}

export interface CompleteGuide {
  title: string;
  intro: string;
  sections: GuideSection[];
  conclusion: string;
}

// ── Testimonial ───────────────────────────────────────────────────────────────

export interface ServiceTestimonial {
  name: string;
  location: string;
  vehicle: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

// ── Brand ─────────────────────────────────────────────────────────────────────

export interface BrandEntry {
  name: string;
  models?: string[];
}

// ── Benefit ───────────────────────────────────────────────────────────────────

export interface ServiceBenefit {
  icon: string;
  title: string;
  body: string;
}

// ── Core ServiceData ──────────────────────────────────────────────────────────
// Required fields match the ORIGINAL model exactly.
// All new fields are optional — existing services without them build fine.

export interface ServiceData {
  // ── ORIGINAL required fields (unchanged) ───────────────────────────────────
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  icon: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // ── NEW optional fields (add to any service to unlock rich page sections) ──
  pricing?: PricingData;
  benefits?: ServiceBenefit[];
  testimonials?: ServiceTestimonial[];
  guide?: CompleteGuide;
  carBrands?: BrandEntry[];
  bikeBrands?: BrandEntry[];
  relatedSlugs?: string[];
}
