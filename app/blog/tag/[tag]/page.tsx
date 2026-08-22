// app/blog/tag/[tag]/page.tsx
// Blog posts filtered by tag — makes the tag pills on a post page and the
// blog listing actually navigable, instead of being unclickable text.
export const revalidate = 3600;
export const dynamicParams = true;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getPostsByTag, getTagBySlug, getAllTagSlugs } from "@/lib/posts";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard } from "@/components/ui/BlogCard";
import { SITE_URL } from "@/lib/constants";
import { blogTagPageSchema, jsonLdString } from "@/lib/schema";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  return slugs.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  const tagRow = await getTagBySlug(tag);
  if (!tagRow) return {};

  const title = `${tagRow.name} — Fiixup Blog`;
  const description = `Fiixup blog posts tagged "${tagRow.name}" — car and bike maintenance tips, guides, and doorstep service advice.`;

  return metadataFromBasicSeo({
    title,
    description,
    canonical: `${SITE_URL}/blog/tag/${tagRow.slug}`,
    path: `/blog/tag/${tagRow.slug}`,
    ogImageAlt: title,
  });
}

export default async function BlogTagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const tagRow = await getTagBySlug(tag);
  if (!tagRow) return notFound();

  const posts = await getPostsByTag(tag);
  if (posts.length === 0) return notFound();

  const schema = blogTagPageSchema({
    tagName: tagRow.name,
    tagSlug: tagRow.slug,
    posts: posts.map((p) => ({ title: p.title, slug: p.slug })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
      />
      <PageHero
        heading={`Tagged: ${tagRow.name}`}
        subtext={`${posts.length} post${posts.length === 1 ? "" : "s"} on ${tagRow.name}`}
        gradient="from-gray-50 to-gray-100"
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{tagRow.name}</span>
          </nav>
        </div>
      </section>

      <section className="pb-16">
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
