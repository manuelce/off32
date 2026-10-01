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

const PHOTOS = {
  amaro: '/works/scuppoz/amaro.webp',
  diwine: '/works/scuppoz/diwine.webp',
  limoncello: '/works/scuppoz/limoncello.webp',
  pecore: '/works/scuppoz/pecore.webp',
}

const bottles = [
  { src: PHOTOS.amaro, alt: 'Amaro Scuppoz', name: 'Amaro', note: 'Della Laga. Da qui nasce Scuppoz.' },
  { src: PHOTOS.diwine, alt: 'DiWine liquore di genziana', name: 'DiWine', note: 'Liquore di genziana, dalle radici selezionate.' },
  { src: PHOTOS.limoncello, alt: 'Limoncello Scuppoz', name: 'Limoncello', note: 'Avvolto per proteggere colore e sapore dalla luce.' },
]

export default function ScuppozPage() {
  return (
    <main style={{
      background: '#F0EBE0', minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      color: '#0D0D0D',
    }}>
      <Navbar />

      <section style={{ background: '#0D0D0D', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url(${PHOTOS.amaro})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.4,
        }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(13,13,13,0.28) 0%, rgba(13,13,13,0.55) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#555', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '32px' }}>
              <a href="/work" style={{ color: '#555', textDecoration: 'none' }}>← Work</a>
              <span style={{ margin: '0 12px' }}>/</span>
              <span>Liquori · Web</span>
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
              SCUPPOZ
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
            }}>
              Dalla terra tutto ha origine. Liquori d&apos;Abruzzo, dalla radice della genziana al fine pasto.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0',
              borderTop: '1px solid #1C1C1C', paddingTop: '32px', width: 'fit-content',
            }} className="meta-grid">
              {[
                { label: 'Location', value: 'Abruzzo' },
                { label: 'Settore', value: 'Liquori' },
                { label: 'Cosa abbiamo fatto', value: 'Web Design' },
              ].map((m, i) => (
                <div key={m.label} style={{ paddingRight: '48px', marginRight: '48px', borderRight: i < 2 ? '1px solid #1C1C1C' : 'none' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#444', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'monospace' }}>{m.label}</div>
                  <div style={{ fontSize: '14px', color: '#ccc', fontWeight: 500 }}>{m.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="grid-2-col">
          <FadeIn y={24}>
            <p style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              fontWeight: 300, color: '#0D0D0D',
              lineHeight: 1.4, letterSpacing: '-0.5px',
            }}>
              Dall&apos;amaro Della Laga ha origine Scuppoz. Un brand radicato nel territorio, con liquori che si raccontano dal prodotto.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { title: 'Il territorio', text: 'Radicata in Abruzzo. La genziana arriva dalle radici selezionate, e ogni liquore tiene il legame con la terra da cui parte.' },
                { title: 'I liquori', text: 'Amaro Scuppoz, DiWine, Limoncello e la Genziana Delle Pecore. Quattro prodotti, lo stesso registro visivo: scuro, diretto, sul bicchiere.' },
                { title: 'Il sito', text: 'Web design per scuppoz.it, allineato alle fotografie del brand e al modo in cui Scuppoz si presenta.' },
              ].map(block => (
                <div key={block.title}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: '10px' }}>{block.title}</div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}
              <a href="https://www.scuppoz.it" target="_blank" rel="noreferrer" style={{ fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>
                scuppoz.it →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: '80px 5%', borderBottom: '1px solid #E0D8CC' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, lineHeight: 1.1, letterSpacing: '-1px',
              textTransform: 'uppercase',
            }}>
              I<br />LIQUORI
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, maxWidth: '480px' }}>
              Dalla terra al bicchiere. Le fotografie tengono il prodotto in primo piano, con la stessa luce e lo stesso fondo scuro su ogni bottiglia.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }} className="grid-3-col">
          {bottles.map((photo, i) => (
            <FadeIn key={photo.src} delay={i * 100}>
              <figure style={{ margin: 0 }}>
                <div style={{ aspectRatio: '522 / 521', borderRadius: '8px', overflow: 'hidden', background: '#0D0D0D' }}>
                  <img src={photo.src} alt={photo.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
                <figcaption style={{ marginTop: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.4px' }}>{photo.name}</div>
                  <div style={{ marginTop: '4px', fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{photo.note}</div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: '#0D0D0D' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '48px', alignItems: 'center' }} className="grid-2-col">
          <FadeIn>
            <div>
              <h2 style={{
                fontFamily: "'Canela', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 300, color: '#fff',
                lineHeight: 1.1, letterSpacing: '-1px',
                textTransform: 'uppercase', marginBottom: '24px',
              }}>
                FINE<br />PASTO
              </h2>
              <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '420px' }}>
                Il fine pasto in Abruzzo è solo un nuovo inizio. La Genziana Delle Pecore accompagna la tavola, con il carattere deciso della terra.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#111' }}>
              <img src={PHOTOS.pecore} alt="Genziana Delle Pecore a tavola" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ marginTop: '15%' }}>
        <ProjectStart />
        <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: '1px solid #0D0D0D', borderBottom: '1px solid #0D0D0D', background: '#F0EBE0' }}>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {[
              { label: 'Work', href: '/work' },
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
        @media (max-width: 768px) {
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .grid-3-col { grid-template-columns: 1fr !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </main>
  )
}
