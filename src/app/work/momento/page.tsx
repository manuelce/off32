'use client'
import { useEffect, useRef, useState } from 'react'
import ProjectStart from '@/components/ProjectStart'
import WorkSwitch from '@/components/WorkSwitch'

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useInView()
  return (
    <div ref={ref.ref} style={{
      opacity: ref.visible ? 1 : 0,
      transform: ref.visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const LINE = '1px solid #0D0D0D'

export default function MomentoPage() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{
      background: '#F0EBE0', minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      color: '#0D0D0D',
    }}>
      <link rel="preload" as="video" href="/works/momento/film.mp4" />
      <link rel="preload" as="image" href="/works/momento/poster.jpg" />

      <section className="mom-hero" style={{ background: '#0D0D0D', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <video
            src="/works/momento/film.mp4"
            poster="/works/momento/poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.77vh',
              objectFit: 'cover',
              opacity: 0.45,
              transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`,
            }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(13,13,13,0.28) 0%, rgba(13,13,13,0.62) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#ccc', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '32px' }}>
            <a href="/work" style={{ color: '#ccc', textDecoration: 'none' }}>← Work</a>
            <span style={{ margin: '0 12px' }}>/</span>
            <span>Web · WordPress</span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 style={{
            fontFamily: "'Canela', Georgia, serif",
            fontSize: 'clamp(56px, 10vw, 120px)',
            fontWeight: 300, color: '#F0EBE0',
            lineHeight: 0.95, letterSpacing: '-3px',
            marginBottom: '40px', textTransform: 'uppercase',
          }}>
            MOMENTO
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(240,235,224,0.72)',
            lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
          }}>
            Sito per Momento Catering, a Malaga. Design, sviluppo e fotografia: un campo scuro, il marchio al centro, le pagine del servizio nello stesso ordine.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="meta-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 0,
            borderTop: '1px solid rgba(240,235,224,0.28)', paddingTop: 32, width: 'fit-content',
          }}>
            {[
              { label: 'Cliente', value: 'Momento Catering' },
              { label: 'Settore', value: 'Catering' },
              { label: 'Cosa abbiamo fatto', value: 'UX/UI, WordPress, fotografia' },
            ].map((m, i) => (
              <div key={m.label} style={{ paddingRight: 48, marginRight: 48, borderRight: i < 2 ? '1px solid rgba(240,235,224,0.28)' : 'none' }}>
                <div style={{ fontSize: 10, letterSpacing: '2px', color: '#888', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'monospace' }}>{m.label}</div>
                <div style={{ fontSize: 14, color: '#eee', fontWeight: 500 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              fontWeight: 300, lineHeight: 1.4, letterSpacing: '-0.5px',
            }}>
              Menu, eventi, location, esperienze e contatti. La fotografia tiene la pagina. Il disegno non cambia dal telefono al desktop.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { title: 'Concept', text: 'Il sito doveva restituire l\'eleganza del servizio e rendere chiari menu, eventi e richiesta.' },
                { title: 'Progetto', text: 'Interfaccia in Figma, sviluppo su WordPress con HTML, CSS e JavaScript, e la fotografia delle pagine. Stesso disegno su ogni formato.' },
                { title: 'Lancio', text: 'Test sulle funzioni prima della pubblicazione, ottimizzazione per la ricerca e analisi su chi naviga.' },
              ].map(block => (
                <div key={block.title}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: 10 }}>{block.title}</div>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}
              <a href="https://momentocatering.com/" target="_blank" rel="noreferrer" style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>
                momentocatering.com →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#0D0D0D', color: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderBottom: '1px solid rgba(240,235,224,0.22)', display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>01</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Mobile</span>
        </div>
        <div className="mom-phones">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/momento/mobile-menu.jpg" alt="Telefono con il menu di Momento Catering aperto su una location." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap mom-cap-light">
                <span>Menu</span>
                Catering, eventi, location, esperienze e contatti. La lingua si cambia in pagina, il testo della location resta sotto.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={120}>
            <figure className="mom-phone-shift">
              <img src="/works/momento/mobile-about.webp" alt="Telefono tenuto in mano, con la pagina Quienes Somos di Momento Catering." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap mom-cap-light">
                <span>About</span>
                Quienes Somos. Il titolo in un carattere da atelier, il testo in colonna, il fondo resta scuro.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderBottom: LINE, display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>02</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Tablet</span>
        </div>
        <div className="mom-tablet">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/momento/tablet-experience.jpg" alt="Tablet con la pagina Experience di Momento Catering e le classi di cucina." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap">
                <span>Experience</span>
                Le classi di cucina in griglia. Fotografia, titolo e testo restano insieme, il menu sta sopra.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={100}>
            <figure className="mom-tablet-shift">
              <img src="/works/momento/tablet-contact.jpg" alt="Tablet con il modulo di contatto di Momento Catering e la mappa." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap">
                <span>Contatto</span>
                Nome, email, telefono e messaggio. Sotto, la mappa. La richiesta parte dalla stessa schermata.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderTop: LINE, borderBottom: LINE, display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>03</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Desktop</span>
        </div>
        <div className="mom-desk">
          <FadeIn>
            <figure className="mom-desk-home">
              <img src="/works/momento/desktop-home.jpg" alt="Portatile su un divano nero, con la homepage di Momento Catering." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap">
                <span>Home</span>
                Il marchio al centro della fotografia. Il menu resta sottile, sopra l'immagine.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={80}>
            <figure className="mom-desk-second">
              <img src="/works/momento/desktop-team.jpg" alt="Portatile con tre ritratti della pagina team di Momento Catering." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mom-cap">
                <span>Team</span>
                Tre ritratti sulla stessa riga, con il nome sotto. Il fondo della pagina resta nero.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <WorkSwitch
        previous={{ href: '/work/monochrome', image: '/works/monochrome/preview.jpg', title: 'Monochrome' }}
        next={{ href: '/work/healing-earth', image: '/works/healing-earth/preview.jpg', title: 'Healing Earth Italia' }}
      />

      <div style={{ marginTop: '15%' }}>
        <ProjectStart />
        <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE, background: '#F0EBE0' }}>
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
        .mom-cap {
          margin-top: 16px;
          max-width: 460px;
          font-size: 14px;
          line-height: 1.65;
          color: #3a3a3a;
        }
        .mom-cap span {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fe3812;
        }
        .mom-cap-light { color: rgba(240,235,224,0.78); }
        .mom-phones {
          display: grid;
          grid-template-columns: 320px 360px;
          justify-content: center;
          gap: 72px;
          align-items: start;
          padding: 64px 6% 88px;
        }
        .mom-tablet {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 48px;
          align-items: start;
          padding: 64px 6% 80px;
        }
        .mom-phone-shift { margin: 48px 0 0; }
        .mom-tablet-shift { margin: 12% 0 0; }
        .mom-desk {
          display: grid;
          gap: 72px;
          padding: 56px 0 96px;
        }
        .mom-desk-home { width: 86%; margin: 0 auto; }
        .mom-desk-second { width: 74%; margin-left: auto; padding-right: 6%; }
        @media (max-width: 768px) {
          .mom-hero { padding-top: 112px !important; }
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .meta-grid > div { border-right: none !important; margin-right: 0 !important; padding-right: 0 !important; }
          .mom-phones, .mom-tablet { grid-template-columns: 1fr !important; gap: 40px !important; justify-content: stretch; }
          .mom-phones { padding-left: 10%; padding-right: 10%; }
          .mom-phone-shift, .mom-tablet-shift { margin: 0; }
          .mom-desk-home { width: auto; margin: 0 6%; }
          .mom-desk-second { width: auto; margin: 0; padding: 0 6%; }
        }
      `}</style>
    </main>
  )
}
