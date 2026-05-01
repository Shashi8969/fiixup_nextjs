// components/service/CompleteGuide.tsx
import type { CompleteGuide } from "@/lib/models/service.model";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

interface Props {
  guide: CompleteGuide;
}

export default function CompleteGuideSection({ guide }: Props) {
  return (
    <section className="py-16 bg-white" id="complete-guide">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          <div className="mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">
              Complete Guide
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {guide.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-red-500 pl-4">
              {guide.intro}
            </p>
          </div>

          {/* Table of contents */}
          <nav className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">In This Guide</p>
            <ol className="space-y-2">
              {guide.sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#guide-section-${i}`}
                    className="flex items-start gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Guide sections */}
          <div className="space-y-12">
            {guide.sections.map((section, i) => (
              <div key={i} id={`guide-section-${i}`} className="scroll-mt-20">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {section.heading}
                </h3>

                <div className="text-gray-700 leading-relaxed space-y-4 pl-11">
                  {section.body.split("\n").filter(Boolean).map((para, pi) => (
                    <p key={pi}>{para}</p>
                  ))}

                  {section.tips && section.tips.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pro Tips</span>
                      </div>
                      <ul className="space-y-2">
                        {section.tips.map((tip, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-sm text-amber-900">
                            <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">→</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8">
            <p className="text-lg leading-relaxed text-gray-200">{guide.conclusion}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+918197459732"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Call +91 8197459732
              </a>
              <Link
                href="/contact#contact-form"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Book Online
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
