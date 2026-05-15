import { SITE_URL } from "@/lib/constants";

export function webpageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name,

    description,

    url: `${SITE_URL}${url}`,
  };
}