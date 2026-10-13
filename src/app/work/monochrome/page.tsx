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

export default function MonochromePage() {
  return (
    <main style={{
      background: '#F0EBE0', minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      color: '#0D0D0D',
    }}>
      <section className="mono-hero" style={{ background: 'linear-gradient(90deg, #8A1BFE 50%, #0D0D0D 50%)', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
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
              fontWeight: 300, color: '#fff',
              lineHeight: 0.95, letterSpacing: '-3px',
              marginBottom: '40px', textTransform: 'uppercase',
            }}>
              MONOCHROME
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
            }}>
              Sito per lo studio di Sofia Gonzalez. Dal prototipo al tema WordPress, con colore e carattere definiti per restare uguali su ogni pagina.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0',
              borderTop: '1px solid rgba(255,255,255,0.28)', paddingTop: '32px', width: 'fit-content',
            }} className="meta-grid">
              {[
                { label: 'Cliente', value: 'Sofia Gonzalez' },
                { label: 'Settore', value: 'Cultura' },
                { label: 'Cosa abbiamo fatto', value: 'Prototipo, tema child, colore e font' },
              ].map((m, i) => (
                <div key={m.label} style={{ paddingRight: '48px', marginRight: '48px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.28)' : 'none' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'monospace' }}>{m.label}</div>
                  <div style={{ fontSize: '14px', color: '#eee', fontWeight: 500 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="grid-2-col">
          <FadeIn>
            <p style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              fontWeight: 300, color: '#0D0D0D',
              lineHeight: 1.4, letterSpacing: '-0.5px',
            }}>
              Due campi, viola e nero, e un titolo che occupa la larghezza. About, Articles, CV, Portfolio e Let&apos;s talk seguono la stessa gerarchia.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { title: 'Il prototipo', text: 'La struttura nasce prima dello sviluppo. Home, articoli, about e portfolio condividono menu, titolo, fotografia e testo.' },
                { title: 'WordPress', text: 'Il sito è su WordPress, con un tema child. I contenuti si aggiornano senza spostare il disegno.' },
                { title: 'Colore e font', text: 'Viola, nero e bianco. Un titolo di grande corpo per il nome e per gli articoli, un testo più raccolto per la lettura. La stessa scelta su tutti i formati.' },
              ].map(block => (
                <div key={block.title}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: '10px' }}>{block.title}</div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}
              <a href="https://www.monochromestudio.it/" target="_blank" rel="noreferrer" style={{ fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>
                monochromestudio.it →
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
        <div className="mono-phones">
          <FadeIn>
            <figure style={{ margin: 0 }}>
              <img src="/works/monochrome/mobile-project.jpg" alt="Telefono con una scheda progetto di Monochrome, su un fondo scuro con il riflesso." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mono-cap mono-cap-light">
                <span>Progetto</span>
                Scheda letta dal telefono. Fotografia, titolo e testo restano nello stesso ordine della pagina grande.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={120}>
            <figure className="mono-phone-shift">
              <img src="/works/monochrome/mobile-about.jpg" alt="Telefono appoggiato sull'asfalto, con la pagina di Sofia Gonzalez." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mono-cap mono-cap-light">
                <span>About</span>
                La pagina di Sofia Gonzalez. Il viola chiude il testo anche quando la lettura diventa verticale.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
        <div className="mono-phone-article">
          <FadeIn delay={80}>
            <figure style={{ margin: 0 }}>
              <img src="/works/monochrome/mobile-article.jpg" alt="Telefono su un tavolo verde, con l'articolo su Milli Gandini aperto." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mono-cap mono-cap-light">
                <span>Articolo</span>
                Milli Gandini sul telefono. La fotografia entra per prima, il titolo sta subito sotto, il viola del nome resta in testa alla pagina.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
        <div className="mono-phone-show">
          <FadeIn delay={80}>
            <figure style={{ margin: 0 }}>
              <img src="/works/monochrome/mobile-mostra.jpg" alt="Telefono su una sedia di filo metallico, con la pagina Notes on Becoming di Monochrome." style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption className="mono-cap mono-cap-light">
                <span>Mostra</span>
                Notes on Becoming. Il titolo occupa la larghezza e la fotografia arancione chiude la pagina.
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
        <div className="mono-tablet">
          <FadeIn>
            <p style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.6px', margin: 0 }}>
              La lettura si allarga. Il titolo resta grande e la fotografia entra intera, senza perdere il menu.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <figure style={{ margin: 0 }}>
              <img src="/works/monochrome/tablet-article.webp" alt="Articolo su Milli Gandini, visto su tablet, con la fotografia in bianco e nero." style={{ width: '100%', height: 'auto', display: 'block', border: LINE }} />
              <figcaption className="mono-cap">
                <span>Articolo</span>
                Approfondimento su Milli Gandini. Titolo, fotografia e testo stanno in colonna, il menu resta in vista.
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
        <div className="mono-desk">
          <FadeIn>
            <figure className="mono-desk-home">
              <img src="/works/monochrome/desktop-home.webp" alt="Homepage di Monochrome da desktop, con il nome a tutta pagina su viola e nero." style={{ width: '100%', height: 'auto', display: 'block', border: LINE }} />
              <figcaption className="mono-cap">
                <span>Home</span>
                Il nome attraversa il taglio tra viola e nero e occupa tutta la larghezza.
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={80}>
            <figure className="mono-desk-second" style={{ margin: 0 }}>
              <img src="/works/monochrome/desktop-articles.jpg" alt="Indice degli articoli di Monochrome, con filtri per anno e quattro fotografie." style={{ width: '100%', height: 'auto', display: 'block', border: LINE }} />
              <figcaption className="mono-cap">
                <span>Archivio</span>
                Quattro schede in colonna e un filtro per anno, con lo stesso carattere dei titoli.
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      <WorkSwitch
        previous={{ href: '/work/duel', image: '/works/duel/cover.jpg', title: 'The Duel' }}
        next={{ href: '/work/momento', image: '/works/momento/preview.webp', title: 'Momento Catering' }}
      />

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
        .mono-cap {
          margin-top: 16px;
          max-width: 460px;
          font-size: 14px;
          line-height: 1.65;
          color: #3a3a3a;
        }
        .mono-cap span {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #fe3812;
        }
        .mono-cap-light { color: rgba(240,235,224,0.78); }
        .mono-phones {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 48px;
          align-items: start;
          padding: 64px 6% 28px;
        }
        .mono-phone-shift { margin: 12% 0 0; }
        .mono-phone-article { width: min(52%, 760px); margin: 28px auto 0; }
        .mono-phone-show { width: min(86%, 1024px); margin: 56px auto 0; padding-bottom: 80px; }
        .mono-tablet {
          display: grid;
          grid-template-columns: 0.72fr 1.28fr;
          gap: 56px;
          align-items: center;
          padding: 64px 6% 88px;
        }
        .mono-desk {
          display: grid;
          gap: 72px;
          padding: 0 0 96px;
        }
        .mono-desk-home { width: 80%; margin: 0 auto; justify-self: center; }
        .mono-desk-home .mono-cap { padding: 0; }
        .mono-desk-second { width: 78%; margin-left: auto !important; padding-right: 6%; }
        @media (max-width: 768px) {
          .mono-hero { padding-top: 112px !important; }
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .meta-grid > div { border-right: none !important; margin-right: 0 !important; padding-right: 0 !important; }
          .mono-phones, .mono-tablet { grid-template-columns: 1fr !important; gap: 40px !important; }
          .mono-phone-shift { margin: 0; }
          .mono-phone-article { width: auto; margin: 0; padding: 0 6%; }
          .mono-phone-show { width: auto; margin: 0; padding: 40px 6% 72px; }
          .mono-desk-second { width: auto; margin-left: 0 !important; padding: 0 6%; }
          .mono-desk-home { width: auto; margin: 0 6%; }
        }
      `}</style>
    </main>
  )
}
