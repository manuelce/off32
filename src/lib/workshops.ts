import { eventBySlug } from '@/lib/events'

/** Compatibilità con il form contatti: prenotazione via ?corso=slug. */
export function workshopBySlug(slug: string) {
  const event = eventBySlug(slug)
  if (!event) return undefined
  return {
    slug: event.slug,
    title: event.title,
    format: event.format ?? '',
  }
}
