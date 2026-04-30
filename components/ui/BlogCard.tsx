import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  readonly id: string | number;
  readonly title: string;
  readonly excerpt: string;
  readonly image?: string; // Made optional for safety
  readonly date: string;
  readonly category: string;
  readonly readTime?: string;
  readonly author?: string;
  readonly priority?: boolean;
}

export function BlogCard({
  id, title, excerpt, image, date, category,
  readTime, author, priority = false,
}: BlogCardProps) {
  
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
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={src}
          alt={title}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <Calendar className="w-3.5 h-3.5" /> {date}
          </span>
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {readTime}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

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
