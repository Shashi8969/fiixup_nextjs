import type { Metadata } from "next";
import blogPosts from "@/lib/data/blogPosts.json";
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

export default function BlogPage() {
  return (
    <>
      <PageHero
        heading="Fiixup Blog"
        subtext="Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition."
        gradient="from-gray-50 to-gray-100"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
  <BlogCard 
    key={post.id} 
    {...post} 
    readTime={String(post.readTime)} // Convert number to string
    priority={i === 0} 
  />
))}
          </div>
        </div>
      </section>
    </>
  );
}
