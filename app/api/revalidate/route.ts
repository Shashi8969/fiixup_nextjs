// app/api/revalidate/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Instantly refresh a page's ISR cache after you edit data in Supabase.
//
// Usage (after editing Supabase data):
//   GET https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=/bengaluru
//   GET https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=/services/car-oil-change-at-home
//   GET https://fiixup.in/api/revalidate?secret=YOUR_SECRET&path=all
//
// Add REVALIDATE_SECRET to .env.local and Hostinger Environment Variables.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse }  from "next/server";
import { revalidatePath } from "next/cache";
import { getAllCities }    from "@/lib/cities";
import { getAllServices }  from "@/lib/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path   = searchParams.get("path");

  // Validate secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { success: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { success: false, error: "path parameter required" },
      { status: 400 }
    );
  }

  try {
    if (path === "all") {
      // Revalidate every city and service page
      const [cities, services] = await Promise.all([
        getAllCities(),
        getAllServices(),
      ]);

      const paths = [
        "/",
        "/services",
        "/blog",
        ...cities.map((c) => `/${c.slug}`),
        ...cities.map((c) => `/${c.slug}/services`),
        ...services.map((s) => `/services/${s.slug}`),
      ];

      for (const p of paths) {
        revalidatePath(p);
      }

      return NextResponse.json({
        success: true,
        revalidated: paths.length,
        paths,
      });
    }

    // Revalidate a single path
    revalidatePath(path);
    return NextResponse.json({ success: true, revalidated: path });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
