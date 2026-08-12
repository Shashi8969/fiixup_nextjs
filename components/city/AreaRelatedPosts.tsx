import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';
import { Reveal } from '@/components/ui/Reveal';

export function AreaRelatedPosts({ data, heading }: { data: AreaHubPageData; heading?: string | null }) {
  const posts = data.relatedPosts ?? [];
  if (posts.length === 0) return null;

  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            From the blog
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            {heading?.trim() || `Helpful guides for ${data.areaName} vehicle owners`}
          </h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 6) * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {post.category || 'Guide'}
                </span>
                <span className="font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
                  {post.title}
                </span>
                <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Read guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
