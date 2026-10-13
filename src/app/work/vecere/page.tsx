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
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

const LINE = '1px solid #0D0D0D'

export default function VecerePage() {
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
      <link rel="preload" as="video" href="/works/vecere/film.mp4" />
      <link rel="preload" as="image" href="/works/vecere/poster.jpg" />

      <section className="vec-hero" style={{ background: '#0D0D0D', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <video
            src="/works/vecere/film.mp4"
            poster="/works/vecere/poster.jpg"
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
            <div style={{ fontSize: 10, letterSpacing: '3px', color: '#ccc', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 32 }}>
              <a href="/work" style={{ color: '#ccc', textDecoration: 'none' }}>← Work</a>
              <span style={{ margin: '0 12px' }}>/</span>
              <span>eCommerce · WordPress</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 300, color: '#F0EBE0',
              lineHeight: 0.95, letterSpacing: '-3px',
              marginBottom: 40, textTransform: 'uppercase',
            }}>
              VECERE
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(240,235,224,0.72)',
              lineHeight: 1.6, maxWidth: 560, fontWeight: 300, marginBottom: 48,
            }}>
              E-commerce per Olio Vecere. Design UX-UI, WordPress e WooCommerce, video e fotografia dei prodotti. Il sito è in restyling.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="meta-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 0,
              borderTop: '1px solid rgba(240,235,224,0.28)', paddingTop: 32, width: 'fit-content',
            }}>
              {[
                { label: 'Cliente', value: 'Olio Vecere' },
                { label: 'Settore', value: 'Food · eCommerce' },
                { label: 'Cosa abbiamo fatto', value: 'UX/UI, WordPress, WooCommerce, video, foto' },
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
              Olio extravergine dal 1938. Il sito mostra il patrimonio del brand, i prodotti e il passaggio dalla tradizione alla vendita online.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                {
                  title: 'Concept',
                  text: 'Olio Vecere è un marchio di olio extravergine di oliva. Fondata nel 1938, l\'azienda tiene al centro la produzione artigianale e la qualità di ogni bottiglia.',
                },
                {
                  title: 'Progetto',
                  text: 'Il sito è vetrina del patrimonio: olive da antichi uliveti, spremitura a freddo, storia e prodotti. Design UX-UI in Figma, sviluppo su WordPress e WooCommerce, video e fotografia.',
                },
                {
                  title: 'Lancio',
                  text: 'Dopo il lancio, raccolta dei feedback, aggiornamenti sui prodotti e supporto continuo a chi compra e a chi gestisce il catalogo.',
                },
              ].map(block => (
                <div key={block.title}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: 10 }}>{block.title}</div>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}
              <a href="https://oliovecere.com/" target="_blank" rel="noreferrer" style={{ fontSize: 12, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>
                oliovecere.com →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#0D0D0D', color: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderBottom: '1px solid rgba(240,235,224,0.22)', display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>01</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Bottiglie</span>
        </div>
        <div className="vec-bottles">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/bottle-050.jpg" alt="Bottiglia nera di olio Vecere 0,50 L, etichetta oro su fondo bianco." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-light">
                <span>0,50 L</span>
                Etichetta nera e oro. Extra vergine, estratto a freddo, 100% italiano.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={100}>
            <figure className="vec-bottle-shift" style={{ margin: 0 }}>
              <img src="/works/vecere/bottle-025.jpg" alt="Bottiglia nera di olio Vecere 0,25 L, etichetta oro su fondo bianco." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-light">
                <span>0,25 L</span>
                Stesso disegno, formato più piccolo. Il nome Vecere resta al centro.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
        <div className="vec-pepe">
          <FadeIn delay={80}>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/peperoncino.jpg" alt="Bottiglia nera di condimento al peperoncino Vecere, etichetta bianca con curva rossa." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-light">
                <span>Peperoncino</span>
                Condimento all&apos;olio extravergine. Etichetta chiara, il rosso chiude il lato.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderBottom: LINE, display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>02</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Lattine</span>
        </div>
        <FadeIn>
          <p className="vec-tins-lead">
            Foto e-commerce scattate per le schede prodotto. Packshot su fondo bianco, stessa inquadratura e luce costante su ogni formato, file pronti per WooCommerce.
          </p>
        </FadeIn>
        <div className="vec-tins">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/tin-1l.jpg" alt="Lattina bianca di olio Vecere 1 L." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-title">
                <span>1 L</span>
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={60}>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/tin-3l.jpg" alt="Lattina nera di olio Vecere 3 L." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-title">
                <span>3 L</span>
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={120}>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/tin-5l.jpg" alt="Lattina nera di olio Vecere 5 L." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-title">
                <span>5 L</span>
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={180}>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/tin-5l-side.jpg" alt="Lattina nera Vecere 5 L vista di tre quarti." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-title">
                <span>5 L · lato</span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: '#F0EBE0' }}>
        <div style={{ padding: '22px 5%', borderTop: LINE, borderBottom: LINE, display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>03</span>
          <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>Team</span>
        </div>
        <div className="vec-team">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/vecere/team.png" alt="Due persone al lavoro su un portatile, con scatole e bottiglie Vecere sul tavolo." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="vec-cap vec-cap-title">
                <span>Dietro il marchio</span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <WorkSwitch
        previous={{ href: '/work/momento', image: '/works/momento/preview.webp', title: 'Momento Catering' }}
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
        .vec-cap {
          margin-top: 16px;
          max-width: 460px;
          font-size: 14px;
          line-height: 1.65;
          color: #3a3a3a;
        }
        .vec-cap span {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fe3812;
        }
        .vec-cap-title { margin-top: 12px; }
        .vec-cap-title span { margin-bottom: 0; }
        .vec-cap-light { color: rgba(240,235,224,0.78); }
        .vec-bottles {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
          padding: 64px 8% 28px;
        }
        .vec-bottle-shift { margin: 18% 0 0; }
        .vec-pepe { width: min(42%, 520px); margin: 48px auto 0; padding-bottom: 80px; }
        .vec-tins-lead {
          margin: 0;
          padding: 48px 6% 0;
          max-width: 640px;
          font-size: 15px;
          line-height: 1.7;
          color: #3a3a3a;
        }
        .vec-tins {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          align-items: end;
          padding: 40px 6% 88px;
        }
        .vec-team { width: min(86%, 1100px); margin: 0 auto; padding: 64px 0 96px; }
        @media (max-width: 768px) {
          .vec-hero { padding-top: 112px !important; }
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .meta-grid > div { border-right: none !important; margin-right: 0 !important; padding-right: 0 !important; }
          .vec-bottles { grid-template-columns: 1fr !important; gap: 40px !important; }
          .vec-tins { grid-template-columns: 1fr 1fr !important; gap: 20px !important; padding: 28px 6% 72px; }
          .vec-tins-lead { padding: 36px 6% 0; }
          .vec-bottle-shift { margin: 0; }
          .vec-pepe { width: auto; margin: 0; padding: 0 10% 72px; }
          .vec-team { width: auto; margin: 0; padding: 0 6% 72px; }
        }
      `}</style>
    </main>
  )
}
