// app/page.tsx
export const revalidate = 3600;

import type { Metadata } from "next";
import { Hero }         from "@/components/Hero";
import { About }        from "@/components/About";
import { Services }     from "@/components/Services";
import { CityCoverage } from "@/components/CityCoverage";
import { Testimonials } from "@/components/Testimonials";
import { Blog }         from "@/components/Blog";
import { Contact }      from "@/components/Contact";
import { getStaticPageSEO } from "@/lib/data/seo";

const seo = getStaticPageSEO("home")!;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title:       seo.ogTitle       ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url:         seo.canonical,
  },
};

// async — required because Services and Blog are async server components
export default async function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <CityCoverage />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
