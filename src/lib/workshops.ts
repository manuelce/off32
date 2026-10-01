export type Workshop = {
  slug: string
  index: string
  tag: string
  kind: 'Workshop' | 'Corsi' | 'Talk'
  title: string
  desc: string
  duration: string
  format: string
  level: string
  audience: string
  outcomes: string[]
}

export const workshops: Workshop[] = [
  {
    slug: 'brand-identity-ai',
    index: '01',
    tag: 'Brand',
    kind: 'Workshop',
    title: 'Brand identity con intelligenza artificiale',
    desc: 'Ricerca, posizionamento e direzione visiva in una sessione. L\'AI accelera i materiali. La decisione su cosa tenere resta del team.',
    duration: '4 ore',
    format: 'Studio o online',
    level: 'Intermedio',
    audience: 'Founder e brand manager',
    outcomes: [
      'Una frase di posizionamento che il team può usare subito',
      'Direzione visiva e verbale, non un logo isolato',
      'Un flusso di produzione con l\'AI, revisionato da persone',
    ],
  },
  {
    slug: 'design-system',
    index: '02',
    tag: 'Web',
    kind: 'Corsi',
    title: 'Design system e prototipazione rapida',
    desc: 'Dalla moodboard a un prototipo cliccabile. Costruiamo componenti, regole e un modo di lavorare che il team riesce a ripetere da solo.',
    duration: 'Giornata intera',
    format: 'In studio',
    level: 'Base / intermedio',
    audience: 'Designer e team di prodotto',
    outcomes: [
      'Una libreria minima di componenti riutilizzabili',
      'Un prototipo da mostrare a clienti o stakeholder',
      'Checklist di handoff tra design e sviluppo',
    ],
  },
  {
    slug: 'campagne-ai',
    index: '03',
    tag: 'Marketing',
    kind: 'Corsi',
    title: 'Campagne performanti con AI creative',
    desc: 'Come produrre varianti, testarle e tenere solo quelle che convertono. Meta e Google, con l\'AI nel flusso creativo e non al posto della strategia.',
    duration: '3 ore',
    format: 'Online',
    level: 'Avanzato',
    audience: 'Marketing manager e media buyer',
    outcomes: [
      'Una struttura di test creativi per le prossime due settimane',
      'Copy e formati da mettere in campagna il giorno dopo',
      'Criteri per fermare ciò che non funziona',
    ],
  },
  {
    slug: 'comunicazione-performance',
    index: '04',
    tag: 'Strategy',
    kind: 'Talk',
    title: 'Comunicazione orientata alla performance',
    desc: 'Allineare offerta, messaggio e numeri. Un framework breve per chi deve decidere cosa dire, dove dirlo e come capire se ha funzionato.',
    duration: '2 ore',
    format: 'Online o in azienda',
    level: 'Tutti i livelli',
    audience: 'Imprenditori e team interni',
    outcomes: [
      'Mappa di messaggi per i canali che usate già',
      'Tre metriche da guardare, non una dashboard infinita',
      'Piano delle prossime quattro settimane',
    ],
  },
]

export function workshopBySlug(slug: string) {
  return workshops.find(workshop => workshop.slug === slug)
}
