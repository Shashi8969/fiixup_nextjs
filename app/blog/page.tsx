// app/blog/page.tsx
export const revalidate = 3600;

import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { blogListingSchema, jsonLdString } from "@/lib/schema";
import { getStaticPageSEO } from "@/lib/data/seo";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/ui/BlogCard";

const seo = getStaticPageSEO("blog")!;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: seo.canonical,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const schema = blogListingSchema(
    posts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", date: p.date }))
  );
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <PageHero
        heading="Fiixup Blog"
        subtext="Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition."
        gradient="from-gray-50 to-gray-100"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard
                key={post.id}
                {...post}
                readTime={String(post.readTime)}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
