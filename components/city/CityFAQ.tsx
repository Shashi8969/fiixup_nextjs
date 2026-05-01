"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function CityFAQ({ city }: { readonly city: CityData }) {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading={`FAQs — Doorstep Auto Repair in ${city.name}`}
          subtext={`Common questions from our customers in ${city.name}.`}
        />

        <div className="max-w-3xl mx-auto space-y-10">
          {city.faqCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {cat.category}
              </h3>
              <FAQAccordion faqs={cat.faqs} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions about our service in {city.name}?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${city.phone}`}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {city.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
