// app/api/cities/[slug]/route.ts
// GET /api/cities/bengaluru — returns full city data

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, safeErrorResponse } from "@/lib/api-security";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const limited = rateLimitRequest(request, "api-cities", { limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;

  try {
    const { slug } = await params;

    const { data, error } = await supabase
      .from("cities")
      .select("*")
      .eq("slug", slug.toLowerCase())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "City not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return safeErrorResponse("api/cities/[slug]", error);
  }
}
