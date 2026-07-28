// components/Blog.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedPosts } from "@/lib/posts";
import { HomeBlogCard } from "@/components/ui/HomeBlogCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomeBlogData } from "@/lib/homepage";

type BlogProps = Partial<HomeBlogData>;

export async function Blog({
  heading = "Latest from Our Blog",
  subtext = "Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition.",
  ctaLabel = "View All Articles",
}: BlogProps = {}) {
  const featuredPosts = await getFeaturedPosts(3);

  return (
    <section id="blog" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading={heading}
          subtext={subtext}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <HomeBlogCard
              key={post.id}
              {...post}
              readTime={String(post.readTime)}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
