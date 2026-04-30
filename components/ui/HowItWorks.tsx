<<<<<<< HEAD

const howItWorks = [
  { n: "1", title: "Book Service",     desc: "Call us or book online. Choose your time and location."  },
  { n: "2", title: "We Come to You",   desc: "Technician arrives at your doorstep with tools & parts." },
  { n: "3", title: "Expert Service",   desc: "Professional diagnosis & repair done at your location."  },
  { n: "4", title: "Drive Away Happy", desc: "30-day warranty, digital receipt, and peace of mind."    },
];

{/* HOW IT WORKS */}
export default function HowItWorks() {
return (
     
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorks.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                  {n}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
);
}
=======
"use client";

import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

interface Step {
  n: string;
  title: string;
  desc: string;
}

interface Props {
  steps?: Step[];
}

export default function HowItWorks({ steps }: Props) {
  // Uses custom steps from specific services (Source 3) or falls back to global constants
  const displaySteps = steps ?? HOW_IT_WORKS_STEPS;

  return (
    <div className="relative">
      {/* Desktop Connector Line - Enhanced with gradient from Source 6 */}
      <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displaySteps.map((step, i) => (
          <div key={i} className="group relative z-10">
            {/* Card UI from Source 6 with optimized padding and shadows */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              {/* Step Number Circle[cite: 6] */}
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                {step.n}
              </div>

              {/* Text Content[cite: 6] */}
              <h3 className="font-bold text-gray-900 mb-3 text-lg tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {step.desc}
              </p>

              {/* Status Indicator for Mobile Clarity */}
              <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
>>>>>>> 8dcb818 (reconect github)
