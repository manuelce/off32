/** Fonte di verità del corso Full Stack. Voce con confirmed:false = non pubblicata in UI. */

export type Confirmable<T> = T & { confirmed: boolean }

export const FULLSTACK_SLUG = 'videocorso-fullstack-ai'
export const FULLSTACK_PATH = '/full-stack'

export const fullstackCourse = {
  slug: FULLSTACK_SLUG,
  path: FULLSTACK_PATH,
  name: 'Costruisci una piattaforma di prenotazioni con Next.js e AI',
  hero: {
    title: 'Scrivi codice. Lancia online.',
    badge: 'Pensato per chi parte da zero',
    /** Due righe sotto il titolo. */
    lines: [
      'Dalla prima riga di codice alla tua prima applicazione web.',
      'Costruisci una piattaforma di prenotazioni con Next.js e AI.',
    ] as const,
    techLine: '',
    /** Screenshot reale. Sostituisci con la UI del progetto corso quando disponibile. */
    visual: {
      src: '/events/agenda32.jpg',
      alt: 'Smartphone su tavolo con interfaccia mobile: menu e pulsante di prenotazione.',
    },
  },
  startLabel: 'Gennaio 2027',
  when: 'Dalla seconda settimana di gennaio 2027 · 5 settimane',
  weeks: 5,
  hours: 40,
  hoursLabel: '40 ore',
  price: '690 €',
  priceLabel: '690 € a partecipante',
  modality: 'Videolezioni live su Meet + esercitazioni + progetto finale',
  scheduleNote:
    'Orari flessibili: li concordiamo con i partecipanti prima della partenza.',
  audience: 'Principianti assoluti',
  stack: [
    'Next.js',
    'React',
    'TypeScript',
    'HTML',
    'CSS',
    'API e backend con Node.js',
    'Supabase (database e autenticazione)',
    'Git e GitHub',
    'Deploy su Vercel',
    'AI',
  ] as const,
  project: {
    title: 'La piattaforma che costruirai',
    name: 'Agenda32',
    summary:
      'Con Agenda32 gestisci profilo, servizi, calendario e prenotazioni online. Serve a freelancer e attività locali, e il progetto si adatta a qualsiasi settore: dalla consulenza alla cucina, dal salone allo studio.',
  },
  /** Video introduttivo. confirmed:false = sezione nascosta. Riattiva quando hai il video. */
  projectVideo: {
    src: '/agenda32.mp4',
    poster: '/events/agenda32.jpg',
    kicker: 'Il progetto',
    title: 'Ti mostriamo Agenda32',
    lead: 'Guarda come funziona la piattaforma che costruirai durante il corso.',
    confirmed: false,
  } satisfies Confirmable<{
    src: string
    poster: string
    kicker: string
    title: string
    lead: string
  }>,
  learningSteps: [
    {
      title: 'Fondamenti web e logica',
      body: 'HTML, CSS e le basi del linguaggio. Capisci come è fatta una pagina e come ragiona il codice.',
      outcome: 'Alla fine hai una pagina scritta da te e sai leggere struttura e stile.',
    },
    {
      title: 'Interfaccia con React e Next.js',
      body: 'Costruisci le schermate dell\'app: layout, componenti e navigazione.',
      outcome: 'Alla fine hai le schermate di Agenda32 collegate tra loro.',
    },
    {
      title: 'Logica applicativa e API',
      body: 'Colleghi il frontend al backend. Le richieste, le risposte e il flusso dei dati.',
      outcome: 'Alla fine hai API che fanno parlare frontend e backend.',
    },
    {
      title: 'Dati e login con Supabase',
      body: 'Database, autenticazione e salvataggio delle informazioni reali.',
      outcome: 'Alla fine hai login e prenotazioni salvate nel database.',
    },
    {
      title: 'AI, deploy su Vercel e progetto finale',
      body: 'Integri l\'AI nel prodotto, pubblichi online e chiudi il progetto.',
      outcome: 'Alla fine hai Agenda32 online su Vercel, con una feature AI.',
    },
  ] as const,
  instructor: {
    name: 'Manuel Cerasuolo',
    role: 'Digital project manager · full stack',
    bio: 'In OFF32 coordina prodotti digitali dall’idea al rilascio. Lavora su design, Next.js, React e AI nel flusso di lavoro.',
    href: '/about/manuel-cerasuolo',
    image: '/team/team-01.jpg',
    confirmed: true,
  } satisfies Confirmable<{
    name: string
    role: string
    bio: string
    href: string
    image: string
  }>,
  valuePoints: [
    {
      title: 'Parti da zero',
      body: 'Non serve aver già scritto codice. Ti accompagniamo dalla prima riga.',
    },
    {
      title: 'Logica end-to-end',
      body: 'Capisci come parlano frontend, backend e database, non pezzi isolati.',
    },
    {
      title: 'Un progetto da mostrare',
      body: 'Alla fine hai Agenda32 online: utile in portfolio e nei colloqui.',
    },
    {
      title: 'Metodo di lavoro',
      body: 'Git, deploy e AI nel flusso quotidiano: gli stessi gesti del lavoro reale.',
    },
  ] as const,
  whyOff32: [
    {
      title: 'Gruppo di 4',
      body: 'Posti limitati. Tempo reale per domande e revisione del tuo lavoro.',
    },
    {
      title: 'Supporto individuale',
      body: '1 ora di call personale a settimana per dubbi e chiarimenti.',
    },
    {
      title: 'Follow-up di 2 mesi',
      body: 'Dopo il corso restiamo disponibili mentre continui a costruire.',
    },
    {
      title: 'Pratica continua',
      body: 'PDF a fine lezione, esercizi ogni giorno, progetto passo dopo passo.',
    },
  ] as const,
  /** Non pubblicati finché confirmed resta false. */
  maxParticipants: { value: 4, confirmed: true } satisfies Confirmable<{ value: number }>,
  formatDetail: {
    value: 'Piccolo gruppo',
    confirmed: false,
  } satisfies Confirmable<{ value: string }>,
  prerequisites: { items: [] as string[], confirmed: false },
  inclusions: {
    items: [
      '40 ore di lezioni live',
      'PDF a fine di ogni lezione',
      'Esercizi da fare ogni giorno',
      '1 ora di call personale a settimana per dubbi e chiarimenti',
      'Follow-up di 2 mesi dopo il corso',
      'Progetto Agenda32 costruito passo dopo passo',
      'Stack Next.js, React, TypeScript, Supabase, Vercel e AI',
      'Gruppo ristretto, max 4 partecipanti',
    ] as string[],
    confirmed: true,
  },
  vat: { label: '', confirmed: false },
  tools: { items: [] as string[], confirmed: false },
  payment: { label: '', confirmed: false },
  aiFeature: {
    label: '',
    confirmed: false,
  },
  projectFeatures: [
    { label: 'Pagina del professionista (profilo, servizi, prezzi)', confirmed: true },
    { label: 'Calendario con scelta di data e orario', confirmed: true },
    { label: 'Form di prenotazione salvato su Supabase', confirmed: true },
    { label: 'Registrazione e login utente (Supabase Auth)', confirmed: true },
    { label: 'Area Le mie prenotazioni', confirmed: true },
    { label: 'Pubblicazione online su Vercel', confirmed: true },
  ] satisfies Confirmable<{ label: string }>[],
  faqs: [
    {
      q: 'Devo saper programmare?',
      a: 'No. Il percorso è pensato per principianti assoluti. Si parte dalle basi.',
      confirmed: true,
    },
    {
      q: 'Cosa sviluppiamo?',
      a: 'Agenda32: profilo, servizi, calendario e prenotazioni online. Il progetto si adatta a qualsiasi settore: freelancer, consulenza, food, beauty e oltre.',
      confirmed: true,
    },
    {
      q: 'Quali tecnologie usiamo?',
      a: 'Next.js, React, TypeScript, HTML, CSS, Node.js, Supabase, Git, GitHub, Vercel e AI.',
      confirmed: true,
    },
    {
      q: 'Quanto dura?',
      a: '40 ore in 5 settimane, a partire dalla seconda settimana di gennaio 2027.',
      confirmed: true,
    },
    {
      q: 'Quali sono gli orari?',
      a: 'Flessibili. Li concordiamo con i partecipanti prima della partenza.',
      confirmed: true,
    },
    {
      q: 'Come mi iscrivo?',
      a: 'Compila la candidatura in fondo alla pagina. Ti ricontattiamo noi.',
      confirmed: true,
    },
    {
      q: 'Cosa è incluso?',
      a: '40 ore live, PDF a fine lezione, esercizi quotidiani, 1 ora di call personale a settimana, follow-up di 2 mesi dopo il corso, progetto Agenda32 e stack completo. Gruppo max 4.',
      confirmed: true,
    },
    {
      q: 'Posso adattare il progetto a una mia idea?',
      a: '',
      confirmed: false,
    },
  ] satisfies Confirmable<{ q: string; a: string }>[],
  seo: {
    title: 'Corso Full Stack Next.js e AI',
    description:
      'Corso Full Stack per principianti: costruisci una piattaforma di prenotazioni con Next.js, React, TypeScript, Supabase e AI. Partenza gennaio 2027, 40 ore, 690 €. Max 4 partecipanti.',
  },
  cta: {
    finalTitle: 'Entra nel corso Full Stack e costruisci Agenda32.',
    finalAccent: 'Full Stack',
    finalBody: 'Una email, un messaggio, una call. Ci conosciamo e partiamo.',
    primary: 'Candidati al corso',
    call: 'Candidati al corso',
    finalPoints: [
      'Max 4 partecipanti',
      'PDF, esercizi e 1 ora di call personale a settimana',
      'Follow-up di 2 mesi dopo il corso',
    ] as const,
  },
  form: {
    levels: ['Principiante assoluto', 'Ho provato un po\' da solo', 'Ho già qualche base'] as const,
    schedules: ['Mattina', 'Pomeriggio', 'Sera', 'Flessibile'] as const,
  },
} as const

export function confirmedItems<T extends { confirmed: boolean }>(items: readonly T[]): T[] {
  return items.filter(item => item.confirmed)
}

export function isConfirmed<T extends { confirmed: boolean }>(item: T): boolean {
  return item.confirmed
}
