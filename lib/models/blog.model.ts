// lib/models/blog.model.ts

import type { ImageMeta } from "@/lib/seo-pages";

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
  date: string;           // ISO date string or display string — first publish
  updatedAt?: string;     // posts.updated_at — real last-edit timestamp, feeds Article.dateModified
  readTime: string;       // e.g. "5 min read"
  category: BlogCategory;
  tags: string[];
  tagLinks?: { name: string; slug: string }[]; // tag name + real DB slug, for clickable tag links
  image: string;          // Path to hero/thumbnail image
  imageAlt: string;
  imageMeta?: ImageMeta | null; // title/caption/focal point/crop from the Media Library pick
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
