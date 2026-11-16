import sanitizeHtml from "sanitize-html";

// A real HTML parser handles entity-encoded protocols, whitespace in event
// attributes, malformed tags, and SVG/MathML namespaces that regexes miss.
// Keep existing editorial classes and normal formatting; executable content,
// inline styles, forms and arbitrary embeds are not editorial content.
export function cleanHtml(value: string): string {
  return sanitizeHtml(String(value ?? ""), {
    allowedTags: [
      "a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "br", "caption", "cite", "code", "col", "colgroup",
      "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "figcaption", "figure", "footer", "h1", "h2", "h3", "h4", "h5", "h6",
      "header", "hgroup", "hr", "i", "img", "ins", "kbd", "li", "main", "mark", "nav", "ol", "p", "pre", "q", "rp", "rt", "ruby",
      "s", "samp", "section", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "wbr",
    ],
    allowedAttributes: {
      "*": ["class", "id", "title", "dir", "lang", "aria-label", "aria-hidden", "role"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      td: ["colspan", "rowspan", "headers"], th: ["colspan", "rowspan", "scope", "headers"],
      col: ["span"], colgroup: ["span"], ol: ["start", "reversed", "type"], li: ["value"],
      time: ["datetime"], blockquote: ["cite"], q: ["cite"], details: ["open"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    nonTextTags: ["script", "style", "textarea", "option", "noscript"],
    transformTags: {
      a: (tagName, attributes) => ({ tagName, attribs: {
        ...attributes, rel: Array.from(new Set(`${attributes.rel || ""} noopener noreferrer`.trim().split(/\s+/))).join(" "),
      } }),
    },
  });
}

export function safeHref(value: string, fallback = "#") {
  const href = String(value || "").trim();
  if (!href || /[\u0000-\u0020\u007f\\]/.test(href) || href.startsWith("//")) return fallback;
  if (href.startsWith("/") || href.startsWith("#")) return href;
  try {
    const url = new URL(href);
    if (["https:", "http:", "mailto:", "tel:"].includes(url.protocol) && !url.username && !url.password) return href;
  } catch { /* Invalid and executable protocols use the existing fallback. */ }
  return fallback;
}
