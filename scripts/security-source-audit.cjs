// Source/secret-boundary checks. Never prints credential values.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const all = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(tsx?|jsx?|mjs|cjs)$/.test(file)) all.push(file);
  }
}
for (const dir of ["app", "components", "lib", "scripts"]) walk(path.join(root, dir));
const sources = new Map(all.map(file => [file, fs.readFileSync(file, "utf8")]));
const findings = [];
const pretty = file => path.relative(root, file).replaceAll("\\", "/");
for (const [file, text] of sources) {
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text)) findings.push({ file: pretty(file), type: "private-key-material" });
  if (/\bsb_secret_[A-Za-z0-9_-]{20,}/.test(text)) findings.push({ file: pretty(file), type: "embedded-secret-key" });
  for (const jwt of text.match(/eyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/g) || []) {
    try { if (JSON.parse(Buffer.from(jwt.split(".")[1], "base64url").toString()).role === "service_role") findings.push({ file: pretty(file), type: "embedded-service-role-token" }); } catch {}
  }
}
function resolve(from, name) {
  const target = name.startsWith("@/") ? path.join(root, name.slice(2)) : name.startsWith(".") ? path.resolve(path.dirname(from), name) : null;
  if (!target) return null;
  return [target, ...[".ts", ".tsx", ".js", ".mjs", "/index.ts", "/index.tsx"].map(ext => target + ext)].find(file => sources.has(file)) || null;
}
let clientRoots = 0;
for (const [file, text] of sources) {
  if (!/^\s*["']use client["']/.test(text)) continue;
  clientRoots++;
  const visited = new Set();
  const visit = current => {
    if (visited.has(current)) return;
    visited.add(current);
    const content = sources.get(current);
    if (!content) return;
    if (/process\.env\.(?:SUPABASE_SERVICE_ROLE_KEY|SMTP_PASS|GMAIL_APP_PASSWORD|REVALIDATE_SECRET)\b/.test(content)) findings.push({ file: pretty(current), clientEntry: pretty(file), type: "private-env-in-client-import-graph" });
    const ast = ts.createSourceFile(current, content, ts.ScriptTarget.Latest, true);
    for (const node of ast.statements) {
      if (!ts.isImportDeclaration(node) || node.importClause?.isTypeOnly) continue;
      const named = node.importClause?.namedBindings;
      if (named && ts.isNamedImports(named) && !node.importClause?.name && named.elements.length && named.elements.every(item => item.isTypeOnly)) continue;
      const destination = resolve(current, node.moduleSpecifier.text);
      if (destination) visit(destination);
    }
    const inspect = node => {
      if (ts.isExportDeclaration(node) && !node.isTypeOnly && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const destination = resolve(current, node.moduleSpecifier.text);
        if (destination) visit(destination);
      }
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
        const destination = resolve(current, node.arguments[0].text);
        if (destination) visit(destination);
      }
      ts.forEachChild(node, inspect);
    };
    ts.forEachChild(ast, inspect);
  };
  visit(file);
}
const baselineFile = path.join(root, "tmp/security-audit-2026-10-22/baseline.json");
const baseline = fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, "utf8")) : {};
const changed = Object.keys(baseline).filter(file => fs.existsSync(path.join(root, file)) && crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex") !== baseline[file]);
const report = { sourceFiles: all.length, clientRoots, findings, changedFiles: changed, styleFilesChanged: changed.filter(file => /\.css$|tailwind\.config|postcss\.config/.test(file)) };
fs.mkdirSync(path.join(root, "tmp/security-audit-2026-10-22"), { recursive: true });
fs.writeFileSync(path.join(root, "tmp/security-audit-2026-10-22/source-audit.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (findings.length) process.exitCode = 1;
