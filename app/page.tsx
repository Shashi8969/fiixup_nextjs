// app/page.tsx
export const revalidate = 3600;

import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero }         from "@/components/Hero";
import { About }        from "@/components/About";
import { Services }     from "@/components/Services";
import { CityCoverage } from "@/components/CityCoverage";
import { Testimonials } from "@/components/Testimonials";
import { Blog }         from "@/components/Blog";
import { Contact }      from "@/components/Contact";
import { homeSchema } from "@/lib/schema";
import { getHomepageData } from "@/lib/homepage";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomepageData();

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export default async function HomePage() {
  const [homeData, siteSettings] = await Promise.all([
    getHomepageData(),
    getPublicSiteSettings(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeData.seo.schemaJson ?? homeSchema()) }}
      />
      <Hero data={homeData.hero} mainPhone={siteSettings.mainPhone} />
      <Services {...homeData.services} />
      <About data={homeData.about} />
      <CityCoverage {...homeData.cityCoverage} />
     <Suspense fallback={<SectionSkeleton rows={4} />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton rows={3} />}>
        <Blog {...homeData.blog} />
      </Suspense>
      <Contact data={homeData.contact} siteSettings={siteSettings} />
    </>
  );
}
