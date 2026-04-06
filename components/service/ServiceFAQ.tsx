// components/service/FAQ.tsx

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ({ faqs }: any) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq: any, i: number) => (
        <div key={i} className="border rounded-xl">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between p-5"
          >
            <span>{faq.q}</span>
            {open === i ? <ChevronUp /> : <ChevronDown />}
          </button>

          {open === i && (
            <div className="p-5 border-t">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}