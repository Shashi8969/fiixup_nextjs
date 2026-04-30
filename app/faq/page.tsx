import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
<<<<<<< HEAD
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";
import { globalFAQs as faqCategories } from "@/lib/data/faqs";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | Fiixup Doorstep Repair",
  description:
    "Answers to common questions about Fiixup's 24/7 doorstep car and bike repair service — booking, pricing, warranty, service areas and more.",
  alternates: { canonical: `${SITE_URL}/faq` },
=======
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";
import { globalFAQs as faqCategories } from "@/lib/data/faqs";
import { getStaticPageSEO } from "@/lib/data/seo";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

const seo = getStaticPageSEO("faq")!;

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

const allFaqs = faqCategories.flatMap((c) => c.faqs);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

<<<<<<< HEAD
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700">Everything you need to know about Fiixup's doorstep repair service.</p>
        </div>
      </section>
=======
      <PageHero
        heading="Frequently Asked Questions"
        subtext="Everything you need to know about Fiixup's doorstep repair service."
      />
>>>>>>> 8dcb818 (reconect github)

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {cat.category}
                </h2>
<<<<<<< HEAD
                <div className="space-y-4">
                  {cat.faqs.map((faq, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
=======
                <FAQAccordion faqs={cat.faqs} />
>>>>>>> 8dcb818 (reconect github)
              </div>
            ))}
          </div>

          <div className="mt-14 text-center bg-blue-50 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our team is available 24/7 — call, WhatsApp, or send a message.</p>
            <div className="flex flex-wrap gap-4 justify-center">
<<<<<<< HEAD
              <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Send a Message
              </Link>
              <a href={`tel:${MAIN_PHONE}`} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
=======
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send a Message
              </Link>
              <a
                href={`tel:${MAIN_PHONE}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
>>>>>>> 8dcb818 (reconect github)
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
