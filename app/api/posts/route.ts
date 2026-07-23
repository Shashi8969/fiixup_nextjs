// app/api/posts/route.ts
// GET /api/posts                   — all posts
// GET /api/posts?featured=true     — featured posts only
// GET /api/posts?tag=car           — filter by tag
// GET /api/posts?limit=5           — limit results

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, safeErrorResponse } from "@/lib/api-security";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const limited = rateLimitRequest(request, "api-posts", { limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;

  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const tag      = searchParams.get("tag");
    const limit    = Math.min(Math.max(parseInt(searchParams.get("limit") ?? "50") || 50, 1), 100);

    // Exclude heavy content field from list view.
    // Supabase's query builder narrows its generic type on every chained
    // filter, so conditionally-applied filters need `any` here to reassign
    // across those narrower types.
    let query: any = supabase
      .from("posts")
      .select("slug, title, excerpt, author, date, read_time, category, tags, image, image_alt, featured")
      .order("date", { ascending: false })
      .limit(limit);

    if (featured === "true") {
      query = query.eq("featured", true);
    }
    if (tag) {
      query = query.contains("tags", [tag]);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error) {
    return safeErrorResponse("api/posts", error);
  }
}
