'use client'
import { useRef, useState, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const works = [
  { src: '/works/healingheartoff32.mp4', title: 'Healing Earth Italia', category: 'eCommerce · Brand', href: '/work/healing-earth' },
  { src: '/works/scuppoz.mp4', title: 'Scuppoz', category: 'Web Design', href: '/work/scuppoz' },
  { src: '/works/momento.mp4', image: '/works/conil-food-tour/laptop.webp', title: 'Conil Food Tour', category: 'Brand · eCommerce', href: '/work/conil-food-tour' },
  { src: '/works/duel.mp4', image: '/works/duel/cover.jpg', title: 'The Duel', category: 'Editorial', href: '/work/duel' },
]

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
        <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: hovered ? 1 : 0.92, transition: 'opacity 0.4s ease' }} />
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
      <div style={{ position: 'absolute', top: 16, left: 16, fontSize: '10px', letterSpacing: '1.6px', textTransform: 'uppercase', color: '#fff' }}>{category}</div>
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ fontFamily: "'Canela', Georgia, serif", fontSize: tall ? 32 : 22, fontWeight: 300, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>{title}</div>
        <span style={{ color: '#fff', fontSize: 18 }}>↗</span>
      </div>
    </div>
  )
}

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const title: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(72px, 12vw, 168px)',
  lineHeight: 0.88,
  letterSpacing: '-3px',
  color: '#0D0D0D',
}

export default function Work() {
  return (
    <main style={{ background: '#f0ebe0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <Navbar />

      <h1 className="work-title" style={{ margin: 0 }}>
        <span style={{ ...title, display: 'block', textAlign: 'right', borderTop: LINE, borderBottom: LINE, padding: '18px 40px 22px' }}>
          i nostri
        </span>
        <span style={{ ...title, display: 'block', textAlign: 'left', borderBottom: LINE, padding: '18px 40px 22px' }}>
          progetti
        </span>
      </h1>

      <section style={{ paddingTop: '15%', paddingBottom: '15%' }}>
        <div style={{ ...meta, padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>Lavori selezionati</div>
        <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr' }}>
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
        <a href={works[3].href} style={{ display: 'block', borderTop: LINE, textDecoration: 'none' }}>
          <VideoCard src={works[3].src} image={works[3].image} title={works[3].title} category={works[3].category} />
        </a>
      </section>

      <ProjectStart />

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Work', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ ...meta, textDecoration: 'none' }}>{link.label}</a>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2025 OFF32</span>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .work-title { padding-top: 64px; }
          .works-grid { grid-template-columns: 1fr !important; }
          .works-grid > a { border-right: none !important; border-bottom: 1px solid #0D0D0D; }
        }
      `}</style>
    </main>
  )
}
