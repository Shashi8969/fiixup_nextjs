import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { faqPageSchema, jsonLdString } from "@/lib/schema";
import { getFaqPageCategories } from "@/lib/faqs";
import { getStaticPageSEO } from "@/lib/data/seo";
import { PageHero } from "@/components/ui/PageHero";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

const seo = getStaticPageSEO("faq")!;
export const revalidate = 3600;

export const metadata: Metadata = metadataFromBasicSeo({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: seo.canonical,
  path: "/faq",
  ogImageAlt: seo.ogTitle ?? seo.title,
});

export default async function FAQPage() {
  const faqCategories = await getFaqPageCategories();
  const allFaqs = faqCategories.flatMap((c) => c.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqPageSchema(allFaqs)) }}
      />

      <PageHero
        heading="Fiixup Help & Frequently Asked Questions"
        subtext="Practical answers about booking, diagnosis, pricing, roadside safety, batteries, punctures, towing and where Fiixup provides service."
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            Start here when you are unsure which Fiixup service fits your situation. The answers below explain what information to share, what can usually be handled at the vehicle, when a workshop or recovery is safer, and how pricing and service availability should be confirmed.
          </p>

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
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still need help choosing the right service?</h2>
            <p className="text-gray-600 mb-6">
              Send the vehicle type, symptom and exact location. Our team can help identify the appropriate next step and confirm current availability.
            </p>
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
