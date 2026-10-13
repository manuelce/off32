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
    slug: 'videocorso-fullstack-ai',
    index: '02',
    tag: 'Web',
    kind: 'Corsi',
    topic: 'Full-stack',
    title: 'Videocorso full stack Web Development con AI',
    desc: 'Percorso pratico e individuale, da 0 a sviluppatore full stack. Videolezioni live su Meet, esercitazioni e un progetto finale.',
    duration: '35 ore',
    format: 'Videolezioni live su Meet + esercitazioni + progetto finale',
    level: 'Junior / Intermediate',
    audience: 'Junior / Intermediate',
    price: '690€',
    when: 'Dalla seconda settimana di gennaio 2027 · 5 settimane',
    status: 'upcoming',
    outcomes: [
      'Corso individuale.',
      'Stack: HTML, CSS, JavaScript, React, Node.js, Supabase.',
      'Prezzo del corso: 690€.',
    ],
  },
]

export function workshopBySlug(slug: string) {
  return workshops.find(workshop => workshop.slug === slug)
}
