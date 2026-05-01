import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
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
};

const allFaqs = faqCategories.flatMap((c) => c.faqs);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

      <PageHero
        heading="Frequently Asked Questions"
        subtext="Everything you need to know about Fiixup's doorstep repair service."
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {cat.category}
                </h2>
                <FAQAccordion faqs={cat.faqs} />
              </div>
            ))}
          </div>

          <div className="mt-14 text-center bg-blue-50 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our team is available 24/7 — call, WhatsApp, or send a message.</p>
            <div className="flex flex-wrap gap-4 justify-center">
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
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
