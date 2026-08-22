// Classifies a pathname into a coarse page-type bucket used to key
// admin-controlled per-page-type settings (currently: floating CTA button
// visibility — see lib/cta-settings.ts). Keep in sync with the page_type
// values seeded in the cta_visibility_settings table (fiixup-admin repo).

export type PageType =
  | "home"
  | "city"
  | "area"
  | "location_service"
  | "city_service"
  | "global_service"
  | "blog"
  | "brand"
  | "static";

const STATIC_PATHS = new Set([
  "/about",
  "/contact",
  "/faq",
  "/gallery",
  "/privacy-policy",
  "/terms-and-conditions",
]);

export function classifyPageType(pathname: string): PageType {
  const path = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (path === "/") return "home";
  if (STATIC_PATHS.has(path)) return "static";
  if (path.startsWith("/admin-preview")) return "static";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/brands")) return "brand";
  if (path === "/services" || path.startsWith("/services/")) return "global_service";

  const segments = path.split("/").filter(Boolean);

  if (segments.length >= 2 && segments[1] === "services") return "city_service";
  if (segments.length === 1) return "city";
  if (segments.length === 2) return "area";
  if (segments.length >= 3) return "location_service";

  return "static";
}
