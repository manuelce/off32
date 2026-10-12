const buckets = new Map<string, number[]>()

export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter(time => now - time < windowMs)
  if (hits.length >= limit) {
    buckets.set(key, hits)
    return false
  }
  hits.push(now)
  buckets.set(key, hits)
  if (buckets.size > 5000) {
    const oldest = buckets.keys().next().value
    if (oldest) buckets.delete(oldest)
  }
  return true
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'local'
  return request.headers.get('x-real-ip')?.trim() || 'local'
}
