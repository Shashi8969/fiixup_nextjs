import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CmsImage } from "@/components/ui/CmsImage";

interface HomeBlogCardProps {
  readonly id: string | number;
  readonly title: string;
  readonly excerpt: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly imageFocalX?: number | null;
  readonly imageFocalY?: number | null;
  readonly date: string;
  readonly category: string;
  readonly readTime?: string | number;
  readonly priority?: boolean;
}

export function HomeBlogCard({
  id, title, excerpt, image, imageAlt, imageFocalX, imageFocalY, date, category, readTime, priority = false,
}: HomeBlogCardProps) {
  const readTimeLabel = readTime == null || readTime === ""
    ? null
    : /min read/i.test(String(readTime))
      ? String(readTime)
      : `${readTime} min read`;

  const parsedDate = new Date(date);
  const dateLabel = Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  const fallbackImage = "assets/carservice.webp";
  const targetImage = image || fallbackImage;
  const src = targetImage.startsWith("http")
    ? targetImage
    : `/${targetImage.replace(/^\/+/, "")}`;

  return (
    <Link
      href={`/blog/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.14)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <CmsImage
          src={src}
          alt={imageAlt || title}
          title={title}
          focalX={imageFocalX}
          focalY={imageFocalY}
          ratio="blogCard"
          fit="cover"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-none transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> {dateLabel}
          </span>
          {readTimeLabel && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {readTimeLabel}
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
          {excerpt}
        </p>

        <span className="flex items-center gap-1.5 text-sm font-bold text-blue-600">
          Read Article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
