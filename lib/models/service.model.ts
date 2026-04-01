// lib/models/service.model.ts

export interface ServiceFAQ {
  q: string;
  a: string;
}

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
}
