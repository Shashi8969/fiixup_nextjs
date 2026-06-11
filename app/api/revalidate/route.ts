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
//                 location-services, posts, redirects, site-settings,
//                 navigation-links, faq-library, reviews, seo-pages
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
  'site-settings',
  'navigation-links',
  'faq-library',
  'reviews',
  'seo-pages',
] as const

type ValidTag = (typeof VALID_TAGS)[number]

function isValidTag(tag: string): tag is ValidTag {
  return (VALID_TAGS as readonly string[]).includes(tag)
}

function revalidateTagSafe(tag: ValidTag) {
  revalidateTag(tag, 'pages')
}

function revalidateRelatedPaths(tag: ValidTag) {
  switch (tag) {
    case 'site-settings':
    case 'navigation-links':
      revalidatePath('/', 'layout')
      break
    case 'faq-library':
      revalidatePath('/faq')
      break
    case 'reviews':
      revalidatePath('/')
      break
    case 'seo-pages':
      revalidatePath('/sitemap.xml')
      revalidatePath('/robots.txt')
      break
    case 'posts':
      revalidatePath('/blog')
      break
    default:
      break
  }
}

function revalidateEverything() {
  VALID_TAGS.forEach((tag) => {
    revalidateTagSafe(tag)
    revalidateRelatedPaths(tag)
  })
  revalidatePath('/', 'layout')
}

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')
  const tag = request.nextUrl.searchParams.get('tag')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (tag) {
    if (!isValidTag(tag)) {
      return NextResponse.json(
        { error: `Invalid tag. Valid tags: ${VALID_TAGS.join(', ')}` },
        { status: 400 }
      )
    }

    revalidateTagSafe(tag)
    revalidateRelatedPaths(tag)

    return NextResponse.json({
      revalidated: true,
      tag,
      message: `All cached data tagged "${tag}" cleared`,
    })
  }

  if (path === 'all') {
    revalidateEverything()
    return NextResponse.json({
      revalidated: true,
      message: 'All cache cleared',
    })
  }

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
