// lib/models/blog.model.ts

export interface BlogLinkAttachment {
  label?: string;
  title?: string;
  name?: string;
  href?: string;
  url?: string;
  path?: string;
  description?: string;
}

export interface BlogServiceAttachment extends BlogLinkAttachment {
  price?: string;
}

export interface BlogPost {
  id: string;             // Unique slug / ID for URL → /blog/[id]
  title: string;
  slug: string;           // URL-friendly slug (same as id or separate)
  excerpt: string;        // Short summary for cards & meta description
  content: any[];       // Full HTML or markdown content
  author: string;
  authorRole?: string;    // e.g. "Head Technician at Fiixup"
  date: string;           // ISO date string or display string
  readTime: string;       // e.g. "5 min read"
  category: BlogCategory;
  tags: string[];
  image: string;          // Path to hero/thumbnail image
  imageAlt: string;
  metaTitle?: string;     // Overrides title for <head>
  metaDescription?: string; // Overrides excerpt for <head>
  featured?: boolean;     // Show on homepage Blog section
  schemaJson?: unknown;   // Admin-built JSON-LD from Supabase
  nearbyAreas?: BlogLinkAttachment[];
  relatedServices?: BlogServiceAttachment[];
  internalLinks?: BlogLinkAttachment[];
}

export type BlogCategory =
  | "Car Maintenance"
  | "Bike Maintenance"
  | "Tips & Tricks"
  | "Emergency Guide"
  | "Product Guide"
  | "City Guide";
