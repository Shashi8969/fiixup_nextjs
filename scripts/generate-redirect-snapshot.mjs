import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const outputPath = path.join(projectDir, "lib", "generated-redirects.json");

if (!supabaseUrl || !serviceKey) {
  console.warn("[redirect-snapshot] Missing Supabase server credentials; keeping the existing snapshot.");
  process.exit(0);
}

try {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/redirects?select=source,destination,is_permanent&is_active=eq.true&limit=5000`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error("Redirect response was not an array");

  const safeRows = rows
    .filter((row) => row && typeof row.source === "string" && typeof row.destination === "string")
    .map((row) => ({
      source: row.source,
      destination: row.destination,
      is_permanent: row.is_permanent === true,
    }));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(safeRows, null, 2)}\n`, "utf8");
  console.log(`[redirect-snapshot] Wrote ${safeRows.length} active redirects.`);
} catch (error) {
  console.warn(`[redirect-snapshot] Refresh failed; keeping the existing snapshot. ${error instanceof Error ? error.message : String(error)}`);
}
