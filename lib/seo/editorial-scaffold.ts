// lib/seo/editorial-scaffold.ts
//
// Defence-in-depth against AI-content generators that append their own
// working notes — "SEO Keywords to Target", "Meta Information", "Title Tag:",
// "Meta Description:" etc. — to the end of a page's long-form content as if
// they were real prose. Those belong in admin/metadata fields, never in
// rendered body copy (Google reads it as a mechanically-optimised, unfinished
// page). See the Aug-2026 AI Visibility audit, finding 3.1.
//
// The real fix is cleaning the source rows in Supabase, but templates must not
// depend on that staying clean — any future AI run can re-introduce it. Every
// block renderer funnels through here first.

/** Headings/labels that mark the start of an editorial-scaffold appendix. */
const SCAFFOLD_HEADING = new RegExp(
  '^\\s*(' +
    [
      'seo keywords to target',
      'keywords to target',
      'target keywords?',
      'primary keywords?',
      'secondary keywords?',
      'focus keyword',
      'lsi keywords?',
      'keyword density',
      'search intent',
      'meta information',
      'meta data',
      'metadata',
      'meta title',
      'title tag',
      'meta description',
      'url slug',
      'suggested slug',
      'internal linking suggestions?',
      'schema markup',
      'content brief',
    ].join('|') +
    ')\\s*:?\\s*$',
  'i',
);

/** Inline "Title Tag: … / Meta Description: …" lines inside a paragraph. */
const SCAFFOLD_INLINE = /(^|\n)\s*(meta title|title tag|meta description|meta keywords|url slug|focus keyword|target keywords?)\s*:/i;

export function isEditorialScaffoldText(value: unknown): boolean {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return false;
  return SCAFFOLD_HEADING.test(text) || SCAFFOLD_INLINE.test(text);
}

function blockText(block: unknown): string {
  if (!block || typeof block !== 'object') return '';
  const b = block as Record<string, unknown>;
  return [b.content, b.text, b.heading, b.title]
    .filter((v): v is string => typeof v === 'string')
    .join(' ');
}

/**
 * Drops any editorial-scaffold appendix from a block array. Once the first
 * scaffold heading/label is seen, everything from that point on is removed —
 * these generators always emit the notes as a trailing section, and the
 * blocks that follow (keyword lists, meta-tag paragraphs) are exactly what
 * must not render. Individual scaffold blocks earlier in the array are also
 * dropped defensively.
 */
export function stripEditorialScaffold<T>(blocks: readonly T[]): T[] {
  if (!Array.isArray(blocks)) return [];
  const cutFrom = blocks.findIndex((block) => isEditorialScaffoldText(blockText(block)));
  const kept = cutFrom === -1 ? blocks.slice() : blocks.slice(0, cutFrom);
  return kept.filter((block) => !isEditorialScaffoldText(blockText(block)));
}
