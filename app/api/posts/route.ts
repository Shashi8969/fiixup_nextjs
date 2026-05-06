// app/api/posts/route.ts
// GET /api/posts                   — all posts
// GET /api/posts?featured=true     — featured posts only
// GET /api/posts?tag=car           — filter by tag
// GET /api/posts?limit=5           — limit results

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const tag      = searchParams.get("tag");
    const limit    = parseInt(searchParams.get("limit") ?? "50");

    // Exclude heavy content field from list view
    let query = supabase
      .from("posts")
      .select("slug, title, excerpt, author, date, read_time, category, tags, image, image_alt, featured")
      .order("date", { ascending: false })
      .limit(limit);

    if (featured === "true") {
      query = query.eq("featured", true) as any;
    }
    if (tag) {
      query = query.contains("tags", [tag]) as any;
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
