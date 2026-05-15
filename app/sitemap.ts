// app/sitemap.ts
import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllCities } from "@/lib/cities";
import { getAllServices } from "@/lib/services";
import { getAllLocationServices } from "@/lib/locationServices";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [cities, services, locationServices, posts] = await Promise.all([
    getAllCities(),
    getAllServices(),
    getAllLocationServices(),
    getAllPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/blog`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/contact`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`,      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // ── location_services — the real /[city]/[area]/[service] URLs ──────────────
  // These are the most important SEO pages — always use canonicalUrl from DB
  const locationServiceRoutes: MetadataRoute.Sitemap = locationServices.map((ls) => ({
    url: ls.canonicalUrl.startsWith("http")
      ? ls.canonicalUrl
      : `${SITE_URL}${ls.canonicalUrl}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: ls.areaSlug ? 0.80 : 0.90, // city-level pages rank higher than area pages
  }));

  // ── Blog posts ────────────────────────────────────────────────────────────
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...serviceRoutes,
    ...locationServiceRoutes,
    ...blogRoutes,
  ];
}
