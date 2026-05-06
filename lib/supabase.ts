// lib/supabase.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single Supabase client for the entire app.
// Uses NEXT_PUBLIC_ vars — safe to use in both server and client components.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
