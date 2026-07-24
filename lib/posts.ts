// lib/posts.ts
// Reads tags from normalized post_tags → tags table
// Return shape is IDENTICAL to before — zero component changes needed

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";
import type { BlogPost } from "./models/blog.model";

// ── Raw row → BlogPost ────────────────────────────────────────────────────────
function rowToPost(row: any): BlogPost {
  // Extract tags from normalized post_tags join OR fall back to legacy jsonb column
  const tags: string[] = row.post_tags?.length
    ? row.post_tags
        .map((pt: any) => pt.tags?.name)
        .filter(Boolean)
    : (row.tags ?? []);

  // Real tag slugs from the normalized join — used to make tags clickable.
  // Legacy jsonb `tags` column has no slug, so those posts fall back to plain text.
  const tagLinks = row.post_tags?.length
    ? row.post_tags
        .map((pt: any) => ({ name: pt.tags?.name, slug: pt.tags?.slug }))
        .filter((t: any) => t.name && t.slug)
    : [];

  return {
    id:              row.slug,
    title:           row.title,
    slug:            row.slug,
    excerpt:         row.excerpt,
    content:         row.content ?? [],
    author:          row.author,
    authorRole:      row.author_role ?? undefined,
    date:            row.date,
    readTime:        row.read_time,
    category:        row.category,
    tags,
    tagLinks,
    image:           row.image ?? "",
    imageAlt:        row.image_alt ?? "",
    featured:        row.featured ?? false,
    metaTitle:       row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    schemaJson:       row.schema_json ?? undefined,
    nearbyAreas:      Array.isArray(row.nearby_areas_json) ? row.nearby_areas_json : [],
    relatedServices:  Array.isArray(row.related_services_json) ? row.related_services_json : [],
    internalLinks:    Array.isArray(row.internal_links_json) ? row.internal_links_json : [],
  };
}

// ── Select string with normalized tags join ───────────────────────────────────
const POST_SELECT = `
  id, slug, title, excerpt, content,
  author, author_role, date, read_time,
  category, featured, image, image_alt,
  related_service, meta_title, meta_description, meta_keywords,
  created_at, updated_at, schema_json,
  nearby_areas_json, related_services_json, internal_links_json,
  post_tags ( tags ( id, slug, name ) )
`;

const POST_LIST_SELECT = `
  slug, title, excerpt,
  author, author_role, date, read_time,
  category, featured, image, image_alt,
  meta_title, meta_description,
  nearby_areas_json, related_services_json, internal_links_json,
  post_tags ( tags ( id, slug, name ) )
`;

// ── Get all posts ─────────────────────────────────────────────────────────────
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_LIST_SELECT)
    .order("date", { ascending: false });

  if (error) {
    console.error("getAllPosts error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToPost);
}

// ── Get post by slug ──────────────────────────────────────────────────────────
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;
  return rowToPost(data);
});

// ── Get multiple posts by slug array (used by CityBlogPosts) ─────────────────
export async function getPostsBySlugs(slugs: string[]): Promise<BlogPost[]> {
  if (!slugs?.length) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(POST_LIST_SELECT)
    .in("slug", slugs)
    .order("date", { ascending: false });

  if (error) {
    console.error("getPostsBySlugs error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToPost);
}

// ── Get featured posts ────────────────────────────────────────────────────────
export const getFeaturedPosts = unstable_cache(
  async (limit = 3): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from("posts")
      .select(POST_LIST_SELECT)
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(limit);

    if (error) return [];
    return (data ?? []).map(rowToPost);
  },
  ["featured-posts"],
  { revalidate: 3600, tags: ["posts"] }
);

// ── Get posts by tag — uses normalized tags table ─────────────────────────────
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const { data: tagRow } = await supabase
    .from("tags")
    .select("id, name")
    .eq("slug", tag)
    .single();

  if (!tagRow) return [];

  const { data, error } = await supabase
    .from("post_tags")
    .select(`posts ( ${POST_LIST_SELECT} )`)
    .eq("tag_id", tagRow.id);

  if (error || !data) return [];

  return data
    .map((row: any) => row.posts)
    .filter(Boolean)
    .map(rowToPost);
}

// ── Get the tag's display name for a given slug (for page title/heading) ──────
export async function getTagBySlug(tag: string): Promise<{ name: string; slug: string } | undefined> {
  const { data } = await supabase
    .from("tags")
    .select("name, slug")
    .eq("slug", tag)
    .single();
  return data ?? undefined;
}

// ── All tag slugs — for generateStaticParams on the tag archive page ──────────
export async function getAllTagSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("tags").select("slug");
  if (error) return [];
  return (data ?? []).map((row) => row.slug).filter(Boolean);
}

// ── Get posts by category ─────────────────────────────────────────────────────
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_LIST_SELECT)
    .eq("category", category)
    .order("date", { ascending: false });

  if (error) return [];
  return (data ?? []).map(rowToPost);
}
