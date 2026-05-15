import { SITE_URL } from "@/lib/constants";

export function breadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",

      position: i + 1,

      name: c.name,

      item: `${SITE_URL}${c.url}`,
    })),
  };
}