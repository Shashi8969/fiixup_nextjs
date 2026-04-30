import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
<<<<<<< HEAD
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Book Doorstep Car & Bike Repair | Fiixup",
  description:
    "Contact Fiixup for 24/7 doorstep car and bike service in Bengaluru, Chennai, Hyderabad & Mumbai. Call +91 8197459732 or book online.",
  alternates: { canonical: `${SITE_URL}/contact` },
=======
import { getStaticPageSEO } from "@/lib/data/seo";
import { PageHero } from "@/components/ui/PageHero";

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
>>>>>>> 8dcb818 (reconect github)
};

export default function ContactPage() {
  return (
    <>
<<<<<<< HEAD
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Contact Us</h1>
          <p className="text-xl text-gray-700">
            Available 24/7 across India. Reach out for emergency service or schedule your appointment.
          </p>
        </div>
      </section>
=======
      <PageHero
        heading="Contact Us"
        subtext="Available 24/7 across India. Reach out for emergency service or schedule your appointment."
      />
>>>>>>> 8dcb818 (reconect github)
      <Contact />
    </>
  );
}
