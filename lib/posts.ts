// lib/posts.ts
// ─────────────────────────────────────────────────────────────────────────────
// Blog post data from Supabase — replaces lib/data/blogPosts.json
// Return shape matches the BlogPost model exactly.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from "./supabase";
import type { BlogPost } from "./models/blog.model";

// ── Raw Supabase row → BlogPost shape ────────────────────────────────────────
function rowToPost(row: any): BlogPost {
  return {
    id:               row.slug,
    title:            row.title,
    slug:             row.slug,
    excerpt:          row.excerpt,
    content:          row.content ?? [],
    author:           row.author,
    authorRole:       row.author_role ?? undefined,
    date:             row.date,
    readTime:         row.read_time,
    category:         row.category,
    tags:             row.tags ?? [],
    image:            row.image ?? "",
    imageAlt:         row.image_alt ?? "",
    featured:         row.featured ?? false,
    metaTitle:        row.meta_title ?? undefined,
    metaDescription:  row.meta_description ?? undefined,
  };
}

// ── Get all posts ─────────────────────────────────────────────────────────────
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("getAllPosts error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToPost);
}

// ── Get post by slug (your blog uses `id` field as slug) ─────────────────────
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;
  return rowToPost(data);
}

// ── Get featured posts (for homepage Blog section) ────────────────────────────
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data ?? []).map(rowToPost);
}

// ── Get posts by tag ──────────────────────────────────────────────────────────
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .contains("tags", [tag])
    .order("date", { ascending: false });

  if (error) return [];
  return (data ?? []).map(rowToPost);
}
