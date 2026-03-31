import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import blogPosts from "@/lib/data/blogPosts.json";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog — Car & Bike Maintenance Tips | Fiixup",
  description:
    "Expert car and bike maintenance tips, guides, and industry insights from Fiixup's certified technicians. Stay informed, stay safe on the road.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fiixup Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, maintenance guides, and industry insights to help you keep your car
            and bike in perfect condition.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 bg-gray-100">
                {post.image.startsWith("http") ? (
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                ) : (
                  <Image src={`/${post.image}`} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors text-gray-900">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <Link href={`/blog/${post.id}`} className="text-blue-600 font-semibold text-sm hover:underline"
                    aria-label={`Read full article: ${post.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
