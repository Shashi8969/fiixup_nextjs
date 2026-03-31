// lib/models/blog.model.ts

export interface BlogPost {
  id: string;             // Unique slug / ID for URL → /blog/[id]
  title: string;
  slug: string;           // URL-friendly slug (same as id or separate)
  excerpt: string;        // Short summary for cards & meta description
  content: string;        // Full HTML or markdown content
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
}

export type BlogCategory =
  | "Car Maintenance"
  | "Bike Maintenance"
  | "Tips & Tricks"
  | "Emergency Guide"
  | "Product Guide"
  | "City Guide";
