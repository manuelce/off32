'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'
import SkillTag from '@/components/SkillTag'

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'

function ProjectRow({ title, category, href, image }: { title: string, category: string, href: string, image: string }) {
  return (
    <a className="project-row" href={href}>
      <span className="project-meta">{category}</span>
      <span className="project-title">{title}</span>
      <span className="project-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M8 6h10v10" />
          <path d="M18 6L6 18" />
        </svg>
      </span>
      <span className="project-preview">
        <img src={image} alt="" />
      </span>
    </a>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scanNote, setScanNote] = useState(false)
  const [underlineOn, setUnderlineOn] = useState(false)
  const underlinePlayed = useRef(false)
  const underlineRef = useRef<HTMLImageElement>(null)

  function startUnderline() {
    if (underlinePlayed.current) return
    underlinePlayed.current = true
    requestAnimationFrame(() => setUnderlineOn(true))
  }

  useEffect(() => {
    const img = underlineRef.current
    if (img?.complete && img.naturalWidth > 0) startUnderline()
  }, [])

  const services = [
    {
      tag: '/ brand & creative',
      items: ['Brand Identity', 'Brand Strategy', 'Visual Language', 'Creative Direction', 'AI Copywriting', 'Content Creation'],
    },
    {
      tag: '/ web & digital',
      items: ['Web Design', 'Development React / Next.js', 'E-commerce Shopify', 'Landing Pages', 'UX / UI Design', 'Performance & SEO'],
    },
    {
      tag: '/ AI systems',
      items: ['AI Strategy', 'AI Automation', 'AI Agents', 'AI Assistants', 'AI Workflows', 'AI Integration'],
    },
  ]

  const works = [
    { title: 'Healing Earth Italia', category: 'eCommerce · Brand', href: '/work/healing-earth', image: '/works/healing-earth/preview.jpg' },
    { title: 'Scuppoz', category: 'Web Design', href: '/work/scuppoz', image: '/works/scuppoz/pecore.webp' },
    { title: 'Conil Food Tour', category: 'Brand · eCommerce', href: '/work/conil-food-tour', image: '/works/conil-food-tour/laptop.webp' },
    { title: 'The Duel', category: 'Editorial', href: '/work/duel', image: '/works/duel/cover.jpg' },
  ]

  const faqs = [
    {
      q: 'Come funziona l\'AI nella vostra agenzia?',
      a: 'L\'AI entra nel lavoro, non al posto del lavoro. La usiamo per esplorare, scrivere bozze, produrre varianti e togliere i passaggi ripetitivi. La direzione — cosa tenere, cosa dire, cosa pubblicare — resta del team.',
    },
    {
      q: 'Quali servizi offrite?',
      a: 'Tre aree. Brand e creatività: identità, strategia, direzione visiva, copy e contenuti. Web e digitale: siti in React e Next.js, e-commerce Shopify, landing, UX/UI, performance e SEO. Sistemi AI: strategia, automazioni, agenti, assistenti e integrazione nei flussi che usate già.',
    },
    {
      q: 'Quanto costano i vostri servizi?',
      a: 'Non c\'è un listino unico. Il costo dipende da cosa va fatto e da quanto è largo il perimetro. Dopo una prima conversazione prepariamo una proposta chiara, prima di iniziare.',
    },
    {
      q: 'Lavorate con aziende di qualsiasi dimensione?',
      a: 'Lavoriamo con chi ha una storia da mettere in ordine: studi, brand e aziende. La dimensione conta meno della chiarezza del progetto. Se il lavoro ha senso, lo prendiamo in carico.',
    },
    {
      q: 'Come inizia una collaborazione?',
      a: 'Ci scrivi dalla pagina Contatti e ci racconti il progetto. Ascoltiamo, capiamo cosa serve davvero e ti rispondiamo con una direzione e i passi successivi.',
    },
    {
      q: 'Quanto tempo richiede un progetto?',
      a: 'Dipende da cosa costruiamo. Una landing è una cosa, un\'identità con sito ed e-commerce un\'altra. Nella proposta indichiamo tempi realistici, non una data di comodo.',
    },
    {
      q: 'Offrite supporto dopo il lancio?',
      a: 'Sì. Un sito o un brand non finiscono il giorno della pubblicazione. Restiamo per aggiornamenti e per tenere in piedi quello che abbiamo costruito, con un accordo definito insieme.',
    },
    {
      q: 'Posso vedere esempi di lavori precedenti?',
      a: 'Sì. In Work trovi una selezione: Healing Earth, Scuppoz, Conil Food Tour e The Duel. Se vuoi vedere qualcosa vicino al tuo settore, scrivici.',
    },
  ]

  return (
    <main style={{ background: CREAM, minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
      <Navbar />

      <section className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '88px 1fr minmax(280px, 36%)', minHeight: 'calc(100vh - 58px)', borderBottom: LINE }}>
        <div style={{ borderRight: LINE, padding: '28px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={meta}>01</span>
          <span style={{ ...meta, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Est. 2025</span>
        </div>
        <div className="hero-copy" style={{ padding: '48px 40px 14vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ ...meta, color: '#fe3812', marginBottom: 20 }}>Officina digitale</div>
          <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(48px, 6.4vw, 92px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-2px', maxWidth: 760, marginBottom: 28 }}>
            <span className="street-word">
              Comunicazione
              <img
                ref={underlineRef}
                src="/underline-street.png"
                alt=""
                className={underlineOn ? 'street-underline is-on' : 'street-underline'}
                onLoad={startUnderline}
              />
            </span>
            {' '}digitale potenziata dall&apos;intelligenza.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 460, color: '#3a3a3a' }}>
            OFF32 integra l&apos;intelligenza artificiale nella creazione di brand, esperienze digitali e campagne. Una comunicazione orientata alla performance.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            <a href="/work" style={button}>Works</a>
            <a href="/workshop" style={{ ...button, boxShadow: '3px 3px 0 #694aff' }}>Events</a>
          </div>
        </div>
        <div style={{ borderLeft: LINE, position: 'relative', minHeight: 420, background: '#E7E0D4' }}>
          <video autoPlay muted loop playsInline preload="metadata" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/train_small.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33%', width: 1, background: 'rgba(240,235,224,0.45)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', height: 1, background: 'rgba(240,235,224,0.45)' }} />
        </div>
      </section>

      <div className="meta-row">
        {['Est. 2025', '( Scroll )', 'AI Powered', 'Officina®'].map(item => (
          <div key={item}>{item}</div>
        ))}
      </div>

      <section id="services" className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: LINE }}>
        {services.map((service, i) => (
          <div key={service.tag} style={{ padding: '36px 28px 28px', borderRight: i < 2 ? LINE : 'none' }}>
            <div style={{ ...meta, marginBottom: 8 }}>0{i + 1}</div>
            <SkillTag label={service.tag} />
            {service.items.map(item => (
              <div key={item} style={{ fontSize: 14, padding: '8px 0', color: '#3a3a3a' }}>{item}</div>
            ))}
          </div>
        ))}
      </section>

      <section className="ai-scan" style={{ padding: '15% 40px calc(15% + 10px)' }}>
        <div className="ai-scan-card">
          <div style={{ ...meta, color: '#fe3812', marginBottom: 14 }}>Tool AI · in sviluppo</div>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 0.95, letterSpacing: '-1px', margin: '0 0 16px' }}>
            Analizza il tuo sito, gratis.
          </h2>
          <p style={{ margin: '0 auto', fontSize: 15, lineHeight: 1.7, color: '#3a3a3a', maxWidth: 460 }}>
            Stiamo sviluppando un tool AI per i clienti. Inserisci la stringa del tuo sito web e analizzalo gratuitamente.
          </p>
          <form
            onSubmit={event => {
              event.preventDefault()
              setScanNote(true)
            }}
            style={{ marginTop: 28 }}
          >
            <label htmlFor="site-url" style={{ ...meta, display: 'block', marginBottom: 10 }}>Il tuo sito</label>
            <div style={{ display: 'flex', border: LINE, background: CREAM }}>
              <input
                id="site-url"
                name="site"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="iltuosito.it"
                style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', padding: '16px 16px', fontFamily: 'inherit', fontSize: 15, color: '#0D0D0D', outline: 'none', textAlign: 'center' }}
              />
              <button type="submit" style={{ border: 'none', borderLeft: LINE, background: '#0D0D0D', color: CREAM, padding: '16px 18px', fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.8px', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Analizza
              </button>
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 13, lineHeight: 1.5, color: '#3a3a3a' }}>
              {scanNote ? 'Il tool è in sviluppo. L’analisi sarà gratuita per i clienti.' : 'Gratuito per i clienti · disponibile a breve.'}
            </p>
          </form>
        </div>
      </section>

      <section id="works">
        <div className="project-head">Lavori selezionati</div>
        <div className="project-list">
          {works.map(work => (
            <ProjectRow key={work.href} {...work} />
          ))}
          <a className="project-all" href="/work">Tutti i lavori →</a>
        </div>
      </section>

      <section style={{ padding: '15% 8% 0', textAlign: 'center' }}>
        <div style={{ ...meta, color: '#fe3812', marginBottom: 16 }}>Manifesto</div>
        <h2 style={{ ...heading, maxWidth: 640, margin: '0 auto 20px' }}>Amiamo i dettagli. L&apos;AI li amplifica.</h2>
        <p style={{ ...body, margin: '0 auto' }}>C&apos;è qualcosa di profondo nel rispetto al lavoro. È la spinta a costruire esperienze che durano nel tempo, a creare qualcosa che diventa indimenticabile.</p>
        <p style={{ ...body, margin: '14px auto 28px' }}>In OFF32 — officina digitale di comunicazione AI — ascoltiamo la storia del tuo brand e la trasformiamo in impatto reale, usando l&apos;intelligenza artificiale come strumento, non come scorciatoia.</p>
        <a href="/about" style={button}>Scopri il manifesto →</a>
      </section>

      <section style={{ width: '80%', margin: '0 auto', paddingTop: '15%', paddingBottom: '15%' }}>
        <div style={{ borderLeft: LINE, borderRight: LINE, borderTop: LINE, borderBottom: LINE }}>
          <h2 style={{ ...heading, fontSize: 'clamp(32px, 4vw, 48px)', padding: '28px', borderBottom: LINE }}>Blog</h2>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, padding: 28 }}>
          {[
            { tag: 'Design', title: 'Come costruire un brand digitale che dura nel tempo', slug: 'come-costruire-brand-digitale', image: '/blog/img/brand-digitale.jpg?v=2', bg: '#0A1510' },
            { tag: 'Community', title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti', slug: 'scegliere-clienti-giusti', image: '/blog/img/client_s.webp', bg: '#12102A' },
          ].map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#0D0D0D', border: LINE, background: '#fff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 210, background: post.bg, borderBottom: LINE, overflow: 'hidden' }}>
                {post.image && <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              </div>
              <div style={{ padding: '16px 16px 14px', borderBottom: LINE }}>
                <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, textDecoration: 'underline', textUnderlineOffset: 3 }}>{post.title}</div>
                <div style={{ marginTop: 10, fontSize: 12, letterSpacing: '0.4px', color: '#7a746c' }}>{post.tag}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px' }}>
                <span style={{ fontSize: 14 }}>Leggi articolo</span>
                <span style={{ width: 34, height: 34, border: LINE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>↗</span>
              </div>
            </a>
          ))}
        </div>
        <div style={{ padding: '0 28px 28px' }}>
          <a href="/blog" style={button}>Il nostro Blog</a>
        </div>
        </div>
      </section>

      <section style={{ paddingBottom: '15%' }}>
        <div style={{ textAlign: 'center', padding: '48px 28px 32px' }}>
          <div style={{ ...meta, marginBottom: 12 }}>FAQ</div>
          <h2 style={{ ...heading, fontSize: 'clamp(32px, 4vw, 48px)' }}>Domande frequenti</h2>
        </div>
        <div style={{ width: '80%', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={faq.q} style={{ borderTop: LINE, borderBottom: i === faqs.length - 1 ? LINE : 'none' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: '#0D0D0D', fontFamily: 'inherit', padding: '18px 0', fontSize: 15 }}
              >
                <span>{faq.q}</span>
                <span style={{ fontSize: 20, color: '#8a8378' }}>{openFaq === i ? '–' : '+'}</span>
              </button>
              {openFaq === i && (
                <p style={{ ...body, maxWidth: 680, padding: '0 0 18px' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <ProjectStart />

      <footer className="footer-row" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ ...meta, textDecoration: 'none', color: '#0D0D0D' }}>{link.label}</a>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2025 OFF32</span>
      </footer>

      <style>{`
        .street-word { position: relative; display: inline-block; }
        .street-underline {
          position: absolute;
          left: -1%;
          bottom: 0.02em;
          width: 104%;
          height: 0.22em;
          object-fit: fill;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
          will-change: clip-path;
        }
        .street-underline.is-on {
          animation: street-draw 0.7s linear 1 forwards;
        }
        @keyframes street-draw {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .street-underline { animation: none; clip-path: none; }
        }
        .meta-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #0D0D0D;
          --meta-inset: 24px;
        }
        .meta-row > div {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #0D0D0D;
          padding: 14px 0;
          text-align: center;
          white-space: nowrap;
        }
        .meta-row > div:first-child { text-align: left; padding-left: var(--meta-inset); }
        .meta-row > div:last-child { text-align: right; padding-right: var(--meta-inset); }
        .ai-scan-card {
          width: 60%;
          margin: 0 auto;
          text-align: center;
          background: #F0EBE0;
          border: 1px solid #0D0D0D;
          box-shadow: 10px 10px 0 #0D0D0D;
          padding: 40px 36px 32px;
        }
        .project-head {
          padding: 22px 28px;
          border-top: 1px solid #0D0D0D;
          border-bottom: 1px solid #0D0D0D;
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #0D0D0D;
        }
        .project-list {
          border-bottom: 1px solid #0D0D0D;
        }
        .project-row {
          position: relative;
          display: grid;
          grid-template-columns: 132px minmax(0, 1fr) 22px;
          align-items: center;
          column-gap: 28px;
          min-height: 92px;
          padding: 20px 28px;
          color: #111;
          text-decoration: none;
          border-bottom: 1px solid #0D0D0D;
          transition: background 0.2s ease, color 0.2s ease, border-radius 0.2s ease, min-height 0.22s ease;
        }
        .project-meta {
          font-size: 12px;
          line-height: 1.35;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6b6b6b;
        }
        .project-title {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 4.4vw, 56px);
          line-height: 1.15;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: padding-left 0.22s ease;
        }
        .project-icon {
          display: grid;
          place-items: center;
          color: #6b6b6b;
        }
        .project-preview {
          position: absolute;
          left: 156px;
          top: 50%;
          width: 168px;
          height: 104px;
          transform: translateY(-50%);
          border-radius: 8px;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
          transition: opacity 0.18s ease;
          z-index: 2;
        }
        .project-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .project-row:hover,
        .project-row.is-on {
          background: #111;
          color: #f4f1ea;
          border-radius: 0;
          border-bottom-color: transparent;
          min-height: 132px;
          z-index: 1;
        }
        .project-row:hover .project-meta,
        .project-row.is-on .project-meta,
        .project-row:hover .project-icon,
        .project-row.is-on .project-icon {
          color: #cfcfcf;
        }
        .project-row:hover .project-title,
        .project-row.is-on .project-title {
          padding-left: 184px;
        }
        .project-row:hover .project-preview,
        .project-row.is-on .project-preview {
          opacity: 1;
        }
        .project-all {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          min-height: 64px;
          margin: 0;
          padding: 0 28px;
          color: #0D0D0D;
          text-decoration: none;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }
        @media (max-width: 860px) {
          .ai-scan { padding-left: 20px !important; padding-right: 28px !important; }
          .ai-scan-card { width: 100%; padding: 28px 20px 24px; box-shadow: 7px 7px 0 #0D0D0D; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > :first-child { display: none !important; }
          .hero-copy { padding: 112px 28px 48px !important; }
          .hero-grid > :last-child { border-left: none !important; min-height: 280px !important; border-top: 1px solid #0D0D0D; }
          .grid-3, .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 > div { border-right: none !important; border-left: none !important; }
          .project-head { padding-left: 16px; padding-right: 16px; }
          .project-row {
            grid-template-columns: minmax(0, 1fr) 22px;
            column-gap: 12px;
            min-height: 0;
            padding: 16px;
          }
          .project-meta { grid-column: 1; }
          .project-title { grid-column: 1; font-size: 30px; }
          .project-icon { grid-column: 2; grid-row: 1 / span 2; }
          .project-preview { display: none; }
          .project-all { padding-left: 16px; padding-right: 16px; }
          .project-row:hover,
          .project-row.is-on {
            background: transparent;
            color: #111;
            border-radius: 0;
            border-bottom-color: #0D0D0D;
            min-height: 0;
          }
          .project-row:hover .project-meta,
          .project-row.is-on .project-meta,
          .project-row:hover .project-icon,
          .project-row.is-on .project-icon { color: #6b6b6b; }
          .meta-row { --meta-inset: 16px; }
          .meta-row > div { font-size: 9px; letter-spacing: 0.6px; padding-top: 12px; padding-bottom: 12px; }
          .grid-3 > div, .grid-2 > a { border-bottom: 1px solid #0D0D0D; }
          .grid-3 > div:last-child, .grid-2 > a:last-child { border-bottom: none; }
          main { padding-bottom: 88px; }
          h1 { font-size: 42px !important; letter-spacing: -1px !important; }
        }
      `}</style>
    </main>
  )
}

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const heading: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontSize: 'clamp(36px, 4vw, 56px)',
  fontWeight: 300,
  letterSpacing: '-1px',
  lineHeight: 1.02,
}

const body: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.75,
  color: '#3a3a3a',
  maxWidth: 520,
}

const button: CSSProperties = {
  display: 'inline-block',
  border: LINE,
  color: '#0D0D0D',
  textDecoration: 'none',
  fontSize: 12,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  padding: '14px 22px',
  background: 'transparent',
}
