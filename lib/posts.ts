// lib/posts.ts
// Reads tags from normalized post_tags → tags table
// Return shape is IDENTICAL to before — zero component changes needed

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";
import type { BlogPost } from "./models/blog.model";
import { normalizeImageMeta } from "./seo-pages";

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
    updatedAt:       row.updated_at ?? undefined,
    readTime:        row.read_time,
    category:        row.category,
    tags,
    tagLinks,
    image:           row.image ?? "",
    imageAlt:        row.image_alt ?? "",
    imageMeta:       normalizeImageMeta(row.image_meta),
    featured:        row.featured ?? false,
    metaTitle:       row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    schemaJson:       row.schema_json ?? undefined,
    nearbyAreas:      Array.isArray(row.nearby_areas_json) ? row.nearby_areas_json : [],
    relatedServices:  Array.isArray(row.related_services_json) ? row.related_services_json : [],
    internalLinks:    Array.isArray(row.internal_links_json) ? row.internal_links_json : [],
  };
}

// ── Publish state ─────────────────────────────────────────────────────────────
// Encodes the same rule as the `public_read_published_posts` RLS policy and
// `fn_content_is_live()` in Postgres: a post is visible once it is published,
// or once a scheduled post's publish_at has passed. Scheduled posts are
// promoted to `published` within a minute by the `publish-scheduled-content`
// pg_cron job, but matching the RLS rule here means a stalled cron delays the
// status flip without ever hiding a post that is already due.
//
// RLS alone would keep drafts off the site — this is the second lock, so a
// future switch to a service-role key can't silently publish unfinished work.
export type PublishState = { status?: string | null; publish_at?: string | null };

// Statuses that can be publicly visible. `draft` and `archived` are excluded in
// the query itself, so unfinished work never leaves Postgres. The exact
// due-time comparison happens in isLive() rather than in a PostgREST
// `or=(...,and(...))` filter, which would put a raw ISO timestamp inside a
// nested filter expression for no benefit.
export const PUBLIC_STATUSES = ["published", "scheduled"] as const;

export function isLive(row: PublishState): boolean {
  const status = row.status ?? "published";
  if (status === "published") return true;
  if (status !== "scheduled" || !row.publish_at) return false;
  const publishAt = new Date(row.publish_at).getTime();
  return Number.isFinite(publishAt) && publishAt <= Date.now();
}

export function liveOnly<T extends PublishState>(rows: T[] | null | undefined): T[] {
  return (rows ?? []).filter(isLive);
}

// ── Select string with normalized tags join ───────────────────────────────────
const POST_SELECT = `
  id, slug, title, excerpt, content,
  author, author_role, date, read_time,
  category, featured, image, image_alt, image_meta,
  related_service, meta_title, meta_description, meta_keywords,
  created_at, updated_at, schema_json,
  status, publish_at,
  nearby_areas_json, related_services_json, internal_links_json,
  post_tags ( tags ( id, slug, name ) )
`;

const POST_LIST_SELECT = `
  slug, title, excerpt,
  author, author_role, date, read_time,
  category, featured, image, image_alt, image_meta,
  meta_title, meta_description,
  status, publish_at,
  nearby_areas_json, related_services_json, internal_links_json,
  post_tags ( tags ( id, slug, name ) )
`;

// ── Get all posts ─────────────────────────────────────────────────────────────
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_LIST_SELECT)
    .in("status", PUBLIC_STATUSES)
    .order("date_proper", { ascending: false });

  if (error) {
    console.error("getAllPosts error:", error.message);
    return [];
  }
  return liveOnly(data).map(rowToPost);
}

// ── Get post by slug ──────────────────────────────────────────────────────────
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;
  // A draft or not-yet-due post is a 404 for the public site, the same as a
  // slug that doesn't exist. Editors preview unpublished work through
  // /preview/<token> (lib/preview-drafts.ts), which never comes through here.
  if (!isLive(data as PublishState)) return undefined;
  return rowToPost(data);
});

// ── Get multiple posts by slug array (used by CityBlogPosts) ─────────────────
export async function getPostsBySlugs(slugs: string[]): Promise<BlogPost[]> {
  if (!slugs?.length) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(POST_LIST_SELECT)
    .in("slug", slugs)
    .in("status", PUBLIC_STATUSES)
    .order("date_proper", { ascending: false });

  if (error) {
    console.error("getPostsBySlugs error:", error.message);
    return [];
  }
  return liveOnly(data).map(rowToPost);
}

// ── Get featured posts ────────────────────────────────────────────────────────
export const getFeaturedPosts = unstable_cache(
  async (limit = 3): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from("posts")
      .select(POST_LIST_SELECT)
      .eq("featured", true)
      .in("status", PUBLIC_STATUSES)
      .order("date_proper", { ascending: false })
      // Over-fetch: a featured post scheduled for next week is dropped by
      // liveOnly() below, and a bare .limit(limit) would silently return a
      // short row of featured cards instead of the next eligible post.
      .limit(limit * 2 + 2);

    if (error) return [];
    return liveOnly(data).slice(0, limit).map(rowToPost);
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
    .filter(isLive)
    .map(rowToPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
    .in("status", PUBLIC_STATUSES)
    .order("date_proper", { ascending: false });

  if (error) return [];
  return liveOnly(data).map(rowToPost);
}
