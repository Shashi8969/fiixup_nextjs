import type { MetadataRoute } from "next";
import { getSitemapUrls } from "@/lib/seo-pages";
import { buildSitemapEntries } from "@/lib/seo/sitemap";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSitemapUrls();
  return buildSitemapEntries(pages);
}
