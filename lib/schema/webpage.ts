import { SITE_URL, MAIN_PHONE, MAIN_EMAIL } from "@/lib/constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name: "Fiixup",

    url: SITE_URL,

    logo: `${SITE_URL}/assets/logo.webp`,

    image: `${SITE_URL}/assets/og-image.webp`,

    telephone: MAIN_PHONE,

    email: MAIN_EMAIL,

    foundingDate: "2020",

    sameAs: [
      "https://www.facebook.com/fiixup1/",
      "https://www.instagram.com/fiixup_in/"
    ],

    areaServed: {
      "@type": "Country",
      name: "India"
    }
  };
}