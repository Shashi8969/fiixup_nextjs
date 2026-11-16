// Offline contract checks. No database, mail, or real HTTP requests are made.
// Run: node app/contact-new/request.test.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const source = fs.readFileSync(path.join(__dirname, "request.ts"), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const context = { exports: {}, URL, Date, Error, Promise, fetch: () => { throw Error("Unexpected network request"); } };
vm.runInNewContext(compiled, context);
const { normalizeMobile, requestMessage, readDelivery, buildPayload, sendContactRequest, emptyDetails } = context.exports;

(async () => {
  for (const input of ["9876543210", "+91 98765 43210", "919876543210", "98765-43210"]) assert.equal(normalizeMobile(input), "9876543210");
  for (const input of ["", "0000000000", "1234567890", "987654321", "abc9876543210", "+449876543210"]) assert.equal(normalizeMobile(input), null);
  const details = { ...emptyDetails, phone: "+91 98765 43210", name: " Test Visitor ", city: "Bengaluru", locality: " HSR Layout ", service: "Starting / battery assistance", model: "i20", message: "Will not start" };
  const payload = buildPayload(details, 2000, "http://localhost:3000/contact-new?utm_source=qa&utm_campaign=local&unrelated=omit", "https://example.com/");
  assert.equal(payload.phone, "9876543210"); assert.equal(payload.area, "HSR Layout");
  assert.equal(payload.name, "Test Visitor"); assert.equal(payload.vehicle_type, "Car");
  assert.equal(payload.vehicle_model, "i20"); assert.equal(payload.utm_source, "qa");
  assert.equal(payload.utm_campaign, "local"); assert.equal(payload.unrelated, undefined);
  assert.equal(payload.page_path, "/contact-new"); assert.equal(payload.form_render_ms, 2000);
  assert.match(payload.message, /Roadside help\nWill not start/);
  assert.match(requestMessage(details), /Locality \/ landmark:  HSR Layout /);
  assert.equal(readDelivery({ ok: true, lead_saved: true, email_sent: false }), "received");
  assert.equal(readDelivery({ ok: true, email_sent: true, lead_saved: false }), "received");
  assert.equal(readDelivery({ is_duplicate: true }), "earlier-request");
  for (const data of [{}, { success_message: "Received" }, { ok: true }, { ok: true, lead_saved: false, email_sent: false }, { ok: false, lead_saved: true }]) assert.throws(() => readDelivery(data));
  const signal = new AbortController().signal;
  let calls = 0;
  const successfulTransport = async (url, options) => {
    calls++; assert.equal(url, "/api/leads"); assert.equal(options.method, "POST"); assert.equal(options.signal, signal);
    const received = JSON.parse(options.body); assert.equal(received.phone, "9876543210"); assert.equal(received.area, "HSR Layout");
    return { ok: true, json: async () => ({ ok: true, lead_saved: true }) };
  };
  assert.equal(await sendContactRequest(payload, signal, successfulTransport), "received"); assert.equal(calls, 1);
  assert.equal(await sendContactRequest(payload, signal, async () => ({ ok: true, json: async () => ({ is_duplicate: true }) })), "earlier-request");
  await assert.rejects(() => sendContactRequest(payload, signal, async () => ({ ok: false })), /request-unconfirmed/);
  await assert.rejects(() => sendContactRequest(payload, signal, async () => ({ ok: true, json: async () => ({}) })), /delivery-unconfirmed/);
  await assert.rejects(() => sendContactRequest(payload, signal, async () => { throw Error("offline"); }), /offline/);
  await assert.rejects(() => sendContactRequest(payload, signal, async () => ({ ok: true, json: async () => { throw Error("invalid-json"); } })), /invalid-json/);
  await assert.rejects(() => sendContactRequest(payload, signal, async () => { throw Error("aborted"); }), /aborted/);
  console.log("PASS: mobile validation, payload mapping, attribution, WhatsApp details, saved/email/duplicate delivery, HTTP failure, offline, malformed response, and aborted transport. No live requests sent.");
})().catch(error => { console.error(error); process.exitCode = 1; });
