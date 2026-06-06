// ============================================================
// FIIXUP.IN — app/api/revalidate/route.ts
// Cache revalidation endpoint
// Works with unstable_cache tags on Hostinger Node.js
// ============================================================
// Usage:
//   Revalidate all:    /api/revalidate?secret=fiixup2026secret&path=all
//   Single path:       /api/revalidate?secret=fiixup2026secret&path=/bangalore
//   By tag:            /api/revalidate?secret=fiixup2026secret&tag=cities
//
// Available tags: cities, areas, services, service-categories,
//                 location-services, posts, redirects
// ============================================================

import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const VALID_TAGS = [
  'cities',
  'areas',
  'services',
  'service-categories',
  'location-services',
  'posts',
  'redirects',
]

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path   = request.nextUrl.searchParams.get('path')
  const tag    = request.nextUrl.searchParams.get('tag')

  // Validate secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate by tag
  if (tag) {
    if (!VALID_TAGS.includes(tag)) {
      return NextResponse.json(
        { error: `Invalid tag. Valid tags: ${VALID_TAGS.join(', ')}` },
        { status: 400 }
      )
    }
    revalidateTag(tag, "pages")
    return NextResponse.json({
      revalidated: true,
      tag,
      message: `All cached data tagged "${tag}" cleared`,
    })
  }

  // Revalidate all
  if (path === 'all') {
    VALID_TAGS.forEach(t => revalidateTag(t, "pages"))
    revalidatePath('/', 'layout')
    return NextResponse.json({
      revalidated: true,
      message: 'All cache cleared',
    })
  }

  // Revalidate single path
  if (path) {
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      path,
      message: `Cache cleared for ${path}`,
    })
  }

  return NextResponse.json(
    { error: 'Provide path= or tag= parameter' },
    { status: 400 }
  )
}


export async function GET(request: NextRequest) {
  return handleRevalidate(request)
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request)
}
