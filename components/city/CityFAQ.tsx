"use client";

<<<<<<< HEAD
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { CityData } from "@/lib/models/city.model";

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function CityFAQ({ city }: { city: CityData }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggle = (key: string) => setOpenItem((prev) => (prev === key ? null : key));

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            FAQs — Doorstep Auto Repair in {city.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions from our customers in {city.name}.
          </p>
        </div>
=======
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
>>>>>>> 8dcb818 (reconect github)

        <div className="max-w-3xl mx-auto space-y-10">
          {city.faqCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {cat.category}
              </h3>
<<<<<<< HEAD
              <div className="space-y-3">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openItem === key}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
=======
              <FAQAccordion faqs={cat.faqs} />
>>>>>>> 8dcb818 (reconect github)
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions about our service in {city.name}?</p>
          <div className="flex flex-wrap gap-4 justify-center">
<<<<<<< HEAD
            <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Contact Us
            </Link>
            <a href={`tel:${city.phone}`} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
=======
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
>>>>>>> 8dcb818 (reconect github)
              <Phone className="w-4 h-4" /> {city.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
