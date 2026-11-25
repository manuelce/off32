import type { Metadata } from 'next'
import { EventsJsonLd } from '@/components/ServiceJsonLd'
import { events } from '@/lib/events'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Corsi',
  'Corsi OFF32: programmazione, design e IA, e la community WhatsApp. Agenda32 parte l’11 gennaio 2027, 40 ore in 5 settimane, live su Meet.',
  '/workshop',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventsJsonLd events={events.filter(event => event.kind !== 'meet-up')} />
      {children}
    </>
  )
}
