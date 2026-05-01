"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Clock, ArrowLeft, Share2, Twitter,
  CheckCircle, ChevronUp, Phone, Lightbulb, Tag, ChevronRight
} from "lucide-react";
import blogPosts from "@/lib/data/blogPosts.json";
import { SITE_URL, MAIN_PHONE } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";

/** 
 * UI Component: Reading Progress Bar 
 * Improves engagement by visualizing content depth.
 */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const totalH = el.scrollHeight - el.clientHeight;
      setProgress(totalH > 0 ? (el.scrollTop / totalH) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-gray-100">
      <div className="h-full bg-red-600 transition-all duration-200" style={{ width: `${progress}%` }} />
    </div>
  );
}

/** 
 * SEO Component: Content Renderer 
 * Uses structured arrays to ensure a stable DOM and prevent Layout Shifts (CLS).
 */
function RenderSection({ section, index }: { section: any; index: number }) {
  switch (section.type) {
    case "paragraph":
      return <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg md:text-[1.1rem]">{section.content}</p>;
    case "heading":
      const TagName = `h${section.level ?? 2}` as keyof JSX.IntrinsicElements;
      const id = section.content.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return (
        <TagName key={index} id={id} className={`font-bold text-gray-900 scroll-mt-24 ${
          section.level === 3 ? "text-xl md:text-2xl mt-8 mb-4" : "text-2xl md:text-3xl mt-12 mb-6 pb-2 border-b border-gray-100"
        }`}>
          {section.content}
        </TagName>
      );
    case "list":
      return (
        <ul key={index} className="space-y-4 mb-8 ml-2">
          {section.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div key={index} className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6 mb-10 flex items-start gap-4">
          <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1">Fiixup Pro Tip</p>
            <p className="text-amber-950 font-medium leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    default: return null;
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const post = (blogPosts as any[]).find((p) => p.id === id);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.id}`;
  const headings = post.sections.filter((s: any) => s.type === "heading");

  return (
    <div className="bg-white min-h-screen selection:bg-red-100 selection:text-red-900">
      <ReadingProgress />
      
      {/* 1. TECHNICAL SEO: JSON-LD Schema (Article & Breadcrumb) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: postUrl }
      ])) }} />

      {/* 2. UI: Cinematic Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[60vh] min-h-[350px] overflow-hidden bg-black">
        {post.image && (
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover opacity-70 scale-105" 
            priority // Critical for LCP performance
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6 font-medium">
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/60 truncate">{post.category}</span>
            </nav>
            <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200">
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4 text-red-500" /> {post.date}
              </span>
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-red-500" /> {post.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MOBILE FRIENDLY: Responsive Layout Grid */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Article Section */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-lg md:prose-xl prose-red max-w-none">
              {post.sections.map((section: any, i: number) => (
                <RenderSection key={i} section={section} index={i} />
              ))}
            </div>

            {/* Tags & Authority */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags?.map((tag: string) => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="bg-red-50 rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  {post.author.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-gray-900 text-2xl mb-1">{post.author}</h4>
                  <p className="text-red-600 font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                    <Tag className="w-4 h-4" /> Fiixup Master Mechanic
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    With over 10 years of experience servicing vehicles in Bengaluru, {post.author.split(' ')[0]} specializes in 24/7 roadside assistance and preventative maintenance.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* 4. UI: Sticky Conversion Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hidden lg:block">
                  <h3 className="font-bold text-gray-950 text-sm uppercase tracking-widest mb-5 border-b border-gray-100 pb-3">Quick Navigation</h3>
                  <nav className="space-y-4">
                    {headings.map((h: any, i: number) => (
                      <a key={i} href={`#${h.content.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 transition-all group">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-600 transition-colors" />
                        {h.content}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* High-Converting CTA */}
              <div className="bg-gray-950 rounded-3xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-red-600/20 transition-all" />
                <h3 className="font-extrabold text-2xl mb-4 relative z-10 leading-tight">Need a Mechanic in Bengaluru?</h3>
                <p className="text-gray-400 text-base mb-8 relative z-10 leading-relaxed">Our certified experts arrive within 30–60 minutes. Open 24/7 for you.</p>
                <a href={`tel:${MAIN_PHONE}`} className="flex items-center justify-center gap-3 w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 hover:scale-[1.02] transition-all shadow-lg shadow-red-600/20 mb-4">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <Link href="/contact" className="block text-center text-sm font-semibold text-gray-400 hover:text-white transition-colors underline underline-offset-4">
                  Request Online Estimate
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 5. MOBILE UI: Fixed Mobile CTA */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <a href={`tel:${MAIN_PHONE}`} className="flex items-center justify-center gap-3 w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-2xl animate-bounce-subtle">
          <Phone className="w-5 h-5" /> Book 24/7 Service
        </a>
      </div>

      {/* Back to Top */}
      {showBackTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="fixed bottom-24 lg:bottom-10 right-6 z-50 bg-white text-gray-900 border border-gray-200 p-3 rounded-full shadow-2xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
