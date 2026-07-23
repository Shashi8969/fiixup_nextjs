import type { NextConfig } from "next";
import { STATIC_SECURITY_HEADERS, getSupabaseHost } from "./lib/security-headers";

const securityHeaders = STATIC_SECURITY_HEADERS;

function stripTrailingSlash(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}

function normalizeRedirectSource(value: string) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";

  if (trimmed.includes(":path*") || trimmed.includes("*")) {
    const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return stripTrailingSlash(withSlash);
  }

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return stripTrailingSlash(new URL(trimmed).pathname);
    }
  } catch {
    return "";
  }

  const pathOnly = trimmed.split("?")[0].split("#")[0];
  return stripTrailingSlash(pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`);
}

function normalizeRedirectDestination(value: string) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";

  try {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      const parsed = new URL(trimmed);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return trimmed;
      return "";
    }
  } catch {
    return "";
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1600],
    remotePatterns: [
      {
        protocol: "https",
        hostname: getSupabaseHost(),
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  trailingSlash: false, // FIX: was true. Aligns served URL with the no-slash canonical + sitemap the DB already emits, and 308-redirects the /x/ duplicates.

  async redirects() {
    let dbRedirects: { source: string; destination: string; permanent: boolean }[] = [];

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey) {
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/redirects?select=source,destination,is_permanent&is_active=eq.true&limit=5000`,
          {
            headers: {
              apikey: serviceKey,
              Authorization: `Bearer ${serviceKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const rows = (await res.json()) as { source: string; destination: string; is_permanent: boolean }[];
          dbRedirects = rows.flatMap((r) => {
            const source = normalizeRedirectSource(r.source);
            const destination = normalizeRedirectDestination(r.destination);
            if (!source || !destination || source === destination) return [];
            return [{ source, destination, permanent: Boolean(r.is_permanent) }];
          });
        }
      } catch (err) {
        console.warn("[next.config] Could not fetch Supabase redirects");
      }
    }

    return [
      ...dbRedirects,
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.fiixup.in",
          },
        ],
        destination: "https://fiixup.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;