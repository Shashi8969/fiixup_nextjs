import Link from "next/link";
import blogPosts from "@/lib/data/blogPosts.json";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Blog() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading="Latest from Our Blog"
          subtext="Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, i) => (
            <BlogCard key={post.id} {...post} priority={i === 0} />
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
