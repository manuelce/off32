/** True only for the Vercel alias (and preview hosts). The production domain is never matched. */
export function isVercelAppHost(host: string | null | undefined): boolean {
  if (!host) return false
  const hostname = host
    .trim()
    .split(',')[0]
    .trim()
    .replace(/\.$/, '')
    .split(':')[0]
    .toLowerCase()
  return hostname.endsWith('.vercel.app')
}
