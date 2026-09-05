import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const DISALLOW = ["/api/", "/admin-preview/", "/debug/", "/_next/"];

// Search / assistant retrieval crawlers that can surface Fiixup pages in
// answer experiences. Keep these separate from model-training controls so it
// is clear which rules affect discoverability versus model development.
const AI_SEARCH_USER_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

// Model / product crawlers. These are not substitutes for the search crawlers
// above, but are listed explicitly so their access policy is intentional.
const AI_MODEL_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: [...AI_SEARCH_USER_AGENTS, ...AI_MODEL_CRAWLERS],
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
