import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import blogPosts from "@/lib/data/blogPosts.json";
=======
import blogPosts from "@/lib/data/blogPosts.json";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
>>>>>>> 8dcb818 (reconect github)

export function Blog() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-12 bg-white">
      <div className="container mx-auto px-4">
<<<<<<< HEAD
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Latest from Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, maintenance guides, and industry insights to help you keep your car and bike
            in perfect condition.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {post.image.startsWith("http") ? (
                  <Image
                    src={post.image.startsWith("http") ? post.image : `/${post.image}`}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <Image
                    src={`/${post.image}`}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                  aria-label={`Read full article: ${post.title}`}

                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
=======
        <SectionHeader
          heading="Latest from Our Blog"
          subtext="Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, i) => (
            <BlogCard key={post.id} {...post} priority={i === 0} />
>>>>>>> 8dcb818 (reconect github)
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
