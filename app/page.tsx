// app/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/Hero"; // keep this normal
import { About } from "@/components/About"; // named export
import { Services } from "@/components/Services"
import { CityCoverage } from "@/components/CityCoverage";
import { Testimonials } from "@/components/Testimonials"; // named export
import { Blog } from "@/components/Blog"; // named export
import { Contact } from "@/components/Contact"; // named export
import { getStaticPageSEO } from "@/lib/data/seo";

const seo = getStaticPageSEO("home")!;

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

export default function HomePage() {
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