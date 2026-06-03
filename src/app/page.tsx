'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'

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

// Video card per la sezione lavori
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
        height: size === 'large' ? '520px' : '360px',
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

      {/* overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: hovered
          ? 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
        transition: 'background 0.5s ease',
      }} />

      {/* tag */}
      <div style={{
        position: 'absolute', top: '20px', left: '20px', zIndex: 2,
        fontSize: '9px', letterSpacing: '2px', color: '#fff',
        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
        padding: '5px 12px', borderRadius: '999px', textTransform: 'uppercase' as const,
        fontFamily: "'Axiforma', sans-serif",
      }}>
        {category}
      </div>

      {/* titolo */}
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

export default function Home() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const duration = 2400
    const interval = 16
    const steps = duration / interval
    let current = 0
    const counter = setInterval(() => {
      current++
      const progress = current / steps
      const eased = progress < 0.8 ? progress * 1.1 : 0.88 + (progress - 0.8) * 0.6
      setCount(Math.min(Math.floor(eased * 100), 100))
      if (current >= steps) {
        clearInterval(counter)
        setCount(100)
        setTimeout(() => setLoaded(true), 300)
      }
    }, interval)
    return () => clearInterval(counter)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqs = [
    'Come funziona l\'AI nella vostra agenzia?',
    'Quali servizi offrite?',
    'Quanto costano i vostri servizi?',
    'Lavorate con aziende di qualsiasi dimensione?',
    'Come inizia una collaborazione?',
    'Quanto tempo richiede un progetto?',
    'Offrite supporto dopo il lancio?',
    'Posso vedere esempi di lavori precedenti?',
  ]

  // I video dei lavori — sostituisci i src con i tuoi file in /public/works/
  const works = [
    { src: '/works/healingheartoff32.mp4', title: 'Healing Earth Italia', category: 'eCommerce · Brand', size: 'large' as const },
    { src: '/works/scuppoz.mp4', title: 'Scuppoz', category: 'Web Design', size: 'normal' as const },
    { src: '/works/momento.mp4', title: 'Momento Catering', category: 'Brand · Social', size: 'normal' as const },
    { src: '/works/texture.mp4', title: 'Texture Studio', category: 'Digital Strategy', size: 'normal' as const },
  ]

  return (
    <>
      {/* PRELOADER */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        pointerEvents: loaded ? 'none' : 'all',
        background: '#0D0D0D',
        transform: loaded ? 'translateY(-100%)' : 'translateY(0)',
        transition: loaded ? 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        display: 'flex', flexDirection: 'column' as const,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', top: '40px', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', letterSpacing: '5px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>OFF32</span>
          <span style={{ fontSize: '12px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>OFFICINA DIGITALE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(100px, 20vw, 200px)', fontWeight: 300, color: '#fff', letterSpacing: '-6px', lineHeight: 0.85 }}>{count}</span>
          <span style={{ fontFamily: "'Axiforma', sans-serif", fontSize: 'clamp(20px, 4vw, 40px)', fontWeight: 300, color: '#2a2a2a', paddingBottom: '12px' }}>%</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#1a1a1a' }}>
          <div style={{ height: '100%', width: `${count}%`, background: '#9fff00', transition: 'width 0.05s linear' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>Est. 2025</span>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>Loading</span>
        </div>
      </div>

      <main style={{
        background: '#F0EBE0', minHeight: '100vh',
        fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
        color: '#0D0D0D',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease 0.3s',
      }}>

        {/* NAVBAR DESKTOP */}
        <nav className="nav-desktop" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 5%', background: '#fe3812',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
          </a>
          <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
            {[
              { label: 'Lavori', href: '#works' },
              { label: 'Servizi', href: '#services' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contatti', href: '/contatti' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: '11px', color: '#666', padding: '4px 14px', borderRadius: '999px', letterSpacing: '0.3px', textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isSignedIn ? (
              <a href="/dashboard" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none' }}>
                Dashboard →
              </a>
            ) : (
              <>
                <a href="/login" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '9px 4px' }}>Accedi</a>
                <a href="/contatti" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none' }}>
                  Inizia un progetto →
                </a>
              </>
            )}
          </div>
        </nav>

        {/* HERO */}
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <video ref={heroVideoRef} autoPlay muted loop playsInline style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '115%', objectFit: 'cover', zIndex: 0,
            transform: `translateY(${scrollY * 0.4}px)`, willChange: 'transform',
          }}>
            <source src="/train_small.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '0 5% 56px' }}>
            <h1 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(52px, 8vw, 100px)',
              fontWeight: 300, lineHeight: 1.0,
              letterSpacing: '-3px', color: '#fff',
              marginBottom: '20px', maxWidth: '900px',
            }}>
              Comunicazione digitale<br />
              potenziata dall&apos;{' '}
              <span style={{ position: 'relative' as const, display: 'inline-block' }}>
                intelligenza.
                <span style={{ position: 'absolute' as const, left: '-4px', bottom: '10px', width: 'calc(100% + 8px)', height: '12px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }} />
              </span>
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '420px', fontWeight: 300 }}>
              OFF32 — agenzia di comunicazione che usa l&apos;AI per creare brand, esperienze digitali e campagne che funzionano davvero.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: '32px', right: '5%', zIndex: 2, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const }}>scroll</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
          </div>
        </section>

        {/* BARRA INFO */}
        <div style={{ background: '#F0EBE0', padding: '12px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0D8CC', borderTop: '1px solid #E0D8CC' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>Est. 2025</span>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>( Scroll )</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9fff00' }} />
              <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>AI Powered</span>
            </div>
          </div>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>Officina®</span>
        </div>

        {/* SERVIZI */}
        <section id="services" style={{ background: '#F0EBE0', padding: '64px 5%', borderBottom: '1px solid #E0D8CC' }}>
          <Animate>
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                {
                  tag: '/ BRAND & COMUNICAZIONE',
                  items: ['Brand Identity', 'Brand Strategy', 'Visual Language', 'Copywriting AI', 'Digital Storytelling', 'Content Creation'],
                },
                {
                  tag: '/ WEB & DIGITAL',
                  items: ['Web Design', 'Development React/Next.js', 'E-commerce Shopify', 'Landing Page', 'UX / UI Design', 'Performance & SEO'],
                },
                {
                  tag: '/ MARKETING & AI',
                  items: ['AI Marketing Strategy', 'Meta & Google Ads', 'Campaign Automation', 'Analytics & Data', 'Creative Testing AI', 'Social Media'],
                },
              ].map((s, i) => (
                <Animate key={i} delay={i * 100}>
                  <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' as const, gap: '8px', height: '100%' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#AAA098', marginBottom: '8px' }}>{s.tag}</div>
                    {s.items.map(item => (
                      <div key={item} style={{ fontSize: '13px', color: '#444', lineHeight: 1.5, paddingBottom: '6px', borderBottom: '1px solid #F5F0E8' }}>{item}</div>
                    ))}
                  </div>
                </Animate>
              ))}
            </div>
          </Animate>
        </section>

        {/* BANNER NERO */}
        <Animate>
          <section style={{ background: '#0D0D0D', padding: '40px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' as const }}>
            <p style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(20px, 2.8vw, 32px)',
              fontWeight: 300, color: '#fff',
              lineHeight: 1.3, letterSpacing: '-0.5px', maxWidth: '600px',
            }}>
              Usiamo l&apos;AI per fare comunicazione straordinaria. Non ci sostituisce — ci potenzia.
            </p>
            <a href="/contatti" style={{ background: '#9fff00', color: '#0D0D0D', fontSize: '11px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
              INIZIA UN PROGETTO →
            </a>
          </section>
        </Animate>

        {/* ── SEZIONE LAVORI CON VIDEO ── */}
        <section id="works" style={{ background: '#0D0D0D', padding: '64px 5% 48px' }}>
          <Animate>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#444', textTransform: 'uppercase' as const, fontFamily: 'monospace' }}>// Lavori selezionati</div>
              <a href="/lavori" style={{ fontSize: '11px', color: '#555', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '2px' }}>vedi tutti →</a>
            </div>
          </Animate>

          {/* Card grande */}
          <Animate delay={100}>
          
            <a href="/work/healing-earth" style={{ textDecoration: 'none', display: 'block', marginBottom: '8px' }}>
                <VideoCard
                  src={works[0].src}
                  title={works[0].title}
                  category={works[0].category}
                  size="large"
                />
             </a>
            
          </Animate>

          {/* Riga 2 colonne */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            {works.slice(1, 3).map((w, i) => (
              <Animate key={i} delay={i * 100}>
                <VideoCard src={w.src} title={w.title} category={w.category} />
              </Animate>
            ))}
          </div>

          {/* Card piccola + CTA */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingBottom: '16px' }}>
            <Animate>
              <VideoCard src={works[3].src} title={works[3].title} category={works[3].category} />
            </Animate>
            <Animate delay={100}>
              <div style={{ background: '#9fff00', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center', height: '360px', cursor: 'pointer' }}>
                <div style={{ fontFamily: "'Canela', Georgia, serif", fontSize: '28px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px', textAlign: 'center' as const, marginBottom: '24px', lineHeight: 1.2 }}>
                  Vuoi vedere<br />tutti i progetti?
                </div>
                <a href="/lavori" style={{ color: '#0D0D0D', fontSize: '11px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px', border: '2px solid #0D0D0D' }}>
                  TUTTI I LAVORI →
                </a>
              </div>
            </Animate>
          </div>
        </section>

        {/* AMIAMO I DETTAGLI */}
        <section style={{ background: '#F0EBE0', padding: '80px 5%', borderTop: '1px solid #E0D8CC' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <Animate direction="left">
              <div>
                <h2 style={{
                  fontFamily: "'Canela', Georgia, serif",
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 300, color: '#0D0D0D',
                  lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px',
                }}>
                  Amiamo i dettagli.<br />L&apos;AI li amplifica.
                </h2>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.85, marginBottom: '14px' }}>
                  C&apos;è qualcosa di profondo nel rispetto al lavoro. È la spinta a costruire esperienze che durano nel tempo, a creare qualcosa che diventa indimenticabile.
                </p>
                <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.85, marginBottom: '32px' }}>
                  In <strong style={{ color: '#0D0D0D' }}>OFF32</strong> — officina digitale di comunicazione AI — ascoltiamo la storia del tuo brand e la trasformiamo in impatto reale, usando l&apos;intelligenza artificiale come strumento, non come scorciatoia.
                </p>
                <a href="/about" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px', display: 'inline-block' }}>
                  SCOPRI IL MANIFESTO →
                </a>
              </div>
            </Animate>
            <Animate direction="right">
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {[
                  { num: '10+', label: 'Anni di esperienza', sub: 'Brand, digital e comunicazione', green: false },
                  { num: '50+', label: 'Progetti completati', sub: 'Dal brand all\'eCommerce', green: false },
                  { num: '0', label: 'Compromessi sulla qualità', sub: 'La qualità non si negozia mai', green: true },
                ].map((s, i) => (
                  <Animate key={i} delay={i * 100}>
                    <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ fontSize: '32px', fontWeight: 800, color: s.green ? '#9fff00' : '#0D0D0D', letterSpacing: '-1px', lineHeight: 1, flexShrink: 0, minWidth: '72px' }}>{s.num}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '3px' }}>{s.label}</div>
                        <div style={{ fontSize: '11px', color: '#AAA098' }}>{s.sub}</div>
                      </div>
                    </div>
                  </Animate>
                ))}
              </div>
            </Animate>
          </div>
        </section>

        {/* BLOG */}
        <section style={{ background: '#F0EBE0', padding: '64px 5%', borderTop: '1px solid #E0D8CC' }}>
          <Animate>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px' }}>Blog</h2>
              <a href="/blog" style={{ fontSize: '11px', color: '#AAA098', borderBottom: '1px solid #E0D8CC', paddingBottom: '2px', textDecoration: 'none' }}>tutti gli articoli →</a>
            </div>
          </Animate>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { tag: 'Design', title: 'Come costruire un brand digitale che dura nel tempo', date: 'Mar 2025', img: '#0A1510', slug: 'come-costruire-brand-digitale' },
              { tag: 'Community', title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti', date: 'Feb 2025', img: '#12102A', slug: 'scegliere-clienti-giusti' },
            ].map((post, i) => (
              <Animate key={i} delay={i * 150}>
                <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{ height: '180px', background: post.img, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#1a1a1a', textTransform: 'uppercase' as const }}>OFF32 · Blog</span>
                    </div>
                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>{post.tag}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', lineHeight: 1.4, marginBottom: '12px' }}>{post.title}</div>
                      <div style={{ fontSize: '10px', color: '#AAA098', letterSpacing: '1px' }}>{post.date}</div>
                    </div>
                  </div>
                </a>
              </Animate>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#F0EBE0', padding: '64px 5%', borderTop: '1px solid #E0D8CC' }}>
          <Animate>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '40px', textAlign: 'center' as const }}>FAQ</h2>
          </Animate>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {faqs.map((q, i) => (
              <Animate key={i} delay={i * 40}>
                <div style={{ borderTop: '1px solid #E0D8CC', borderBottom: i === faqs.length - 1 ? '1px solid #E0D8CC' : 'none' }}>
                  <div
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', cursor: 'pointer', gap: '16px' }}
                  >
                    <span style={{ fontSize: '13px', color: '#333', lineHeight: 1.5 }}>{q}</span>
                    <span style={{ fontSize: '20px', color: '#AAA098', flexShrink: 0, display: 'inline-block', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ paddingBottom: '18px', fontSize: '13px', color: '#888', lineHeight: 1.75 }}>
                      Puoi trovare tutte le informazioni nella pagina dedicata o contattarci direttamente a connect@off32.it — siamo sempre disponibili per qualsiasi domanda.
                    </div>
                  )}
                </div>
              </Animate>
            ))}
          </div>
        </section>

        {/* CTA FINALE */}
        <Animate>
          <section style={{ background: '#fe3812', padding: '96px 5%', textAlign: 'center' as const }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, marginBottom: '20px' }}>// INIZIA UN PROGETTO</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '16px' }}>
              Hai un progetto<br />in mente?
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.7 }}>
              Raccontacelo. Trasformiamo idee in comunicazione che funziona davvero.
            </p>
            <a href="/contatti" style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '14px 40px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
              SCRIVICI →
            </a>
          </section>
        </Animate>

        {/* FOOTER */}
        <footer style={{ background: '#9fff00', padding: '24px 5%', borderTop: '1px solid #8aee00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div style={{ display: 'flex', gap: '28px' }}>
              {[
                { label: 'LAVORI', href: '/lavori' },
                { label: 'BLOG', href: '/blog' },
                { label: 'PRIVACY POLICY', href: '/privacy-policy' },
                { label: 'COOKIE', href: '/cookie-policy' },
                { label: 'TERMS & CONDITIONS', href: '/terms-and-conditions' },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', fontWeight: 600, textDecoration: 'none' }}>{l.label}</a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['CONTACT', 'CONNECT@OFF32.IT', '© 2025 OFF32'].map(l => (
                <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px' }}>{l}</span>
              ))}
            </div>
          </div>
        </footer>

        {/* NAVBAR MOBILE */}
        <nav className="nav-mobile" style={{
          display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          background: '#0D0D0D', borderTop: '1px solid #1C1C1C',
          padding: '12px 5%', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '24px', width: 'auto' }} />
          <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #222', borderRadius: '999px', padding: '4px 8px' }}>
            {[
              { label: 'lavori', href: '#works' },
              { label: 'blog', href: '/blog' },
              { label: 'contatti', href: '/contatti' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: '10px', color: '#666', padding: '3px 10px', borderRadius: '999px', textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
          <a href="/contatti" style={{ background: '#fe3812', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '7px 16px', borderRadius: '999px', textDecoration: 'none' }}>
            progetto →
          </a>
        </nav>

        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile { display: flex !important; }
            .grid-2 { grid-template-columns: 1fr !important; gap: 16px !important; }
            .grid-3 { grid-template-columns: 1fr !important; }
            main { padding-bottom: 72px; }
            h1 { font-size: 40px !important; letter-spacing: -1px !important; }
            h2 { font-size: 26px !important; }
          }
        `}</style>

      </main>
    </>
  )
}
