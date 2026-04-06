// app/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/Hero"; // keep this normal
import { SITE_URL } from "@/lib/constants";
import { About } from "@/components/About"; // named export
import { Services } from "@/components/Services"
import { CityCoverage } from "@/components/CityCoverage"; 
import { Testimonials } from "@/components/Testimonials"; // named export
import { Blog } from "@/components/Blog"; // named export
import { Contact } from "@/components/Contact"; // named export

export const metadata: Metadata = {
  title: "24/7 Doorstep Car & Bike Repair India | Mechanic Near Me | Fiixup",
  description:
    "Fiixup offers 24/7 doorstep car and bike repair services across India. Find a mechanic near you for quick and reliable vehicle maintenance. Book now!",
  alternates: { canonical: SITE_URL },
  keywords: [
    "doorstep car repair",
    "bike service at home",
    "mechanic near me",
    "24/7 roadside assistance",
    "car battery jumpstart",
    "on-site vehicle repair",
    "Best car mechanic near me",
    "Best bike mechanic near me",
    "Garage near me",
    "Mobile mechanic near me",
    "Car repair near me",
    "Bike repair near me",
    "jumpstart near me",
    "roadside assistance near me",
    "Fiixup"
  ],
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