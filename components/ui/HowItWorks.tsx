// components/ui/HowItWorks.tsx
// ─────────────────────────────────────────────────────────────────────────────
// "How It Works" step component.
// Accepts optional custom steps from service data; falls back to global steps.
// ─────────────────────────────────────────────────────────────────────────────

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

interface Step {
  n: string;
  title: string;
  desc: string;
}

interface Props {
  steps?: Step[];
}

export default function HowItWorks({ steps }: Props) {
  const displaySteps = steps ?? HOW_IT_WORKS_STEPS;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displaySteps.map((step, i) => (
        <div key={i} className="relative">
          {/* Connector line (hidden on last item) */}
          {i < displaySteps.length - 1 && (
            <div className="hidden lg:block absolute top-7 left-[calc(50%+24px)] right-[-calc(50%-24px)] h-0.5 bg-gradient-to-r from-blue-200 to-gray-200 z-0" />
          )}

          <div className="relative z-10 bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-blue-200 transition-all">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
              {step.n}
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
