export type JsonObject = Record<string, unknown>

export function isObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

export function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return fallback
}

export function asNullableString(value: unknown): string | null {
  const text = asString(value).trim()
  return text ? text : null
}

export function asNumber(value: unknown, fallback = 0): number {
  const number = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback
}

export function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : []
}

export function asObject(value: unknown): JsonObject {
  return isObject(value) ? value : {}
}

export function cleanPath(value: unknown): string | null {
  const text = asString(value).trim()
  if (!text || text === '/') return null
  const withSlash = text.startsWith('/') ? text : '/' + text
  return withSlash.replace(/\/+/g, '/').replace(/\/$/, '')
}

export function splitPath(value: unknown): string[] {
  const safePath = cleanPath(value)
  return safePath ? safePath.split('/').filter(Boolean) : []
}

export function normalizeJsonLd(value: unknown): unknown[] {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  if (isObject(value)) return [value]
  return []
}

export function paragraphs(value: unknown): string[] {
  return asString(value)
    .split(/\r?\n\s*\r?\n|\n/g)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function normalizeSeoSections(value: unknown): { heading: string; body: string }[] {
  return asArray<Record<string, unknown>>(value)
    .map((section) => ({
      heading: asString(section?.heading),
      body: asString(section?.body ?? section?.content ?? section?.text),
    }))
    .filter((section) => section.heading || section.body)
}
