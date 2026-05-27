"use client";
// components/ui/BlockRenderer.tsx
// ─── Renders ALL block types from the posts.content JSONB array ───────────────
// Place at: components/ui/BlockRenderer.tsx

import React, { useState, ElementType } from "react";
import Link from "next/link";
import {
  Info, AlertTriangle, ChevronDown, CheckCircle2, XCircle, Copy, Check,
} from "lucide-react";

// ─── Type Definitions ─────────────────────────────────────────────────────────

export type Block =
| { type: "rich_content"; html: string }
  | { type: "heading";      level: 1|2|3|4|5|6; content: string }
  | { type: "paragraph";    content: string }
  | { type: "list";         style: "bullet"|"numbered"; items: string[] }
  | { type: "table";        headers: string[]; rows: string[][]; caption?: string }
  | { type: "tip";          content: string; label?: string }
  | { type: "warning";      content: string; label?: string }
  | { type: "image";        url: string; alt: string; caption?: string }
  | { type: "quote";        content: string; author?: string }
  | { type: "code";         language: string; content: string }
  | { type: "divider" }
  | { type: "cta";          heading: string; subtext?: string; buttonText: string; buttonHref: string }
  | { type: "faq";          items: { question: string; answer: string }[] }
  | { type: "steps";        items: { title: string; description: string }[] }
  | { type: "link";         text: string; href: string; external?: boolean }
  | { type: "service_card"; title: string; description: string; price?: string; href?: string }
  | { type: "pros_cons";    pros: string[]; cons: string[] }
  | { type: "comparison";   headers: string[]; rows: { label: string; values: string[] }[] }
  | { type: "meta";         title: string; description: string } // skip render
  | { type: string; [key: string]: unknown }; // unknown future blocks

// ─── Heading ─────────────────────────────────────────────────────────────────

const HEADING_TAGS: Record<number, ElementType> = {
  1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6",
};

const HEADING_CLS: Record<number, string> = {
  1: "text-3xl md:text-4xl font-bold text-gray-900 mt-10 mb-4 leading-tight",
  2: "text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-3 pb-2 border-b border-gray-200",
  3: "text-xl font-semibold text-gray-800 mt-7 mb-3",
  4: "text-lg font-semibold text-gray-800 mt-5 mb-2",
  5: "text-base font-semibold text-gray-700 mt-4 mb-2",
  6: "text-sm font-semibold text-gray-500 mt-3 mb-1 uppercase tracking-wider",
};

function HeadingBlock({ level, content }: { level: number; content: string }) {
  const safeLevel = Math.min(Math.max(level, 1), 6);
  const Tag = HEADING_TAGS[safeLevel] ?? "h2";
  return <Tag className={HEADING_CLS[safeLevel] ?? HEADING_CLS[2]}>{content}</Tag>;
}

// ─── Paragraph ────────────────────────────────────────────────────────────────

function ParagraphBlock({ content }: { content: string }) {
  return (
    <p
      className="text-gray-700 leading-relaxed mb-5 text-base md:text-[1.05rem]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// ─── List ─────────────────────────────────────────────────────────────────────

function ListBlock({ style, items }: { style: string; items: string[] }) {
  const Tag = style === "numbered" ? "ol" : "ul";
  return (
    <Tag className={`mb-5 pl-5 space-y-2 ${style === "numbered" ? "list-decimal" : "list-disc"}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="text-gray-700 leading-relaxed marker:text-red-500"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </Tag>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

function TableBlock({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return (
    <div className="mb-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        {caption && (
          <caption className="text-xs text-gray-500 text-left px-4 pt-3 caption-top">{caption}</caption>
        )}
        <thead className="bg-red-50 border-b border-red-100">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 text-red-800 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-gray-700 border-t border-gray-100 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tip ──────────────────────────────────────────────────────────────────────

function TipBlock({ content, label = "Fiixup Tip" }: { content: string; label?: string }) {
  return (
    <div className="mb-5 flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-amber-900 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

// ─── Warning ──────────────────────────────────────────────────────────────────

function WarningBlock({ content, label = "Important" }: { content: string; label?: string }) {
  return (
    <div className="mb-5 flex gap-3 bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-r-2xl p-5">
      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-red-900 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

// ─── Image ────────────────────────────────────────────────────────────────────

function ImageBlock({ url, alt, caption }: { url: string; alt: string; caption?: string }) {
  return (
    <figure className="mb-6">
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img src={url} alt={alt} className="w-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-gray-500 mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

// ─── Quote ────────────────────────────────────────────────────────────────────

function QuoteBlock({ content, author }: { content: string; author?: string }) {
  return (
    <blockquote className="mb-5 border-l-4 border-red-400 pl-5 py-2 bg-red-50/50 rounded-r-2xl">
      <p className="text-gray-800 italic text-[1.05rem] leading-relaxed mb-1">"{content}"</p>
      {author && <cite className="text-sm text-gray-500 not-italic font-medium">— {author}</cite>}
    </blockquote>
  );
}

// ─── Code ─────────────────────────────────────────────────────────────────────

function CodeBlock({ language, content }: { language: string; content: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="mb-5 rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2.5">
        <span className="text-xs text-gray-400 font-mono">{language || "code"}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="bg-gray-950 text-green-400 p-5 text-sm font-mono overflow-x-auto leading-relaxed whitespace-pre">
        <code>{content}</code>
      </pre>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function DividerBlock() {
  return <hr className="my-8 border-0 border-t border-dashed border-gray-300" />;
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CtaBlock({
  heading, subtext, buttonText, buttonHref,
}: { heading: string; subtext?: string; buttonText: string; buttonHref: string }) {
  const isPhone = buttonHref.startsWith("tel:");
  return (
    <div className="mb-6 bg-red-600 rounded-2xl p-6 md:p-8 text-center shadow-md">
      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{heading}</h3>
      {subtext && <p className="text-red-100 text-sm mb-5">{subtext}</p>}
      <a
        href={buttonHref}
        className="inline-block bg-white text-red-600 font-bold text-sm px-7 py-3 rounded-xl hover:bg-red-50 transition-colors shadow"
      >
        {buttonText}
      </a>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqBlock({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-semibold text-gray-800 text-sm leading-snug">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-red-500 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 pt-3 text-gray-600 text-sm leading-relaxed border-t border-gray-100"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepsBlock({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ol className="mb-6 space-y-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <div className="shrink-0 w-9 h-9 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">
            {i + 1}
          </div>
          <div className="flex-1 pt-1">
            <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Link ─────────────────────────────────────────────────────────────────────

function LinkBlock({ text, href, external }: { text: string; href: string; external?: boolean }) {
  return (
    <p className="mb-3">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1.5 text-red-600 font-medium hover:text-red-700 underline underline-offset-2 decoration-red-300"
      >
        {text}
        {external && <span className="text-xs">↗</span>}
      </a>
    </p>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCardBlock({
  title, description, price, href,
}: { title: string; description: string; price?: string; href?: string }) {
  const inner = (
    <div className="flex items-start justify-between gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md hover:border-red-200 transition-all">
      <div className="flex-1">
        <p className="font-semibold text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
      {price && (
        <div className="shrink-0 text-right">
          <p className="text-xs text-gray-500 mb-0.5">Starting from</p>
          <p className="text-lg font-bold text-red-600">{price}</p>
        </div>
      )}
    </div>
  );
  return (
    <div className="mb-4">
      {href ? <Link href={href}>{inner}</Link> : inner}
    </div>
  );
}

// ─── Pros / Cons ──────────────────────────────────────────────────────────────

function ProsConsBlock({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="mb-6 grid sm:grid-cols-2 gap-4">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Pros
        </p>
        <ul className="space-y-2">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-900">
              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <XCircle className="w-4 h-4" /> Cons
        </p>
        <ul className="space-y-2">
          {cons.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <span className="text-red-500 mt-0.5 shrink-0">✗</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────

function ComparisonBlock({
  headers, rows,
}: { headers: string[]; rows: { label: string; values: string[] }[] }) {
  return (
    <div className="mb-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Feature</th>
            {headers.map((h, i) => (
              <th key={i} className={`text-center px-4 py-3 font-semibold text-xs uppercase tracking-wide ${i === 0 ? "text-red-400" : "text-gray-300"}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
              <td className="px-4 py-3 text-gray-700 font-medium border-t border-gray-100">{row.label}</td>
              {row.values.map((val, vi) => (
                <td key={vi} className="px-4 py-3 text-center text-gray-600 border-t border-gray-100">
                  {val === "true" || val === "✓" ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : val === "false" || val === "✗" ? (
                    <span className="text-red-500 font-bold">✗</span>
                  ) : val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RichContentBlock({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-600 prose-table:text-sm prose-th:bg-red-50 prose-th:text-red-800"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ─── Main Renderer ────────────────────────────────────────────────────────────

export function BlockRenderer({ blocks }: { blocks: unknown[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <p className="text-gray-400 italic text-sm">No content yet.</p>;
  }

  return (
    <div className="blog-content">
      {blocks.map((block, i) => {
        if (!block || typeof block !== "object") return null;
        const b = block as Record<string, unknown>;

        switch (b.type) {
          case "heading":
            return <HeadingBlock key={i} level={Number(b.level) || 2} content={String(b.content ?? "")} />;

            case "rich_content":
  return <RichContentBlock key={i} html={String(b.html ?? "")} />;

          case "paragraph":
            return <ParagraphBlock key={i} content={String(b.content ?? "")} />;

          case "list":
            return <ListBlock key={i} style={String(b.style ?? "bullet")} items={Array.isArray(b.items) ? b.items.map(String) : []} />;

          case "table":
            return (
              <TableBlock
                key={i}
                headers={Array.isArray(b.headers) ? b.headers.map(String) : []}
                rows={Array.isArray(b.rows) ? b.rows.map((r) => (Array.isArray(r) ? r.map(String) : [])) : []}
                caption={b.caption ? String(b.caption) : undefined}
              />
            );

          case "tip":
            return <TipBlock key={i} content={String(b.content ?? "")} label={b.label ? String(b.label) : undefined} />;

          case "warning":
          case "callout":
            return <WarningBlock key={i} content={String(b.content ?? "")} label={b.label ? String(b.label) : undefined} />;

          case "image":
            return <ImageBlock key={i} url={String(b.url ?? b.src ?? "")} alt={String(b.alt ?? "")} caption={b.caption ? String(b.caption) : undefined} />;

          case "quote":
            return <QuoteBlock key={i} content={String(b.content ?? "")} author={b.author ? String(b.author) : undefined} />;

          case "code":
            return <CodeBlock key={i} language={String(b.language ?? "")} content={String(b.content ?? "")} />;

          case "divider":
            return <DividerBlock key={i} />;

          case "cta":
            return (
              <CtaBlock
                key={i}
                heading={String(b.heading ?? "Book a Service")}
                subtext={b.subtext ? String(b.subtext) : undefined}
                buttonText={String(b.buttonText ?? "Book Now")}
                buttonHref={String(b.buttonHref ?? "/contact")}
              />
            );

          case "faq":
            return (
              <FaqBlock
                key={i}
                items={Array.isArray(b.items) ? b.items.map((item: any) => ({
                  question: String(item.question ?? ""),
                  answer: String(item.answer ?? ""),
                })) : []}
              />
            );

          case "steps":
            return (
              <StepsBlock
                key={i}
                items={Array.isArray(b.items) ? b.items.map((item: any) => ({
                  title: String(item.title ?? ""),
                  description: String(item.description ?? ""),
                })) : []}
              />
            );

          case "link":
            return <LinkBlock key={i} text={String(b.text ?? "")} href={String(b.href ?? "#")} external={Boolean(b.external)} />;

          case "service_card":
            return (
              <ServiceCardBlock
                key={i}
                title={String(b.title ?? "")}
                description={String(b.description ?? "")}
                price={b.price ? String(b.price) : undefined}
                href={b.href ? String(b.href) : undefined}
              />
            );

          case "pros_cons":
            return (
              <ProsConsBlock
                key={i}
                pros={Array.isArray(b.pros) ? b.pros.map(String) : []}
                cons={Array.isArray(b.cons) ? b.cons.map(String) : []}
              />
            );

          case "comparison":
            return (
              <ComparisonBlock
                key={i}
                headers={Array.isArray(b.headers) ? b.headers.map(String) : []}
                rows={Array.isArray(b.rows) ? b.rows.map((r: any) => ({
                  label: String(r.label ?? ""),
                  values: Array.isArray(r.values) ? r.values.map(String) : [],
                })) : []}
              />
            );

          case "meta":
            return null; // Never render meta blocks publicly

          default:
            // Unknown block — skip silently in prod, show warning in dev
            if (process.env.NODE_ENV === "development") {
              return (
                <div key={i} className="mb-3 p-3 bg-yellow-50 border border-yellow-300 rounded-lg text-xs text-yellow-800 font-mono">
                  Unknown block type: <strong>{String(b.type)}</strong>
                </div>
              );
            }
            return null;
        }
      })}
    </div>
  );
}