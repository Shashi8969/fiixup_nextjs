// app/blog/[id]/page.tsx
// ─── DROP-IN REPLACEMENT — supports all block types ──────────────────────────
export const revalidate = 3600;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Tag, ChevronRight } from "lucide-react";
import { CmsImage } from "@/components/ui/CmsImage";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL, MAIN_PHONE } from "@/lib/constants";
import { blogPostSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import BookingCTA from "@/components/ui/BookingCTA";
import { BlockRenderer } from "@/components/ui/BlockRenderer";
import { BlogAttachments } from "@/components/blog/BlogAttachments";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostBySlug(id);
  if (!post) return {};
  return {
    title:       post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates:  { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title:         post.metaTitle ?? post.title,
      description:   post.metaDescription ?? post.excerpt,
      url:           `${SITE_URL}/blog/${post.slug}`,
      type:          "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostBySlug(id);
  if (!post) return notFound();

  // Normalise content — DB stores it as JSONB array OR legacy string
  let blocks: unknown[] = [];
  if (Array.isArray(post.content)) {
    blocks = post.content;
  } else if (typeof post.content === "string") {
    try { blocks = JSON.parse(post.content); } catch { blocks = []; }
  }

  const allPosts    = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== id && p.category === post.category)
    .slice(0, 3);

  const postSchema = blogPostSchema({
    title:       post.title,
    slug:        post.slug,
    description: post.metaDescription ?? post.excerpt ?? "",
    coverImage:  post.image || `${SITE_URL}/assets/og-image.webp`,
    publishedAt: post.date,
    updatedAt:   (post as any).updatedAt ?? post.date,
    tags:        post.tags,
    author:      post.author,
    authorRole:  post.authorRole,
    category:    post.category,
  });

  return (
    <>
      <JsonLd data={(post as any).schemaJson ?? postSchema} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Category pill */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>

          {/* Cover image */}
          {post.image && (
            <div className="mb-6">
  <CmsImage
    src={post.image}
    alt={post.imageAlt ?? post.title}
    title={post.title}
    ratio="blogHero"
    fit="contain"
    priority
    sizes="(max-width: 768px) 100vw, 768px"
  />
</div>
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.excerpt}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {/min read/i.test(String(post.readTime)) ? post.readTime : `${post.readTime} min read`}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {post.author}
              {post.authorRole && <span className="text-gray-400">· {post.authorRole}</span>}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* All blocks rendered by BlockRenderer */}
          <BlockRenderer blocks={blocks} />

          <BlogAttachments
            nearbyAreas={post.nearbyAreas}
            relatedServices={post.relatedServices}
            internalLinks={post.internalLinks}
          />

          {/* Tags — linked to /blog/tag/[slug] where a real tag slug exists, plain text otherwise */}
          {(post.tags ?? []).length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => {
                  const link = post.tagLinks?.find((t) => t.name === tag);
                  return link ? (
                    <Link
                      key={tag}
                      href={`/blog/tag/${link.slug}`}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ) : (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Author card */}
          {post.author && (
            <div className="mt-10 flex items-center gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author}</p>
                {post.authorRole && (
                  <p className="text-sm text-gray-500">{post.authorRole}</p>
                )}
              </div>
            </div>
          )}

          {/* Inline CTA */}
          <div className="mt-10 bg-red-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need a Mechanic Right Now?</h3>
            <p className="text-red-100 mb-6 text-sm">
              Fiixup sends certified mechanics to your doorstep in 20 minutes
              across Bengaluru, Chennai, Hyderabad & Mumbai. Available 24/7.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`tel:${MAIN_PHONE}`}
                className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm"
              >
                Call +91 8197459732
              </a>
              <Link
                href="/contact#contact-form"
                className="bg-red-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-800 transition-colors text-sm border border-red-500"
              >
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Posts ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all block"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2 block">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-3">
                    {p.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {/min read/i.test(String(p.readTime)) ? p.readTime : `${p.readTime} min read`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCTA serviceTitle="Doorstep Mechanic" bgAccent="bg-gray-900" />
    </>
  );
}
