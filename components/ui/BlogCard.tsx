import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { CmsImage } from "@/components/ui/CmsImage";

interface BlogCardProps {
  readonly id: string | number;
  readonly title: string;
  readonly excerpt: string;
  readonly image?: string;
  readonly imageAlt?: string;   // SEO alt text from DB — falls back to title
  readonly date: string;
  readonly category: string;
  readonly readTime?: string | number;
  readonly author?: string;
  readonly priority?: boolean;
  readonly tagLinks?: { name: string; slug: string }[];
}

export function BlogCard({
  id, title, excerpt, image, imageAlt, date, category,
  readTime, author, priority = false, tagLinks,
}: BlogCardProps) {

  // readTime always arrives as a string from the page components, so the
  // "min read" suffix needs adding here rather than relying on typeof === "number".
  const readTimeLabel = readTime == null || readTime === ""
    ? null
    : /min read/i.test(String(readTime))
      ? String(readTime)
      : `${readTime} min read`;

  // Dates are stored as plain ISO strings ("2026-04-18") — format for display
  // rather than showing the raw string. Falls back to the raw value if invalid.
  const parsedDate = new Date(date);
  const dateLabel = Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

// 1. Define the fallback without a leading slash
  const fallbackImage = "assets/carservice.webp";
  
  // 2. Use the provided image or the fallback
  const targetImage = image || fallbackImage;

  // 3. Logic: If it's a remote URL, use it. 
  // If local, remove any existing leading slashes and add exactly one.
  const src = targetImage.startsWith("http") 
    ? targetImage 
    : `/${targetImage.replace(/^\/+/, "")}`;

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
     <div className="relative overflow-hidden bg-gray-100">
  <CmsImage
    src={src}
    alt={imageAlt || title}
    title={title}
    ratio="blogCard"
    fit="contain"
    priority={priority}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="rounded-none"
  />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {dateLabel}
          </span>
          {readTimeLabel && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {readTimeLabel}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {tagLinks && tagLinks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tagLinks.slice(0, 3).map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          {author && <span className="text-sm text-gray-500">By {author}</span>}
          <Link
            href={`/blog/${id}`}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all ml-auto"
            aria-label={`Read: ${title}`}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
