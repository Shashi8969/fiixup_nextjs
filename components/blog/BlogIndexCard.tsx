import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/ui/CmsImage";
import { CategoryPlaceholder } from "@/components/blog/CategoryPlaceholder";
import { blogDisplayFont } from "@/components/blog/fonts";
import { formatCategoryLabel } from "@/components/blog/format";

export interface BlogIndexCardProps {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly imageFocalX?: number | null;
  readonly imageFocalY?: number | null;
  readonly date: string;
  readonly category: string;
  readonly readTime?: string | number;
  readonly author?: string;
  readonly priority?: boolean;
}

export function BlogIndexCard({
  id, title, excerpt, image, imageAlt, imageFocalX, imageFocalY, date, category, readTime, author, priority = false,
}: BlogIndexCardProps) {
  const parsedDate = new Date(date);
  const dateLabel = Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  const readTimeLabel = readTime == null || readTime === ""
    ? null
    : /min read/i.test(String(readTime))
      ? String(readTime)
      : `${readTime} min read`;

  const bylineParts = [author, dateLabel, readTimeLabel].filter(Boolean);

  return (
    <Link
      href={`/blog/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 transition-all hover:-translate-y-1 hover:border-brand-ink/30 hover:shadow-xl"
    >
      {/* Image/placeholder keep their own rounded-2xl (from CmsImage /
         CategoryPlaceholder) — the card gives them even padding on all
         sides instead of trying to flatten their bottom corners, which
         avoids fighting Tailwind's class-conflict resolution. */}
      {image ? (
        <CmsImage
          src={image}
          alt={imageAlt || title}
          title={title}
          focalX={imageFocalX}
          focalY={imageFocalY}
          ratio="blogCard"
          fit="cover"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imageClassName="transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <CategoryPlaceholder category={category} />
      )}

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-crimson">
          {formatCategoryLabel(category)}
        </span>

        <h3
          className={`${blogDisplayFont.className} mt-2 text-xl font-semibold leading-snug text-gray-900 group-hover:text-brand-ink transition-colors`}
        >
          {title}
        </h3>

        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-gray-600">
          {excerpt}
        </p>

        <div className="mt-5 flex flex-1 items-end justify-between gap-3">
          <p className="text-xs text-gray-500">
            {bylineParts.map((part, i) => (
              <span key={`${part}-${i}`}>
                {i > 0 && <span className="mx-1.5 text-gray-300">·</span>}
                {part}
              </span>
            ))}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-ink">
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
