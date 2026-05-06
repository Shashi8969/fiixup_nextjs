// app/api/services/route.ts
// GET /api/services               — all services
// GET /api/services?category=car  — filter by category
// GET /api/services?category=bike — filter by category

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase.from("services").select("*").order("category");
    if (category) {
      query = query.eq("category", category) as any;
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
