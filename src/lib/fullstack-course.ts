/** Fonte di verità del corso Full Stack. Voce con confirmed:false = non pubblicata in UI. */

export type Confirmable<T> = T & { confirmed: boolean }

export const FULLSTACK_SLUG = 'videocorso-fullstack-ai'
export const FULLSTACK_PATH = '/full-stack'

export const fullstackCourse = {
  slug: FULLSTACK_SLUG,
  path: FULLSTACK_PATH,
  name: 'Costruisci una piattaforma di prenotazioni con Next.js e AI',
  hero: {
    badge: 'Per chi parte da zero',
    title: 'In 5 settimane, costruisci e pubblica la tua prima web app full stack con l’AI.',
    lead:
      'Un percorso live di 40 ore in cui sviluppi Agenda32 con Next.js, React e Supabase, con supporto individuale e un gruppo di massimo 4 persone.',
    ctaNote: 'Scopri il metodo e verifica se il corso fa per te.',
    /** Demo Agenda32 nel mockup browser della hero. */
    visual: {
      src: '/agenda32-demo-wow_small.mp4',
      poster: '/events/agenda32.jpg',
      alt: 'Demo di Agenda32: piattaforma di prenotazioni costruita nel corso Full Stack.',
    },
  },
  startLabel: '11 gennaio 2027',
  enrollByLabel: '20 dicembre',
  enrollByNote: 'Iscrizioni entro il 20 dicembre',
  when: 'Dal 11 gennaio 2027 · 5 settimane',
  weeks: 5,
  hours: 40,
  hoursLabel: '40 ore',
  price: '690 €',
  priceLabel: '690 € prezzo di lancio',
  priceNote: '690 € è il prezzo di lancio di questa edizione, anche in 3 rate.',
  paymentNote: 'Puoi pagare in 3 rate senza costi aggiuntivi.',
  modality: 'Videolezioni live su Meet + esercitazioni + progetto finale',
  scheduleNote:
    'Orari flessibili: li concordiamo con i partecipanti prima della partenza.',
  audience: 'Principianti assoluti',
  freeLesson: {
    title: 'Lezione gratuita di 1 ora',
    body: 'Prima di iscriverti facciamo una lezione gratis: ti spieghiamo il corso, lo stack e se fa per te. Zero impegno.',
  },
  forWho: {
    kicker: 'Per chi è',
    title: 'Da zero al risultato',
    lead: 'Il corso è pensato per chi non ha ancora scritto codice. Alla fine non hai solo esercizi: hai una trasformazione spendibile.',
    audienceTitle: 'Questo corso è per te se',
    points: [
      {
        title: 'Principianti assoluti',
        body: 'Non serve esperienza. Si parte dalle basi e si avanza passo dopo passo.',
      },
      {
        title: 'Chi vuole un progetto concreto',
        body: 'Costruisci Agenda32: profilo, prenotazioni, login e deploy su Vercel.',
      },
      {
        title: 'Chi cerca un metodo, non solo teoria',
        body: 'Lezioni live, esercizi ogni giorno, call individuali e follow-up dopo il corso.',
      },
      {
        title: 'Chi vuole lavorare con lo stack reale',
        body: 'Next.js, React, TypeScript, Node.js, Supabase, Git e AI: gli stessi strumenti del lavoro.',
      },
    ] as const,
    outcomesTitle: 'Cosa sai fare dopo',
    outcomes: [
      'Costruire e pubblicare una web app per un tuo cliente o progetto',
      'Avere le basi per iniziare a lavorare a progetti web come freelance o junior',
      'Gestire frontend, backend, database e deploy in un unico flusso',
      'Usare Git, Vercel e AI nel lavoro quotidiano sullo stack reale',
    ] as const,
  },
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
    role: 'Digital project manager / full stack',
    bio: 'Da oltre 10 anni costruisce prodotti digitali tra design, sviluppo, e-commerce, piattaforme e web/app. In OFF32 coordina progetti web e digital product dall’idea al delivery, e lavora full stack su Next.js, React, JavaScript e AI nel flusso di lavoro quotidiano.',
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
  /** Feedback alunni (fonte: manuelcerasuolo.com). Niente recensioni aziendali. image = /feedback/... se presente. */
  testimonials: [
    {
      name: 'Sara',
      role: 'Allieva / React / Node',
      avatar: '#e85d9a',
      source: 'superprof' as const,
      quote:
        'Mi sono trovata benissimo con Manuel. Disponibile, competente e sempre pronto ad aiutare. Risultato oltre le aspettative. Lo consiglio vivamente.',
    },
    {
      name: 'Giovanni',
      role: 'Allievo / Sviluppo web/app',
      avatar: '#0D0D0D',
      image: '/feedback/feedbackGiovanni.jpg',
      source: 'superprof' as const,
      quote:
        'Mi ha aiutato a fissare obiettivi realistici, spiegandomi cosa posso raggiungere e in quanto tempo, senza vendere illusioni. Onestà e trasparenza nel metodo.',
    },
    {
      name: 'Raffaella',
      role: 'Allieva / AI / React / JavaScript',
      avatar: '#c45c8a',
      source: 'superprof' as const,
      quote:
        'Ottimo insegnante: chiaro e semplice nello spiegare i concetti, sempre ben organizzato. Consigliatissimo per chi vuole imparare o approfondire.',
    },
    {
      name: 'Paolo',
      role: 'Allievo / Formazione',
      avatar: '#2f6fed',
      source: 'superprof' as const,
      quote:
        'Fin dalle prime lezioni colpisce la competenza maturata negli anni, trasmessa in modo chiaro e organizzato, in base al proprio livello di partenza.',
    },
    {
      name: 'Emanuele',
      role: 'Allievo / HTML & JavaScript',
      avatar: '#694aff',
      source: 'google' as const,
      quote:
        'Insegnante super disponibile, paziente e preparato. Concetti e strutture di HTML e JavaScript spiegati in modo semplice e divertente. Super consigliato.',
    },
    {
      name: 'Chiara',
      role: 'Allieva / Coding AI',
      avatar: '#fe3812',
      image: '/feedback/feedbackchiara.jpg',
      source: 'google' as const,
      quote: 'Paziente, attento e preciso. Ottimo insegnante. Super raccomandato.',
    },
    {
      name: 'Annamaria',
      role: 'Allieva / Formazione',
      avatar: '#e85d9a',
      image: '/feedback/feedbackannamaria.jpg',
      source: 'superprof' as const,
      quote: 'Professionista molto disponibile e competente.',
    },
    {
      name: 'Victoria',
      role: 'Allieva / WordPress',
      avatar: '#e85d9a',
      image: '/feedback/feedbackVictoria.jpg',
      source: 'google' as const,
      quote:
        'Esperienza super positiva. Ha capito le mie esigenze e ha trasformato le idee in un sito chiaro, professionale e ben strutturato. Lo consiglio assolutamente.',
    },
    {
      name: 'Sofia',
      role: 'Allieva / HTML & CSS',
      avatar: '#c9a227',
      image: '/feedback/sofia-gonzalez.jpg',
      source: 'google' as const,
      quote:
        'Manuel mi ha aiutato a creare un sito da zero: è stato efficace, disponibile e molto alla mano. Lo consiglio vivamente.',
    },
    {
      name: 'Domenico',
      role: 'Allievo / Sviluppo web',
      avatar: '#1a9f5c',
      source: 'superprof' as const,
      quote:
        'Insegnante davvero molto empatico, paziente e preparato. Sto imparando molto sullo sviluppo di siti web. Consigliatissimo.',
    },
    {
      name: 'Ilaria',
      role: 'Allieva / WordPress',
      avatar: '#fe3812',
      image: '/feedback/feedbackIlaria.jpg',
      source: 'google' as const,
      quote:
        'Manuel è molto preparato. Grazie alle sue spiegazioni chiare mi ha aiutata a capire meglio WordPress e a superare la paura della programmazione. Super consigliato.',
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
  payment: {
    label: '690 € prezzo di lancio · anche in 3 rate',
    detail: 'Prezzo di lancio di questa edizione, pagabile in 3 rate senza costi aggiuntivi.',
    confirmed: true,
  } satisfies Confirmable<{ label: string; detail: string }>,
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
      a: '40 ore in 5 settimane, a partire dall’11 gennaio 2027.',
      confirmed: true,
    },
    {
      q: 'Quali sono gli orari?',
      a: 'Flessibili. Li concordiamo con i partecipanti prima della partenza.',
      confirmed: true,
    },
    {
      q: 'Posso pagare a rate?',
      a: 'Sì. Il corso costa 690 € (prezzo di lancio di questa edizione) e puoi pagarlo in 3 rate, senza costi aggiuntivi.',
      confirmed: true,
    },
    {
      q: 'C’è una lezione gratuita?',
      a: 'Sì. Prima di iscriverti facciamo 1 ora gratis per spiegarti il corso e capire se fa per te. Nessun impegno.',
      confirmed: true,
    },
    {
      q: 'Come mi iscrivo?',
      a: 'Compila la candidatura in fondo alla pagina. Ti ricontattiamo noi e, prima di iscriverti, facciamo la lezione gratuita di 1 ora.',
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
      'Corso Full Stack per principianti: Agenda32 con Next.js, React, TypeScript, Supabase e AI. Dal 11 gennaio 2027, 40 ore, 690 € prezzo di lancio anche in 3 rate. Lezione gratuita di 1 ora. Max 4 posti.',
    image: {
      url: '/workshop/corso.png',
      alt: 'Corso Full Stack OFF32: Agenda32 con Next.js, React e AI.',
    },
  },
  offer: {
    kicker: 'Il risultato',
    title: 'A fine corso hai una web app online sul tuo dominio che puoi usare con i tuoi clienti.',
    lead: 'In 5 settimane e 40 ore: un prodotto pubblicato, pronto da mostrare e da usare.',
    visual: {
      src: '/agenda32-demo-wow_small.mp4',
      poster: '/events/agenda32.jpg',
      alt: 'Agenda32 online: interfaccia di prenotazione pronta da usare con i clienti.',
      url: 'agenda32.off32.it',
    },
  },
  cta: {
    finalTitle: 'Entra nel corso Full Stack e costruisci Agenda32.',
    finalAccent: 'Full Stack',
    finalBody:
      'Prenota la lezione gratuita di 1 ora: ti spieghiamo il corso. Poi, se vuoi, parti l’11 gennaio a 690 € (prezzo di lancio).',
    primary: 'Prenota la tua lezione gratuita',
    call: 'Prenota la tua lezione gratuita',
    finalPoints: [
      '5 settimane / 40 ore live',
      '690 € prezzo di lancio · anche in 3 rate',
      'Iscrizioni entro il 20 dicembre · max 4 posti',
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
