import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';

export function AreaRelatedPosts({ data }: { data: AreaHubPageData }) {
  const posts = data.relatedPosts ?? [];
  if (posts.length === 0) return null;

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Helpful Guides for {data.areaName} Vehicle Owners
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 bg-white p-5 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-600">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> {post.category || 'Guide'}
              </span>
              <span className="font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                {post.title}
              </span>
              <span className="mt-auto text-sm font-semibold text-blue-600 flex items-center gap-1">
                Read guide <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
