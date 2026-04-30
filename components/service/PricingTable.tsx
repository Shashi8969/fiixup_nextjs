// components/service/PricingTable.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Transparent pricing section + competitor comparison table.
// All data comes from ServiceData.pricing — zero hardcoding.
// ─────────────────────────────────────────────────────────────────────────────

import type { PricingData } from "@/lib/models/service.model";
import { Check, X } from "lucide-react";
import { serviceThemes, type ThemeColor } from "@/lib/theme";

interface Props {
  pricing: PricingData;
  serviceTitle: string;
  accentColor?: ThemeColor; // Uses the type from theme.ts
}


export default function PricingTable({ pricing, serviceTitle, accentColor = "red" }: Props) {
  const a = serviceThemes[accentColor] || serviceThemes["red"]; // Fallback to red if invalid color provided

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
            Transparent Pricing
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {serviceTitle} — Price List
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            No guesswork. No surprise bills. Every price is confirmed before our technician starts work.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Pricing rows */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Service Pricing</h3>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {pricing.rows.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 px-5 py-4 border-b last:border-b-0 flex-wrap
                    ${row.highlight ? `${a.highlight} border` : i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  `}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {row.highlight && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${a.badge}`}>
                        Popular
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm leading-tight">{row.label}</p>
                      {row.note && (
                        <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`font-bold text-base ${row.highlight ? a.price : "text-gray-900"}`}>
                      ₹{row.priceFrom.toLocaleString("en-IN")}
                      {row.priceTo ? `–₹${row.priceTo.toLocaleString("en-IN")}` : "+"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              {pricing.disclaimer}
            </p>
          </div>

          {/* Competitor comparison */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">How We Compare</h3>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-4 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 px-4 py-3 border-b gap-2">
                <span className="col-span-1">Provider</span>
                <span className="text-center">Price</span>
                <span className="text-center">Arrival</span>
                <span className="text-center">Doorstep</span>
              </div>
              {pricing.competitors.map((c, i) => {
                const isUs = c.name === "Fiixup";
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-4 items-center px-4 py-4 border-b last:border-b-0 gap-2 text-sm
                      ${isUs ? "bg-green-50 font-semibold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    `}
                  >
                    <div className="col-span-1 flex items-center gap-1.5">
                      {isUs && (
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      )}
                      <span className={isUs ? "text-green-800" : "text-gray-700"}>{c.name}</span>
                    </div>
                    <div className="text-center">
                      <span className={isUs ? "text-green-700" : "text-gray-600"}>{c.price}</span>
                    </div>
                    <div className="text-center">
                      <span className={`text-xs ${isUs ? "text-green-700 font-semibold" : "text-gray-500"}`}>
                        {c.arrivalTime}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {c.doorstep
                        ? <Check className={`w-4 h-4 ${isUs ? "text-green-600" : "text-gray-400"}`} />
                        : <X className="w-4 h-4 text-red-400" />
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Upfront pricing", "30-day warranty", "Certified mechanics", "No hidden fees"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                  <Check className="w-3 h-3 text-green-600" /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="tel:+918197459732"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-100 text-base"
          >
            Get Exact Quote — Call +91 8197459732
          </a>
          <p className="text-xs text-gray-400 mt-2">Quote confirmed before any work begins. No obligation.</p>
        </div>

      </div>
    </section>
  );
}
