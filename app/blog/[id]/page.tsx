"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Clock, ArrowLeft, Share2, Twitter,
<<<<<<< HEAD
  Facebook, Link2, CheckCircle, ChevronUp, Phone,
} from "lucide-react";
import blogPosts from "@/lib/data/blogPosts.json";
import { SITE_URL, MAIN_PHONE } from "@/lib/constants";

=======
  CheckCircle, ChevronUp, Phone, Lightbulb, Tag, ChevronRight
} from "lucide-react";
import blogPosts from "@/lib/data/blogPosts.json";
import { SITE_URL, MAIN_PHONE } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";

/** 
 * UI Component: Reading Progress Bar 
 * Improves engagement by visualizing content depth.
 */
>>>>>>> 8dcb818 (reconect github)
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
<<<<<<< HEAD
      setProgress(el.scrollHeight - el.clientHeight > 0 ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100 : 0);
=======
      const totalH = el.scrollHeight - el.clientHeight;
      setProgress(totalH > 0 ? (el.scrollTop / totalH) * 100 : 0);
>>>>>>> 8dcb818 (reconect github)
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
<<<<<<< HEAD
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div className="h-full bg-blue-600 transition-all duration-150" style={{ width: `${progress}%` }} />
=======
    <div className="fixed top-0 left-0 right-0 z-[100] h-1.5 bg-gray-100">
      <div className="h-full bg-red-600 transition-all duration-200" style={{ width: `${progress}%` }} />
>>>>>>> 8dcb818 (reconect github)
    </div>
  );
}

<<<<<<< HEAD
function parseHeadings(content: string) {
  return content.split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => ({
      text: l.replace(/^#{2,3}\s/, ""),
      level: l.startsWith("### ") ? 3 : 2,
      id: l.replace(/^#{2,3}\s/, "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    }));
}

function ShareButtons({ url, title, dark = false }: { url: string; title: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const copyLink = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const copyClass = dark
    ? "flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
    : "flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors";
  const labelClass = dark ? "text-sm font-semibold text-gray-300 flex items-center gap-1" : "text-sm font-semibold text-gray-600 flex items-center gap-1";

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={labelClass}><Share2 className="w-4 h-4" /> Share:</span>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-sky-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">
        <Twitter className="w-3.5 h-3.5" /> Twitter
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        <Facebook className="w-3.5 h-3.5" /> Facebook
      </a>
      <button onClick={copyLink} className={copyClass}>
        {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-400" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

function BlogContent({ content, image, title }: { content: string; image: string; title: string }) {
  const lines = content.split("\n");
  let imageInserted = false;

  return (
    <div className="prose prose-lg max-w-none">
      {lines.map((line, i) => {
        // Insert image after first paragraph
        const showImage = !imageInserted && i > 0 && line.trim() === "" && image.startsWith("http");
        if (showImage) {
          imageInserted = true;
          return (
            <div key={`img-${i}`}>
              <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden my-5 md:my-6 shadow-lg">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
              </div>
            </div>
          );
        }

        if (!line.trim()) return <br key={i} />;
        if (line.startsWith("# ")) return null;
        if (line.startsWith("## ")) {
          const text = line.replace("## ", "");
          const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          return <h2 key={i} id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200 scroll-mt-20">{text}</h2>;
        }
        if (line.startsWith("### ")) {
          const text = line.replace("### ", "");
          const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          return <h3 key={i} id={id} className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20">{text}</h3>;
        }
        if (line.includes("**")) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <p key={i} className="text-gray-700 leading-relaxed mb-4 text-lg">
              {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="font-bold text-gray-900">{p}</strong> : p)}
            </p>
          );
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={i} className="text-gray-700 leading-relaxed mb-2 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
              <span>{line.replace(/^[-*]\s/, "")}</span>
            </li>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^(\d+)\./)?.[1];
          const text = line.replace(/^\d+\.\s/, "");
          return (
            <div key={i} className="flex items-start gap-3 mb-3">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{num}</span>
              <p className="text-gray-700 leading-relaxed">{text}</p>
            </div>
          );
        }
        return <p key={i} className="text-gray-700 leading-relaxed mb-4 text-lg">{line}</p>;
      })}
    </div>
  );
=======
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
>>>>>>> 8dcb818 (reconect github)
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
<<<<<<< HEAD
  const post = blogPosts.find((p) => p.id === id);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 500);
=======
  const post = (blogPosts as any[]).find((p) => p.id === id);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 600);
>>>>>>> 8dcb818 (reconect github)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.id}`;
<<<<<<< HEAD
  const headings = parseHeadings(post.content);
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3 - relatedPosts.length);
  const allRelated = [...relatedPosts, ...otherPosts].slice(0, 3);
  const isExternalImage = post.image.startsWith("http");

  return (
    <>
      <ReadingProgress />

      {/* ── HERO — full width cinematic, minimal top margin ── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[260px] md:h-[360px] lg:h-[420px]">
          {isExternalImage ? (
            <Image src={post.image} alt={post.title} fill
              className="object-cover object-center" priority sizes="100vw" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
          {/* Gradient overlay — bottom heavy for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent" />
        </div>

        {/* Text overlaid at bottom of image */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 max-w-4xl pb-6 md:pb-8">

            {/* Category tag only — no Back to Blog here */}
            <div className="mb-3">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 max-w-3xl">
              {post.title}
            </h1>

            {/* Excerpt — desktop only */}
            <p className="text-gray-300 text-base md:text-lg mb-5 leading-relaxed max-w-2xl hidden md:block">
              {post.excerpt}
            </p>

            {/* Author + meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{post.author}</p>
                  <p className="text-gray-400 text-xs">Fiixup Expert</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>

            <ShareButtons url={postUrl} title={post.title} dark />
=======
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
>>>>>>> 8dcb818 (reconect github)
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* ── BACK TO BLOG — below hero, clean ── */}
      <div className="container mx-auto px-4 max-w-6xl pt-3 md:pt-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-12 items-start">

          {/* ── ARTICLE ── */}
          <article className="flex-1 min-w-0">

            {/* Mobile excerpt */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6 md:hidden italic border-l-4 border-blue-600 pl-4">
              {post.excerpt}
            </p>

            {/* Blog content — image renders inside at natural reading position */}
            <BlogContent content={post.content} image={post.image} title={post.title} />

            {/* Bottom share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <ShareButtons url={postUrl} title={post.title} />
            </div>

            {/* Author card */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{post.author}</p>
                <p className="text-blue-600 text-sm font-medium mb-2">Certified Auto Expert at Fiixup</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A certified vehicle technician with 8+ years of experience in car and bike repair across Bengaluru.
                  Passionate about helping vehicle owners maintain their vehicles safely and affordably.
                </p>
=======
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
>>>>>>> 8dcb818 (reconect github)
              </div>
            </div>
          </article>

<<<<<<< HEAD
          {/* ── SIDEBAR (desktop only) ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-8">
            {headings.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
                <h3 className="font-bold text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  Table of Contents
                </h3>
                <ul className="space-y-2">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}
                        className={`text-sm text-gray-600 hover:text-blue-600 transition-colors block leading-snug ${h.level === 3 ? "pl-4 text-xs" : "font-medium"}`}>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Certified technicians reach you in 30–60 minutes across Bengaluru, Chennai, Hyderabad & Mumbai.
              </p>
              <Link href="/contact"
                className="block w-full bg-white text-blue-600 text-center py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-colors text-sm mb-3">
                Book Service Now
              </Link>
              <a href={`tel:${MAIN_PHONE}`}
                className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white py-2.5 rounded-lg font-bold hover:bg-blue-400 transition-colors text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED POSTS ── */}
      {allRelated.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <Link key={related.id} href={`/blog/${related.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                  {related.image.startsWith("http") && (
                    <div className="relative h-44 overflow-hidden">
                      <Image src={related.image} alt={related.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{related.category}</span>
                    <h3 className="font-bold text-gray-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{related.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{related.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA (mobile only) ── */}
      <section className="py-14 bg-blue-600 text-white text-center lg:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">Need Doorstep Repair?</h2>
          <p className="text-blue-100 mb-6">Certified technicians reach you in 30–60 minutes. 24/7 available.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">Book Now</Link>
            <a href={`tel:${MAIN_PHONE}`} className="bg-blue-500 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-blue-400 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── BACK TO TOP ── */}
      {showBackTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 bg-gray-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
          aria-label="Back to top">
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
=======
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
>>>>>>> 8dcb818 (reconect github)
