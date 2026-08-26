"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useImageQuality } from "@/lib/image-quality-context";

type Ratio = "blogHero" | "blogCard" | "content" | "about" | "serviceHero" | "square" | "wide";
type Fit = "contain" | "cover";

const ratioClass: Record<Ratio, string> = {
  blogHero: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]",
  blogCard: "aspect-[4/3]",
  content: "aspect-[4/3] sm:aspect-[16/9]",
  about: "aspect-[4/3] lg:aspect-[5/4]",
  serviceHero: "aspect-[4/3] md:aspect-[5/4]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

function normalizeSrc(src?: string | null) {
  if (!src) return "/assets/carservice.webp";
  if (src.startsWith("http")) return src;
  return "/" + src.replace(/^\/+/, "");
  }

export function CmsImage({
  src, alt, title, caption, ratio = "content", fit = "contain", priority = false, sizes = "(max-width: 768px) 100vw, 50vw", className, imageClassName, focalX = 50, focalY = 50, quality,
}: {
  src?: string | null;
  alt?: string | null;
  title?: string | null;
  /** Renders a <figcaption> below the image (media_library.caption / <slot>_image_meta.caption). Omit to render a plain <div> as before. */
  caption?: string | null;
  ratio?: Ratio;
  fit?: Fit;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  focalX?: number | null;
  focalY?: number | null;
  /** Overrides the admin-controlled site-wide default (Site Settings → Image Quality) for this one image. */
  quality?: number;
}) {
  const siteQuality = useImageQuality();
  const safeAlt = alt?.trim() || title?.trim() || "Fiixup service image";
  const Wrapper = caption?.trim() ? "figure" : "div";
  return (
    <Wrapper className={clsx("relative overflow-hidden rounded-2xl bg-slate-100", ratioClass[ratio], className)}>
      <Image
        src={normalizeSrc(src)}
        alt={safeAlt}
        title={title || safeAlt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={quality ?? siteQuality}
        sizes={sizes}
        className={clsx(fit === "cover" ? "object-cover" : "object-contain", imageClassName)}
        style={{ objectPosition: (focalX ?? 50) + "% " + (focalY ?? 50) + "%" }}
      />
      {caption?.trim() ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-1.5 text-center text-xs text-white">
          {caption}
        </figcaption>
      ) : null}
    </Wrapper>
  );
}
