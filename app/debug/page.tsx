// app/debug/page.tsx
// TEMPORARY DEBUG PAGE — delete after fixing
// Visit http://localhost:3000/debug to see exact Supabase errors

import { supabase } from "@/lib/supabase";

export default async function DebugPage() {
  // Test 1: Can we read location_services at all?
  const test1 = await supabase
    .from("location_services")
    .select("city_slug, area_slug, service_slug, is_active")
    .limit(5);

  // Test 2: Exact query for the failing URL
  const test2 = await supabase
    .from("location_services")
    .select("city_slug, area_slug, service_slug, is_active")
    .eq("city_slug", "bangalore")
    .eq("area_slug", "hsr-layout")
    .eq("service_slug", "car-mechanic-near-me")
    .eq("is_active", true)
    .maybeSingle();

  // Test 3: City-level query
  const test3 = await supabase
    .from("location_services")
    .select("city_slug, area_slug, service_slug, is_active")
    .eq("city_slug", "bangalore")
    .eq("service_slug", "car-mechanic-near-me")
    .is("area_slug", null)
    .eq("is_active", true)
    .maybeSingle();

  // Test 4: Can we read cities?
  const test4 = await supabase
    .from("cities")
    .select("slug, name")
    .limit(3);

  // Test 5: env vars present?
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div style={{ padding: 40, fontFamily: "monospace", fontSize: 14 }}>
      <h1 style={{ fontSize: 24, marginBottom: 30 }}>🔍 Fiixup Supabase Debug</h1>

      <Section title="ENV VARS">
        <Row label="SUPABASE_URL" value={envUrl ? `✅ ${envUrl.slice(0, 40)}...` : "❌ MISSING"} ok={!!envUrl} />
        <Row label="ANON_KEY" value={envKey ? `✅ ${envKey.slice(0, 20)}...` : "❌ MISSING"} ok={!!envKey} />
      </Section>

      <Section title="TEST 1: Read location_services (any 5 rows)">
        <Row label="Error" value={test1.error ? `❌ ${test1.error.message}` : "✅ No error"} ok={!test1.error} />
        <Row label="Rows returned" value={`${test1.data?.length ?? 0} rows`} ok={(test1.data?.length ?? 0) > 0} />
        {test1.error?.message?.includes("permission") || test1.error?.message?.includes("policy") ? (
          <Alert>🚨 RLS BLOCKING — Run the RLS fix SQL below</Alert>
        ) : null}
        <pre style={{ background: "#f5f5f5", padding: 10, borderRadius: 4, overflow: "auto" }}>
          {JSON.stringify(test1.data, null, 2)}
        </pre>
      </Section>

      <Section title="TEST 2: bangalore / hsr-layout / car-mechanic-near-me">
        <Row label="Error" value={test2.error ? `❌ ${test2.error.message}` : "✅ No error"} ok={!test2.error} />
        <Row label="Row found" value={test2.data ? "✅ YES — row exists" : "❌ NO — row missing or is_active=false"} ok={!!test2.data} />
        <pre style={{ background: "#f5f5f5", padding: 10, borderRadius: 4 }}>
          {JSON.stringify(test2.data, null, 2)}
        </pre>
      </Section>

      <Section title="TEST 3: bangalore / car-mechanic-near-me (city-level)">
        <Row label="Error" value={test3.error ? `❌ ${test3.error.message}` : "✅ No error"} ok={!test3.error} />
        <Row label="Row found" value={test3.data ? "✅ YES" : "❌ NO"} ok={!!test3.data} />
      </Section>

      <Section title="TEST 4: cities table">
        <Row label="Error" value={test4.error ? `❌ ${test4.error.message}` : "✅ No error"} ok={!test4.error} />
        <Row label="Cities found" value={`${test4.data?.length ?? 0} cities`} ok={(test4.data?.length ?? 0) > 0} />
        <pre style={{ background: "#f5f5f5", padding: 10, borderRadius: 4 }}>
          {JSON.stringify(test4.data, null, 2)}
        </pre>
      </Section>

      <Section title="IF YOU SEE RLS ERROR — Run this SQL in Supabase">
        <pre style={{ background: "#1a1a2e", color: "#00ff88", padding: 16, borderRadius: 8, overflow: "auto" }}>
{`-- Run in Supabase SQL Editor → fixes all table permissions at once

ALTER TABLE location_services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_location_services" ON location_services;
CREATE POLICY "public_read_location_services"
  ON location_services FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_cities" ON cities;
CREATE POLICY "public_read_cities"
  ON cities FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_areas" ON areas;
CREATE POLICY "public_read_areas"
  ON areas FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE service_keywords ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_service_keywords" ON service_keywords;
CREATE POLICY "public_read_service_keywords"
  ON service_keywords FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_service_categories" ON service_categories;
CREATE POLICY "public_read_service_categories"
  ON service_categories FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_posts" ON posts;
CREATE POLICY "public_read_posts"
  ON posts FOR SELECT
  TO anon, authenticated
  USING (true);`}
        </pre>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: "#333", color: "#fff", padding: "8px 16px", fontWeight: "bold" }}>{title}</div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
      <span style={{ color: "#666", minWidth: 180 }}>{label}:</span>
      <span style={{ color: ok ? "#008000" : "#cc0000", fontWeight: "bold" }}>{value}</span>
    </div>
  );
}

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 4, padding: 12, marginBottom: 8, fontWeight: "bold" }}>
      {children}
    </div>
  );
}
