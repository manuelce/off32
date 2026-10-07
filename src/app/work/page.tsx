'use client'
import { type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const works = [
  { src: '/works/healingheart-card.mp4', poster: '/works/healing-earth/preview.jpg', title: 'Healing Earth Italia', category: 'eCommerce · Brand', href: '/work/healing-earth' },
  { image: '/works/scuppoz/preview.jpg', title: 'Scuppoz', category: 'Web Design', href: '/work/scuppoz', objectPosition: 'center' },
  { image: '/works/conil-food-tour/laptop.webp', title: 'Conil Food Tour', category: 'Brand · eCommerce', href: '/work/conil-food-tour' },
  { image: '/works/duel/cover.jpg', title: 'The Duel', category: 'Editorial', href: '/work/duel' },
]

function VideoCard({ src, image, poster, title, category, tall = false, priority = false, objectPosition = 'center' }: { src?: string, image?: string, poster?: string, title: string, category: string, tall?: boolean, priority?: boolean, objectPosition?: string }) {
  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        background: '#E7E0D4', height: tall ? '520px' : '100%', minHeight: tall ? undefined : 240,
      }}
    >
      {image ? (
        <img src={image} alt="" loading="eager" fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition }} />
      ) : (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
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
      <link rel="preload" as="video" href="/works/healingheart-card.mp4" fetchPriority="high" />
      <link rel="preload" as="image" href="/works/healing-earth/preview.jpg" fetchPriority="high" />
      <link rel="preload" as="image" href="/works/scuppoz/preview.jpg" fetchPriority="high" />
      <link rel="preload" as="image" href="/works/conil-food-tour/laptop.webp" />
      <link rel="preload" as="image" href="/works/duel/cover.jpg" />
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
        <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 4, marginTop: 4 }}>
          <a href={works[0].href} style={{ display: 'block', height: '100%', border: LINE, textDecoration: 'none' }}>
            <VideoCard src={works[0].src} poster={works[0].poster} title={works[0].title} category={works[0].category} tall priority />
          </a>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 4, height: '100%' }}>
            {works.slice(1, 3).map(work => (
              <a key={work.title} href={work.href} style={{ display: 'block', height: '100%', border: LINE, textDecoration: 'none' }}>
                <VideoCard image={work.image} title={work.title} category={work.category} objectPosition={'objectPosition' in work ? work.objectPosition : undefined} priority={work.title === 'Scuppoz'} />
              </a>
            ))}
          </div>
        </div>
        <a href={works[3].href} style={{ display: 'block', border: LINE, marginTop: 4, textDecoration: 'none' }}>
          <VideoCard image={works[3].image} title={works[3].title} category={works[3].category} />
        </a>
      </section>

      <ProjectStart />

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
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
        }
      `}</style>
    </main>
  )
}
