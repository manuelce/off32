import { isIP } from 'node:net'

export type UrlCheck = { ok: true; url: URL } | { ok: false; reason: string }

const BLOCKED_HOSTS = new Set([
  'localhost',
  'localhost.localdomain',
  'metadata',
  'metadata.google.internal',
  'metadata.google.com',
])

export function parsePublicUrl(input: string): UrlCheck {
  const raw = input.trim()
  if (!raw || raw.length > 2000) return { ok: false, reason: 'Indirizzo non valido.' }

  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    return { ok: false, reason: 'Indirizzo non valido.' }
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { ok: false, reason: 'Sono ammessi solo indirizzi http e https.' }
  }
  if (url.username || url.password) {
    return { ok: false, reason: 'Indirizzo non ammesso.' }
  }

  const port = url.port
  if (url.protocol === 'https:' && port && port !== '443') {
    return { ok: false, reason: 'Sono ammesse solo le porte 80 e 443.' }
  }
  if (url.protocol === 'http:' && port && port !== '80') {
    return { ok: false, reason: 'Sono ammesse solo le porte 80 e 443.' }
  }

  const host = url.hostname.replace(/\.$/, '').replace(/^\[|\]$/g, '').toLowerCase()
  if (!host || host.includes('%') || host.includes('[') || host.includes(']')) {
    return { ok: false, reason: 'Indirizzo non ammesso.' }
  }
  if (
    BLOCKED_HOSTS.has(host) ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    return { ok: false, reason: 'Indirizzo non ammesso.' }
  }
  if (isObfuscatedAddress(host)) return { ok: false, reason: 'Indirizzo non ammesso.' }
  if (isIP(host) !== 0 && !isPublicAddress(host)) {
    return { ok: false, reason: 'Indirizzo non ammesso.' }
  }

  if (isIP(host) === 0) url.hostname = host
  url.hash = ''
  return { ok: true, url }
}

export function isPublicAddress(ip: string): boolean {
  const value = ip.trim().toLowerCase().replace(/^\[|\]$/g, '')
  if (value.includes('.')) {
    const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
    if (mapped) return isPublicV4(mapped[1])
  }
  if (value.includes(':')) return isPublicV6(value)
  return isPublicV4(value)
}

function isPublicV4(ip: string): boolean {
  const value = ipv4ToInt(ip)
  if (value === null) return false
  const blocked = [
    ['0.0.0.0', 8],
    ['10.0.0.0', 8],
    ['100.64.0.0', 10],
    ['127.0.0.0', 8],
    ['169.254.0.0', 16],
    ['172.16.0.0', 12],
    ['192.0.0.0', 24],
    ['192.0.2.0', 24],
    ['192.168.0.0', 16],
    ['198.18.0.0', 15],
    ['198.51.100.0', 24],
    ['203.0.113.0', 24],
    ['224.0.0.0', 4],
    ['240.0.0.0', 4],
  ] as const
  return !blocked.some(([base, bits]) => inCidr(value, base, bits))
}

function isPublicV6(ip: string): boolean {
  const words = expandV6(ip)
  if (!words) return false
  const [a, b, c, d, e, f, g, h] = words
  if (words.every(word => word === 0)) return false
  if ((a & 0xffc0) === 0xfe80) return false
  if ((a & 0xfe00) === 0xfc00) return false
  if ((a & 0xff00) === 0xff00) return false
  if ((a & 0xffc0) === 0xfec0) return false
  if (a === 0x2001 && b === 0x0db8) return false
  if (a === 0x2001 && b === 0x0002) return false
  if (a === 0x0064 && b === 0xff9b) return false
  if (a === 0x0100 && b === 0 && c === 0 && d === 0) return false
  if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0 && f === 0xffff) {
    return isPublicV4(intToIpv4(((g << 16) | h) >>> 0))
  }
  if (a === 0 && b === 0 && c === 0 && d === 0 && e === 0 && f === 0) {
    return isPublicV4(intToIpv4(((g << 16) | h) >>> 0))
  }
  return true
}

function isObfuscatedAddress(host: string): boolean {
  if (/^\d+$/.test(host) || /^0x[0-9a-f]+$/i.test(host)) return true
  return /^(\d+\.)+\d+$/.test(host) && isIP(host) === 0
}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  let value = 0
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null
    const octet = Number(part)
    if (octet > 255) return null
    value = ((value << 8) + octet) >>> 0
  }
  return value
}

function intToIpv4(value: number): string {
  return [24, 16, 8, 0].map(shift => (value >>> shift) & 255).join('.')
}

function inCidr(ip: number, base: string, bits: number): boolean {
  const start = ipv4ToInt(base)
  if (start === null) return false
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
  return (ip & mask) === (start & mask)
}

function expandV6(ip: string): number[] | null {
  const mapped = ip.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/)
  let value = ip
  if (mapped) {
    const v4 = ipv4ToInt(mapped[2])
    if (v4 === null) return null
    const high = ((v4 >>> 16) & 0xffff).toString(16)
    const low = (v4 & 0xffff).toString(16)
    value = `${mapped[1]}${high}:${low}`
  }

  const halves = value.split('::')
  if (halves.length > 2) return null
  const parse = (side: string) => {
    if (!side) return [] as number[]
    const parts = side.split(':')
    const words: number[] = []
    for (const part of parts) {
      if (!/^[0-9a-f]{1,4}$/i.test(part)) return null
      words.push(parseInt(part, 16))
    }
    return words
  }
  const left = parse(halves[0])
  if (!left) return null
  if (halves.length === 1) return left.length === 8 ? left : null
  const right = parse(halves[1] ?? '')
  if (!right) return null
  if (left.length + right.length > 7) return null
  return [...left, ...Array(8 - left.length - right.length).fill(0), ...right]
}
