import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo/metadata";

type SitemapPage = {
  url_path: string;
  canonical_url?: string | null;
  updated_at?: string | null;
  page_type?: string | null;
};

const BLOCKED_PREFIXES = ["/api", "/admin-preview", "/_next"];
const BLOCKED_PATHS = new Set(["/debug"]);

export function isPublicIndexablePath(path: string) {
  if (!path || path === "/") return true;
  if (BLOCKED_PATHS.has(path)) return false;
  return !BLOCKED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function safeDate(value?: string | null) {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function priorityForPage(pageType?: string | null) {
  switch (pageType) {
    case "home":
      return 1;
    case "city_hub":
    case "city":
      return 0.9;
    case "city_service":
    case "location_service":
      return 0.9;
    case "area_service":
      return 0.85;
    case "city_service_category":
      return 0.8;
    case "global_service":
      return 0.75;
    case "blog":
    case "blog_post":
      return 0.65;
    default:
      return 0.7;
  }
}

function changeFrequencyForPage(pageType?: string | null): MetadataRoute.Sitemap[number]["changeFrequency"] {
  switch (pageType) {
    case "blog":
    case "blog_post":
      return "monthly";
    case "home":
    case "city_hub":
    case "city":
    case "city_service":
    case "area_service":
    case "location_service":
    case "city_service_category":
      return "weekly";
    default:
      return "weekly";
  }
}

const STATIC_FALLBACKS: SitemapPage[] = [
  { url_path: "/", page_type: "home" },
  { url_path: "/services", page_type: "global_service" },
  { url_path: "/blog", page_type: "blog" },
  { url_path: "/about", page_type: "static" },
  { url_path: "/contact", page_type: "static" },
  { url_path: "/faq", page_type: "static" },
  { url_path: "/gallery", page_type: "static" },
];

export function buildSitemapEntries(seoPages: SitemapPage[]): MetadataRoute.Sitemap {
  const now = new Date();
  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const page of [...STATIC_FALLBACKS, ...seoPages]) {
    const path = page.url_path === "/" ? "/" : page.url_path.replace(/\/$/, "");
    if (!isPublicIndexablePath(path)) continue;

    const url = absoluteUrl(page.canonical_url || path, path);
    if (!url.startsWith(SITE_URL)) continue;

    byUrl.set(url, {
      url,
      lastModified: page.updated_at ? safeDate(page.updated_at) : now,
      changeFrequency: changeFrequencyForPage(page.page_type),
      priority: priorityForPage(page.page_type),
    });
  }

  return Array.from(byUrl.values()).sort((a, b) => a.url.localeCompare(b.url));
}
