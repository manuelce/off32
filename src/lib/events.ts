import { WHATSAPP_INVITE_URL, PARTICIPATION_NOTE } from '@/lib/community'
import { fullstackCourse, FULLSTACK_PATH, FULLSTACK_SLUG } from '@/lib/fullstack-course'

/** Tipi di appuntamento della formazione OFF32. Per aggiungerne uno, aggiungi una voce a `events`. */
export type EventKind = 'meet-up' | 'seminario' | 'workshop' | 'corso'

export const EVENT_KIND_ORDER: EventKind[] = ['meet-up', 'seminario', 'workshop', 'corso']

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  'meet-up': 'Meet-up',
  seminario: 'Seminario',
  workshop: 'Workshop',
  corso: 'Corso',
}

export type Off32Event = {
  slug: string
  kind: EventKind
  title: string
  summary: string
  /** Giorno ISO (YYYY-MM-DD). Null se la data non è fissata. */
  date: string | null
  dateLabel: string | null
  /** Orario locale, es. "20:00". Null se non comunicato. */
  timeLabel: string | null
  /** Fuso IANA quando timeLabel è valorizzato. */
  timeZone: string | null
  /** Inizio ISO 8601 per i dati strutturati. Null se manca il giorno. */
  startDate: string | null
  /** Fine ISO 8601. Null se la fine non è pubblicata. */
  endDate?: string | null
  attendance: 'online' | null
  /** Piattaforma, es. "Google Meet". Non è un URL. */
  platform: string | null
  /**
   * URL pubblico della sessione (es. link Meet).
   * Null = non pubblicato: in pagina si usa PARTICIPATION_NOTE e l'invito WhatsApp.
   */
  sessionUrl: string | null
  venue: string | null
  duration: string | null
  format: string | null
  audience: string | null
  price: string | null
  status: 'upcoming' | 'past'
  /** Destinazione della CTA. Null = nessuna CTA. */
  href: string | null
  cta: string | null
  image?: string
  /** Testo alternativo dell'immagine, in italiano. */
  imageAlt?: string
  outcomes?: string[]
}

export const events: Off32Event[] = [
  {
    slug: 'meetup-2027-01-18',
    kind: 'meet-up',
    title: 'Ci conosciamo',
    summary:
      'Una semplice chiacchierata online: ci conosciamo, condividiamo e ci vediamo.',
    date: '2027-01-18',
    dateLabel: 'Lunedì 18 gennaio 2027',
    timeLabel: '20:00 – 22:00',
    timeZone: 'Europe/Rome',
    startDate: '2027-01-18T20:00:00+01:00',
    endDate: '2027-01-18T22:00:00+01:00',
    attendance: 'online',
    platform: 'Google Meet',
    sessionUrl: null,
    venue: null,
    duration: null,
    format: 'Online su Google Meet',
    audience: 'Community OFF32',
    price: null,
    status: 'upcoming',
    href: WHATSAPP_INVITE_URL,
    cta: 'Entra nella community',
    image: '/events/conosciamoci.jpg',
    imageAlt: 'Griglia di ritratti di persone che sorridono, immagine del meet-up Ci conosciamo.',
    outcomes: [PARTICIPATION_NOTE],
  },
  {
    slug: FULLSTACK_SLUG,
    kind: 'corso',
    title: fullstackCourse.project.name,
    summary: `${fullstackCourse.name}. Lezioni live su Meet: HTML, CSS, React, Next.js, TypeScript, Node.js, Supabase, Git, Vercel e AI.`,
    date: '2027-01-11',
    dateLabel: fullstackCourse.startLabel,
    timeLabel: null,
    timeZone: null,
    startDate: '2027-01-11',
    attendance: 'online',
    platform: 'Google Meet',
    sessionUrl: null,
    venue: null,
    duration: fullstackCourse.hoursLabel,
    format: `Lezioni live su Meet · ${fullstackCourse.weeks} settimane`,
    audience: `Principianti assoluti · max ${fullstackCourse.maxParticipants.value}`,
    price: fullstackCourse.price,
    status: 'upcoming',
    href: FULLSTACK_PATH,
    cta: 'Programma corso',
    image: '/events/agenda32.jpg',
    outcomes: [
      'Progetto: Agenda32, prenotazioni online adattabile a qualsiasi settore.',
      `Stack: ${fullstackCourse.stack.join(', ')}.`,
      `Prezzo del corso: ${fullstackCourse.price}.`,
      'Gli orari delle lezioni si concordano con i partecipanti prima della partenza.',
    ],
  },
  {
    slug: 'brand-identity-ai',
    kind: 'workshop',
    title: 'Brand identity con intelligenza artificiale',
    summary:
      'Ricerca, posizionamento e direzione visiva in una sessione. L’AI accelera i materiali. La decisione su cosa tenere resta del team.',
    date: null,
    dateLabel: null,
    timeLabel: null,
    timeZone: null,
    startDate: null,
    attendance: null,
    platform: null,
    sessionUrl: null,
    venue: null,
    duration: '4 ore',
    format: 'Studio o online',
    audience: 'Founder e brand manager',
    price: null,
    status: 'past',
    href: null,
    cta: null,
    image: '/events/brand.jpg',
    outcomes: [
      'Una frase di posizionamento che il team può usare subito',
      'Direzione visiva e verbale, non un logo isolato',
      'Un flusso di produzione con l’AI, revisionato da persone',
    ],
  },
]

export function eventBySlug(slug: string) {
  return events.find(event => event.slug === slug)
}

function byDate(a: Off32Event, b: Off32Event) {
  if (a.date && b.date) return a.date.localeCompare(b.date)
  if (a.date) return -1
  if (b.date) return 1
  return 0
}

export function upcomingEvents() {
  return events.filter(event => event.status === 'upcoming').sort(byDate)
}

export function pastEvents() {
  return events.filter(event => event.status === 'past')
}

export function nextAppointment() {
  return upcomingEvents()[0] ?? null
}

export function kindsInUse() {
  return EVENT_KIND_ORDER.filter(kind => events.some(event => event.kind === kind))
}

/** Online, senza URL pubblico della sessione e senza una pagina interna di iscrizione. */
export function detailsInCommunity(event: Off32Event) {
  return event.attendance === 'online' && !event.sessionUrl && !(event.href && event.href.startsWith('/'))
}

/** Data e orario. Non inventa sede, link della sessione o un orario mancante. */
export function eventWhen(event: Off32Event) {
  const parts = [
    event.dateLabel,
    event.timeLabel ? `ore ${event.timeLabel} (ora di Roma)` : null,
  ].filter(Boolean)
  return parts.join(' · ')
}
