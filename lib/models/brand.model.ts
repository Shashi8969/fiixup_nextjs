// lib/models/brand.model.ts
// Brand landing pages (/brands, /brands/[brandSlug]) — one page per vehicle
// brand actually tied to a real service offering in `service_brands` (not
// every logo in the homepage marquee — see brand_pages table comment).

export type BrandVehicleType = "car" | "bike";

export interface BrandFAQ {
  q: string;
  a: string;
}

export interface BrandIssue {
  issue: string;
  description: string;
}

export interface BrandSection {
  heading: string;
  body: string;
}

export interface BrandData {
  slug: string;
  brandName: string;
  vehicleType: BrandVehicleType;
  logoUrl: string | null;
  logoAlt: string | null;
  logoTitle: string | null;
  tagline: string | null;
  heroHeading: string;
  heroSubheading: string;
  description: string;
  models: string[];
  commonIssues: BrandIssue[];
  sections: BrandSection[];
  faqs: BrandFAQ[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string | null;
  schemaJson?: unknown;
}

export interface BrandListItem {
  slug: string;
  brandName: string;
  vehicleType: BrandVehicleType;
  logoUrl: string | null;
  logoAlt: string | null;
  tagline: string | null;
}

/** Minimal service summary used on brand pages ("Services we offer for this brand"). */
export interface BrandServiceLink {
  slug: string;
  shortTitle: string;
  tagline: string;
  price: string;
  duration: string;
  icon: string;
}
