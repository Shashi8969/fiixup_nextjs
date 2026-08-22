// app/blog/page.tsx
export const revalidate = 3600;

import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { blogListingSchema, jsonLdString } from "@/lib/schema";
import { getStaticPageSEO } from "@/lib/data/seo";
import { BlogIndexHero } from "@/components/blog/BlogIndexHero";
import { BlogIndexGrid } from "@/components/blog/BlogIndexGrid";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

const seo = getStaticPageSEO("blog")!;

export const metadata: Metadata = metadataFromBasicSeo({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: seo.canonical,
  path: "/blog",
  ogImageAlt: seo.ogTitle ?? seo.title,
  type: "website",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const schema = blogListingSchema(
    posts.map((p) => ({ title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", date: p.date }))
  );
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      <BlogIndexHero
        heading="Fiixup Blog"
        subtext="Expert tips, maintenance guides, and industry insights to help you keep your car and bike in perfect condition."
      />

      <BlogIndexGrid posts={posts} />
    </>
  );
}
