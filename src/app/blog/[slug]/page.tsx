'use client'
import { use, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

type Block = { type: 'intro' | 'paragraph' | 'heading' | 'quote'; text: string }

type Article = {
  title: string
  tag: string
  date: string
  readTime: string
  author: { name: string; role: string }
  excerpt: string
  image?: string
  content: Block[]
}

const ARTICLES: Record<string, Article> = {
  'come-costruire-brand-digitale': {
    title: 'Come costruire un brand digitale che dura nel tempo',
    tag: 'Design',
    date: 'Mar 2025',
    readTime: '6 min',
    author: { name: 'Manuel Cerasuolo', role: 'Founder · OFF32' },
    excerpt: 'Il brand non è un logo. È la promessa che fai ogni giorno a chi ti sceglie. Il segno grafico la rende visibile. Se la promessa è confusa, un marchio nuovo non la sistema.',
    image: '/blog/img/brand-digitale.jpg?v=2',
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
    readTime: '6 min',
    author: { name: 'Manuel Cerasuolo', role: 'Founder · OFF32' },
    excerpt: 'Un negozio converte quando l\'offerta è chiara, la pagina è veloce e il checkout non chiede sforzo. Il resto è rumore.',
    image: '/blog/img/ecommerce-2025.jpg',
    content: [
      {
        type: 'intro',
        text: 'Nel 2025 si parla di stack, di edge, di intelligenza artificiale nel carrello. Quello che muove un ordine è più semplice, e più difficile: una persona capisce subito cosa compra, si fida, e arriva a pagare senza fermarsi.',
      },
      {
        type: 'paragraph',
        text: 'Il resto è contorno. Un tema nuovo, un\'app, una funzione in più non riparano un\'offerta confusa. Un e-commerce performante è un negozio in cui comprare non richiede di pensarci due volte.',
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
        text: 'Una buona pagina prodotto dice tre cose senza farle cercare: cos\'è, per chi è, cosa succede dopo il pagamento. Foto che mostrano l\'oggetto vero, non solo l\'atmosfera. Testo corto. Varianti leggibili. Il prezzo visibile prima dello scroll infinito.',
      },
      {
        type: 'heading',
        text: 'La velocità si sente',
      },
      {
        type: 'paragraph',
        text: 'Sul telefono l\'attesa si sente, non si legge in una dashboard. Immagini pesanti, script di troppo, un tema che carica tutto anche quando non serve. Togliere pesa più che aggiungere. Una pagina che compare subito vale più di una animazione che arriva tardi.',
      },
      {
        type: 'paragraph',
        text: 'Core Web Vitals contano per questo, non come voto da esibire. Se la pagina prodotto è lenta, il resto del lavoro di comunicazione arriva a una porta chiusa.',
      },
      {
        type: 'heading',
        text: 'Il checkout è un corridoio',
      },
      {
        type: 'paragraph',
        text: 'Ogni campo in più è una porta. Account obbligatorio prima di pagare, spese che compaiono all\'ultimo, un bottone che non dice il totale. Il checkout che funziona è corto e dice la verità subito: quanto costa, quando arriva, come si paga.',
      },
      {
        type: 'quote',
        text: 'Un e-commerce performante non è quello con più funzioni. È quello in cui comprare non richiede di pensarci due volte.',
      },
      {
        type: 'heading',
        text: 'L\'AI nel negozio',
      },
      {
        type: 'paragraph',
        text: 'Descrizioni, varianti di copy, foto di contesto: l\'AI accelera i materiali. Non sostituisce l\'offerta. Se il prodotto non è chiaro, nessuna automazione lo rende desiderabile. Da noi entra dopo che sappiamo cosa vendere e a chi, non prima.',
      },
      {
        type: 'heading',
        text: 'Cosa guardare dopo il lancio',
      },
      {
        type: 'paragraph',
        text: 'Poche cose. Dove le persone abbandonano. Quali prodotti arrivano al carrello e non si chiudono. Quanto tempo passa prima che la pagina sia usabile. Non una dashboard infinita. Tre segnali, guardati spesso, bastano per capire se il negozio sta lavorando.',
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
    title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti',
    tag: 'Community',
    date: 'Feb 2025',
    readTime: '5 min',
    author: { name: 'Manuel Cerasuolo', role: 'Founder · OFF32' },
    excerpt: 'Non tutti i clienti sono giusti per noi. Dire no — ai progetti sbagliati o ai clienti difficili — è una delle decisioni più professionali che possiamo prendere.',
    content: [
      {
        type: 'intro',
        text: 'Nel mondo del design, dello sviluppo web e della comunicazione si parla tanto di clienti, ma raramente si affronta un tema cruciale: non tutti i clienti sono giusti per noi.',
      },
      {
        type: 'paragraph',
        text: 'All\'inizio della carriera si tende a dire sempre "sì", a lavorare con chiunque capiti, convinti che ogni progetto sia un\'occasione. Ma col tempo si capisce che dire "no" — ai progetti sbagliati o ai clienti difficili — è una delle decisioni più professionali ed evolute che possiamo prendere.',
      },
      {
        type: 'heading',
        text: 'Quando la collaborazione diventa un percorso a ostacoli',
      },
      {
        type: 'paragraph',
        text: 'Ogni professionista prima o poi si trova davanti a situazioni che mettono alla prova la pazienza e la visione del proprio lavoro. Ho incontrato clienti che hanno consegnato testi e fotografie con mesi di ritardo, pretendendo poi che il sito fosse online "subito". Oppure che, nonostante gli accordi chiari, abbiano messo in dubbio l\'impegno e la qualità del lavoro fatto.',
      },
      {
        type: 'paragraph',
        text: 'Questi episodi accadono spesso quando manca chiarezza e rispetto reciproco. E non è una questione di "colpa", ma di comunicazione. Un progetto di successo nasce sempre da collaborazione, fiducia e responsabilità condivisa.',
      },
      {
        type: 'heading',
        text: 'Riconoscere i segnali (e fidarsi del proprio istinto)',
      },
      {
        type: 'paragraph',
        text: 'Nel tempo ho imparato che i segnali di un cliente difficile si notano quasi sempre già nelle prime fasi di un rapporto di lavoro.',
      },
      {
        type: 'quote',
        text: 'I segnali sono sempre lì. Ignorarli significa compromettere non solo la serenità del lavoro, ma anche la qualità del risultato.',
      },
      {
        type: 'paragraph',
        text: 'Ricordo un incontro con un imprenditore del Teramano, a capo di un\'azienda di famiglia. Durante la nostra conversazione notai un atteggiamento poco rispettoso verso i suoi collaboratori. In particolare, si rivolse ad un giovane grafico con tono ironico ma umiliante, per una banalità — "la penna dimenticata" — un gesto che può sembrare piccolo, ma che racconta molto. Da quel momento, avevo già intuito che quel contesto non avrebbe facilitato una collaborazione serena.',
      },
      {
        type: 'paragraph',
        text: 'In un\'altra esperienza, un cliente di un oleificio, sempre in Abruzzo, amava scherzare dicendo di aver "fatto il bonifico", quando in realtà non era vero. All\'inizio ci ridi sopra, poi capisci che quel modo di fare, reiterato per mesi, nasconde mancanza di rispetto e trasparenza.',
      },
      {
        type: 'heading',
        text: 'Selezionare i progetti è una forma di rispetto',
      },
      {
        type: 'paragraph',
        text: 'Dire "no" non è arroganza: è professionalità. È rispetto per il proprio tempo, per il team e per la qualità del lavoro che si vuole offrire.',
      },
      {
        type: 'paragraph',
        text: 'Noi in OFF32 abbiamo imparato che scegliere i clienti giusti è parte integrante del processo creativo. Collaborare con persone che condividono visione, rispetto e fiducia genera progetti migliori, relazioni più durature e un ambiente di lavoro sereno e motivante.',
      },
      {
        type: 'paragraph',
        text: 'Un buon cliente sa ascoltare, sa aspettare e soprattutto riconosce il valore del lavoro che c\'è dietro ogni idea. Gli altri, spesso, ci insegnano qualcosa di ancora più prezioso: dove non vogliamo più tornare.',
      },
      {
        type: 'heading',
        text: 'Conclusione',
      },
      {
        type: 'paragraph',
        text: 'In fondo, ogni collaborazione è un incontro tra persone. E come in ogni relazione, la differenza non la fa solo il risultato finale, ma il percorso per arrivarci. Capire quando dire "no", fidarsi dei propri segnali e scegliere partner che condividono la stessa etica è ciò che permette di crescere — come studio, come professionista e come persona.',
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
        <Navbar />
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
      <Navbar />

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
          <span>{article.author.name}</span>
        </div>
        {article.image && (
          <figure style={{ margin: 0, borderTop: LINE, borderBottom: LINE }}>
            <img src={article.image} alt="" style={{ width: '100%', height: 'auto', maxHeight: 560, objectFit: 'cover', display: 'block' }} />
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
                  {block.text}
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
            <span style={meta}>{article.author.name} · {article.author.role}</span>
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
        <span style={meta}>connect@off32.it · © 2025 OFF32</span>
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
