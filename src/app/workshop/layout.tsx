import type { Metadata } from 'next'
import { EventsJsonLd } from '@/components/ServiceJsonLd'
import { events } from '@/lib/events'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Eventi',
  'Meet-up, seminari, workshop e corsi OFF32, e la community WhatsApp. Il meet-up del 23 novembre 2026 è online su Google Meet alle 20:00 (ora di Roma).',
  '/workshop',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EventsJsonLd events={events} />
      {children}
    </>
  )
}
