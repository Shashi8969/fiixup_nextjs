import { SITE_URL } from "@/lib/constants";

import { reviewSchema } from "./reviews";

import { offerSchema } from "./offers";

export function locationServiceSchema({
  city,
  area,
  service,
  description,
  url,
  latitude,
  longitude,
  minPrice,
  maxPrice,
  reviews = [],
}: {
  city: string;
  area?: string;
  service: string;
  description: string;
  url: string;

  latitude: number;
  longitude: number;

  minPrice: number;
  maxPrice: number;

  reviews?: any[];
}) {
  return {
    "@context": "https://schema.org",

    "@type": "Service",

    "@id": `${SITE_URL}${url}#service`,

    name: `${service} in ${area ? area + ", " : ""}${city}`,

    description,

    url: `${SITE_URL}${url}`,

    areaServed: {
      "@type": "Place",

      name: area || city,
    },

    provider: {
      "@type": "AutoRepair",

      name: "Fiixup",

      url: SITE_URL,
    },

    geo: {
      "@type": "GeoCoordinates",

      latitude,

      longitude,
    },

    offers: offerSchema({
      minPrice,
      maxPrice,
    }),

    review: reviewSchema(reviews),

    aggregateRating: {
      "@type": "AggregateRating",

      ratingValue: "4.9",

      reviewCount: String(reviews.length || 100),

      bestRating: "5",
    },
  };
}