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
  hero: '1207764057',
  portraits: ['1179375004', '1179377370', '1179377403'],
}

function vimeoSrc(id: string) {
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&dnt=1`
}

const PHOTOS = {
  phoneOrange: '/works/conil-food-tour/phone-orange.webp',
  phoneHand: '/works/conil-food-tour/phone-hand.webp',
  phoneCheckout: '/works/conil-food-tour/phone-checkout.webp',
  phoneMoss: '/works/conil-food-tour/phone-moss.webp',
  laptop: '/works/conil-food-tour/laptop.webp',
  logo: '/works/conil-food-tour/logo.png',
  cards: '/works/conil-food-tour/cards.webp',
  app: '/works/conil-food-tour/app-icon.webp',
  food: '/works/conil-food-tour/hero-food.webp',
}

function MediaBlock({ src, type = 'image', aspect = '16/9', bg = '#111', alt = 'Conil Food Tour', fit = 'cover' }: {
  src?: string, type?: 'image' | 'vimeo', aspect?: string, bg?: string, alt?: string, fit?: 'cover' | 'contain'
}) {
  if (type === 'vimeo' && src) {
    return (
      <div style={{ position: 'relative', aspectRatio: aspect, borderRadius: '8px', overflow: 'hidden', background: bg }}>
        <iframe
          src={src}
          title="Conil Food Tour"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, pointerEvents: 'none' }}
        />
      </div>
    )
  }
  return (
    <div style={{ aspectRatio: aspect, borderRadius: '8px', overflow: 'hidden', background: bg }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: fit, objectPosition: 'center', display: 'block' }} />
    </div>
  )
}

export default function ConilFoodTourPage() {
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

      <section style={{ background: '#0D0D0D', padding: '80px 5% 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
          <iframe
            src={vimeoSrc(VIMEO.hero)}
            title="Conil Food Tour"
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
              <span>Events · eCommerce</span>
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
              CONIL<br />FOOD<br />
              <span style={{ color: '#3ec6ea' }}>TOUR</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6, maxWidth: '560px', fontWeight: 300, marginBottom: '48px',
            }}>
              Un food tour a Conil de la Frontera, raccontato con un&apos;identità visiva e un sito dove si prenota davvero.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0',
              borderTop: '1px solid #1C1C1C', paddingTop: '32px', width: 'fit-content',
            }} className="meta-grid">
              {[
                { label: 'Location', value: 'Conil de la Frontera' },
                { label: 'Settore', value: 'Food tour · Events' },
                { label: 'Cosa abbiamo fatto', value: 'Brand, UX, WooCommerce' },
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
              Conil Food Tour nasce per raccontare il territorio attraverso i suoi sapori: un percorso tra tradizione, cucina e convivialità.
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { title: 'Il concept', text: 'Logo, palette e linguaggio visivo costruiti insieme. Arancio, menta e blu tengono insieme sito, biglietti da visita e icona, così il brand si riconosce prima ancora di leggere il nome.' },
                { title: 'Il progetto', text: 'Il sito è vetrina e prenotazione. I tour — gourmet, tonno, vegetariano e privato — si scelgono, si datano e si pagano online, su WordPress e WooCommerce.' },
                { title: 'Il lancio', text: 'Dopo l’uscita abbiamo raccolto i feedback di chi ha partecipato e tenuto vivo il rapporto con aggiornamenti sui nuovi tour e supporto alle prenotazioni.' },
              ].map(block => (
                <div key={block.title}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase', marginBottom: '10px' }}>{block.title}</div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>{block.text}</p>
                </div>
              ))}
              <a href="https://www.conilfoodtour.com/" target="_blank" rel="noreferrer" style={{ fontSize: '12px', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>
                conilfoodtour.com →
              </a>
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

      <section style={{ padding: '80px 5%', borderTop: '1px solid #E0D8CC', borderBottom: '1px solid #E0D8CC' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, lineHeight: 1.1, letterSpacing: '-1px', textTransform: 'uppercase',
            }}>
              BRAND<br />IDENTITY
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, maxWidth: '480px' }}>
              Un marchio rotondo, da applicare sul sito, sul biglietto e sull&apos;icona. First-class flavor expeditions, detto con un segno che si ricorda.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }} className="grid-3-col">
          {[
            { src: PHOTOS.logo, alt: 'Logo Conil Food Tour' },
            { src: PHOTOS.cards, alt: 'Biglietti da visita Conil Food Tour' },
            { src: PHOTOS.app, alt: 'Icona Conil Food Tour' },
          ].map((photo, i) => (
            <FadeIn key={photo.src} delay={i * 100}>
              <MediaBlock src={photo.src} aspect="4 / 3" fit={photo.src === PHOTOS.logo ? 'contain' : 'cover'} bg="#f3f0ea" alt={photo.alt} />
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ marginTop: '8px' }}>
            <MediaBlock src={PHOTOS.food} aspect="16 / 9" bg="#1a1a1a" alt="Conil Food Tour, first-class flavor expeditions" />
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: '80px 5%', background: '#0D0D0D' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '48px', alignItems: 'end' }} className="grid-2-col">
            <h2 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.1, letterSpacing: '-1px', textTransform: 'uppercase',
            }}>
              SITO &<br />PRENOTAZIONE
            </h2>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px' }}>
              Dal telefono si sceglie il tour, le persone e la data, e si chiude il pagamento. Il desktop tiene il menu, i piatti e la prenotazione nello stesso sguardo.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <MediaBlock src={PHOTOS.laptop} aspect="3 / 2" bg="#111" alt="Sito Conil Food Tour su laptop" />
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }} className="grid-2-col">
          {[PHOTOS.phoneOrange, PHOTOS.phoneHand, PHOTOS.phoneCheckout, PHOTOS.phoneMoss].map((src, i) => (
            <FadeIn key={src} delay={i * 80}>
              <MediaBlock src={src} aspect="1 / 1" bg="#c4552a" alt="Conil Food Tour su telefono" />
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: '#0D0D0D', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }} className="grid-4-col">
          {[
            { num: '3h', label: 'Durata', sub: 'una camminata tra i locali' },
            { num: '8', label: 'Ospiti', sub: 'gruppi piccoli, privati su richiesta' },
            { num: '4', label: 'Tour', sub: 'gourmet, tonno, vegetariano, privato' },
            { num: 'WP', label: 'Piattaforma', sub: 'WordPress e WooCommerce' },
          ].map(item => (
            <div key={item.label} style={{ padding: '32px', background: '#111', borderRadius: '8px' }}>
              <div style={{
                fontFamily: "'Canela', Georgia, serif",
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: 300, color: '#3ec6ea',
                letterSpacing: '-2px', lineHeight: 1, marginBottom: '12px',
              }}>
                {item.num}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ddd', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '11px', color: '#444' }}>{item.sub}</div>
            </div>
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
        @media (max-width: 768px) {
          .grid-2-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .grid-3-col { grid-template-columns: 1fr !important; }
          .grid-4-col { grid-template-columns: 1fr 1fr !important; }
          .meta-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </main>
  )
}
