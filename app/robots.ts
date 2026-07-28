import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const DISALLOW = ["/api/", "/admin-preview/", "/debug/", "/_next/"];

// AI crawlers used for chatbot answers / assistant browsing (ChatGPT, Claude,
// Perplexity, Google's AI features, Common Crawl feeding various LLMs). Listed
// explicitly — rather than relying only on the "*" rule below — so it's clear
// Fiixup deliberately welcomes AI/LLM discovery of its real pricing and
// service-area content, not just traditional search engines.
const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
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
        userAgent: AI_USER_AGENTS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
