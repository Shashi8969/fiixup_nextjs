"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

type Props = {
  images: GalleryImage[];
};

export function GalleryGrid({ images }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    images.forEach((img) => img.category && set.add(img.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [images]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  if (!images.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
        <p className="text-gray-500">Our work gallery is being updated. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Work
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {filtered.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setOpenIndex(i)}
            style={{ animationDelay: `${Math.min(i, 12) * 60}ms` }}
            className="group relative mb-3 block w-full animate-fade-in-up overflow-hidden rounded-xl bg-gray-100 shadow-sm break-inside-avoid sm:mb-4 sm:rounded-2xl"
          >
            <Image
              src={image.imageUrl}
              alt={image.altText || image.title || "Fiixup completed job photo"}
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading={i < 8 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
              <Expand className="mb-auto ml-auto h-5 w-5 text-white/90" />
              {image.title && (
                <p className="text-left text-sm font-semibold text-white line-clamp-2">{image.title}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          images={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
