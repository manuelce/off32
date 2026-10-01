'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

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

const VIMEO = {
  hero: '1169110852',
  portraits: ['1169115143', '1169115118', '1169115133'],
}

function vimeoSrc(id: string) {
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&dnt=1`
}

const PHOTOS = {
  phoneStand: '/works/healing-earth/phone-stand.webp',
  laptop: '/works/healing-earth/laptop.webp',
  ipad: '/works/healing-earth/ipad.webp',
  laptopSofa: '/works/healing-earth/laptop-sofa.webp',
  phoneFloor: '/works/healing-earth/phone-floor.webp',
}

function MediaBlock({ src, type = 'image', aspect = '16/9', bg = '#111', alt = 'Healing Earth' }: {
  src?: string, type?: 'video' | 'image' | 'vimeo', aspect?: string, bg?: string, alt?: string
}) {
  if (type === 'vimeo' && src) {
    return (
      <div style={{ position: 'relative', aspectRatio: aspect, borderRadius: '8px', overflow: 'hidden', background: bg }}>
        <iframe
          src={src}
          title="Healing Earth"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
        />
      </div>
    )
  }
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
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
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
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}>
          <iframe
            src={vimeoSrc(VIMEO.hero)}
            title="Healing Earth"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.77vh',
              border: 0,
              transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`,
            }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(13,13,13,0.28) 0%, rgba(13,13,13,0.55) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
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

      <FadeIn>
        <section style={{ padding: '0 5% 8px' }}>
          <MediaBlock src={vimeoSrc(VIMEO.hero)} type="vimeo" aspect="16/9" bg="#0D0D0D" />
        </section>
      </FadeIn>

      <FadeIn>
        <section style={{ padding: '0 5% 8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }} className="grid-3-col">
          {VIMEO.portraits.map(id => (
            <MediaBlock key={id} src={vimeoSrc(id)} type="vimeo" aspect="9/16" bg="#0D0D0D" />
          ))}
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
          {[PHOTOS.phoneStand, PHOTOS.ipad, PHOTOS.phoneFloor].map((src, i) => (
            <FadeIn key={src} delay={i * 100}>
              <MediaBlock src={src} aspect="1 / 1" bg="#d5d5d5" alt="Mockup" />
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="grid-2-col">
          <FadeIn>
            <MediaBlock src={PHOTOS.laptop} aspect="4 / 3" bg="#cfcfcf" alt="Mockup" />
          </FadeIn>
          <FadeIn delay={100}>
            <MediaBlock src={PHOTOS.laptopSofa} aspect="4 / 3" bg="#cfcfcf" alt="Mockup" />
          </FadeIn>
        </div>
      </section>

      {/* ── SEZIONE 3: MARKETING AI ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'end' }} className="grid-2-col">
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

      <div style={{ marginTop: '15%' }}>
        <ProjectStart />

        <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: '1px solid #0D0D0D', borderBottom: '1px solid #0D0D0D', background: '#F0EBE0' }}>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {[
              { label: 'Works', href: '/work' },
              { label: 'Events', href: '/workshop' },
              { label: 'Blog', href: '/blog' },
              { label: 'Privacy', href: '/privacy-policy' },
              { label: 'Cookie', href: '/cookie-policy' },
              { label: 'Terms', href: '/terms-and-conditions' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#0D0D0D' }}>connect@off32.it · © 2025 OFF32</span>
        </footer>
      </div>

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
