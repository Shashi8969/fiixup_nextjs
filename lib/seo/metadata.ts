import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/constants";
import type { SeoPage } from "@/lib/seo-pages";

export function absoluteUrl(value?: string | null, fallbackPath = "/") {
  const raw = (value || fallbackPath || "/").trim();
  if (!raw) return SITE_URL;
  if (/^https?:\/\//i.test(raw)) return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${SITE_URL}${path}`.replace(/([^:]\/)\/+/, "$1");
}

export function buildRobots(index = true): Metadata["robots"] {
  if (!index) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

type BasicSeoInput = {
  title?: string | null;
  description?: string | null;
  keywords?: string | string[] | null;
  canonical?: string | null;
  path?: string | null;
  ogImage?: string | null;
  ogImageAlt?: string | null;
  type?: "website" | "article";
  index?: boolean;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  // City/area-specific geo meta tags — a legacy signal Google doesn't use for
  // ranking, but cheap to get right and some local directories/aggregators
  // still read it. Omit to leave the generic India-wide default from the
  // root layout in place.
  geo?: {
    region?: string | null;    // e.g. "IN-MH" or state name
    placename?: string | null; // e.g. "Mumbai"
    position?: string | null;  // "lat;long"
  } | null;
};

export function metadataFromBasicSeo(input: BasicSeoInput): Metadata {
  const title = input.title || SITE_NAME;
  const description = input.description || "Fiixup doorstep car and bike service.";
  const canonical = absoluteUrl(input.canonical, input.path || "/");
  const ogImage = absoluteUrl(input.ogImage || DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE);
  const imageAlt = input.ogImageAlt || title;

  const openGraph: Metadata["openGraph"] = input.type === "article"
    ? {
        title,
        description,
        url: canonical,
        type: "article",
        locale: "en_IN",
        siteName: SITE_NAME,
        images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
        ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
        ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      }
    : {
        title,
        description,
        url: canonical,
        type: "website",
        locale: "en_IN",
        siteName: SITE_NAME,
        images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
      };

  const geoOther = input.geo
    ? {
        ...(input.geo.region ? { "geo.region": input.geo.region } : {}),
        ...(input.geo.placename ? { "geo.placename": input.geo.placename } : {}),
        ...(input.geo.position ? { "geo.position": input.geo.position, ICBM: input.geo.position.replace(";", ", ") } : {}),
      }
    : undefined;

  return {
    title,
    description,
    keywords: input.keywords ?? undefined,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: buildRobots(input.index ?? true),
    // `other` replaces (not merges with) the root layout's generic
    // geo.region/geo.placename — only takes effect when geoOther is set.
    ...(geoOther ? { other: geoOther } : {}),
  };
}

export function metadataFromSeoPage(page: SeoPage, fallbackPath?: string): Metadata {
  return metadataFromBasicSeo({
    title: page.meta_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
    canonical: page.canonical_url,
    path: fallbackPath || page.url_path,
    ogImage: page.og_image_url || DEFAULT_OG_IMAGE,
    ogImageAlt: page.meta_title,
    type: "website",
    index: page.is_indexed,
  });
}
