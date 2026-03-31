import { FAQCategory } from "@/lib/models/faq.model";
export interface CityTestimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
  vehicle: string;
  area: string; // locality shown under name — adds city-specific flavor
}

export interface CityServiceHighlight {
  title: string;       // e.g. "Monsoon-Ready AC Service"
  description: string; // city-specific description
}

export interface CityData {
  slug: string;
  name: string;
  state: string;
  phone: string;
  whatsapp: string;
  email: string;
  areas: string[];
  heroTagline: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;

  // ── City-specific content for SEO ──
  aboutHeading: string;         // H2 in About section
  aboutPara1: string;           // First paragraph — mentions city
  aboutPara2: string;           // Second paragraph — mentions city
  aboutBullets: { heading: string; text: string }[]; // 3 bullet points
  statsLabel: string;           // e.g. "Bengaluru Coverage" (4th stat label)
  servicesSectionHeading: string;   // H2 in Services section
  servicesSectionSubtext: string;   // Subtext under H2
  carServicesHeading: string;       // H3 for car services
  bikeServicesHeading: string;      // H3 for bike services
  cityServiceHighlights: CityServiceHighlight[]; // 2 city-specific service callouts
  testimonialsHeading: string;      // H2 in Testimonials section
  testimonialsSubtext: string;      // Subtext under H2
  testimonials: CityTestimonial[];  // City-specific reviews

  faqCategories: FAQCategory[];
}
