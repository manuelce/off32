'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, delay = 0, y = 32 }: { children: React.ReactNode, delay?: number, y?: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// Placeholder media — video o immagine
function MediaBlock({ src, type = 'image', aspect = '16/9', bg = '#111' }: {
  src?: string, type?: 'video' | 'image', aspect?: string, bg?: string
}) {
  if (type === 'video' && src) {
    return (
      <div style={{ position: 'relative', aspectRatio: aspect, borderRadius: '8px', overflow: 'hidden', background: bg }}>
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    )
  }
  return (
    <div style={{
      aspectRatio: aspect, borderRadius: '8px', overflow: 'hidden',
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {src ? (
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase', fontFamily: 'monospace' }}>
          media placeholder
        </span>
      )}
    </div>
  )
}

export default function HealingEarthPage() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <main style={{
      background: '#F0EBE0', minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      color: '#0D0D0D',
    }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ background: '#0D0D0D', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
        {/* video di sfondo opzionale */}
        <video autoPlay muted loop playsInline style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.25, zIndex: 0,
          transform: `translateY(${scrollY * 0.2}px)`,
        }}>
          {/* sostituisci con il tuo video */}
          <source src="/works/healing-earth.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#555', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '32px' }}>
              <a href="/work" style={{ color: '#555', textDecoration: 'none' }}>← Work</a>
              <span style={{ margin: '0 12px' }}>/</span>
              <span>eCommerce · Brand</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 0.95, letterSpacing: '-3px',
              marginBottom: '40px', textTransform: 'uppercase',
            }}>
              HEALING<br />EARTH<br />
              <span style={{ color: '#9fff00' }}>ITALIA</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
            }}>
              Un eCommerce di wellness italiano trasformato in una macchina da conversioni, con un&apos;identità visiva coerente e campagne AI-driven che funzionano davvero.
            </p>
          </FadeIn>

          {/* meta info */}
          <FadeIn delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0',
              borderTop: '1px solid #1C1C1C', paddingTop: '32px', width: 'fit-content',
            }} className="meta-grid">
              {[
                { label: 'Location', value: 'Italia' },
                { label: 'Settore', value: 'Wellness · eCommerce' },
                { label: 'Cosa abbiamo fatto', value: 'Brand, Web, Marketing AI' },
              ].map((m, i) => (
                <div key={i} style={{ paddingRight: '48px', marginRight: '48px', borderRight: i < 2 ? '1px solid #1C1C1C' : 'none' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#444', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'monospace' }}>{m.label}</div>
                  <div style={{ fontSize: '14px', color: '#ccc', fontWeight: 500 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INTRO TESTO ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="grid-2-col">

          <FadeIn y={24}>
            <p style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              fontWeight: 300, color: '#0D0D0D',
              lineHeight: 1.4, letterSpacing: '-0.5px',
            }}>
              Abbiamo aiutato Healing Earth Italia a trasformare il proprio eCommerce da vetrina statica a piattaforma di vendita performante, ridisegnando l&apos;esperienza utente e potenziando ogni touchpoint con l&apos;AI.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { title: 'La Sfida', text: 'Il brand aveva un prodotto eccellente ma un eCommerce che non convertiva. Layout confuso, nessuna strategia di acquisizione, identità visiva debole sui social. Il tasso di abbandono del carrello era oltre il 78%.' },
                { title: 'La Strategia', text: 'Partire dal brand — ridefinire il visual language e il tono di voce. Poi ricostruire l\'eCommerce con focus su conversione e performance. Infine, attivare campagne Meta Ads con creativi generati e ottimizzati con AI.' },
                { title: 'La Soluzione', text: 'Nuovo sito Shopify custom con UX ottimizzata, sistema di brand completo, campagne Meta con ROAS 4.2x, email automation e contenuti AI-assisted. Risultato: +40% conversioni in 30 giorni.' },
              ].map((block, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: '10px' }}>{block.title}</div>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MEDIA GRANDE ── */}
      <FadeIn>
        <section style={{ padding: '0 5% 8px' }}>
          <MediaBlock src="/works/healing-earth.mp4" type="video" aspect="16/9" bg="#0D0D0D" />
        </section>
      </FadeIn>

      <FadeIn>
        <section style={{ padding: '0 5% 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="grid-2-col">
          <MediaBlock aspect="4/3" bg="#111" />
          <MediaBlock aspect="4/3" bg="#1a1a1a" />
        </section>
      </FadeIn>

      {/* ── SEZIONE 1: BRAND IDENTITY ── */}
      <section style={{ padding: '80px 5%', borderTop: '1px solid #E0D8CC', borderBottom: '1px solid #E0D8CC' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, color: '#0D0D0D',
              lineHeight: 1.1, letterSpacing: '-1px',
              textTransform: 'uppercase',
            }}>
              BRAND<br />IDENTITY
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, maxWidth: '480px' }}>
              Abbiamo ridefinito l&apos;identità visiva del brand partendo dal concept di purezza e connessione con la natura. Palette cromatica, tipografia, iconografia e tono di voce coerenti su tutti i canali — dal packaging alle campagne digitali.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }} className="grid-3-col">
          {[0, 1, 2].map(i => (
            <FadeIn key={i} delay={i * 100}>
              <MediaBlock aspect="3/4" bg={['#0A1510', '#0D1A0D', '#111'][i]} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SEZIONE 2: ECOMMERCE ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC', background: '#0D0D0D' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.1, letterSpacing: '-1px',
              textTransform: 'uppercase',
            }}>
              eCOMMERCE<br />& UX
            </h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, maxWidth: '480px' }}>
              Il nuovo Shopify è stato progettato per convertire. Ogni elemento — dalla hero alla scheda prodotto al checkout — è stato ottimizzato per ridurre l&apos;attrito e aumentare la fiducia dell&apos;utente. Mobile-first, veloce, misurabile.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '8px' }} className="grid-2-col">
          <FadeIn>
            <MediaBlock aspect="16/9" bg="#111" />
          </FadeIn>
          <FadeIn delay={100}>
            <MediaBlock aspect="16/9" bg="#1a1a1a" />
          </FadeIn>
        </div>
        <FadeIn>
          <MediaBlock aspect="21/9" bg="#141414" />
        </FadeIn>
      </section>

      {/* ── SEZIONE 3: MARKETING AI ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, color: '#0D0D0D',
              lineHeight: 1.1, letterSpacing: '-1px',
              textTransform: 'uppercase',
            }}>
              MARKETING<br />AI-DRIVEN
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, maxWidth: '480px' }}>
              Creativi generati e testati con AI, campagne Meta ottimizzate in tempo reale, email automation personalizzata. Ogni euro speso in advertising è tracciato e ottimizzato. ROAS 4.2x nel primo mese di attività.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }} className="grid-2-col">
          {[0, 1].map(i => (
            <FadeIn key={i} delay={i * 100}>
              <MediaBlock aspect="4/3" bg={['#0A0A14', '#120A08'][i]} />
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }} className="grid-3-col">
            {[0, 1, 2].map(i => (
              <MediaBlock key={i} aspect="1/1" bg={['#0D0D0D', '#111', '#141414'][i]} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── RISULTATI ── */}
      <section style={{ padding: '80px 5%', background: '#0D0D0D', borderBottom: '1px solid #1C1C1C' }}>
        <FadeIn>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#444', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '48px' }}>
            // Risultati
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }} className="grid-4-col">
          {[
            { num: '+40%', label: 'Conversioni', sub: 'nei primi 30 giorni' },
            { num: '4.2x', label: 'ROAS', sub: 'campagne Meta Ads' },
            { num: '-62%', label: 'Abbandono carrello', sub: 'rispetto al sito precedente' },
            { num: '30gg', label: 'Time to market', sub: 'dalla brief al lancio' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div style={{ padding: '32px', background: '#111', borderRadius: '8px' }}>
                <div style={{
                  fontFamily: "'Canela', Georgia, serif",
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  fontWeight: 300, color: '#9fff00',
                  letterSpacing: '-2px', lineHeight: 1, marginBottom: '12px',
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ddd', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '11px', color: '#444' }}>{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MEDIA FINALE ── */}
      <FadeIn>
        <section style={{ padding: '8px 5% 0' }}>
          <MediaBlock aspect="21/9" bg="#0A1510" />
        </section>
      </FadeIn>

      {/* ── CTA PROSSIMO PROGETTO ── */}
      <FadeIn>
        <section style={{ padding: '80px 5%', background: '#fe3812', textAlign: 'center' as const }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'monospace' }}>
            // Hai un progetto simile?
          </div>
          <h2 style={{
            fontFamily: "'Canela', Georgia, serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '16px',
          }}>
            Parlaci del tuo brand.
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.7 }}>
            Trasformiamo idee in comunicazione che funziona davvero.
          </p>
          <a href="/contatti" style={{
            background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700,
            padding: '14px 40px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px',
          }}>
            SCRIVICI →
          </a>
        </section>
      </FadeIn>

      {/* FOOTER */}
      <footer style={{ background: '#9fff00', padding: '24px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
          <div style={{ display: 'flex', gap: '28px' }}>
            {[
              { label: 'WORK', href: '/work' },
              { label: 'BLOG', href: '/blog' },
              { label: 'PRIVACY', href: '/privacy-policy' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', fontWeight: 600, textDecoration: 'none' }}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['CONNECT@OFF32.IT', '© 2025 OFF32'].map(l => (
              <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .grid-3-col { grid-template-columns: 1fr !important; }
          .grid-4-col { grid-template-columns: 1fr 1fr !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          main { padding-bottom: 0 !important; }
        }
      `}</style>
    </main>
  )
}
