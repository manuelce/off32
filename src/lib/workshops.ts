import { fullstackCourse, FULLSTACK_PATH, FULLSTACK_SLUG } from '@/lib/fullstack-course'

export type Workshop = {
  slug: string
  index: string
  tag: string
  kind: 'Workshop' | 'Corsi' | 'Talk'
  topic: 'Full-stack' | 'Design' | 'E-commerce'
  title: string
  desc: string
  duration: string
  format: string
  level: string
  audience: string
  outcomes: string[]
  status: 'upcoming' | 'past'
  price?: string
  when?: string
  free?: boolean
  /** Se presente, la CTA apre questa route invece del dialog. */
  landingHref?: string
}

export const workshops: Workshop[] = [
  {
    slug: 'brand-identity-ai',
    index: '01',
    tag: 'Brand',
    kind: 'Workshop',
    topic: 'Design',
    title: 'Brand identity con intelligenza artificiale',
    desc: 'Ricerca, posizionamento e direzione visiva in una sessione. L\'AI accelera i materiali. La decisione su cosa tenere resta del team.',
    duration: '4 ore',
    format: 'Studio o online',
    level: 'Intermedio',
    audience: 'Founder e brand manager',
    status: 'past',
    outcomes: [
      'Una frase di posizionamento che il team può usare subito',
      'Direzione visiva e verbale, non un logo isolato',
      'Un flusso di produzione con l\'AI, revisionato da persone',
    ],
  },
  {
    slug: FULLSTACK_SLUG,
    index: '02',
    tag: 'Web',
    kind: 'Corsi',
    topic: 'Full-stack',
    title: fullstackCourse.project.name,
    desc: `${fullstackCourse.name}. Imparerai HTML, CSS, React, Next.js, TypeScript, Node.js, Supabase, Git, Vercel e AI.`,
    duration: fullstackCourse.hoursLabel,
    format: 'Live su Meet · esercitazioni · progetto finale',
    level: 'Principianti assoluti',
    audience: `Principianti assoluti · max ${fullstackCourse.maxParticipants.value}`,
    price: '690€',
    when: `${fullstackCourse.startLabel} · ${fullstackCourse.weeks} settimane`,
    status: 'upcoming',
    landingHref: FULLSTACK_PATH,
    outcomes: [
      'Progetto: Agenda32, piattaforma di prenotazioni per professionisti locali.',
      `Stack: ${fullstackCourse.stack.join(', ')}.`,
      `Prezzo del corso: ${fullstackCourse.price}.`,
    ],
  },
]

export function workshopBySlug(slug: string) {
  return workshops.find(workshop => workshop.slug === slug)
}
