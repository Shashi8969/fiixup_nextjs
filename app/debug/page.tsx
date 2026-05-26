// app/debug/page.tsx
// TEMPORARY DEBUG PAGE — delete after fixing
// Visit http://localhost:3000/debug

import { supabase } from "@/lib/supabase";

export default async function DebugPage() {
  const testEnv = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  const testLocation = await supabase
    .from("location_services")
    .select("city_slug, area_slug, service_slug, is_active")
    .limit(5);

  const testCities = await supabase
    .from("cities")
    .select("slug, name")
    .limit(3);

  const testGsp = await supabase
    .from("global_service_pages")
    .select("*")
    .eq("service_slug", "towing-service")
    .eq("is_active", true)
    .maybeSingle();

  const testGspAll = await supabase
    .from("global_service_pages")
    .select("id, service_slug, service_name, is_active, is_indexed, canonical_url")
    .limit(10);

  const testPricing = await supabase
    .from("gsp_pricing_rows")
    .select("*")
    .limit(5);

  const testFaqs = await supabase
    .from("gsp_faqs")
    .select("*")
    .limit(5);

  const testTestimonials = await supabase
    .from("gsp_testimonials")
    .select("*")
    .limit(5);

  const testRelated = await supabase
    .from("gsp_related_services")
    .select("*")
    .limit(5);

  return (
    <div style={{ padding: 40, fontFamily: "monospace", fontSize: 14 }}>
      <h1 style={{ fontSize: 26, marginBottom: 30 }}>
        🔍 Fiixup Supabase Debug
      </h1>

      <Section title="ENV VARS">
        <Row
          label="SUPABASE_URL"
          value={testEnv.url ? `✅ ${testEnv.url.slice(0, 45)}...` : "❌ MISSING"}
          ok={!!testEnv.url}
        />
        <Row
          label="ANON_KEY"
          value={testEnv.key ? `✅ ${testEnv.key.slice(0, 25)}...` : "❌ MISSING"}
          ok={!!testEnv.key}
        />
      </Section>

      <Section title="TEST 1: location_services">
        <Result result={testLocation} />
      </Section>

      <Section title="TEST 2: cities">
        <Result result={testCities} />
      </Section>

      <Section title="TEST 3: global_service_pages / towing-service">
        <Result result={testGsp} single />
      </Section>

      <Section title="TEST 4: all global_service_pages">
        <Result result={testGspAll} />
      </Section>

      <Section title="TEST 5: gsp_pricing_rows">
        <Result result={testPricing} />
      </Section>

      <Section title="TEST 6: gsp_faqs">
        <Result result={testFaqs} />
      </Section>

      <Section title="TEST 7: gsp_testimonials">
        <Result result={testTestimonials} />
      </Section>

      <Section title="TEST 8: gsp_related_services">
        <Result result={testRelated} />
      </Section>

      <Section title="FIX SQL: Public Read Policies">
        <pre style={codeStyle}>
{`ALTER TABLE global_service_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_global_service_pages" ON global_service_pages;

CREATE POLICY "public_read_global_service_pages"
  ON global_service_pages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);


ALTER TABLE gsp_pricing_rows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gsp_pricing_rows" ON gsp_pricing_rows;

CREATE POLICY "public_read_gsp_pricing_rows"
  ON gsp_pricing_rows FOR SELECT
  TO anon, authenticated
  USING (true);


ALTER TABLE gsp_faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gsp_faqs" ON gsp_faqs;

CREATE POLICY "public_read_gsp_faqs"
  ON gsp_faqs FOR SELECT
  TO anon, authenticated
  USING (true);


ALTER TABLE gsp_testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gsp_testimonials" ON gsp_testimonials;

CREATE POLICY "public_read_gsp_testimonials"
  ON gsp_testimonials FOR SELECT
  TO anon, authenticated
  USING (true);


ALTER TABLE gsp_related_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gsp_related_services" ON gsp_related_services;

CREATE POLICY "public_read_gsp_related_services"
  ON gsp_related_services FOR SELECT
  TO anon, authenticated
  USING (true);`}
        </pre>
      </Section>
    </div>
  );
}

function Result({
  result,
  single = false,
}: {
  result: {
    data: any;
    error: any;
  };
  single?: boolean;
}) {
  const rows = Array.isArray(result.data) ? result.data.length : result.data ? 1 : 0;

  return (
    <>
      <Row
        label="Error"
        value={result.error ? `❌ ${result.error.message}` : "✅ No error"}
        ok={!result.error}
      />

      <Row
        label={single ? "Row found" : "Rows returned"}
        value={single ? (result.data ? "✅ YES" : "❌ NO") : `${rows} rows`}
        ok={single ? !!result.data : rows > 0}
      />

      {result.error?.message?.toLowerCase().includes("permission") ||
      result.error?.message?.toLowerCase().includes("policy") ? (
        <Alert>🚨 RLS policy issue found. Run the SQL below.</Alert>
      ) : null}

      {result.error?.message?.toLowerCase().includes("does not exist") ? (
        <Alert>🚨 Table missing. Either create this child table or remove its query from global-service.ts.</Alert>
      ) : null}

      <pre style={preStyle}>{JSON.stringify(result.data, null, 2)}</pre>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 32, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: "#333", color: "#fff", padding: "10px 16px", fontWeight: "bold" }}>
        {title}
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
      <span style={{ color: "#666", minWidth: 190 }}>{label}:</span>
      <span style={{ color: ok ? "#008000" : "#cc0000", fontWeight: "bold" }}>
        {value}
      </span>
    </div>
  );
}

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 4, padding: 12, marginBottom: 10, fontWeight: "bold" }}>
      {children}
    </div>
  );
}

const preStyle: React.CSSProperties = {
  background: "#f5f5f5",
  padding: 12,
  borderRadius: 4,
  overflow: "auto",
  maxHeight: 420,
};

const codeStyle: React.CSSProperties = {
  background: "#1a1a2e",
  color: "#00ff88",
  padding: 16,
  borderRadius: 8,
  overflow: "auto",
};