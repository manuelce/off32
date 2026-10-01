'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'
import SkillTag from '@/components/SkillTag'

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'

function VideoCard({ src, image, title, category, tall = false }: { src: string, image?: string, title: string, category: string, tall?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => { setHovered(true); videoRef.current?.play() }}
      onMouseLeave={() => {
        setHovered(false)
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        background: '#E7E0D4', height: tall ? '520px' : '100%', minHeight: tall ? undefined : 240,
      }}
    >
      {image ? (
        <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 46%', opacity: hovered ? 1 : 0.92, transition: 'opacity 0.4s ease' }} />
      ) : (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0.85, transition: 'opacity 0.4s ease' }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.55), transparent 55%)' }} />
      <div style={{ position: 'absolute', top: image ? 10 : 16, left: 16, fontSize: '10px', letterSpacing: '1.6px', textTransform: 'uppercase', color: '#fff' }}>{category}</div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: image ? 36 : 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ fontFamily: "'Canela', Georgia, serif", fontSize: tall ? 32 : 22, fontWeight: 300, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>{title}</div>
        <span style={{ color: '#fff', fontSize: 18 }}>↗</span>
      </div>
    </div>
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
    { src: '/works/healingheartoff32.mp4', title: 'Healing Earth Italia', category: 'eCommerce · Brand', href: '/work/healing-earth', tall: true },
    { src: '/works/scuppoz.mp4', image: '/works/scuppoz/pecore.webp', title: 'Scuppoz', category: 'Web Design', href: '/work/scuppoz' },
    { src: '/works/momento.mp4', image: '/works/conil-food-tour/laptop.webp', title: 'Conil Food Tour', category: 'Brand · eCommerce', href: '/work/conil-food-tour' },
    { src: '/works/duel.mp4', image: '/works/duel/cover.jpg', title: 'The Duel', category: 'Editorial', href: '/work/duel' },
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

      <div className="meta-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: LINE }}>
        {['Est. 2025', '( Scroll )', 'AI Powered', 'Officina®'].map(item => (
          <div key={item} style={{ ...meta, padding: '14px 24px' }}>{item}</div>
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
        <div style={{ padding: '22px 28px', ...meta, borderTop: LINE, borderBottom: LINE }}>Lavori selezionati</div>
        <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: LINE }}>
          <a href={works[0].href} style={{ display: 'block', borderRight: LINE, textDecoration: 'none' }}>
            <VideoCard src={works[0].src} title={works[0].title} category={works[0].category} tall />
          </a>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
            {works.slice(1, 3).map((work, i) => (
              <a key={work.title} href={work.href} style={{ display: 'block', borderBottom: i === 0 ? LINE : 'none', textDecoration: 'none' }}>
                <VideoCard src={work.src} image={'image' in work ? work.image : undefined} title={work.title} category={work.category} />
              </a>
            ))}
          </div>
        </div>
        <div className="split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', borderBottom: LINE }}>
          <a href={works[3].href} style={{ display: 'block', borderRight: LINE, textDecoration: 'none' }}>
            <VideoCard src={works[3].src} image={works[3].image} title={works[3].title} category={works[3].category} />
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 32px', minHeight: 320 }}>
            <div style={meta}>04</div>
            <div>
              <div style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, letterSpacing: '-0.6px', lineHeight: 1.05, marginBottom: 24 }}>
                Vuoi vedere tutti i progetti?
              </div>
              <a href="/work" style={button}>Tutti i lavori →</a>
            </div>
          </div>
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
        .ai-scan-card {
          width: 60%;
          margin: 0 auto;
          text-align: center;
          background: #F0EBE0;
          border: 1px solid #0D0D0D;
          box-shadow: 10px 10px 0 #0D0D0D;
          padding: 40px 36px 32px;
        }
        @media (max-width: 860px) {
          .ai-scan { padding-left: 20px !important; padding-right: 28px !important; }
          .ai-scan-card { width: 100%; padding: 28px 20px 24px; box-shadow: 7px 7px 0 #0D0D0D; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > :first-child { display: none !important; }
          .hero-copy { padding-bottom: 48px !important; }
          .hero-grid > :last-child { border-left: none !important; min-height: 280px !important; border-top: 1px solid #0D0D0D; }
          .meta-row, .grid-3, .grid-2, .split, .works-grid { grid-template-columns: 1fr !important; }
          .meta-row > div, .grid-3 > div, .split > div, .split > a, .split > p, .works-grid > a { border-right: none !important; border-left: none !important; }
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
