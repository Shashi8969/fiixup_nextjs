// app/api/services/route.ts
// GET /api/services               — all services
// GET /api/services?category=car  — filter by category
// GET /api/services?category=bike — filter by category

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, safeErrorResponse } from "@/lib/api-security";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const limited = rateLimitRequest(request, "api-services", { limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query: any = supabase.from("services").select("*").order("category");
    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error) {
    return safeErrorResponse("api/services", error);
  }
}
