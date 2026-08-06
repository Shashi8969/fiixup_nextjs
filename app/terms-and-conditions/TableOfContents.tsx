"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden self-start lg:sticky lg:top-24 lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          On this page
        </p>
        <ol className="space-y-0.5 border-l border-slate-200">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C3F88] ${
                  activeId === item.id
                    ? "border-[#D3252A] font-semibold text-[#1C3F88]"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-[#1C3F88]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}. {item.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile "jump to section" dropdown */}
      <details className="mb-8 rounded-lg border border-slate-200 bg-white open:shadow-sm lg:hidden">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-[#1C3F88]">
          Jump to a section
        </summary>
        <ol className="divide-y divide-slate-100 px-4 pb-2">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="block w-full py-2 text-left text-sm text-slate-600"
              >
                {String(i + 1).padStart(2, "0")}. {item.label}
              </button>
            </li>
          ))}
        </ol>
      </details>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#1C3F88] text-white shadow-lg transition hover:bg-[#152f68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D3252A] lg:bottom-8 lg:right-8"
        >
          ↑
        </button>
      )}
    </>
  );
}
