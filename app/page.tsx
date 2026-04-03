import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero"; // keep this normal
import { SITE_URL } from "@/lib/constants";

const Services = dynamic(() =>
  import("@/components/Services").then((mod) => mod.Services)
);

const About = dynamic(() =>
  import("@/components/About").then((mod) => mod.About)
);

const CityCoverage = dynamic(() =>
  import("@/components/CityCoverage").then((mod) => mod.CityCoverage)
);

const Testimonials = dynamic(() =>
  import("@/components/Testimonials").then((mod) => mod.Testimonials)
);

const Blog = dynamic(() =>
  import("@/components/Blog").then((mod) => mod.Blog)
);

const Contact = dynamic(() =>
  import("@/components/Contact").then((mod) => mod.Contact)
);

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