import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import blogPosts from "@/lib/blogPosts.json";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.id}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const post = blogPosts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
          <span>By {post.author}</span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content.replace(/^#+ .+\n/gm, "").trim()}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Need Doorstep Car or Bike Repair?</h2>
          <p className="text-gray-600 mb-6">Our certified technicians reach you in 30–60 minutes, anywhere in Bengaluru, Chennai, Hyderabad or Mumbai.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Book Service Now
            </Link>
            <a href="tel:+918722777367" className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
