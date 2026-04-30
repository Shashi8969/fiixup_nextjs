// lib/models/service.model.ts
<<<<<<< HEAD
=======
// ─────────────────────────────────────────────────────────────────────────────
// Central type definitions for all service data.
// Add new fields here — no component changes needed, just update the data file.
// ─────────────────────────────────────────────────────────────────────────────
>>>>>>> 8dcb818 (reconect github)

export interface ServiceFAQ {
  q: string;
  a: string;
}

<<<<<<< HEAD
export type ServiceCategory = "car" | "bike" | "battery" | "towing" | "puncture" | "roadside" | "mechanic";

export interface ServiceData {
  slug: string;           // URL slug → /services/car-brake-service
  title: string;          // Page H1
  shortTitle: string;     // Card / listing title
  category: ServiceCategory;
  icon: string;           // Lucide icon name (e.g. "Wrench", "Car", "Zap")
  tagline: string;        // One-liner shown under H1
  description: string;    // Long SEO paragraph
  price: string;          // Starting price shown on card (e.g. "₹499")
  duration: string;       // Estimated time (e.g. "1–2 hrs")
  features: string[];     // Bullet points on detail page
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
=======
export type ServiceCategory =
  | "car"
  | "bike"
  | "battery"
  | "towing"
  | "puncture"
  | "roadside"
  | "mechanic";

// ── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingRow {
  label: string;       // e.g. "Bike Basic Service"
  priceFrom: number;   // numeric so we can sort / compare
  priceTo?: number;    // optional upper bound
  note?: string;       // e.g. "parts extra"
  highlight?: boolean; // draws attention to best-value row
}

export interface CompetitorRow {
  name: string;        // e.g. "Local Garage"
  price: string;       // formatted, e.g. "₹800–₹1,200"
  arrivalTime: string; // e.g. "Next day"
  warranty: string;    // e.g. "None"
  doorstep: boolean;
}

export interface PricingData {
  rows: PricingRow[];
  competitors: CompetitorRow[];
  disclaimer: string;
}

// ── Guide section ─────────────────────────────────────────────────────────────

export interface GuideSection {
  heading: string;
  body: string;        // plain text or light markdown (render with <p> / <ul>)
  tips?: string[];     // optional bullet tips inside the section
}

export interface CompleteGuide {
  title: string;
  intro: string;       // 2-3 sentence hook
  sections: GuideSection[];
  conclusion: string;
}

// ── Testimonial embedded in service ──────────────────────────────────────────

export interface ServiceTestimonial {
  name: string;
  location: string;    // "Koramangala, Bengaluru"
  vehicle: string;     // "Maruti Swift 2019"
  rating: number;      // 1–5
  review: string;
  date: string;        // "April 2026"
  verified: boolean;
}

// ── Car / Bike brand ──────────────────────────────────────────────────────────

export interface BrandEntry {
  name: string;
  models?: string[];   // top models for SEO richness
}

// ── Core ServiceData ─────────────────────────────────────────────────────────

export interface ServiceData {
  // ── Identity ────────────────────────────────────────────────────────────────
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  icon: string;              // Lucide icon key (see lib/icons.ts)
  tagline: string;
  description: string;       // 2–3 paragraph SEO description

  // ── Pricing ─────────────────────────────────────────────────────────────────
  price: string;             // display string e.g. "₹299" for card
  duration: string;          // e.g. "30–60 min"
  pricing: PricingData;      // full pricing table + competitor compare

  // ── Content sections ────────────────────────────────────────────────────────
  features: string[];        // "What's Included" bullets
  benefits: { icon: string; title: string; body: string }[]; // Why choose section
  steps?: { n: string; title: string; desc: string }[];       // Custom how-it-works (falls back to global)

  // ── Brands ──────────────────────────────────────────────────────────────────
  carBrands?: BrandEntry[];  // If category = car or both
  bikeBrands?: BrandEntry[]; // If category = bike or both

  // ── Social proof ────────────────────────────────────────────────────────────
  testimonials: ServiceTestimonial[];

  // ── Long-form guide (3,000+ words for SEO) ──────────────────────────────────
  guide: CompleteGuide;

  // ── FAQs ────────────────────────────────────────────────────────────────────
  faqs: ServiceFAQ[];

  // ── SEO ─────────────────────────────────────────────────────────────────────
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // ── Internal linking ────────────────────────────────────────────────────────
  relatedSlugs?: string[];   // slugs of 2–4 related services
>>>>>>> 8dcb818 (reconect github)
}
