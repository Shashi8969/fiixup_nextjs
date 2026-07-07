import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { getStaticPageSEO } from "@/lib/data/seo";
import { contactPageSchema } from "@/lib/schema";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { PageHero } from "@/components/ui/PageHero";
export const revalidate = 3600; // refreshes every 1 hour


const seo = getStaticPageSEO("contact")!;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: seo.canonical,
  },
};

export default async function ContactPage() {
  const siteSettings = await getPublicSiteSettings();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            contactPageSchema({
              phone: siteSettings.mainPhone,
              email: siteSettings.mainEmail,
              emergencyPhone: siteSettings.emergencyPhone || undefined,
              address: siteSettings.addressStreet
                ? {
                    street: siteSettings.addressStreet,
                    locality: siteSettings.addressLocality,
                    region: siteSettings.addressRegion,
                    postalCode: siteSettings.addressPostalCode,
                    country: siteSettings.addressCountry,
                  }
                : undefined,
            })
          ),
        }}
      />
      <PageHero
        heading="Contact Us"
        subtext="Available 24/7 across India. Reach out for emergency service or schedule your appointment."
      />
      <Contact siteSettings={siteSettings} />
    </>
  );
}
