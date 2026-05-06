// app/blog/[id]/page.tsx
export const revalidate = 3600;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, Tag, ChevronRight, Lightbulb, AlertCircle } from "lucide-react";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL, MAIN_PHONE } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";
import BookingCTA from "@/components/ui/BookingCTA";

type BlogSection = {
  type: "paragraph" | "heading" | "list" | "callout" | "tip";
  level?: 2 | 3 | 4;
  content?: string;
  items?: string[];
};

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

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-5 text-[1.05rem]">
          {section.content}
        </p>
      );

    case "heading": {
      const HeadingTag = `h${section.level ?? 2}` as "h2" | "h3" | "h4";
      const sizeClass =
        section.level === 2 ? "text-2xl font-bold mt-10 mb-4 text-gray-900"
        : section.level === 3 ? "text-xl font-bold mt-8 mb-3 text-gray-900"
        : "text-lg font-bold mt-6 mb-2 text-gray-900";
      return <HeadingTag key={index} className={sizeClass}>{section.content}</HeadingTag>;
    }

    case "list":
      return (
        <ul key={index} className="space-y-2 mb-6 ml-4">
          {(section.items ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <ChevronRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div key={index} className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-900 leading-relaxed text-sm">{section.content}</p>
        </div>
      );

    case "tip":
      return (
        <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Fiixup Tip</p>
            <p className="text-amber-900 leading-relaxed text-sm">{section.content}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostBySlug(id);
  if (!post) return notFound();

  // sections come from the `content` field stored in Supabase
// ✅ After
const sections = (post.content as unknown as BlogSection[]) ?? [];
  // Related posts — fetch all then filter by category
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== id && p.category === post.category)
    .slice(0, 3);

  const schema = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Fiixup" },
    publisher: { "@type": "Organization", name: "Fiixup", url: SITE_URL },
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{post.title}</span>
          </nav>

          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {sections.map((section, i) => renderSection(section, i))}

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">Tags</p>
            <div className="flex flex-wrap gap-2">
              {(post.tags ?? []).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-red-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Need a Mechanic Right Now?</h3>
            <p className="text-red-100 mb-6 text-sm">
              Fiixup sends certified mechanics to your doorstep in 30–60 minutes across Bengaluru & Chennai. Available 24/7.
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
                  <span className="text-xs text-gray-400">{p.readTime} min read</span>
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
