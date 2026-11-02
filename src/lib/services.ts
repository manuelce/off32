/** Catalogo servizi OFF32: hub + pagine leaf per SEO e routing. */

export type ServiceFaq = { q: string; a: string }

export type ServiceSection = { heading: string; body: string[] }

export type ServicePage = {
  slug: string
  area: ServiceAreaSlug
  label: string
  keyword: string
  secondaryKeywords: string[]
  title: string
  description: string
  h1: string
  lead: string
  /** Intro a 2 colonne (layout Brand & Creative). */
  brandColumns?: { left: string[]; right: string[] }
  sections: ServiceSection[]
  faqs: ServiceFaq[]
  relatedSlugs: string[]
  workHref: string
  workLabel: string
  blogHref: string
  blogLabel: string
}

export type ServiceAreaSlug = 'brand-creative' | 'web-digital' | 'ai-systems'

export type ServiceArea = {
  slug: ServiceAreaSlug
  label: string
  shortLabel: string
  keyword: string
  title: string
  description: string
  h1: string
  lead: string
  sections: ServiceSection[]
  serviceSlugs: string[]
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: 'brand-creative',
    label: 'Brand & Creative',
    shortLabel: 'Brand & Creative',
    keyword: 'agenzia branding e creatività',
    title: 'Brand & Creative: identità e strategia di marca',
    description:
      'Costruiamo brand riconoscibili: identità visiva, strategia, direzione creativa e contenuti. Scopri come lavoriamo.',
    h1: 'Brand & Creative: identità e strategia di marca',
    lead:
      'In OFF32 il brand non è un logo isolato. È la promessa che fai ogni giorno a chi ti sceglie: posizione, linguaggio visivo, tono e contenuti che restano coerenti quando cambiano sito, campagne e team.',
    sections: [
      {
        heading: 'Brand & Creative',
        body: [
          'La brand identity è il modo in cui un’azienda si fa riconoscere: segni, colori, tipografia e regole che restano coerenti quando cambiano sito, campagne e team. Non è solo un logo. È il sistema visivo e verbale con cui le persone capiscono chi sei, anche senza leggere il nome.',
          'Intorno all’identity ruotano le altre skill: Creative Direction per tenere insieme campagne e touchpoint, Copywriting per testi che convertono (landing, email, claim, script) senza perdere voce di marca, Content Creation per visual, caroselli e asset pubblicabili su canali diversi.',
          'Lavoriamo con founder, brand manager e team marketing che stanno lanciando, riposizionando o allineando comunicazione e prodotto. Il risultato non è un file da archiviare: è un sistema ripetibile, con regole, messaggi e riferimenti che il team può usare senza ricominciare da zero ogni volta.',
        ],
      },
    ],
    serviceSlugs: [
      'brand-identity',
      'creative-direction',
      'ai-copywriting',
      'content-creation',
    ],
  },
  {
    slug: 'web-digital',
    label: 'Web & Digital',
    shortLabel: 'Web & Digital',
    keyword: 'agenzia web design e sviluppo',
    title: 'Web & Digital: siti, e-commerce e performance',
    description:
      'Siti web, e-commerce e landing page veloci, belli e pensati per convertire. Design e sviluppo sotto lo stesso tetto.',
    h1: 'Web & Digital: siti, e-commerce e performance',
    lead:
      'Progettiamo e sviluppiamo esperienze digitali che devono funzionare: sul telefono, in campagna, al checkout. Design e codice stanno nello stesso flusso, così non si perde nulla tra mockup e release.',
    sections: [
      {
        heading: 'Design e sviluppo insieme',
        body: [
          'Non passiamo un file e aspettiamo. Wireframe, interfaccia, stack e deploy dialogano dallo stesso tavolo. Così velocità, SEO e conversione non sono pezzi aggiunti alla fine.',
          'Usiamo stack moderni (Next.js, React e tool di prodotto) quando servono performance e controllo; su e-commerce valutiamo anche Shopify se è la scelta più sostenibile.',
        ],
      },
      {
        heading: 'Cosa ottieni',
        body: [
          'Un sito o un negozio online chiaro, misurabile e manutenibile. Con priorità sulle azioni che contano: contatto, acquisto, lead, prenotazione.',
        ],
      },
    ],
    serviceSlugs: [
      'web-design-sviluppo',
      'ecommerce',
      'landing-pages',
      'performance-seo',
    ],
  },
  {
    slug: 'ai-systems',
    label: 'AI Systems',
    shortLabel: 'AI Systems',
    keyword: 'AI per aziende',
    title: 'AI Systems: automazioni e agenti AI',
    description:
      'Integriamo l’intelligenza artificiale nei processi della tua azienda: automazioni, agenti e workflow.',
    h1: 'AI Systems: automazioni e agenti AI',
    lead:
      'L’AI in OFF32 non è una moda da mettere in homepage. È un modo per togliere lavoro ripetitivo e lasciare tempo a decisioni, creatività e relazioni. Partiamo dai processi, non dagli strumenti.',
    sections: [
      {
        heading: 'Dal bisogno allo stack',
        body: [
          'Mappiamo dove perdi tempo o qualità: email, preventivi, CRM, contenuti, supporto. Poi scegliamo automazioni, agenti o integrazioni API con criteri di ROI, privacy e manutenibilità.',
          'Lavoriamo con team non tecnici e con team prodotto: documentazione chiara, handover e controlli su dati e accessi.',
        ],
      },
      {
        heading: 'Cosa significa “sistema”',
        body: [
          'Un pezzo AI isolato si spegne dopo la demo. Un sistema tiene insieme trigger, dati, supervisione umana e metriche. È questo che progettiamo.',
        ],
      },
    ],
    serviceSlugs: [
      'ai-automation',
      'ai-agents',
      'ai-workflows',
      'ai-integration',
    ],
  },
]

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'brand-identity',
    area: 'brand-creative',
    label: 'Brand Identity',
    keyword: 'brand identity design',
    secondaryKeywords: ['logo e identità visiva', 'restyling del brand', 'brand guidelines'],
    title: 'Brand Identity: logo e identità visiva',
    description:
      'Progettiamo logo, palette, tipografia e linee guida. Un’identità chiara, usabile dal team e riconoscibile nel tempo.',
    h1: 'Brand Identity: logo e identità visiva che restano',
    lead:
      'La brand identity è il sistema visivo con cui il tuo brand si fa riconoscere. In OFF32 non consegniamo solo un marchio: costruiamo regole semplici (logo, colori, tipografia, spaziature, esempi di applicazione) perché il team possa usarle senza chiedere ogni volta “va bene così?”.',
    brandColumns: {
      left: [
        'La brand identity è il sistema visivo con cui il tuo brand si fa riconoscere. In OFF32 non consegniamo solo un marchio: costruiamo regole semplici (logo, colori, tipografia, spaziature, esempi di applicazione) perché il team possa usarle senza chiedere ogni volta “va bene così?”.',
        'Partiamo da briefing e ricerca: mercato, competitor, pubblico, toni da evitare. Definiamo direzione (1 o 2 concept) e raffiniamo il segno principale. Poi costruiamo il sistema: palette, tipografia, griglia, usi su digitale e stampa.',
      ],
      right: [
        'Il restyling del brand segue lo stesso metodo, ma con un vincolo in più: cosa tenere della storia già riconosciuta e cosa lasciare. Non cancelliamo per moda: togliamo ciò che confonde.',
        'Alla fine chiediamo una prova semplice: togli il nome e resta riconoscibile? Il team sa applicare le regole senza interpretazioni infinite? Se sì, l’identità tiene. Se no, raffiniamo ancora. Spesso colleghiamo il lavoro a un progetto web o a una campagna, così il sistema nasce già collaudato su superfici reali, non solo su una tavola bella.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Logo primario e versioni ridotte, palette cromatica con valori d’uso, tipografia e gerarchie, esempi su sito, social e carta intestata, brand guidelines in PDF o Figma. Su richiesta: kit export e template base.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Che differenza c’è tra logo e brand identity?',
        a: 'Il logo design definisce il segno che identifica il brand. La brand identity è il sistema che lo rende riconoscibile: colori, tipografia, elementi grafici e regole di utilizzo. Il progetto mette in relazione questi elementi per dare coerenza al sito web, ai social e ai materiali di comunicazione.',
      },
      {
        q: 'Cosa comprende un progetto di brand identity con OFF32?',
        a: 'Partiamo dagli obiettivi, dal pubblico e dal posizionamento del brand per definire una direzione visiva. Il progetto può comprendere logo design e varianti, palette colori, tipografia, elementi grafici e un manuale di utilizzo. Attività e materiali vengono concordati in base alle esigenze della tua azienda.',
      },
      {
        q: 'Potete rinnovare un’identità visiva esistente?',
        a: 'Sì. Possiamo intervenire su un’identità visiva esistente, mantenendo gli elementi riconoscibili e aggiornando quelli che non rappresentano più il brand. Insieme valutiamo se serve un restyling mirato o un ripensamento più ampio, in base agli obiettivi e ai cambiamenti dell’attività.',
      },
      {
        q: 'Quanto costa un progetto di brand identity?',
        a: 'Il costo dipende dal punto di partenza, dalla complessità del progetto e dai materiali da realizzare. La creazione di un nuovo brand e il restyling di un’identità visiva esistente richiedono attività diverse. Dopo un primo confronto, prepariamo una proposta con ambito di lavoro, fasi e costi.',
      },
      {
        q: 'Quanto tempo serve per creare una brand identity?',
        a: 'Le tempistiche dipendono dalle attività previste, dai materiali richiesti e dai momenti di confronto. Prima di iniziare definiamo un calendario con le principali fasi del progetto, dalla direzione creativa alla consegna finale, includendo i passaggi di revisione concordati.',
      },
      {
        q: 'Quali file e linee guida riceverò alla consegna?',
        a: 'La consegna comprende i materiali previsti nella proposta: file del logo nei formati concordati per web e stampa, varianti e indicazioni su colori e tipografia. Le linee guida e le brand guidelines spiegano come utilizzare l’identità visiva per mantenere una comunicazione coerente sui diversi canali.',
      },
    ],
    relatedSlugs: ['creative-direction', 'content-creation'],
    workHref: '/work/duel',
    workLabel: 'The Duel',
    blogHref: '/blog/come-costruire-brand-digitale',
    blogLabel: 'Come costruire un brand digitale che dura',
  },
  {
    slug: 'creative-direction',
    area: 'brand-creative',
    label: 'Creative Direction',
    keyword: 'direzione creativa',
    secondaryKeywords: ['art direction', 'concept creativo', 'campagne visive'],
    title: 'Creative Direction: concept e campagne',
    description:
      'Concept, art direction e campagne coerenti con il brand. Coordinamento creativo tra team, fornitori e canali.',
    h1: 'Creative Direction: concept e campagne',
    lead:
      'La direzione creativa tiene insieme idea e esecuzione. Serve quando hai molti pezzi (shooting, social, landing, stampa) e non vuoi che ognuno inventi un brand diverso.',
    brandColumns: {
      left: [
        'La direzione creativa tiene insieme idea e esecuzione. Serve quando hai molti pezzi (shooting, social, landing, stampa) e non vuoi che ognuno inventi un brand diverso.',
        'Interveniamo su lancio prodotto, rebrand, campagna stagionale o rifacimento del mondo visivo su più canali, quando manca un filo rosso tra concept e deliverable quotidiani.',
      ],
      right: [
        'Lavoriamo con art direction concreta: mood, riferimenti, regole di composizione, brief per fotografi, motion e media. Traduciamo la strategia in un concept chiaro, poi orchestriamo le produzioni.',
        'Il team interno resta owner; noi teniamo coerenza e qualità delle decisioni creative. Se serve, colleghiamo la direzione a brand identity e content creation, così la campagna non è un’isola.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Concept e moodboard, art direction, brief di produzione, supervisione creativa su shooting e asset multi-canale, linee guida di campagna. L’obiettivo è riconoscibilità, non rumore.',
        ],
      },
    ],
    faqs: [
      {
        q: 'È diverso dalla brand identity?',
        a: 'La brand identity fissa il sistema visivo. La direzione creativa lo applica a campagne, racconti e produzioni nel tempo, mantenendo coerenza tra i touchpoint.',
      },
      {
        q: 'Cosa comprende un progetto di creative direction con OFF32?',
        a: 'Concept, art direction, brief per team e fornitori, e se serve il follow-through sulle produzioni. Attività e materiali si concordano in base a canali e obiettivi della campagna.',
      },
      {
        q: 'Potete gestire solo il concept?',
        a: 'Sì. Possiamo fermarci al concept e al brief, oppure seguire anche shooting, motion e adattamenti multi-canale.',
      },
      {
        q: 'Lavorate con fornitori esterni?',
        a: 'Sì: fotografi, video maker, media. Forniamo brief, riferimenti e controllo creativo per tenere tutto allineato al brand.',
      },
      {
        q: 'Quanto tempo serve per una campagna?',
        a: 'Da poche settimane a un percorso continuo, in base a canali, volumi di asset e momenti di revisione concordati.',
      },
      {
        q: 'Quanto costa la direzione creativa?',
        a: 'Dipende dall’ampiezza del concept, dal numero di produzioni e dal livello di supervisione. Dopo un primo confronto prepariamo una proposta chiara.',
      },
    ],
    relatedSlugs: ['brand-identity', 'content-creation'],
    workHref: '/work/duel',
    workLabel: 'The Duel',
    blogHref: '/blog/scegliere-clienti-giusti',
    blogLabel: 'Quando una collaborazione funziona',
  },
  {
    slug: 'ai-copywriting',
    area: 'brand-creative',
    label: 'Copywriting',
    keyword: 'copywriting',
    secondaryKeywords: ['testi per siti web', 'copywriting SEO', 'tono di voce'],
    title: 'Copywriting: testi che convertono',
    description:
      'Testi per siti, SEO e campagne allineati al tono del brand. Velocità dove serve, revisione umana sempre.',
    h1: 'Copywriting: testi che convertono',
    lead:
      'Il copywriting dà voce al brand su sito, campagne e contenuti. Acceleriamo bozze e varianti dove serve, ma tono di voce, prova e chiarezza restano umani: il testo deve suonare come te, non come un modello generico.',
    brandColumns: {
      left: [
        'Il copywriting dà voce al brand su sito, campagne e contenuti. Acceleriamo bozze e varianti dove serve, ma tono di voce, prova e chiarezza restano umani: il testo deve suonare come te, non come un modello generico.',
        'Definiamo messaggio e tono. Scriviamo e riscriviamo: tagliamo il superfluo, verifichiamo fatti, allineiamo keyword e CTA. Nessun testo esce senza revisione.',
      ],
      right: [
        'Per i testi lavoriamo pagina per pagina. Ogni blocco ha un lavoro da fare: informare, rassicurare, far agire.',
        'Sul copywriting SEO integriamo intent di ricerca senza forzature: titoli utili, paragrafi leggibili, entità chiare. Google e le persone devono capirti allo stesso modo.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Copy per sito e landing, tone of voice con esempi sì/no, messaggi chiave, varianti per campagne e newsletter, confronti prima/dopo. Su richiesta: kit editoriale leggero per il team.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di copywriting con OFF32?',
        a: 'Messaggio e tono di voce, testi per siti web o campagne, revisione e allineamento SEO di base. L’ambito (pagine, formati, lingue) si definisce insieme in proposta.',
      },
      {
        q: 'I testi sembreranno generici?',
        a: 'No. Lavoriamo su posizionamento e tono di voce: il copywriting deve essere riconoscibile e utile, non riempitivo.',
      },
      {
        q: 'Fate anche SEO?',
        a: 'Sì, su titoli, struttura, intent e chiarezza. Per audit tecnici e performance vedi anche Performance & SEO.',
      },
      {
        q: 'Potete riscrivere un sito intero?',
        a: 'Sì, a moduli: priorità alle pagine che portano lead o vendita, poi le altre in base agli obiettivi.',
      },
      {
        q: 'Serve già una brand strategy?',
        a: 'Aiuta. Se manca, definiamo una versione leggera di posizionamento e tono prima di scrivere.',
      },
      {
        q: 'Lavorate in italiano e inglese?',
        a: 'Principalmente in italiano; su richiesta adattiamo o coordiniamo versioni bilingue.',
      },
    ],
    relatedSlugs: ['content-creation', 'brand-identity'],
    workHref: '/work/momento',
    workLabel: 'Momento',
    blogHref: '/blog/come-costruire-brand-digitale',
    blogLabel: 'Come costruire un brand digitale che dura',
  },
  {
    slug: 'content-creation',
    area: 'brand-creative',
    label: 'Content Creation',
    keyword: 'content creation per aziende',
    secondaryKeywords: ['contenuti social', 'foto e video per brand', 'content strategy'],
    title: 'Content Creation per brand e social',
    description:
      'Contenuti social, foto e video allineati al brand. Strategia editoriale, produzione e pacchetti chiari.',
    h1: 'Content Creation per brand e social',
    lead:
      'I contenuti tengono vivo il brand tra una campagna e l’altra. Progettiamo una content strategy sostenibile e produciamo asset coerenti: social, foto, video, pezzi per sito e newsletter.',
    brandColumns: {
      left: [
        'I contenuti tengono vivo il brand tra una campagna e l’altra. Progettiamo una content strategy sostenibile e produciamo asset coerenti: social, foto, video, pezzi per sito e newsletter.',
        'Definiamo formati (static, carousel, short video, articoli) e un calendario realistico rispetto alle risorse del team. Meglio poche uscite forti che un flusso vuoto.',
      ],
      right: [
        'Colleghiamo i contenuti a obiettivi: awareness, lead, community, lancio. Ogni pezzo ha una ragione, non solo una data. I materiali nascono dal mondo visivo del brand, non da template generici.',
        'Possiamo briefare shooting e riprese, curare post-produzione leggera e adattare gli asset ai canali. Se serve, integriamo copywriting per didascalie e varianti, sempre con revisione umana.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Content strategy e calendario, pacchetti di asset multi-formato, brief di produzione, adattamenti canale e indicazioni di pubblicazione. Pacchetti mensili o a progetto, con quantità e revisioni chiare.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di content creation con OFF32?',
        a: 'Content strategy, definizione formati e calendario, produzione o coordinamento di asset (social, foto, video), adattamenti canale. Attività e volumi si concordano in base agli obiettivi.',
      },
      {
        q: 'Fate anche community management?',
        a: 'Possiamo supportare i flussi editoriali; la moderazione quotidiana si valuta a parte in base al volume.',
      },
      {
        q: 'Produce foto e video in house?',
        a: 'Coordinamo produzioni e partner. Il valore è direzione creativa e coerenza con il brand, non solo lo scatto.',
      },
      {
        q: 'Serve un brand book?',
        a: 'Ideale sì. Se manca, partiamo da un kit minimo di regole visive e di tono di voce prima di produrre.',
      },
      {
        q: 'Quanto costa un mese di content?',
        a: 'Dipende da formati e quantità. Definiamo un pacchetto dopo un breve assessment su canali e risorse interne.',
      },
      {
        q: 'Potete lavorare solo su un lancio?',
        a: 'Sì. Offriamo anche supporto puntuale a lanci e campagne, oltre ai pacchetti mensili di content creation.',
      },
    ],
    relatedSlugs: ['creative-direction', 'ai-copywriting'],
    workHref: '/work/healing-earth',
    workLabel: 'Healing Earth Italia',
    blogHref: '/blog/scegliere-clienti-giusti',
    blogLabel: 'Quando una collaborazione funziona',
  },
  {
    slug: 'web-design-sviluppo',
    area: 'web-digital',
    label: 'Web Design / Development',
    keyword: 'realizzazione siti web',
    secondaryKeywords: ['web design', 'sviluppo sito Next.js', 'sito web professionale'],
    title: 'Web Design / Development: siti su misura',
    description:
      'Siti web professionali con design e sviluppo integrati. Next.js, React e attenzione a performance e conversione.',
    h1: 'Web Design / Development: siti su misura',
    lead:
      'Progettiamo e sviluppiamo siti, app e piattaforme web in cui design e codice non si contraddicono. Un prodotto digitale deve essere chiaro, veloce e facile da far crescere, non solo bello in portfolio.',
    brandColumns: {
      left: [
        'Progettiamo e sviluppiamo siti, app e piattaforme web in cui design e codice non si contraddicono. Un prodotto digitale deve essere chiaro, veloce e facile da far crescere, non solo bello in portfolio.',
        'Per molti progetti usiamo Next.js e React: performance, SEO tecnica, componenti riusabili. Dove serve un CMS, un e-commerce o un’integrazione specifica (pagamenti, gestionali, AI), scegliamo lo strumento giusto senza dogmatismi.',
      ],
      right: [
        'Il design nasce da struttura e contenuti: wireframe, gerarchia, mobile first. Poi lo sviluppo chiude accessibilità, velocità e deploy.',
        'Dai siti brand alle piattaforme con utenti, prenotazioni o pagamenti, teniamo insieme racconto e tecnica. Se vuoi vedere esempi concreti, parti dai case study in Works.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Wireframe e UI, sviluppo front-end, CMS o workflow di aggiornamento, handoff, formazione base e setup analytics sugli eventi chiave. Tempi e investimento dipendono da ambizione, contenuti e integrazioni.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di web design e development con OFF32?',
        a: 'Struttura e design, sviluppo di siti, app o piattaforme web, messa online e indicazioni su come aggiornare e misurare. Stack e ambito si definiscono dopo un brief chiaro.',
      },
      {
        q: 'Che tecnologie usate?',
        a: 'Lavoriamo soprattutto con Next.js, JavaScript, TypeScript e Node.js. Per deploy e infrastruttura usiamo Vercel e Supabase; dove serve aggiungiamo React, PostgreSQL, Clerk, Resend, Stripe e altri tool in base al progetto.',
      },
      {
        q: 'Il sito sarà editabile?',
        a: 'Sì, con CMS o workflow concordati. Decidiamo insieme cosa deve essere autonomo e cosa no.',
      },
      {
        q: 'Include SEO?',
        a: 'Struttura, metadata e performance di base sì. Per audit avanzati c’è Performance & SEO.',
      },
      {
        q: 'Lavorate su redesign di siti esistenti?',
        a: 'Sì. Analizziamo cosa tenere (URL, contenuti, SEO) e cosa rifare, senza buttare traffico acquisito.',
      },
      {
        q: 'Quanto dura la manutenzione?',
        a: 'Offriamo piani di cura post-lancio: aggiornamenti, piccole evoluzioni, monitoraggio.',
      },
    ],
    relatedSlugs: ['landing-pages', 'performance-seo'],
    workHref: '/work/scuppoz',
    workLabel: 'Scuppoz',
    blogHref: '/blog/siti-web-immersivi',
    blogLabel: 'E se il tuo sito facesse venire voglia di restare?',
  },
  {
    slug: 'ecommerce',
    area: 'web-digital',
    label: 'E-commerce',
    keyword: 'sviluppo e-commerce',
    secondaryKeywords: ['e-commerce Shopify', 'negozio online', 'sito e-commerce su misura'],
    title: 'E-commerce: negozi online su misura',
    description:
      'Negozi online: prodotti, checkout, pagamenti e SEO. Design e sviluppo orientati alle vendite, sulla piattaforma più adatta al progetto.',
    h1: 'E-commerce: negozi online su misura',
    lead:
      'Un e-commerce performante si decide sulla scheda prodotto, sulla velocità mobile e su un checkout che mostra subito prezzo, spedizione e reso. In OFF32 progettiamo negozi online che vendono senza confondere.',
    brandColumns: {
      left: [
        'Un e-commerce performante si decide sulla scheda prodotto, sulla velocità mobile e su un checkout che mostra subito prezzo, spedizione e reso. In OFF32 progettiamo negozi online che vendono senza confondere.',
        'Una piattaforma pronta è spesso la scelta giusta per partire veloci, con pagamenti e logistica già pronti. Un e-commerce su misura ha senso con logiche di prodotto complesse, B2B o integrazioni particolari.',
      ],
      right: [
        'In entrambi i casi curiamo UX mobile, performance e chiarezza del funnel: dal primo click all’ordine confermato. Ti aiutiamo a scegliere la piattaforma senza ideologia.',
        'Sul SEO prodotto lavoriamo titoli, descrizione, struttura URL e dati utili. Colleghiamo analytics e, se serve, automazioni post-ordine: il negozio non finisce al go-live.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Architettura prodotti, design e sviluppo shop, checkout e pagamenti, SEO prodotto di base, tracking conversioni e handoff operativo. Su richiesta: migrazione da altre piattaforme e redirect.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto e-commerce con OFF32?',
        a: 'Scelta piattaforma, UX del funnel, sviluppo, gestione prodotti, pagamenti e tracking. Ambito e tempi si definiscono dopo un audit dello scope.',
      },
      {
        q: 'Quanto costa un negozio online?',
        a: 'Dipende da piattaforma, migrazione prodotti e personalizzazioni. Dopo un audit dello scope diamo un range chiaro.',
      },
      {
        q: 'Migrate da un’altra piattaforma?',
        a: 'Sì: prodotti, clienti e redirect. Pianifichiamo SEO per non perdere traffico.',
      },
      {
        q: 'Come scegliete la piattaforma?',
        a: 'In base a tempi, budget, integrazioni e complessità del catalogo. Preferiamo poche dipendenze e stack manutenibili.',
      },
      {
        q: 'Tempi medi di go-live?',
        a: 'Da poche settimane per setup snelli a percorsi più lunghi con prodotti e integrazioni complesse.',
      },
      {
        q: 'Che CMS utilizzate o sviluppate totalmente custom?',
        a: 'Dipende dal progetto. Lavoriamo con WordPress o Shopify quando sono la scelta più adatta, oppure sviluppiamo un e-commerce totalmente custom da codice.',
      },
    ],
    relatedSlugs: ['landing-pages', 'web-design-sviluppo'],
    workHref: '/work/healing-earth',
    workLabel: 'Healing Earth Italia',
    blogHref: '/blog/ecommerce-performante-2025',
    blogLabel: 'eCommerce performante: cosa funziona davvero',
  },
  {
    slug: 'landing-pages',
    area: 'web-digital',
    label: 'Landing Pages',
    keyword: 'landing page che convertono',
    secondaryKeywords: ['landing page per campagne', 'landing page Google Ads', 'funnel'],
    title: 'Landing Pages ad alta conversione',
    description:
      'Landing page per campagne e Ads: struttura, velocità, A/B test e integrazione con CRM.',
    h1: 'Landing Pages ad alta conversione',
    lead:
      'Una landing page che converte ha una promessa sola, una prova credibile e un’azione chiara. Progettiamo landing per campagne e Google Ads che non disperdono attenzione.',
    brandColumns: {
      left: [
        'Una landing page che converte ha una promessa sola, una prova credibile e un’azione chiara. Progettiamo landing per campagne e Google Ads che non disperdono attenzione.',
        'Hero, problema, prova, offerta, FAQ, CTA ripetute. Niente menu labirinto. Misuriamo Core Web Vitals perché una landing lenta brucia budget Ads.',
      ],
      right: [
        'Allineiamo messaggio ads e pagina: stessa promessa, stesso linguaggio. Altrimenti il click bouncea. Prevediamo varianti su headline, prova sociale e form.',
        'Integriamo CRM, email e pixel con eventi puliti. Se il funnel è più lungo, colleghiamo thank-you, nurture e landing secondarie senza perdere tracciamento.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Struttura e design della landing, copy di base o revisione, sviluppo veloce, tracking conversioni, setup A/B e integrazioni CRM. Ideale per lanci, lead magnet, demo e promo.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende una landing page con OFF32?',
        a: 'Struttura, design, sviluppo, tracking e allineamento al messaggio campagna. Copy e A/B test si possono includere in proposta.',
      },
      {
        q: 'Fate landing per Meta e Google?',
        a: 'Sì. Adattiamo messaggio e velocità al canale, con tracking coerente.',
      },
      {
        q: 'Include copy?',
        a: 'Possiamo includere copywriting e revisione, o lavorare sul tuo testo.',
      },
      {
        q: 'Quanto tempo per una landing?',
        a: 'Spesso da pochi giorni a un paio di settimane, se contenuti e offerte sono chiari.',
      },
      {
        q: 'Serve un sito completo dietro?',
        a: 'No. Può vivere stand-alone, con dominio o sottodominio.',
      },
      {
        q: 'Fate anche A/B test?',
        a: 'Sì: varianti su headline, prova sociale e form, con eventi di conversione puliti.',
      },
    ],
    relatedSlugs: ['ecommerce', 'performance-seo'],
    workHref: '/work/conil-food-tour',
    workLabel: 'Conil Food Tour',
    blogHref: '/blog/ecommerce-performante-2025',
    blogLabel: 'eCommerce performante: cosa funziona davvero',
  },
  {
    slug: 'performance-seo',
    area: 'web-digital',
    label: 'Performance & SEO',
    keyword: 'SEO tecnica',
    secondaryKeywords: ['ottimizzazione performance sito', 'Core Web Vitals', 'audit SEO'],
    title: 'Performance & SEO: siti veloci',
    description:
      'Audit SEO tecnica, Core Web Vitals e ottimizzazione on-page. Siti più veloci e più chiari per utenti e motori.',
    h1: 'Performance & SEO: siti veloci',
    lead:
      'Velocità e SEO tecnica non sono extra. Se il sito è lento o confuso per i crawler, perdi posizioni e conversioni. Facciamo audit, priorità e interventi misurabili.',
    brandColumns: {
      left: [
        'Velocità e SEO tecnica non sono extra. Se il sito è lento o confuso per i crawler, perdi posizioni e conversioni. Facciamo audit, priorità e interventi misurabili.',
        'Misuriamo LCP, INP, CLS e i problemi reali su mobile. Interveniamo su immagini, font, JS, caching e hosting quando serve.',
      ],
      right: [
        'L’ottimizzazione performance sito va di pari passo con la SEO: markup, indexazione, canonical, sitemap, struttura heading.',
        'Titoli, meta, internal linking, contenuti orfani, dati strutturati dove utili. Consegniamo un report prima/dopo con azioni fatte e backlog prioritizzato. Niente ranking garantito: lavoro tecnico e editoriale continuo.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Audit performance e SEO tecnica, piano prioritizzato, interventi su Core Web Vitals e on-page, report prima/dopo. Su richiesta: sprint di follow-up e monitoraggio Search Console.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di Performance & SEO con OFF32?',
        a: 'Audit, priorità, interventi tecnici e on-page, report misurabile. Off-page e link building si valutano a parte se servono.',
      },
      {
        q: 'Fate SEO off-page / link building?',
        a: 'Ci concentriamo su tecnica e contenuti. Per off-page valutiamo partner o piani dedicati.',
      },
      {
        q: 'Quanto dura un audit?',
        a: 'Di solito pochi giorni per un primo passaggio; poi un piano di intervento a sprint.',
      },
      {
        q: 'Lavorate su Shopify e Next.js?',
        a: 'Sì, con stack e limiti diversi. Adattiamo le raccomandazioni alla piattaforma.',
      },
      {
        q: 'Serve accesso a Search Console?',
        a: 'Ideale sì: dati di copertura, query e pagine che contano.',
      },
      {
        q: 'Garantite posizioni su Google?',
        a: 'No. Lavoriamo su basi tecniche e editoriali misurabili, senza promesse di ranking.',
      },
    ],
    relatedSlugs: ['web-design-sviluppo', 'landing-pages'],
    workHref: '/work/scuppoz',
    workLabel: 'Scuppoz',
    blogHref: '/blog/ecommerce-performante-2025',
    blogLabel: 'eCommerce performante: cosa funziona davvero',
  },
  {
    slug: 'ai-automation',
    area: 'ai-systems',
    label: 'AI Automation',
    keyword: 'automazione con AI',
    secondaryKeywords: ['automazione processi aziendali', 'automazioni n8n/Make', 'risparmiare tempo con AI'],
    title: 'AI Automation: automatizza i processi',
    description:
      'Automazione processi aziendali con AI: email, preventivi, CRM. Meno ripetizione, più controllo.',
    h1: 'AI Automation: automatizza i processi',
    lead:
      'L’automazione con AI toglie passaggi manuali senza togliere responsabilità. Progettiamo flussi su email, preventivi, CRM e ops, con supervisione umana dove serve.',
    brandColumns: {
      left: [
        'L’automazione con AI toglie passaggi manuali senza togliere responsabilità. Progettiamo flussi su email, preventivi, CRM e ops, con supervisione umana dove serve.',
        'Classificare e rispondere bozze email, generare bozze di preventivo da brief, aggiornare CRM, riassumere call, preparare report. Ogni automazione ha trigger, regole e log.',
      ],
      right: [
        'Usiamo strumenti come n8n/Make o codice custom quando il processo è più delicato. L’importante è manutenibilità e costi previsibili.',
        'Stimiamo ore/settimana recuperate e errori evitati. Se il ROI non regge, lo diciamo prima di costruire. Documentiamo il flusso così il team non dipende da una sola persona.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Mappa del processo, automazione live con trigger e log, documentazione del flusso, handoff al team e stima del tempo recuperato. Su richiesta: monitoraggio e iterazioni.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di AI Automation con OFF32?',
        a: 'Analisi del processo, design del flusso, implementazione, test e documentazione. Ambito e tool si scelgono in base a dati e permessi.',
      },
      {
        q: 'Sostituite le persone?',
        a: 'No. Togliamo compiti ripetitivi. Le decisioni restano del team.',
      },
      {
        q: 'Che tool usate?',
        a: 'n8n, Make, API di modelli e integrazioni custom, in base al contesto.',
      },
      {
        q: 'I dati sono al sicuro?',
        a: 'Definiamo cosa può uscire dall’azienda, retention e accessi. Privacy by design.',
      },
      {
        q: 'Quanto tempo per la prima automazione?',
        a: 'Spesso una MVP in poche settimane se i dati e i permessi sono pronti.',
      },
      {
        q: 'Come misurate il risultato?',
        a: 'Ore recuperate, errori evitati e affidabilità del flusso. Se il ROI non regge, lo diciamo prima.',
      },
    ],
    relatedSlugs: ['ai-workflows', 'ai-agents'],
    workHref: '/work/vecere',
    workLabel: 'Vecere',
    blogHref: '/blog/scegliere-clienti-giusti',
    blogLabel: 'Quando una collaborazione funziona',
  },
  {
    slug: 'ai-agents',
    area: 'ai-systems',
    label: 'AI Agents',
    keyword: 'agenti AI',
    secondaryKeywords: ['agenti AI per aziende', 'assistente AI personalizzato', 'chatbot AI'],
    title: 'AI Agents: assistenti su misura',
    description:
      'Agenti AI per aziende: assistenti personalizzati con strumenti, memoria e controlli, oltre il chatbot generico.',
    h1: 'AI Agents: assistenti su misura',
    lead:
      'Un agente AI non è solo un chatbot. È un assistente che usa strumenti (CRM, knowledge base, ticket) con regole e limiti. Li progettiamo su misura, con sicurezza dei dati al centro.',
    brandColumns: {
      left: [
        'Un agente AI non è solo un chatbot. È un assistente che usa strumenti (CRM, knowledge base, ticket) con regole e limiti. Li progettiamo su misura, con sicurezza dei dati al centro.',
        'Il chatbot risponde. L’agente pianifica passi, chiama tool, chiede conferma su azioni sensibili. Serve governance: cosa può fare da solo e cosa no.',
      ],
      right: [
        'Casi d’uso: supporto interno, pre-qualifica lead, help desk di primo livello, assistente commerciale su knowledge aziendale.',
        'Isolamento dati, logging, revoke accessi, policy su PII. Possiamo partire da una demo controllata su un perimetro piccolo, poi estendere. Misuriamo qualità risposte, escalation umane e tempo risparmiato.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Definizione perimetro e policy, agente collegato ai tool, demo controllata, logging e handoff. Su richiesta: estensione a nuovi canali e metriche di qualità.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di AI Agents con OFF32?',
        a: 'Scope dell’assistente, collegamento a strumenti, regole di sicurezza, demo e messa in produzione guidata. Il perimetro si accorda dopo un brief.',
      },
      {
        q: 'Può mandare email da solo?',
        a: 'Solo se lo progettiamo così, con approvazioni. Di default preferiamo bozze da rivedere.',
      },
      {
        q: 'Addestrate un modello sui nostri dati?',
        a: 'Spesso basta retrieval sulla knowledge. Fine-tuning solo se serve davvero.',
      },
      {
        q: 'Funziona in italiano?',
        a: 'Sì. Calibriamo prompt, tono e FAQ aziendali.',
      },
      {
        q: 'Quanto costa un agente?',
        a: 'Dipende da tool collegati e volume. Dopo lo scope diamo un range di build e run.',
      },
      {
        q: 'In cosa è diverso da un chatbot?',
        a: 'L’agente usa strumenti e segue regole operative. Non si limita a rispondere in chat.',
      },
    ],
    relatedSlugs: ['ai-integration', 'ai-automation'],
    workHref: '/full-stack',
    workLabel: 'Corso Full Stack / Agenda32',
    blogHref: '/blog/come-costruire-brand-digitale',
    blogLabel: 'Come costruire un brand digitale che dura',
  },
  {
    slug: 'ai-workflows',
    area: 'ai-systems',
    label: 'AI Workflows',
    keyword: 'workflow AI',
    secondaryKeywords: ['flussi di lavoro con AI', 'pipeline AI', 'orchestrazione di processi'],
    title: 'AI Workflows: flussi intelligenti',
    description:
      'Workflow AI e pipeline: orchestrazione di processi con AI integrata nei tool che già usi.',
    h1: 'AI Workflows: flussi intelligenti',
    lead:
      'I workflow AI collegano persone, dati e modelli in un flusso unico. Progettiamo pipeline chiare: input, passaggi AI, controlli, output nei tuoi tool.',
    brandColumns: {
      left: [
        'I workflow AI collegano persone, dati e modelli in un flusso unico. Progettiamo pipeline chiare: input, passaggi AI, controlli, output nei tuoi tool.',
        'Esempio: brief in arrivo, estrazione dati, bozza AI, review umana, pubblicazione o CRM. Ogni nodo ha owner e metriche.',
      ],
      right: [
        'Integriamo Slack, email, Notion, CRM, drive e API. L’orchestrazione evita copia-incolla e versioni perse.',
        'Una prima pipeline utile può arrivare in poche settimane. Poi iteriamo: più affidabilità, meno eccezioni manuali. Documentiamo il flusso con uno schema semplice.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Schema del workflow, pipeline attiva, integrazioni con i tool del team, alert sugli errori e documentazione. Su richiesta: estensione a nuovi nodi e metriche.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di AI Workflows con OFF32?',
        a: 'Disegno del flusso, orchestrazione, integrazioni, controlli umani e documentazione. Si parte di solito da un solo processo critico.',
      },
      {
        q: 'È diverso dall’automazione?',
        a: 'L’automazione è un pezzo. Il workflow è la catena completa con ruoli e handoff.',
      },
      {
        q: 'Serve codice?',
        a: 'A volte no (tool no-code). A volte sì, per affidabilità e costi.',
      },
      {
        q: 'Come gestite gli errori?',
        a: 'Retry, alert, coda di revisione umana. I fallimenti devono essere visibili.',
      },
      {
        q: 'Possiamo partire da un solo processo?',
        a: 'È il modo migliore. Un workflow solido batte dieci esperimenti sparsi.',
      },
      {
        q: 'Quanto tempo per attivare il primo flusso?',
        a: 'Spesso poche settimane per una pipeline utile, poi iterazioni di affidabilità.',
      },
    ],
    relatedSlugs: ['ai-automation', 'ai-integration'],
    workHref: '/work/vecere',
    workLabel: 'Vecere',
    blogHref: '/blog/scegliere-clienti-giusti',
    blogLabel: 'Quando una collaborazione funziona',
  },
  {
    slug: 'ai-integration',
    area: 'ai-systems',
    label: 'AI Integration',
    keyword: 'integrazione AI',
    secondaryKeywords: ['integrare ChatGPT/Claude nel gestionale', 'API AI', 'AI nel software aziendale'],
    title: 'AI Integration: AI nei tuoi software',
    description:
      'Integriamo AI via API in CRM, ERP ed e-commerce. ChatGPT/Claude nel gestionale con privacy e GDPR.',
    h1: 'AI Integration: AI nei tuoi software',
    lead:
      'Integrare ChatGPT o Claude nel gestionale serve se il modello lavora sui tuoi dati e processi, non in una chat isolata. Progettiamo integrazioni API sicure e utili.',
    brandColumns: {
      left: [
        'Integrare ChatGPT o Claude nel gestionale serve se il modello lavora sui tuoi dati e processi, non in una chat isolata. Progettiamo integrazioni API sicure e utili.',
        'Assistenti su schede cliente, suggerimenti prodotti, classificazione ticket, generazione documenti. L’AI entra dove già lavorate.',
      ],
      right: [
        'Progettiamo auth, rate limit, logging e fallback. Se il modello non risponde, il processo non deve spezzarsi.',
        'Valutiamo cosa può essere inviato a provider esterni, anonimizzazione, DPA, retention. Se i dati non possono uscire, esploriamo opzioni private dove sensato.',
      ],
    },
    sections: [
      {
        heading: 'Deliverable tipici',
        body: [
          'Architettura di integrazione, endpoint o connettori, controlli privacy, logging e handoff tecnico. Su richiesta: estensione a nuovi sistemi e audit GDPR.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cosa comprende un progetto di AI Integration con OFF32?',
        a: 'Analisi dei sistemi, design API, implementazione, privacy e collaudo. L’ambito dipende da CRM, ERP o e-commerce da collegare.',
      },
      {
        q: 'Lavorate con le nostre API?',
        a: 'Sì. Mappiamo endpoint esistenti o ne progettiamo uno di mediazione.',
      },
      {
        q: 'Quali modelli supportate?',
        a: 'OpenAI, Anthropic e altri in base a requisiti. Possiamo astrarre il provider.',
      },
      {
        q: 'Come gestite GDPR e privacy?',
        a: 'Definiamo cosa può uscire, retention, accessi e DPA. Se serve, opzioni più private.',
      },
      {
        q: 'Serve riscrivere il gestionale?',
        a: 'Di solito no. Integriamo via API o layer di mediazione senza rifare tutto.',
      },
      {
        q: 'Quanto tempo per una prima integrazione?',
        a: 'Dipende da accessi e complessità dei sistemi. Dopo lo scope indichiamo una timeline realistica.',
      },
    ],
    relatedSlugs: ['ai-agents', 'ai-automation'],
    workHref: '/full-stack',
    workLabel: 'Corso Full Stack / Agenda32',
    blogHref: '/blog/ecommerce-performante-2025',
    blogLabel: 'eCommerce performante: cosa funziona davvero',
  },

]

export function areaBySlug(slug: string) {
  return SERVICE_AREAS.find(area => area.slug === slug)
}

export function serviceBySlug(slug: string) {
  return SERVICE_PAGES.find(service => service.slug === slug)
}

export function servicesByArea(area: ServiceAreaSlug) {
  return SERVICE_PAGES.filter(service => service.area === area)
}

export function servicePath(service: Pick<ServicePage, 'area' | 'slug'>) {
  return `/servizi/${service.area}/${service.slug}`
}

export function areaPath(area: Pick<ServiceArea, 'slug'>) {
  return `/servizi/${area.slug}`
}

export function relatedServices(service: ServicePage) {
  return service.relatedSlugs
    .map(slug => serviceBySlug(slug))
    .filter((item): item is ServicePage => Boolean(item))
}

/** Mappa label homepage → path servizio */
export const HOME_SERVICE_LINKS: Record<string, string> = {
  'Brand Identity': '/servizi/brand-creative/brand-identity',
  'Creative Direction': '/servizi/brand-creative/creative-direction',
  'Copywriting': '/servizi/brand-creative/ai-copywriting',
  'Content Creation': '/servizi/brand-creative/content-creation',
  'Web Design / Development': '/servizi/web-digital/web-design-sviluppo',
  'E-commerce': '/servizi/web-digital/ecommerce',
  'Landing Pages': '/servizi/web-digital/landing-pages',
  'Performance & SEO': '/servizi/web-digital/performance-seo',
  'AI Automation': '/servizi/ai-systems/ai-automation',
  'AI Agents': '/servizi/ai-systems/ai-agents',
  'AI Workflows': '/servizi/ai-systems/ai-workflows',
  'AI Integration': '/servizi/ai-systems/ai-integration',
}
