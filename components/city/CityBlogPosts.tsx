// components/city/CityBlogPosts.tsx
// Server Component — fetches related blog posts for the city hub page
// Uses cities.related_post_slugs (string[] column added in Phase 7)

import Link  from 'next/link';
import Image from 'next/image';
import { getPostsBySlugs } from '@/lib/posts';

export async function CityBlogPosts({
  slugs,
  cityName,
}: {
  slugs: string[];
  cityName: string;
}) {
  if (!slugs?.length) return null;

  const posts = await getPostsBySlugs(slugs);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Helpful Guides
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Vehicle Repair Tips for {cityName} Drivers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {post.image && (
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  {post.category && (
                    <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                  )}
                  {post.readTime && <span>{post.readTime}</span>}
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/blog" className="text-blue-600 font-bold hover:underline text-sm">
            View All Articles →
          </Link>
        </div>

      </div>
    </section>
  );
}
