import { NextResponse } from 'next/server'
import { allowRequest, clientKey } from '@/lib/rate-limit'
import { analyzeSite, summarize } from '@/lib/site-check'

export const runtime = 'nodejs'
export const maxDuration = 10

export async function POST(request: Request) {
  if (!allowRequest(`analisi:${clientKey(request)}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Troppe richieste. Riprova tra qualche minuto.' }, { status: 429 })
  }

  const url = await readUrl(request)
  if (!url) return NextResponse.json({ error: 'Indirizzo non valido.' }, { status: 400 })

  try {
    const result = await analyzeSite(url)
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
    return NextResponse.json(summarize(result.report))
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'analisi')
    return NextResponse.json({ error: 'Analisi non disponibile. Riprova.' }, { status: 500 })
  }
}

async function readUrl(request: Request): Promise<string | null> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return null
  }
  if (!body || typeof body !== 'object' || !('url' in body) || typeof body.url !== 'string') return null
  const url = body.url.trim()
  return url.length > 0 && url.length <= 2000 ? url : null
}
