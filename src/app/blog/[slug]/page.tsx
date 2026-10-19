'use client'
import { use, type CSSProperties, type ReactNode } from 'react'
import ProjectStart from '@/components/ProjectStart'
import { BRAND_ARTICLE_IMAGE, CLIENT_ARTICLE_IMAGE, ECOMMERCE_ARTICLE_IMAGE } from '@/lib/seo'

const LINE = '1px solid #0D0D0D'

function withLinks(text: string, links?: { href: string; label: string }[]): ReactNode {
  if (!links?.length) return text
  const parts: ReactNode[] = []
  let cursor = 0
  links.forEach((link, index) => {
    const at = text.indexOf(link.label, cursor)
    if (at < 0) return
    if (at > cursor) parts.push(text.slice(cursor, at))
    const external = link.href.startsWith('http')
    parts.push(
      <a
        key={`${link.href}-${index}`}
        href={link.href}
        {...(external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {})}
        style={{ color: '#0D0D0D' }}
      >
        {link.label}
      </a>,
    )
    cursor = at + link.label.length
  })
  if (cursor < text.length) parts.push(text.slice(cursor))
  return parts.length ? <>{parts}</> : text
}

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

type Block = {
  type: 'intro' | 'paragraph' | 'heading' | 'quote'
  text: string
  links?: { href: string; label: string }[]
}

type Article = {
  title: string
  tag: string
  date: string
  readTime: string
  author: { name: string; role: string; href: string }
  excerpt: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  content: Block[]
}

const ARTICLES: Record<string, Article> = {
  'come-costruire-brand-digitale': {
    title: 'Come costruire un brand digitale che dura nel tempo',
    tag: 'Design',
    date: 'Mar 2025',
    readTime: '7 min',
    author: { name: 'Sara Villani', role: 'Social Media Manager · OFF32', href: '/about/sara-villani' },
    excerpt: 'Il brand non è un logo. È la promessa che fai ogni giorno a chi ti sceglie. Il segno grafico la rende visibile. Se la promessa è confusa, un marchio nuovo non la sistema.',
    image: BRAND_ARTICLE_IMAGE.url,
    imageAlt: BRAND_ARTICLE_IMAGE.alt,
    content: [
      {
        type: 'intro',
        text: 'Un brand digitale che dura non si riconosce dal restyling dell’anno. Si riconosce perché, a distanza di tempo, dice ancora la stessa cosa, con la stessa voce, anche quando cambiano il sito, le campagne e le persone che lo raccontano.',
      },
      {
        type: 'paragraph',
        text: 'Il brand non è un logo. È la promessa che fai ogni giorno a chi ti sceglie. Il segno grafico la rende visibile. Se la promessa è confusa, un marchio nuovo non la sistema: la sposta soltanto su un altro file.',
      },
      {
        type: 'heading',
        text: 'Partire da quello che non cambia',
      },
      {
        type: 'paragraph',
        text: 'Prima di scegliere un colore o un carattere serve capire cosa il brand deve continuare a essere tra due anni. Non lo slogan di stagione: la posizione. A chi parli, quale problema risolvi, perché qualcuno dovrebbe ricordarti invece di un altro.',
      },
      {
        type: 'paragraph',
        text: 'In OFF32 questa parte viene prima del visual. È ricerca e conversazione, non un moodboard chiuso in una cartella. Quando la posizione è chiara, le scelte grafiche diventano poche e difendibili. Quando non lo è, ogni proposta sembra valida e nessuna resta.',
      },
      {
        type: 'heading',
        text: 'Poche regole, usate sempre',
      },
      {
        type: 'paragraph',
        text: 'Un’identità che dura è più stretta di quanto si pensi. Pochi colori, un modo di scrivere, un modo di fotografare, una gerarchia. Il problema non è avere troppe poche regole. È averne tante e usarle a caso. Quando ogni touchpoint reinventa il tono, il brand non cresce: si dimentica.',
      },
      {
        type: 'paragraph',
        text: 'La direzione visiva e quella verbale vanno insieme. Un sito curato con testi generici non tiene. Un messaggio chiaro dentro un’immagine qualunque, nemmeno. Chi legge deve riconoscere la stessa mano nel sito, in una storia, in una landing, in una mail.',
      },
      {
        type: 'quote',
        text: 'Un brand dura quando lo riconosci anche senza il logo.',
      },
      {
        type: 'heading',
        text: 'L’AI accelera i materiali, non la decisione',
      },
      {
        type: 'paragraph',
        text: 'Oggi è facile produrre varianti. È anche il modo più rapido per diluire un’identità. L’intelligenza artificiale, da noi, entra dopo che la direzione è stata scelta: aiuta a esplorare, a scrivere bozze, a preparare materiali. Quello che resta in circolazione lo decide una persona.',
      },
      {
        type: 'paragraph',
        text: 'Un prompt non sa cosa tenere. Sa produrre. Se gli si chiede un brand, restituisce una media di brand già visti. La differenza sta nel taglio: cosa scartare, cosa ripetere, cosa non dire. Quella parte non si delega.',
      },
      {
        type: 'heading',
        text: 'Cosa deve resistere',
      },
      {
        type: 'paragraph',
        text: 'Tra un anno il sito sarà stato aggiornato, una campagna sarà finita, qualcuno nel team sarà cambiato. Quello che deve restare è corto: la frase di posizionamento, le regole visive, il tono. Se una persona nuova riesce a produrre un pezzo riconoscibile senza riscrivere il brand da zero, l’identità sta funzionando.',
      },
      {
        type: 'paragraph',
        text: 'Il resto può muoversi. I formati cambiano, i canali anche. Un brand che dura non è un brand fermo. È un brand che sa cosa non tradire mentre tutto il resto si aggiorna.',
      },
      {
        type: 'heading',
        text: 'Riconoscerlo non basta a proteggerlo',
      },
      {
        type: 'paragraph',
        text: 'Il segno che le persone riconoscono e il marchio che la legge tutela non coincidono. Il primo vive nell’uso: nel sito, nelle foto, nel modo di scrivere. Il secondo esiste quando lo depositi. L’Ufficio Italiano Brevetti e Marchi lo descrive come il segno che distingue i prodotti o i servizi di un’impresa da quelli delle altre. Senza un uso costante, la registrazione copre un nome che nessuno ricorda. Con l’uso e senza registrazione, qualcuno può avvicinarsi al segno che hai costruito. Le due cose si tengono: la promessa lo rende riconoscibile, il deposito gli dà un confine. In Europa le due tutele stanno in uffici diversi. Il marchio dell’Unione si deposita all’Ufficio dell’Unione europea per la proprietà intellettuale. Il brevetto europeo, che protegge un’invenzione e non il nome, si chiede all’Ufficio europeo dei brevetti.',
        links: [
          {
            href: 'https://uibm.mise.gov.it/index.php/it/marchi',
            label: 'Ufficio Italiano Brevetti e Marchi',
          },
          {
            href: 'https://www.euipo.europa.eu/it/trade-marks',
            label: 'Ufficio dell’Unione europea per la proprietà intellettuale',
          },
          {
            href: 'https://www.epo.org/en',
            label: 'Ufficio europeo dei brevetti',
          },
        ],
      },
      {
        type: 'heading',
        text: 'In chiusura',
      },
      {
        type: 'paragraph',
        text: 'Costruire un brand che dura è un lavoro di sottrazione. Togliere quello che non serve, tenere la promessa, ripeterla con disciplina. Il logo arriva quando questa parte è già chiara. Prima è decorazione. Dopo è un segno che le persone imparano a riconoscere.',
      },
    ],
  },
  'ecommerce-performante-2025': {
    title: 'eCommerce performante nel 2025: cosa funziona davvero',
    tag: 'Sviluppo',
    date: 'Feb 2025',
    readTime: '8 min',
    author: { name: 'Lorenzo Salvatori', role: 'Full Stack Developer · OFF32', href: '/about/lorenzo-salvatori' },
    excerpt: 'Un e-commerce performante si decide sulla scheda prodotto, sulla velocità del telefono e su un checkout che mostra subito prezzo, spedizione e reso.',
    image: ECOMMERCE_ARTICLE_IMAGE.url,
    imageAlt: ECOMMERCE_ARTICLE_IMAGE.alt,
    imageWidth: ECOMMERCE_ARTICLE_IMAGE.width,
    imageHeight: ECOMMERCE_ARTICLE_IMAGE.height,
    content: [
      {
        type: 'intro',
        text: 'Si parla di stack, di edge, di intelligenza artificiale nel carrello. Quello che muove un ordine è più semplice, e più difficile: una persona capisce subito cosa compra, si fida, e arriva a pagare senza fermarsi.',
      },
      {
        type: 'paragraph',
        text: 'Un tema nuovo, un’app, una funzione in più non riparano un’offerta confusa. Un e-commerce performante è un negozio in cui comprare non richiede di pensarci due volte. Vale per chi apre il primo catalogo e per chi ha già ordini, resi e un pannello pieno di numeri.',
      },
      {
        type: 'heading',
        text: 'Le quattro stanze del negozio',
      },
      {
        type: 'paragraph',
        text: 'Un negozio, anche piccolo, ha sempre le stesse stanze. Il catalogo, dove si cerca. La scheda, dove si decide. Il carrello, dove si controlla. Il checkout, dove si paga. Intorno servono poche pagine ferme: chi vende, come si spedisce, come si rende, come si viene ricontattati. Chi parte da zero può costruire solo questo. Chi ha già un negozio può usare la stessa lista per vedere in quale stanza le persone si fermano.',
      },
      {
        type: 'paragraph',
        text: 'È lo stesso ordine che abbiamo seguito sul negozio di Healing Earth: prima la scheda, poi la velocità sul telefono, poi il checkout.',
        links: [{ href: '/work/healing-earth', label: 'negozio di Healing Earth' }],
      },
      {
        type: 'heading',
        text: 'La pagina prodotto decide',
      },
      {
        type: 'paragraph',
        text: 'Non la home. La pagina dove ci sono il prezzo, la foto, la variante, la spedizione. Se lì manca una risposta, il resto del sito è scenografia. Chi arriva da una ricerca o da un annuncio atterra quasi sempre lì, non sul manifesto del brand.',
      },
      {
        type: 'paragraph',
        text: 'Una buona scheda dice tre cose senza farle cercare: cos’è, per chi è, cosa succede dopo il pagamento. Il nome è quello che una persona scriverebbe per trovarlo, non il codice di magazzino. Il prezzo si vede subito, varianti comprese. Taglia, colore, quantità: si capisce cosa è disponibile. Spedizione e reso stanno sulla scheda. Le foto mostrano l’oggetto, il dettaglio, la scala. L’atmosfera da sola non dice se è quello giusto.',
      },
      {
        type: 'paragraph',
        text: 'La stessa scheda deve essere chiara anche per Google. Nome, prezzo, disponibilità e foto sono i dati strutturati del prodotto: descrivono l’oggetto in modo leggibile, così la ricerca non deve indovinare.',
        links: [{ href: 'https://developers.google.com/search/docs/appearance/structured-data/product?hl=it', label: 'dati strutturati del prodotto' }],
      },
      {
        type: 'heading',
        text: 'La velocità si sente',
      },
      {
        type: 'paragraph',
        text: 'Sul telefono l’attesa si sente, non si legge in una dashboard. Di solito il peso sta nelle foto troppo grandi e negli script aggiunti uno dopo l’altro: chat, pixel, recensioni, pop-up. Ogni pezzo in più ritarda la scheda. Una pagina che compare subito vale più di un’animazione che arriva tardi.',
      },
      {
        type: 'paragraph',
        text: 'I Core Web Vitals misurano tre cose concrete: quanto ci mette il contenuto principale a comparire, se la pagina risponde al tocco, se il layout salta mentre carica. Non sono un voto da esibire. Se la scheda è lenta, il resto del lavoro di comunicazione arriva a una porta chiusa. La prova più semplice, anche senza un tecnico, è aprire quella pagina dal proprio telefono, su una rete normale.',
        links: [{ href: 'https://web.dev/articles/vitals?hl=it', label: 'Core Web Vitals' }],
      },
      {
        type: 'heading',
        text: 'Il checkout è un corridoio',
      },
      {
        type: 'paragraph',
        text: 'Ogni campo in più è una porta. Un account obbligatorio prima di pagare ferma chi compra la prima volta: meglio pagare come ospite e creare l’account dopo, se serve. Le spese di spedizione si vedono prima dell’ultimo passo. Il bottone dice il totale. Vicino al pagamento stanno i tempi di consegna e come funziona il reso.',
      },
      {
        type: 'paragraph',
        text: 'Il checkout dice la verità subito: quanto costa, quando arriva, come si paga. Nell’Unione europea chi compra a distanza ha un diritto di recesso. Il negozio lo spiega prima dell’ordine, insieme al prezzo pieno, non in una mail che arriva dopo.',
        links: [{ href: 'https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_it.htm', label: 'diritto di recesso' }],
      },
      {
        type: 'quote',
        text: 'Un e-commerce performante non è quello con più funzioni. È quello in cui comprare non richiede di pensarci due volte.',
      },
      {
        type: 'heading',
        text: 'L’AI nel negozio',
      },
      {
        type: 'paragraph',
        text: 'Descrizioni, varianti di testo, foto di contesto: l’intelligenza artificiale accelera i materiali. Il prodotto resta quello vero. Misure, materiali, cosa c’è nella scatola: se il testo inventa, la scheda tradisce chi compra e chi poi gestisce il reso. Da noi entra dopo che sappiamo cosa vendere e a chi, non prima.',
      },
      {
        type: 'heading',
        text: 'Cosa guardare dopo il lancio',
      },
      {
        type: 'paragraph',
        text: 'Tre segnali, guardati spesso, bastano. Se le persone escono dalla scheda, di solito non hanno capito l’oggetto o non si fidano. Se lo mettono nel carrello e non pagano, il fermo è quasi sempre la spedizione, l’account o il pagamento. Il terzo segnale è il tempo che passa prima che la scheda sia usabile sul telefono.',
      },
      {
        type: 'paragraph',
        text: 'Non serve una dashboard infinita. Chi ha già un negozio parte da questi tre, prima di comprare un’app nuova. Chi lo apre adesso può usare la stessa lista come prova, con dieci persone vere, prima di aggiungere funzioni.',
      },
      {
        type: 'heading',
        text: 'In chiusura',
      },
      {
        type: 'paragraph',
        text: 'Costruire un negozio che vende è togliere attrito. Offerta chiara, pagina veloce, checkout onesto. Il resto si aggiunge dopo, se serve. Prima di una funzione nuova, vale la pena chiedere se qualcuno si è fermato perché quella funzione mancava, o perché non ha capito cosa stava comprando.',
      },
    ],
  },
  'scegliere-clienti-giusti': {
    title: 'Quando una collaborazione funziona',
    tag: 'Community',
    date: 'Feb 2025',
    readTime: '5 min',
    author: { name: 'Manuel Cerasuolo', role: 'Project Manager · OFF32', href: '/about/manuel-cerasuolo' },
    excerpt: 'Una collaborazione funziona quando tempi, materiali e decisioni sono chiari per entrambi. Ecco come in OFF32 capiamo se un progetto è quello giusto.',
    image: CLIENT_ARTICLE_IMAGE.url,
    imageAlt: CLIENT_ARTICLE_IMAGE.alt,
    content: [
      {
        type: 'intro',
        text: 'Nel design, nello sviluppo e nella comunicazione si parla molto di clienti. Meno spesso si dice una cosa semplice: non ogni progetto è quello giusto, per chi lo commissiona e per chi lo fa.',
      },
      {
        type: 'paragraph',
        text: 'All’inizio si tende a dire sempre sì. Ogni richiesta sembra un’occasione. Col tempo si impara che un sì dato quando tempi, materiali o decisioni non coincidono pesa sul risultato. In quei casi dire no protegge il progetto, e protegge anche chi lo ha chiesto.',
      },
      {
        type: 'heading',
        text: 'Quando il lavoro si inceppa',
      },
      {
        type: 'paragraph',
        text: 'Capita che testi e fotografie arrivino molto dopo il previsto, e che poi si chieda il sito online in pochi giorni. Capita anche che, con gli accordi già scritti, resti un dubbio sul tempo che ci è voluto. Il punto è la comunicazione. Manca un passaggio condiviso: cosa arriva, quando, e cosa si può consegnare di conseguenza.',
      },
      {
        type: 'paragraph',
        text: 'Questi passaggi si sistemano parlando prima. Un progetto tiene quando collaborazione, fiducia e responsabilità stanno da entrambe le parti.',
      },
      {
        type: 'heading',
        text: 'I segnali si vedono presto',
      },
      {
        type: 'paragraph',
        text: 'I segnali di un lavoro che farà fatica si vedono spesso già nei primi incontri.',
      },
      {
        type: 'quote',
        text: 'I segnali sono lì. Tenerne conto serve al risultato, e anche a chi dovrà conviverci per mesi.',
      },
      {
        type: 'heading',
        text: 'Scegliere è una forma di rispetto',
      },
      {
        type: 'paragraph',
        text: 'Dire no, quando il progetto non è allineato, è rispetto per il tempo, per il team e per la qualità che si può davvero garantire.',
      },
      {
        type: 'paragraph',
        text: 'In OFF32 scegliere con chi lavorare fa parte del progetto. Se visione, ascolto e fiducia stanno dalle due parti, il lavoro dura di più e si sta meglio mentre lo si fa.',
      },
      {
        type: 'paragraph',
        text: 'Un buon rapporto è fatto di tempi realistici e del riconoscimento di quello che c’è dietro un’idea. I progetti che partono storti insegnano dove serviva più chiarezza, prima di cominciare.',
      },
      {
        type: 'heading',
        text: 'Conclusione',
      },
      {
        type: 'paragraph',
        text: 'Ogni collaborazione è un incontro tra persone. Conta il risultato, e conta come ci si arriva. Capire presto quando un progetto non è allineato, e dirlo, fa crescere il lavoro: per lo studio e per chi lo commissiona.',
      },
    ],
  },
}

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = ARTICLES[slug]

  if (!article) {
    return (
      <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
        <div style={{ padding: '18vh 8% 20vh' }}>
          <div style={{ ...meta, marginBottom: 16 }}>Blog</div>
          <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-1px', margin: '0 0 20px' }}>Articolo non trovato</h1>
          <a href="/blog" style={{ ...meta, textDecoration: 'none' }}>← Tutti gli articoli</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
      <article>
        <div className="article-back" style={{ padding: '28px 40px 0' }}>
          <a href="/blog" style={{ ...meta, textDecoration: 'none' }}>← Blog</a>
        </div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(42px, 5.4vw, 76px)', lineHeight: 0.95, letterSpacing: '-1.5px', margin: '18px 0 0', borderTop: LINE, borderBottom: LINE, padding: '22px 40px' }}>
          {article.title}
        </h1>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: '16px 40px', ...meta }}>
          <span style={{ color: '#fe3812' }}>{article.tag}</span>
          <span>{article.date}</span>
          <span>{article.readTime}</span>
          <a href={article.author.href} style={{ color: 'inherit' }}>{article.author.name}</a>
        </div>
        {article.image && (
          <figure style={{ margin: 0, borderTop: LINE, borderBottom: LINE }}>
            <img src={article.image} alt={article.imageAlt ?? ''} width={article.imageWidth} height={article.imageHeight} style={{ width: '100%', height: 'auto', maxHeight: 560, objectFit: 'cover', display: 'block' }} />
          </figure>
        )}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
          {article.content.map((block, i) => {
            if (block.type === 'intro') {
              return (
                <p key={i} style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(26px, 3vw, 34px)', lineHeight: 1.25, letterSpacing: '-0.4px', margin: '0 0 28px' }}>
                  {block.text}
                </p>
              )
            }
            if (block.type === 'paragraph') {
              return (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 22px' }}>
                  {withLinks(block.text, block.links)}
                </p>
              )
            }
            if (block.type === 'heading') {
              return (
                <h2 key={i} style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(28px, 3vw, 36px)', letterSpacing: '-0.6px', lineHeight: 1.15, margin: '40px 0 16px' }}>
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={i} style={{ margin: '36px 0', padding: '4px 0 4px 20px', borderLeft: '2px solid #fe3812' }}>
                  <p style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.25, letterSpacing: '-0.4px', margin: 0 }}>
                    {block.text}
                  </p>
                </blockquote>
              )
            }
            return null
          })}
          <div style={{ marginTop: 48, paddingTop: 20, borderTop: LINE, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={meta}><a href={article.author.href} style={{ color: 'inherit' }}>{article.author.name}</a> · {article.author.role}</span>
            <a href="/blog" style={{ ...meta, textDecoration: 'none' }}>← Tutti gli articoli</a>
          </div>
        </div>
      </article>

      <ProjectStart />

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ ...meta, textDecoration: 'none' }}>{link.label}</a>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .article-back { padding-top: 96px !important; }
        }
        @media (max-width: 860px) {
          article { padding-bottom: 72px; }
        }
      `}</style>
    </main>
  )
}
