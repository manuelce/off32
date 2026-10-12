import { fetchPublicPage } from './safe-fetch'

export type CheckStatus = 'pass' | 'fail' | 'unavailable'

export type Check = {
  id: string
  label: string
  status: CheckStatus
  max: number
  detail: string
}

export type SiteSummary = {
  score: number
  checks: Array<Pick<Check, 'id' | 'label' | 'status'>>
}

export type SiteReport = {
  score: number
  finalUrl: string
  checks: Check[]
}

const DEFINITIONS = [
  { id: 'https', label: 'HTTPS', max: 15 },
  { id: 'reachable', label: 'Sito raggiungibile', max: 15 },
  { id: 'title', label: 'Titolo della pagina', max: 15 },
  { id: 'description', label: 'Meta description', max: 15 },
  { id: 'h1', label: 'Titolo H1', max: 10 },
  { id: 'viewport', label: 'Versione mobile', max: 10 },
  { id: 'alt', label: 'Testi alternativi delle immagini', max: 10 },
  { id: 'canonical', label: 'Canonical HTTPS', max: 5 },
  { id: 'opengraph', label: 'Open Graph', max: 5 },
] as const

export function scoreOf(checks: Check[]): number {
  const ran = checks.filter(check => check.status !== 'unavailable')
  const max = ran.reduce((sum, check) => sum + check.max, 0)
  if (!max) return 0
  const got = ran.reduce((sum, check) => sum + (check.status === 'pass' ? check.max : 0), 0)
  return Math.round((got / max) * 100)
}

export function summarize(report: SiteReport): SiteSummary {
  return {
    score: report.score,
    checks: report.checks.map(({ id, label, status }) => ({ id, label, status })),
  }
}

export async function analyzeSite(input: string): Promise<{ ok: true; report: SiteReport } | { ok: false; status: number; error: string }> {
  const page = await fetchPublicPage(input)
  if (!page.ok) {
    if (page.blocked) return { ok: false, status: 400, error: page.reason }
    return { ok: true, report: reportFrom(unreachable(page.reason), '') }
  }
  return { ok: true, report: reportFrom(inspectPage(page.body, page.status, page.finalUrl, page.truncated, page.contentType), page.finalUrl) }
}

export function inspectPage(html: string, status: number, finalUrl: string, truncated: boolean, contentType: string): Check[] {
  const https = finalUrl.startsWith('https://')
  const reachable = status >= 200 && status < 300
  const htmlPage = !contentType || contentType.includes('text/html') || contentType.includes('application/xhtml+xml')
  const headClosed = /<\/head>/i.test(html)
  const canJudgeHead = !truncated || headClosed

  if (!reachable || !htmlPage) {
    return DEFINITIONS.map(item => {
      if (item.id === 'https') return check(item, https ? 'pass' : 'fail', https ? 'La risposta finale usa HTTPS.' : 'La risposta finale non usa HTTPS.')
      if (item.id === 'reachable') {
        return check(item, 'fail', !htmlPage && reachable ? 'La risposta non è una pagina HTML.' : `Risposta HTTP ${status}.`)
      }
      return check(item, 'unavailable', 'Non verificato: la homepage non è una pagina HTML raggiungibile.')
    })
  }

  const title = textContent(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '')
  const description = metaContent(html, 'description')
  const viewport = metaContent(html, 'viewport')
  const h1 = /<h1\b/i.test(html)
  const canonical = canonicalHref(html)
  const ogTitle = metaProperty(html, 'og:title')
  const ogDescription = metaProperty(html, 'og:description')
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0])
  const missingAlt = images.filter(tag => !/\balt\s*=/i.test(tag)).length

  return DEFINITIONS.map(item => {
    if (item.id === 'https') {
      return check(item, https ? 'pass' : 'fail', https ? 'La risposta finale usa HTTPS.' : 'La risposta finale non usa HTTPS.')
    }
    if (item.id === 'reachable') return check(item, 'pass', `Risposta HTTP ${status}.`)
    if (item.id === 'title') {
      if (!canJudgeHead && !title) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
      return title ? check(item, 'pass', `Titolo presente: ${clip(title)}`) : check(item, 'fail', 'Manca il titolo della pagina.')
    }
    if (item.id === 'description') {
      if (!canJudgeHead && !description) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
      return description ? check(item, 'pass', `Descrizione presente: ${clip(description)}`) : check(item, 'fail', 'Manca la meta description.')
    }
    if (item.id === 'h1') {
      if (truncated && !h1) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
      return h1 ? check(item, 'pass', 'È presente almeno un H1.') : check(item, 'fail', 'Manca un titolo H1.')
    }
    if (item.id === 'viewport') {
      if (!canJudgeHead && !viewport) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
      return viewport ? check(item, 'pass', 'È presente il meta viewport.') : check(item, 'fail', 'Manca il meta viewport.')
    }
    if (item.id === 'alt') {
      if (missingAlt > 0) return check(item, 'fail', `${missingAlt} ${missingAlt === 1 ? 'immagine non ha' : 'immagini non hanno'} l'attributo alt.`)
      if (truncated) return check(item, 'unavailable', 'Non verificato: la pagina è stata troncata.')
      return check(item, 'pass', images.length ? 'Tutte le immagini hanno l\'attributo alt.' : 'La pagina non contiene immagini.')
    }
    if (item.id === 'canonical') {
      if (!canJudgeHead && !canonical) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
      const absolute = /^https:\/\/[^/]/i.test(canonical)
      return absolute ? check(item, 'pass', 'Il canonical è un indirizzo HTTPS assoluto.') : check(item, 'fail', canonical ? 'Il canonical non è un indirizzo HTTPS assoluto.' : 'Manca il canonical.')
    }
    if (!canJudgeHead && (!ogTitle || !ogDescription)) return check(item, 'unavailable', 'Non verificato: pagina incompleta.')
    return ogTitle && ogDescription
      ? check(item, 'pass', 'Sono presenti og:title e og:description.')
      : check(item, 'fail', 'Mancano og:title o og:description.')
  })
}

function unreachable(reason: string): Check[] {
  return DEFINITIONS.map(item => {
    if (item.id === 'reachable') return check(item, 'fail', reason)
    return check(item, 'unavailable', 'Non verificato: il sito non ha risposto.')
  })
}

function reportFrom(checks: Check[], finalUrl: string): SiteReport {
  return { score: scoreOf(checks), finalUrl, checks }
}

function check(item: { id: string; label: string; max: number }, status: CheckStatus, detail: string): Check {
  return { id: item.id, label: item.label, max: item.max, status, detail }
}

function textContent(value: string): string {
  return decode(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function decode(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
}

function clip(value: string): string {
  return value.length > 120 ? `${value.slice(0, 117)}...` : value
}

function metaContent(html: string, name: string): string {
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(tag[0])
    if ((attrs.name ?? '').toLowerCase() === name) return (attrs.content ?? '').trim()
  }
  return ''
}

function metaProperty(html: string, property: string): string {
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(tag[0])
    const key = (attrs.property ?? attrs.name ?? '').toLowerCase()
    if (key === property) return (attrs.content ?? '').trim()
  }
  return ''
}

function canonicalHref(html: string): string {
  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = attributes(tag[0])
    const rel = (attrs.rel ?? '').toLowerCase().split(/\s+/)
    if (rel.includes('canonical')) return (attrs.href ?? '').trim()
  }
  return ''
}

function attributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const match of tag.matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    const name = match[1].toLowerCase()
    if (name === '<meta' || name === '<link' || name === '<img') continue
    attrs[name] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return attrs
}
