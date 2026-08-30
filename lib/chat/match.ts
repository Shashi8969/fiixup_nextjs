// lib/chat/match.ts
// ─────────────────────────────────────────────────────────────────────────────
// Tiny, dependency-free TF-IDF + cosine retrieval matcher.
//
// No API, no model download, no external calls. Builds an in-memory index over
// the knowledge base once (per cache window) and answers a query in well under
// a millisecond. This is what makes the assistant "free" — it retrieves the
// best existing answer, it does not generate new text.
// ─────────────────────────────────────────────────────────────────────────────

export type KbEntry = {
  id: string;
  question: string;
  answer: string;
  url?: string | null;
  /** Extra keywords to widen recall (synonyms, service slugs, city names…). */
  keywords?: string[];
};

export type MatchResult = {
  matched: boolean;
  answer: string | null;
  url: string | null;
  entryId: string | null;
  score: number;
  related: { question: string; url?: string | null }[];
};

// ── Text normalization ──────────────────────────────────────────────────────

const STOPWORDS = new Set(
  ("a an and are as at be by do does for from have how i in is it its me my need of on or " +
    "please the to want was what when where which who will with you your can could would should " +
    "there this that these those we our us they them their")
    .split(" "),
);

// Domain synonyms — every token on a line is expanded to include the whole line,
// so "jumpstart", "jump start", "battery dead" and "wont start" all match each
// other. Keep phrases as single tokens with underscores after normalization.
const SYNONYM_GROUPS: string[][] = [
  ["jumpstart", "jump_start", "battery_dead", "dead_battery", "wont_start", "not_starting", "no_power"],
  ["puncture", "flat_tyre", "flat_tire", "tyre_burst", "tire_burst", "nail_in_tyre"],
  ["tyre", "tire", "wheel"],
  ["mechanic", "technician", "garage", "workshop", "service_center", "serviceman"],
  ["bike", "scooter", "motorcycle", "two_wheeler", "2_wheeler", "activa", "bullet"],
  ["car", "four_wheeler", "4_wheeler", "sedan", "hatchback", "suv"],
  ["price", "cost", "charge", "charges", "rate", "rates", "fee", "fees", "quote", "estimate", "pricing"],
  ["book", "booking", "appointment", "schedule", "arrange", "send"],
  ["breakdown", "stuck", "stranded", "not_moving", "towing", "tow"],
  ["area", "areas", "locality", "location", "pincode", "coverage", "cover", "serve", "available"],
  ["warranty", "guarantee", "warrenty"],
  ["timing", "timings", "hours", "time", "open", "available", "24x7", "24_7"],
  ["oil", "oil_change", "engine_oil", "servicing", "general_service", "periodic_service"],
  ["brake", "brakes", "braking", "brake_pad"],
  ["ac", "air_conditioner", "cooling", "aircon"],
  ["payment", "pay", "upi", "cash", "card", "gpay", "phonepe", "paytm"],
];

const SYNONYM_MAP: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const group of SYNONYM_GROUPS) for (const term of group) m.set(term, group);
  return m;
})();

function stem(token: string): string {
  // Extremely light suffix stripping — enough to fold plurals / -ing / -ed.
  return token
    .replace(/(ies)$/, "y")
    .replace(/(sses|shes|ches|xes)$/, (s) => s.slice(0, -2))
    .replace(/([^s])s$/, "$1")
    .replace(/(ing|ed)$/, "");
}

export function tokenize(text: string): string[] {
  const base = (text || "")
    .toLowerCase()
    .replace(/[₹]/g, " rupees ")
    .replace(/24\s*[x/]\s*7/g, " 24_7 ")
    .replace(/[^a-z0-9\s_]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const out: string[] = [];
  for (const raw of base) {
    if (raw.length < 2 || STOPWORDS.has(raw)) continue;
    const t = stem(raw);
    if (!t) continue;
    out.push(t);
    const syn = SYNONYM_MAP.get(t) || SYNONYM_MAP.get(raw);
    if (syn) for (const s of syn) if (s !== t) out.push(s);
  }
  return out;
}

// ── Index ───────────────────────────────────────────────────────────────────

type IndexedEntry = KbEntry & { vec: Map<string, number>; norm: number };

export class KnowledgeIndex {
  private entries: IndexedEntry[] = [];
  private idf = new Map<string, number>();

  constructor(kb: KbEntry[]) {
    const docs = kb.map((e) => {
      // Question counts 3x, keywords 2x, answer 1x — question match matters most.
      const tokens = [
        ...Array(3).fill(0).flatMap(() => tokenize(e.question)),
        ...Array(2).fill(0).flatMap(() => tokenize((e.keywords || []).join(" "))),
        ...tokenize(e.answer),
      ];
      return { entry: e, tokens };
    });

    const df = new Map<string, number>();
    for (const { tokens } of docs) {
      for (const t of new Set(tokens)) df.set(t, (df.get(t) || 0) + 1);
    }
    const n = Math.max(docs.length, 1);
    for (const [t, count] of df) this.idf.set(t, Math.log(1 + n / (1 + count)) + 1);

    for (const { entry, tokens } of docs) {
      const tf = new Map<string, number>();
      for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
      const vec = new Map<string, number>();
      let sumSq = 0;
      for (const [t, freq] of tf) {
        const w = (1 + Math.log(freq)) * (this.idf.get(t) || 1);
        vec.set(t, w);
        sumSq += w * w;
      }
      this.entries.push({ ...entry, vec, norm: Math.sqrt(sumSq) || 1 });
    }
  }

  get size() {
    return this.entries.length;
  }

  query(text: string, threshold = 0.18): MatchResult {
    const qTokens = tokenize(text);
    if (qTokens.length === 0) {
      return { matched: false, answer: null, url: null, entryId: null, score: 0, related: [] };
    }

    const qtf = new Map<string, number>();
    for (const t of qTokens) qtf.set(t, (qtf.get(t) || 0) + 1);
    const qvec = new Map<string, number>();
    let qSumSq = 0;
    for (const [t, freq] of qtf) {
      const w = (1 + Math.log(freq)) * (this.idf.get(t) || 1);
      qvec.set(t, w);
      qSumSq += w * w;
    }
    const qNorm = Math.sqrt(qSumSq) || 1;

    const scored = this.entries
      .map((e) => {
        let dot = 0;
        for (const [t, w] of qvec) {
          const ew = e.vec.get(t);
          if (ew) dot += w * ew;
        }
        return { e, score: dot / (qNorm * e.norm) };
      })
      .sort((a, b) => b.score - a.score);

    const top = scored[0];
    const related = scored
      .slice(1, 4)
      .filter((s) => s.score > threshold * 0.6)
      .map((s) => ({ question: s.e.question, url: s.e.url }));

    if (!top || top.score < threshold) {
      return { matched: false, answer: null, url: null, entryId: null, score: top?.score ?? 0, related };
    }

    return {
      matched: true,
      answer: top.e.answer,
      url: top.e.url ?? null,
      entryId: top.e.id,
      score: Number(top.score.toFixed(3)),
      related,
    };
  }
}
