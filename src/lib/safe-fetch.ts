import { resolve4, resolve6 } from 'node:dns/promises'
import http from 'node:http'
import https from 'node:https'
import { isIP } from 'node:net'
import tls from 'node:tls'
import { isPublicAddress, parsePublicUrl } from './public-address'

const MAX_REDIRECTS = 3
const MAX_BYTES = 512 * 1024
const BUDGET_MS = 8000

export type PublicPage = {
  ok: true
  status: number
  finalUrl: string
  body: string
  truncated: boolean
  contentType: string
}

export type PublicPageError = { ok: false; reason: string; blocked: boolean }

export async function fetchPublicPage(input: string): Promise<PublicPage | PublicPageError> {
  const parsed = parsePublicUrl(input)
  if (!parsed.ok) return { ok: false, reason: parsed.reason, blocked: true }
  return follow(parsed.url, Date.now() + BUDGET_MS, 0)
}

async function follow(url: URL, deadline: number, hops: number): Promise<PublicPage | PublicPageError> {
  if (Date.now() >= deadline) return { ok: false, reason: 'Il sito non risponde in tempo.', blocked: false }
  const pinned = await pinAddress(url.hostname.replace(/^\[|\]$/g, ''))
  if (typeof pinned !== 'string') return pinned

  const response = await requestPinned(url, pinned, deadline)
  if (!response.ok) return response
  if (response.kind === 'redirect') {
    if (hops >= MAX_REDIRECTS) return { ok: false, reason: 'Troppi reindirizzamenti.', blocked: false }
    if (!response.location) return { ok: false, reason: 'Reindirizzamento non valido.', blocked: false }
    let next: URL
    try {
      next = new URL(response.location, url)
    } catch {
      return { ok: false, reason: 'Reindirizzamento non valido.', blocked: false }
    }
    const checked = parsePublicUrl(next.toString())
    if (!checked.ok) return { ok: false, reason: checked.reason, blocked: true }
    return follow(checked.url, deadline, hops + 1)
  }

  return {
    ok: true,
    status: response.status,
    finalUrl: url.toString(),
    body: response.body,
    truncated: response.truncated,
    contentType: response.contentType,
  }
}

async function pinAddress(hostname: string): Promise<string | PublicPageError> {
  if (isIP(hostname)) {
    return isPublicAddress(hostname)
      ? hostname
      : { ok: false, reason: 'Indirizzo non ammesso.', blocked: true }
  }

  const [v4, v6] = await Promise.allSettled([resolve4(hostname), resolve6(hostname)])
  const addresses = [
    ...(v4.status === 'fulfilled' ? v4.value : []),
    ...(v6.status === 'fulfilled' ? v6.value : []),
  ]
  if (!addresses.length) return { ok: false, reason: 'Il sito non è raggiungibile.', blocked: false }
  if (addresses.some(address => !isPublicAddress(address))) {
    return { ok: false, reason: 'Indirizzo non ammesso.', blocked: true }
  }
  return addresses.find(address => isIP(address) === 4) ?? addresses[0]
}

type RedirectResult = { ok: true; kind: 'redirect'; status: number; location: string }
type BodyResult = { ok: true; kind: 'body'; status: number; body: string; truncated: boolean; contentType: string }

function requestPinned(url: URL, ip: string, deadline: number): Promise<RedirectResult | BodyResult | PublicPageError> {
  const isHttps = url.protocol === 'https:'
  const family = isIP(ip) === 6 ? 6 : 4
  const timeout = Math.max(500, deadline - Date.now())
  const path = `${url.pathname || '/'}${url.search}`

  return new Promise(resolve => {
    let settled = false
    const finish = (value: RedirectResult | BodyResult | PublicPageError) => {
      if (settled) return
      settled = true
      resolve(value)
    }

    const req = (isHttps ? https : http).request(
      {
        host: ip,
        family,
        port: url.port || (isHttps ? 443 : 80),
        path,
        method: 'GET',
        timeout,
        headers: {
          host: url.host,
          'user-agent': 'OFF32-Analisi/1.0',
          accept: 'text/html,application/xhtml+xml',
        },
        ...(isHttps
          ? {
              servername: url.hostname.replace(/^\[|\]$/g, ''),
              rejectUnauthorized: true,
              checkServerIdentity: (_host: string, cert: tls.PeerCertificate) => tls.checkServerIdentity(url.hostname.replace(/^\[|\]$/g, ''), cert),
            }
          : {}),
      },
      res => {
        const status = res.statusCode ?? 0
        const location = headerValue(res.headers.location)
        if ([301, 302, 303, 307, 308].includes(status)) {
          res.resume()
          finish({ ok: true, kind: 'redirect', status, location })
          return
        }

        const chunks: Buffer[] = []
        let size = 0
        let truncated = false
        res.on('data', (chunk: Buffer) => {
          if (truncated) return
          size += chunk.length
          if (size > MAX_BYTES) {
            truncated = true
            chunks.push(chunk.subarray(0, chunk.length - (size - MAX_BYTES)))
            res.destroy()
            return
          }
          chunks.push(chunk)
        })
        const done = () => {
          finish({
            ok: true,
            kind: 'body',
            status,
            body: Buffer.concat(chunks).toString('utf8'),
            truncated,
            contentType: headerValue(res.headers['content-type']).toLowerCase(),
          })
        }
        res.on('end', done)
        res.on('error', () => {
          if (truncated) done()
          else finish({ ok: false, reason: 'Il sito non è raggiungibile.', blocked: false })
        })
        res.on('close', () => {
          if (truncated) done()
        })
      },
    )

    req.on('timeout', () => {
      req.destroy()
      finish({ ok: false, reason: 'Il sito non risponde in tempo.', blocked: false })
    })
    req.on('error', () => finish({ ok: false, reason: 'Il sito non è raggiungibile.', blocked: false }))
    req.end()
  })
}

function headerValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}
