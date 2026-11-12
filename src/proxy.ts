import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isVercelAppHost } from '@/lib/vercel-host'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  // The public host header is the domain the visitor used.
  // nextUrl.hostname can be the deployment host even on www.off32.it, so it is not used here.
  if (isVercelAppHost(request.headers.get('host'))) {
    response.headers.set('X-Robots-Tag', 'noindex')
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
