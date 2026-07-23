// app/api/posts/[slug]/route.ts
// GET /api/posts/how-to-jump-start-car-safely

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, safeErrorResponse } from "@/lib/api-security";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const limited = rateLimitRequest(request, "api-posts-slug", { limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;

  try {
    const { slug } = await params;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return safeErrorResponse("api/posts/[slug]", error);
  }
}
