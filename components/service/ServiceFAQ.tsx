"use client";

import type { FAQ } from "@/lib/models/faq.model";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export default function ServiceFAQ({ faqs }: { readonly faqs: FAQ[] }) {
  return <FAQAccordion faqs={faqs} />;
}
