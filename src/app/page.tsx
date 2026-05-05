'use client'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const duration = 2400
    const interval = 16
    const steps = duration / interval
    let current = 0
    const counter = setInterval(() => {
      current++
      const progress = current / steps
      const eased = progress < 0.8 ? progress * 1.1 : 0.88 + (progress - 0.8) * 0.6
      const val = Math.min(Math.floor(eased * 100), 100)
      setCount(val)
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
    'Come faccio a candidarmi come professionista?',
    'Quanto costa entrare in OFF32?',
    'Come funziona la selezione dei professionisti?',
    'Posso cercare un team completo per il mio progetto?',
    'Che differenza c\'è tra piano Free e Studio?',
    'Come contatto direttamente un professionista?',
    'Posso essere sia professionista che cliente?',
    'Come vengono verificate le recensioni?',
  ]

  const professionals = [
    { initials: 'MR', name: 'Marco Ricci', role: 'Web Developer · Milano', tags: ['React', 'Next.js', 'Shopify'], bg: '#EEF8F3', color: '#0F6E56', premium: true, projects: 34, size: 'large' },
    { initials: 'SL', name: 'Sara Longo', role: 'Illustratrice · Roma', tags: ['Branding', 'Editorial'], bg: '#EEEDFE', color: '#534AB7', premium: false, projects: 21, size: 'small' },
    { initials: 'AF', name: 'Alex Ferro', role: '3D Artist · Torino', tags: ['Blender', 'Cinema 4D'], bg: '#FDF0EB', color: '#993C1D', premium: true, projects: 18, size: 'small' },
    { initials: 'GV', name: 'Giulia Vitale', role: 'UX Designer · Napoli', tags: ['Figma', 'Research'], bg: '#FEF8EE', color: '#854F0B', premium: false, projects: 29, size: 'small' },
  ]

  return (
    <>
      {/* PRELOADER stile Reform Collective */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        pointerEvents: loaded ? 'none' : 'all',
        background: '#0D0D0D',
        transform: loaded ? 'translateY(-100%)' : 'translateY(0)',
        transition: loaded ? 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        display: 'flex', flexDirection: 'column' as const,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', top: '40px', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', letterSpacing: '5px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>OFF32</span>
          <span style={{ fontSize: '12px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>OFFICINA DIGITALE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', lineHeight: 1 }}>
          <span style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(100px, 20vw, 200px)', fontWeight: 300, color: '#fff', letterSpacing: '-6px', lineHeight: 0.85 }}>{count}</span>
          <span style={{ fontFamily: "'Axiforma', sans-serif", fontSize: 'clamp(20px, 4vw, 40px)', fontWeight: 300, color: '#2a2a2a', letterSpacing: '-1px', paddingBottom: '12px' }}>%</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: '#1a1a1a' }}>
          <div style={{ height: '100%', width: `${count}%`, background: '#9fff00', transition: 'width 0.05s linear' }}></div>
        </div>
        <div style={{ position: 'absolute', bottom: '24px', left: '5%', right: '5%', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>Est. 2025</span>
          <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#2a2a2a', textTransform: 'uppercase' as const, fontFamily: "'Axiforma', sans-serif" }}>Loading</span>
        </div>
      </div>

      <main style={{
        background: '#F0EBE0', minHeight: '100vh',
        fontFamily: "'Axiforma', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: '#0D0D0D',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease 0.3s'
      }}>

        {/* ── 01 NAVBAR ── */}
        <nav className="nav-desktop" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 5%', background: '#fe3812',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
          <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
            {['Discover', 'About', 'Blog', 'Contatti'].map(link => (
              <span key={link} style={{ fontSize: '11px', color: '#666', padding: '4px 14px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px' }}>{link}</span>
            ))}
          </div>
          <a href="/login" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
              Entra nell'hub
          </a>
          
        </nav>

        {/* ── 02 HERO — video sfondo, testo basso sinistra ── */}
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <video ref={videoRef} autoPlay muted loop playsInline style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '115%', objectFit: 'cover', zIndex: 0,
            transform: `translateY(${scrollY * 0.4}px)`, willChange: 'transform'
          }}>
            <source src="/train_small.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)' }}></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '0 5% 56px' }}>
            <h1 style={{
              fontFamily: "'Canela', Georgia, serif",
              fontSize: 'clamp(52px, 8vw, 100px)',
              fontWeight: 300, lineHeight: 1.0,
              letterSpacing: '-3px', color: '#fff',
              marginBottom: '20px', maxWidth: '900px'
            }}>
              Il network dei<br />
              professionisti{' '}
              <span style={{ position: 'relative' as const, display: 'inline-block' }}>
                digitali.
                <span style={{ position: 'absolute' as const, left: '-4px', bottom: '10px', width: 'calc(100% + 8px)', height: '12px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
              </span>
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '420px', marginBottom: '0', fontWeight: 300 }}>
              Officina digitale: selezioniamo i migliori professionisti italiani per esperienze che funzionano.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: '32px', right: '5%', zIndex: 2, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const }}>scroll</span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}></div>
          </div>
        </section>

        {/* ── 03 BARRA INFO — est. 2025 · (SCROLL) · officina® ── */}
        <div style={{ background: '#F0EBE0', padding: '12px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0D8CC', borderTop: '1px solid #E0D8CC' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>Est. 2025</span>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>( Scroll )</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9fff00' }}></div>
              <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>48 Attivi</span>
            </div>
          </div>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const }}>Officina®</span>
        </div>

        {/* ── 04 SERVIZI 3 COLONNE — Brand Direction / Development / Marketing ── */}
        <section style={{ background: '#F0EBE0', padding: '48px 5%', borderBottom: '1px solid #E0D8CC' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              {
                tag: '/ WEB DEVELOPMENT',
                items: ['React / Next.js', 'E-commerce Shopify', 'WooCommerce & Custom CMS', 'App Integration', 'Performance & Security', 'Code Implementation'],
              },
              {
                tag: '/ DESIGN & ILLUSTRAZIONE',
                items: ['Brand Identity', 'UI / UX Design', 'Illustrazione Editoriale', '3D & Rendering', 'Motion Graphics', 'Visual Language'],
              },
              {
                tag: '/ MARKETING & STRATEGIA',
                items: ['Marketing Strategy', 'Meta Ads', 'Google Ads', 'Campaign Optimization', 'SEO & Analytics', 'Creative Testing'],
              },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#AAA098', marginBottom: '8px' }}>{s.tag}</div>
                {s.items.map(item => (
                  <div key={item} style={{ fontSize: '13px', color: '#444', lineHeight: 1.5, paddingBottom: '6px', borderBottom: '1px solid #F5F0E8' }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── 05 BANNER NERO — testo grande + CTA verde ── */}
        <section style={{ background: '#0D0D0D', padding: '40px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' as const }}>
          <p style={{
            fontFamily: "'Canela', Georgia, serif",
            fontSize: 'clamp(20px, 2.8vw, 32px)',
            fontWeight: 300, color: '#fff',
            lineHeight: 1.3, letterSpacing: '-0.5px', maxWidth: '600px'
          }}>
            Professionisti verificati, clienti selezionati, collaborazioni reali.
          </p>
          <button style={{ background: '#9fff00', color: '#0D0D0D', fontSize: '11px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
            SCOPRI →
          </button>
        </section>

        {/* ── 06 PROFILI — griglia asimmetrica come i "lavori" del vecchio ── */}
        <section style={{ background: '#0D0D0D', padding: '4px 5% 0' }}>

          {/* Card grande — primo profilo */}
          <div style={{ background: '#111', border: '1px solid #1C1C1C', borderRadius: '12px', padding: '40px', marginBottom: '4px', minHeight: '300px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EEF8F3', border: '1px solid #0F6E5630', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#0F6E56', flexShrink: 0 }}>MR</div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#e0e0e0', marginBottom: '4px', letterSpacing: '-0.5px' }}>Marco Ricci</div>
                <div style={{ fontSize: '12px', color: '#444', letterSpacing: '0.3px' }}>Web Developer · Milano</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.7, maxWidth: '600px', marginBottom: '24px' }}>
              Sviluppo esperienze digitali che funzionano davvero. Specializzato in eCommerce performanti, app web custom e integrazioni complesse. Non faccio vetrine — faccio strumenti che vendono.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #1C1C1C' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['React', 'Next.js', 'Shopify', 'Node.js'].map(t => <span key={t} style={{ fontSize: '10px', padding: '4px 14px', border: '1px solid #1E1E1E', borderRadius: '999px', color: '#444' }}>{t}</span>)}
              </div>
              <span style={{ fontSize: '9px', padding: '4px 12px', background: '#1A0E00', border: '1px solid #fe381225', borderRadius: '999px', color: '#fe3812', letterSpacing: '1px' }}>STUDIO</span>
            </div>
          </div>

          {/* Riga 2x2 */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '4px' }}>
            {[
              { initials: 'SL', name: 'Sara Longo', role: 'Illustratrice · Roma', tags: ['Branding', 'Editorial', 'Procreate'], bg: '#EEEDFE', color: '#534AB7', premium: false, projects: 21, desc: 'Illustratrice editoriale e brand designer. Trasforma concetti complessi in immagini memorabili.' },
              { initials: 'AF', name: 'Alex Ferro', role: '3D Artist · Torino', tags: ['Blender', 'Cinema 4D', 'Motion'], bg: '#FDF0EB', color: '#993C1D', premium: true, projects: 18, desc: '3D artist e motion designer. Crea mondi digitali con attenzione maniacale ai dettagli.' },
            ].map(p => (
              <div key={p.initials} style={{ background: '#111', border: '1px solid #1C1C1C', borderRadius: '12px', padding: '28px', cursor: 'pointer', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', minHeight: '220px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: p.bg, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.initials}</div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#e0e0e0', marginBottom: '3px' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#444' }}>{p.role}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#333', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #1C1C1C' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                    {p.tags.map(t => <span key={t} style={{ fontSize: '9px', padding: '3px 10px', border: '1px solid #1E1E1E', borderRadius: '999px', color: '#444' }}>{t}</span>)}
                  </div>
                  {p.premium && <span style={{ fontSize: '9px', padding: '3px 10px', background: '#1A0E00', border: '1px solid #fe381225', borderRadius: '999px', color: '#fe3812', letterSpacing: '1px', flexShrink: 0 }}>STUDIO</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Card piccola sotto destra */}
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '0' }}>
            <div style={{ background: '#111', border: '1px solid #1C1C1C', borderRadius: '12px', padding: '28px', cursor: 'pointer', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', minHeight: '180px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FEF8EE', border: '1px solid #854F0B30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#854F0B', flexShrink: 0 }}>GV</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#e0e0e0', marginBottom: '3px' }}>Giulia Vitale</div>
                  <div style={{ fontSize: '11px', color: '#444' }}>UX Designer · Napoli</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['Figma', 'Research', 'Webflow'].map(t => <span key={t} style={{ fontSize: '9px', padding: '3px 10px', border: '1px solid #1E1E1E', borderRadius: '999px', color: '#444' }}>{t}</span>)}
              </div>
            </div>
            <div style={{ background: '#fe3812', border: '1px solid #1C1C1C', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center', minHeight: '180px', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' as const }}>TUTTI I PROFILI →</span>
            </div>
          </div>

          {/* Bottone ALL WORKS */}
          <div style={{ textAlign: 'center' as const, padding: '32px 0 48px' }}>
            <button style={{ background: '#9fff00', color: '#0D0D0D', fontSize: '13px', fontWeight: 700, padding: '14px 48px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
              ALL WORKS
            </button>
          </div>
        </section>

        {/* ── 07 "AMIAMO I DETTAGLI" → IL NETWORK ── */}
        <section style={{ background: '#F0EBE0', padding: '80px 5%', borderTop: '1px solid #E0D8CC' }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontFamily: "'Canela', Georgia, serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 300, color: '#0D0D0D',
                lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px'
              }}>Il network dove la qualità è l&apos;unico requisito.</h2>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.85, marginBottom: '14px' }}>
                C&apos;è qualcosa di profondo nel rispetto al lavoro. È la spinta a costruire esperienze che durano nel tempo, a creare qualcosa che diventa indimenticabile.
              </p>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.85, marginBottom: '32px' }}>
                In <strong style={{ color: '#0D0D0D' }}>OFF32</strong> — officina digitale di professionisti selezionati — ascoltiamo la storia del tuo brand e troviamo il talento che fa per te, trasformando idee in impatto reale.
              </p>
              <button style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}>
                SCOPRI IL MANIFESTO →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              {[
                { num: '48+', label: 'Professionisti approvati', sub: 'Solo chi ha dimostrato di saper fare', green: false },
                { num: '100%', label: 'Profili verificati', sub: 'Ogni portfolio è stato visionato dal team', green: false },
                { num: '0', label: 'Profili mediocri', sub: 'La qualità non si negozia mai', green: true },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: s.green ? '#9fff00' : '#0D0D0D', letterSpacing: '-1px', lineHeight: 1, flexShrink: 0, minWidth: '72px' }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '3px' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: '#AAA098' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 BLOG — 2 card affiancate ── */}
        <section style={{ background: '#F0EBE0', padding: '64px 5%', borderTop: '1px solid #E0D8CC' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px' }}>Blog</h2>
            <span style={{ fontSize: '11px', color: '#AAA098', borderBottom: '1px solid #E0D8CC', paddingBottom: '2px', cursor: 'pointer' }}>tutti gli articoli →</span>
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { tag: 'Design', title: 'Come costruire un brand digitale che dura nel tempo', date: 'Mar 2025', img: '#0A1510' },
              { tag: 'Community', title: 'La selezione dei professionisti: perché la qualità non si negozia', date: 'Feb 2025', img: '#12102A' },
            ].map((post, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: '180px', background: post.img, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#1a1a1a', textTransform: 'uppercase' as const }}>OFF32 · Blog</span>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>{post.tag}</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', lineHeight: 1.4, marginBottom: '12px' }}>{post.title}</div>
                  <div style={{ fontSize: '10px', color: '#AAA098', letterSpacing: '1px' }}>{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 09 FAQ — accordion come il vecchio ── */}
        <section style={{ background: '#F0EBE0', padding: '64px 5%', borderTop: '1px solid #E0D8CC' }}>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '40px', textAlign: 'center' as const }}>FAQ</h2>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {faqs.map((q, i) => (
              <div key={i} style={{ borderTop: '1px solid #E0D8CC', borderBottom: i === faqs.length - 1 ? '1px solid #E0D8CC' : 'none' }}>
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', cursor: 'pointer', gap: '16px' }}
                >
                  <span style={{ fontSize: '13px', color: '#333', lineHeight: 1.5 }}>{q}</span>
                  <span style={{ fontSize: '20px', color: '#AAA098', flexShrink: 0, display: 'inline-block', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ paddingBottom: '18px', fontSize: '13px', color: '#888', lineHeight: 1.75 }}>
                    Puoi trovare tutte le informazioni nella pagina dedicata o contattarci direttamente a connect@off32.com — siamo sempre disponibili per qualsiasi domanda.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 10 CTA FINALE ── */}
        <section style={{ background: '#fe3812', padding: '96px 5%', textAlign: 'center' as const }}>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, marginBottom: '20px' }}>// UNISCITI ALL&apos;OFFICINA</div>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '16px' }}>
            Pronto a fare parte<br />dei migliori?
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.7 }}>
            Fai domanda. Se il tuo lavoro parla per te, trovi il tuo posto in OFF32.
          </p>
          <button style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '14px 40px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}>
            CREA IL TUO PROFILO →
          </button>
        </section>

        {/* ── 11 FOOTER — come il vecchio 3 colonne ── */}
        <footer style={{ background: '#9fff00', padding: '24px 5%', borderTop: '1px solid #8aee00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['DISCOVER', 'BLOG', 'PRIVACY POLICY'].map(l => (
                <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: 600 }}>{l}</span>
              ))}
            </div>
            <span style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', fontWeight: 700 }}>OFF32</span>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['CONTACT', 'CONNECT@OFF32.COM', '© 2025 OFF32'].map(l => (
                <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px', cursor: 'pointer' }}>{l}</span>
              ))}
            </div>
          </div>
        </footer>

        {/* NAVBAR MOBILE */}
        <nav className="nav-mobile" style={{
          display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
          background: '#0D0D0D', borderTop: '1px solid #1C1C1C',
          padding: '12px 5%', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '24px', width: 'auto' }} />
          <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #222', borderRadius: '999px', padding: '4px 8px' }}>
            {['discover', 'about', 'blog'].map(link => (
              <span key={link} style={{ fontSize: '10px', color: '#666', padding: '3px 10px', borderRadius: '999px', cursor: 'pointer' }}>{link}</span>
            ))}
          </div>
          <button style={{ background: '#fe3812', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '7px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>entra</button>
        </nav>

        <style>{`
          @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
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
