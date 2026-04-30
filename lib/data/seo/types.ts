export interface PageSEO {
  /** Unique key — used as the primary identifier in an admin panel */
  id: string;
  /** Human-readable label for the admin panel list */
  label: string;
  /** URL path relative to the site root (e.g. "/", "/about") */
  route: string;
  title: string;
  description: string;
  /** Comma-separated keyword string */
  keywords?: string;
  /** Falls back to `title` when not set */
  ogTitle?: string;
  /** Falls back to `description` when not set */
  ogDescription?: string;
  /** Absolute URL — falls back to DEFAULT_OG_IMAGE */
  ogImage?: string;
  /** Full canonical URL — auto-computed from SITE_URL + route when not set */
  canonical?: string;
  noIndex?: boolean;
}
