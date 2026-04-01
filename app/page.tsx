import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { CityCoverage } from "@/components/CityCoverage";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fiixup — 24/7 Doorstep Car & Bike Repair Service in India",
  description:
    "India's trusted 24/7 doorstep car and bike repair service. Certified mechanics at your home or office in Bengaluru, Chennai, Hyderabad & Mumbai. Honest pricing. Book now.",
  alternates: { canonical: SITE_URL },
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
