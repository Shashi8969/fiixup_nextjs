import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import cities from "@/lib/cities";
import services from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`,    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // /bengaluru, /chennai, /hyderabad, /mumbai
  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // /services/car-brake-service, etc.
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // City + service combination pages
const cityServiceRoutes: MetadataRoute.Sitemap = [];
for (const city of cities) {
  for (const service of services) {
    cityServiceRoutes.push({
      url: `${SITE_URL}/${city.slug}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
}
  return [...staticRoutes, ...cityRoutes, ...serviceRoutes, ...cityServiceRoutes];
}
