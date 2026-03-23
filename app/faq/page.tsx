import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | Fiixup Doorstep Repair",
  description:
    "Answers to common questions about Fiixup's 24/7 doorstep car and bike repair service — booking, pricing, warranty, service areas and more.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

const faqCategories = [
  {
    category: "General",
    faqs: [
      { q: "What is Fiixup?", a: "Fiixup is a 24/7 doorstep car and bike repair service operating across major Indian cities. Our certified technicians come to your home, office, or wherever your vehicle is." },
      { q: "Which cities do you operate in?", a: "We operate in Bengaluru, Chennai, Hyderabad, and Mumbai — with more cities coming soon!" },
      { q: "How quickly can a technician arrive?", a: "Our technicians typically arrive within 30–60 minutes. For emergency breakdowns, we prioritise arrival within 30 minutes." },
      { q: "What are your service hours?", a: "We are available 24/7, 365 days a year including public holidays and weekends." },
    ],
  },
  {
    category: "Booking & Pricing",
    faqs: [
      { q: "How do I book a service?", a: "You can book via our website contact form, call your city's number, or WhatsApp us. We'll confirm your booking within minutes." },
      { q: "Is there a visit charge?", a: "We charge a minimal visit fee which is waived if you proceed with the service. No hidden charges — pricing is shared upfront." },
      { q: "Do you provide a quote before starting?", a: "Yes, our technician diagnoses the issue and provides a transparent quote before starting any repair." },
      { q: "What payment methods do you accept?", a: "We accept UPI (GPay, PhonePe, Paytm), cash, debit/credit cards, and net banking." },
    ],
  },
  {
    category: "Car Services",
    faqs: [
      { q: "Which car brands do you service?", a: "All popular brands — Maruti, Hyundai, Honda, Tata, Toyota, Kia, MG, Mahindra, Volkswagen, Skoda, and more." },
      { q: "Do you carry spare parts?", a: "Yes, our service vans are stocked with common parts. For rare parts, we source them same-day." },
      { q: "Can you do major engine repairs at my doorstep?", a: "We handle most repairs at your doorstep. For very major overhauls, we may need to tow the vehicle to our workshop." },
    ],
  },
  {
    category: "Bike Services",
    faqs: [
      { q: "Which bike brands do you service?", a: "All popular brands — Honda, Bajaj, TVS, Royal Enfield, Yamaha, Suzuki, Hero, KTM, and more." },
      { q: "Do you service scooters?", a: "Yes — Honda Activa, TVS Jupiter, Suzuki Access, Yamaha Fascino, and all other scooters." },
      { q: "How often should I service my bike?", a: "Every 3,000–5,000 km or every 3 months, whichever comes first." },
    ],
  },
  {
    category: "Quality & Warranty",
    faqs: [
      { q: "Is there a warranty on repairs?", a: "Yes — all repairs come with a 30-day service warranty. If the same issue recurs within 30 days, we fix it free of charge." },
      { q: "Do you use genuine parts?", a: "Yes, we use OEM or high-quality aftermarket parts for all repairs." },
      { q: "Are your technicians certified?", a: "Yes — all Fiixup technicians are certified, background-verified, and trained for both cars and bikes." },
    ],
  },
];

const allFaqs = faqCategories.flatMap((c) => c.faqs);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700">Everything you need to know about Fiixup's doorstep repair service.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {cat.category}
                </h2>
                <div className="space-y-4">
                  {cat.faqs.map((faq, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center bg-blue-50 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our team is available 24/7 — call, WhatsApp, or send a message.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Send a Message
              </Link>
              <a href={`tel:${MAIN_PHONE}`} className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
