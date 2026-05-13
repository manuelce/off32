'use client'
import { use } from 'react'
import Navbar from '@/components/Navbar'

const ARTICLES: Record<string, any> = {
  'scegliere-clienti-giusti': {
    title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti',
    tag: 'Community',
    tagColor: '#534AB7',
    tagBg: '#EEEDFE',
    date: 'Feb 2025',
    readTime: '5 min',
    author: { initials: 'MC', name: 'Manuel Cerasuolo', role: 'Founder · OFF32', bg: '#FDF0EB', color: '#993C1D' },
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
      <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <div style={{ textAlign: 'center' as const }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>404</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0D0D0D', marginBottom: '8px' }}>Articolo non trovato</div>
          <a href="/blog" style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none' }}>
            Torna al blog →
          </a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
      <Navbar />

      {/* HERO ARTICOLO */}
      <div style={{ background: '#0D0D0D', padding: '64px 5% 56px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <a href="/blog" style={{ fontSize: '11px', color: '#444', textDecoration: 'none', letterSpacing: '0.5px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
            ← blog
          </a>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '10px', padding: '4px 12px', background: article.tagBg, color: article.tagColor, borderRadius: '999px', fontWeight: 700, letterSpacing: '0.5px' }}>{article.tag}</span>
            <span style={{ fontSize: '10px', color: '#444', letterSpacing: '1px' }}>{article.date} · {article.readTime} lettura</span>
          </div>
          <h1 style={{
            fontFamily: "'Canela', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-1.5px',
            marginBottom: '24px'
          }}>{article.title}</h1>
          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>{article.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px', borderTop: '1px solid #1C1C1C' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: article.author.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: article.author.color, flexShrink: 0 }}>
              {article.author.initials}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ddd' }}>{article.author.name}</div>
              <div style={{ fontSize: '11px', color: '#444' }}>{article.author.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENUTO */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 5% 80px' }}>
        {article.content.map((block: any, i: number) => {
          if (block.type === 'intro') {
            return (
              <p key={i} style={{ fontSize: '20px', color: '#0D0D0D', lineHeight: 1.7, fontWeight: 500, marginBottom: '32px', letterSpacing: '-0.2px' }}>
                {block.text}
              </p>
            )
          }
          if (block.type === 'paragraph') {
            return (
              <p key={i} style={{ fontSize: '16px', color: '#444', lineHeight: 1.85, marginBottom: '24px' }}>
                {block.text}
              </p>
            )
          }
          if (block.type === 'heading') {
            return (
              <h2 key={i} style={{
                fontFamily: "'Canela', Georgia, serif",
                fontSize: '28px', fontWeight: 300,
                color: '#0D0D0D', letterSpacing: '-0.5px',
                lineHeight: 1.2, marginTop: '48px', marginBottom: '20px'
              }}>
                {block.text}
              </h2>
            )
          }
          if (block.type === 'quote') {
            return (
              <div key={i} style={{ borderLeft: '3px solid #fe3812', paddingLeft: '24px', margin: '36px 0', background: '#fff', borderRadius: '0 8px 8px 0', padding: '20px 24px' }}>
                <p style={{ fontSize: '18px', color: '#0D0D0D', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500 }}>
                  &ldquo;{block.text}&rdquo;
                </p>
              </div>
            )
          }
          return null
        })}

        {/* FOOTER ARTICOLO */}
        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #E0D8CC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: article.author.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: article.author.color }}>
              {article.author.initials}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D' }}>{article.author.name}</div>
              <div style={{ fontSize: '11px', color: '#AAA098' }}>{article.author.role}</div>
            </div>
          </div>
          <a href="/blog" style={{ fontSize: '12px', color: '#fe3812', textDecoration: 'none', fontWeight: 700, border: '1px solid #fe381230', padding: '10px 20px', borderRadius: '999px', background: '#FDF5F2' }}>
            ← tutti gli articoli
          </a>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', background: '#0D0D0D', borderRadius: '16px', padding: '40px', textAlign: 'center' as const }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#444', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// unisciti all&apos;officina</div>
          <h3 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: '28px', fontWeight: 300, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '16px' }}>
            Sei un professionista di qualità?
          </h3>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '28px', lineHeight: 1.7 }}>
            Entra nel network OFF32 — solo chi ha dimostrato di saper fare.
          </p>
          <a href="/apply" style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '13px 32px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            Candidati ora →
          </a>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          main { padding-bottom: 72px; }
        }
      `}</style>
    </main>
  )
}
