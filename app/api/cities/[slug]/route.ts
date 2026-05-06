// app/api/cities/[slug]/route.ts
// GET /api/cities/bengaluru — returns full city data

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
