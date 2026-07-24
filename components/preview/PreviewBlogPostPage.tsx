import Link from "next/link";
import { CalendarDays, ChevronRight, Clock, Tag } from "lucide-react";
import BookingCTA from "@/components/ui/BookingCTA";
import { BlockRenderer } from "@/components/ui/BlockRenderer";
import { MAIN_PHONE } from "@/lib/constants";
import { CmsImage } from "@/components/ui/CmsImage";
import { BlogAttachments } from "@/components/blog/BlogAttachments";

function blocksFrom(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  return [];
}

export function PreviewBlogPostPage({ post }: { post: any }) {
  const blocks = blocksFrom(post.content);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  return (
    <>
      <div className="fixed left-3 top-3 z-50 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">DRAFT PREVIEW — NOT LIVE</div>
      <div className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link><ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-gray-700">Blog</Link><ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{post.title}</span>
          </nav>
          {post.category && <span className="inline-block text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 px-3 py-1 rounded-full mb-4">{post.category}</span>}
          {post.image && <div className="mb-6"><CmsImage src={post.image} alt={post.image_alt ?? post.imageAlt ?? post.title} title={post.title} ratio="blogHero" fit="contain" priority sizes="(max-width: 768px) 100vw, 768px" /></div>}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.date && <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{post.date}</span>}
            {post.read_time && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.read_time}</span>}
            {post.author && <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />{post.author}{post.author_role && <span className="text-gray-400">· {post.author_role}</span>}</span>}
          </div>
        </div>
      </div>
      <article className="py-12"><div className="container mx-auto px-4 max-w-3xl"><BlockRenderer blocks={blocks as any[]} />
        <BlogAttachments nearbyAreas={post.nearby_areas_json ?? post.nearbyAreas} relatedServices={post.related_services_json ?? post.relatedServices} internalLinks={post.internal_links_json ?? post.internalLinks} />
        {tags.length > 0 && <div className="mt-10 pt-6 border-t border-gray-200"><p className="text-sm font-semibold text-gray-700 mb-3">Tags</p><div className="flex flex-wrap gap-2">{tags.map((tag: string) => {
          const link = Array.isArray(post.tagLinks) ? post.tagLinks.find((t: any) => t.name === tag) : null;
          return link
            ? <Link key={tag} href={`/blog/tag/${link.slug}`} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-700 transition-colors">{tag}</Link>
            : <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">{tag}</span>;
        })}</div></div>}
        <div className="mt-10 bg-red-600 rounded-2xl p-8 text-white text-center"><h3 className="text-xl font-bold mb-2">Need a Mechanic Right Now?</h3><p className="text-red-100 mb-6 text-sm">Fiixup sends certified mechanics to your doorstep in 30–60 minutes across major cities.</p><a href={"tel:" + MAIN_PHONE} className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm">Call +91 8197459732</a></div>
      </div></article><BookingCTA serviceTitle="Doorstep Mechanic" bgAccent="bg-gray-900" />
    </>
  );
}
