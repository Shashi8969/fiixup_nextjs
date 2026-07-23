// app/api/categories/route.ts
// GET /api/categories

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimitRequest, safeErrorResponse } from "@/lib/api-security";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const limited = rateLimitRequest(request, "api-categories", { limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;

  try {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("title");

    if (error) throw error;

    return NextResponse.json({ success: true, data: data ?? [] });
  } catch (error) {
    return safeErrorResponse("api/categories", error);
  }
}
