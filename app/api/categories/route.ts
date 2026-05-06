// app/api/categories/route.ts
// GET /api/categories

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("title");

    if (error) throw error;

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
