export function track(event: string, extra?: Record<string, string | number>) {
  if (typeof window === 'undefined') return
  const view = window as Window & { dataLayer?: Array<Record<string, string | number>> }
  view.dataLayer = view.dataLayer || []
  view.dataLayer.push({ event, ...(extra ?? {}) })
}
