'use client'
import { useEffect, useState, useRef, useMemo } from 'react'

// Hook per scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

// Componente animato
function Animate({ children, delay = 0, direction = 'up' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'left' | 'right' | 'fade' }) {
  const { ref, visible } = useScrollAnimation()
  const transforms: Record<string, string> = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    fade: 'translateY(0px)',
  }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0,0)' : transforms[direction],
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

// Video card per la griglia lavori
function VideoCard({ src, title, category, size = 'normal' }: { src: string, title: string, category: string, size?: 'large' | 'normal' }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play()
  }
  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', borderRadius: '12px', overflow: 'hidden',
        cursor: 'pointer', background: '#0D0D0D',
        height: size === 'large' ? '480px' : '320px',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.5s ease',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: hovered
          ? 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
        transition: 'background 0.5s ease',
      }} />

      <div style={{
        position: 'absolute', top: '20px', left: '20px', zIndex: 2,
        fontSize: '9px', letterSpacing: '2px', color: '#fff',
        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
        padding: '5px 12px', borderRadius: '999px', textTransform: 'uppercase' as const,
        fontFamily: "'Axiforma', sans-serif",
      }}>
        {category}
      </div>

      <div style={{
        position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div style={{
          fontFamily: "'Canela', Georgia, serif",
          fontSize: size === 'large' ? '28px' : '20px',
          fontWeight: 300, color: '#fff',
          lineHeight: 1.2, letterSpacing: '-0.5px',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.4s ease',
        }}>
          {title}
        </div>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: '#9fff00', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '18px', color: '#0D0D0D',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-45deg)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          flexShrink: 0,
        }}>
          ↗
        </div>
      </div>
    </div>
  )
}

// TODO: sostituisci con i progetti reali — src video, titolo, categoria e slug (per /work/[slug])
const PROJECTS = [
  { slug: 'healing-earth', src: '/works/healingheartoff32.mp4', title: 'Healing Earth Italia', category: 'eCommerce' },
  { slug: 'scuppoz', src: '/works/scuppoz.mp4', title: 'Scuppoz', category: 'Web Design' },
  { slug: 'momento', src: '/works/momento.mp4', title: 'Momento Catering', category: 'Brand' },
  { slug: 'texture', src: '/works/texture.mp4', title: 'Texture Studio', category: 'Digital Strategy' },
  { slug: 'progetto-05', src: '/works/placeholder-05.mp4', title: 'Progetto placeholder 05', category: 'Social' },
  { slug: 'progetto-06', src: '/works/placeholder-06.mp4', title: 'Progetto placeholder 06', category: 'Web Design' },
  { slug: 'progetto-07', src: '/works/placeholder-07.mp4', title: 'Progetto placeholder 07', category: 'eCommerce' },
  { slug: 'progetto-08', src: '/works/placeholder-08.mp4', title: 'Progetto placeholder 08', category: 'Brand' },
]

const CATEGORIES = ['Tutti', 'Web Design', 'eCommerce', 'Brand', 'Digital Strategy', 'Social']

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('Tutti')

  const filtered = useMemo(() => {
    if (activeCategory === 'Tutti') return PROJECTS
    return PROJECTS.filter(p => p.category === activeCategory)
  }, [activeCategory])

  return (
    <main style={{
      background: '#F0EBE0', minHeight: '100vh',
      fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      color: '#0D0D0D',
    }}>

      {/* HEADER PAGINA */}
      <section style={{ background: '#0D0D0D', padding: '140px 5% 64px' }}>
        <Animate>
          <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#444', textTransform: 'uppercase' as const, fontFamily: 'monospace', marginBottom: '20px' }}>
            // Tutti i lavori
          </div>
          <h1 style={{
            fontFamily: "'Canela', Georgia, serif",
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 300, lineHeight: 1.0,
            letterSpacing: '-2px', color: '#fff',
            maxWidth: '900px',
          }}>
            Progetti che parlano<br />da soli.
          </h1>
        </Animate>
      </section>

      {/* FILTRI CATEGORIA */}
      <section style={{ background: '#0D0D0D', padding: '0 5% 40px', borderBottom: '1px solid #1C1C1C' }}>
        <Animate delay={100}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontSize: '11px', letterSpacing: '0.5px',
                    padding: '9px 20px', borderRadius: '999px',
                    border: active ? '1px solid #fe3812' : '1px solid #222',
                    background: active ? '#fe3812' : 'transparent',
                    color: active ? '#fff' : '#888',
                    fontWeight: active ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    fontFamily: "'Axiforma', sans-serif",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </Animate>
      </section>

      {/* GRIGLIA PROGETTI */}
      <section style={{ background: '#0D0D0D', padding: '48px 5% 96px', minHeight: '480px' }}>
        {filtered.length === 0 ? (
          <Animate>
            <p style={{ fontSize: '13px', color: '#555', padding: '64px 0', textAlign: 'center' as const }}>
              Nessun progetto in questa categoria, per ora.
            </p>
          </Animate>
        ) : (
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {filtered.map((p, i) => (
              <Animate key={p.slug} delay={(i % 4) * 80}>
                <a href={`/work/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <VideoCard src={p.src} title={p.title} category={p.category} />
                </a>
              </Animate>
            ))}
          </div>
        )}
      </section>

      {/* CTA FINALE */}
      <Animate>
        <section style={{ background: '#fe3812', padding: '96px 5%', textAlign: 'center' as const }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, marginBottom: '20px' }}>// INIZIA UN PROGETTO</div>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '16px' }}>
            Il prossimo progetto<br />potrebbe essere il tuo.
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.7 }}>
            Raccontacelo. Trasformiamo idee in comunicazione che funziona davvero.
          </p>
          <a href="/contatti" style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '14px 40px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            SCRIVICI →
          </a>
        </section>
      </Animate>

      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; gap: 16px !important; }
          main { padding-bottom: 72px; }
        }
      `}</style>

    </main>
  )
}
