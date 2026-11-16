// Check public build output against local private environment values.
// Outputs only key names and filenames, never credential values.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
if (fs.existsSync(path.join(root, ".env.local"))) process.loadEnvFile(path.join(root, ".env.local"));
const credentials = ["SUPABASE_SERVICE_ROLE_KEY", "REVALIDATE_SECRET", "SMTP_PASS", "GMAIL_APP_PASSWORD"]
  .filter(name => process.env[name] && process.env[name].length >= 8);
const files = [];
function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file); else if (/\.(js|css|map|json|txt|html)$/.test(file)) files.push(file);
  }
}
walk(path.join(root, ".next/static"));
walk(path.join(root, "public"));
const exposed = [];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const name of credentials) if (source.includes(process.env[name])) exposed.push({ file: path.relative(root, file), keyName: name });
}
const tracked = spawnSync("git", ["-c", `safe.directory=${root.replaceAll("\\", "/")}`, "ls-files", "--", ".env", ".env.*", "*.pem", "*.key"], { cwd: root, encoding: "utf8" });
const trackedSensitiveFiles = (tracked.stdout || "").split(/\r?\n/).filter(file => file && file !== ".env.example");
const report = { publicFilesScanned: files.length, privateKeyNamesChecked: credentials, exposed, trackedSensitiveFiles };
const out = path.join(root, "tmp/security-audit-2026-10-22/build-audit.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!files.length || exposed.length || trackedSensitiveFiles.length || tracked.status !== 0) process.exitCode = 1;
