'use client'
import { useRef, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

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

const COVER = '/works/duel/cover.jpg'

const chapters = [
  {
    index: '01',
    title: 'Avatar',
    text: 'Na’vi, Vritra e il drago cinese. Tre figure messe sulla stessa pagina per guardare cosa condividono e dove si separano.',
    spreads: [
      { src: '/works/duel/dragon.jpg', caption: 'Il drago cinese' },
      { src: '/works/duel/vritra.jpg', caption: 'Vritra' },
      { src: '/works/duel/parallels.jpg', caption: 'Paralleli mitologici' },
    ],
  },
  {
    index: '02',
    title: 'Dances with Wolves',
    text: 'Kevin Costner, la frase del film e le erbe dei nativi. Un secondo duello, tra personaggio e territorio.',
    spreads: [
      { src: '/works/duel/wolves-quote.jpg', caption: 'My name is Dances with Wolves' },
      { src: '/works/duel/costner.jpg', caption: 'Kevin Costner' },
      { src: '/works/duel/herbs.jpg', caption: 'Le erbe' },
    ],
  },
]

export default function DuelPage() {
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
          backgroundImage: `url(${COVER})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.4,
        }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(13,13,13,0.28) 0%, rgba(13,13,13,0.55) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#555', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '32px' }}>
              <a href="/work" style={{ color: '#555', textDecoration: 'none' }}>← Work</a>
              <span style={{ margin: '0 12px' }}>/</span>
              <span>Editorial</span>
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
              THE<br />DUEL
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
            }}>
              Visual magazine 01. Due immaginari messi uno contro l&apos;altro, pagina dopo pagina.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0',
              borderTop: '1px solid #1C1C1C', paddingTop: '32px', width: 'fit-content',
            }} className="meta-grid">
              {[
                { label: 'Numero', value: '01 · Marzo 2025' },
                { label: 'Settore', value: 'Editorial' },
                { label: 'Cosa abbiamo fatto', value: 'Art direction' },
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

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', background: '#0D0D0D', color: '#F0EBE0' }} className="issue-row">
        <div style={{ padding: '72px 5%', borderRight: '1px solid #1C1C1C' }}>
          <div style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#fe3812', marginBottom: 18 }}>Il numero</div>
          <p style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-1px', margin: 0 }}>
            Non un catalogo. Un duello tra due storie, tenuto insieme dal segno.
          </p>
        </div>
        <div>
          {chapters.map((chapter, i) => (
            <div key={chapter.index} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 24, padding: '36px 5%', borderTop: i === 0 ? 'none' : '1px solid #1C1C1C', alignItems: 'start' }} className="chapter-row">
              <div style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 42, fontWeight: 300, lineHeight: 1 }}>{chapter.index}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{chapter.title}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'rgba(240,235,224,0.72)', maxWidth: 460 }}>{chapter.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FadeIn>
        <figure style={{ margin: 0, background: '#e7e0d4' }}>
          <img src={COVER} alt="The Duel, copertina aperta" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </figure>
      </FadeIn>

      {chapters.map(chapter => (
        <section key={chapter.index}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, padding: '28px 5%', borderTop: '1px solid #0D0D0D', borderBottom: '1px solid #0D0D0D' }}>
            <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase' }}>{chapter.index} — {chapter.title}</span>
            <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#7a746c' }}>Visual magazine 01</span>
          </div>
          {chapter.spreads.map(spread => (
            <FadeIn key={spread.src}>
              <figure style={{ margin: 0 }}>
                <img src={spread.src} alt={spread.caption} style={{ width: '100%', height: 'auto', display: 'block' }} />
                <figcaption style={{ padding: '14px 5% 28px', fontSize: 13, letterSpacing: '0.4px', color: '#3a3a3a' }}>{spread.caption}</figcaption>
              </figure>
            </FadeIn>
          ))}
        </section>
      ))}

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
        @media (max-width: 768px) {
          .issue-row, .chapter-row, .meta-grid { grid-template-columns: 1fr !important; }
          .issue-row > div { border-right: none !important; }
        }
      `}</style>
    </main>
  )
}
