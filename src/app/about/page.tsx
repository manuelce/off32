'use client'
import { useEffect, useState, useRef } from 'react'

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const values = [
    { num: '01', title: 'Qualità sopra tutto', desc: 'Non siamo un marketplace di massa. Ogni candidatura viene letta da una persona reale. Preferiamo avere 50 profili eccellenti che 5000 mediocri.' },
    { num: '02', title: 'Trasparenza totale', desc: 'Chi viene rifiutato sa perché. Chi paga sa cosa ottiene. Nessun algoritmo nascosto, nessuna logica oscura. Solo persone che parlano con persone.' },
    { num: '03', title: 'Community prima di tutto', desc: 'OFF32 non è un\'agenzia che vende servizi. È una community dove i professionisti si aiutano, collaborano e crescono insieme.' },
    { num: '04', title: 'Il lavoro parla per te', desc: 'Non conta quanti follower hai, dove hai studiato o come ti presenti. Conta quello che hai fatto. Il portfolio è l\'unico curriculum che accettiamo.' },
  ]

  const team = [
    { initials: 'MR', name: 'Marco Rossi', role: 'Founder · Web Developer', city: 'Milano', bg: '#EEF8F3', color: '#0F6E56', bio: '10 anni di progetti digitali. Ha fondato OFF32 perché non trovava colleghi all\'altezza nei posti giusti.' },
    { initials: 'SB', name: 'Sara Belli', role: 'Co-founder · Design', city: 'Roma', bg: '#EEEDFE', color: '#534AB7', bio: 'Designer con ossessione per i dettagli. Cura ogni pixel di OFF32 e seleziona i profili in ingresso.' },
    { initials: 'AF', name: 'Andrea Ferri', role: 'Community Manager', city: 'Bologna', bg: '#FDF0EB', color: '#993C1D', bio: 'Tiene insieme la community, legge ogni candidatura e si assicura che OFF32 resti un posto di qualità.' },
  ]

  return (
    <main style={{ background: '#0D0D0D', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#fff' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {['discover', 'about', 'blog', 'contatti'].map(link => (
            <a key={link} href={`/${link}`} style={{ fontSize: '11px', color: link === 'about' ? '#fff' : '#666', padding: '4px 14px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none', background: link === 'about' ? '#2a2a2a' : 'transparent' }}>{link}</a>
          ))}
        </div>
        <a href="/login" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
          Entra nell&apos;hub
        </a>
      </nav>

      {/* HERO MANIFESTO */}
      <section style={{ padding: '96px 5% 80px', borderBottom: '1px solid #1C1C1C', maxWidth: '900px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '24px' }}>// chi siamo · off32.com/about</div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-3px', color: '#fff', marginBottom: '32px' }}>
          L&apos;
          <span style={{ position: 'relative', display: 'inline-block' }}>
            officina
            <span style={{ position: 'absolute', left: '-4px', bottom: '10px', width: 'calc(100% + 8px)', height: '12px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
          </span>
          <br />dei professionisti<br />digitali italiani.
        </h1>
        <p style={{ fontSize: '18px', color: '#444', lineHeight: 1.8, maxWidth: '640px', fontWeight: 300 }}>
          Siamo nati da una convinzione semplice: il mondo digitale italiano è pieno di talento. Ma è disperso, invisibile, mal rappresentato. <span style={{ color: '#888' }}>OFF32 esiste per cambiarlo.</span>
        </p>
      </section>

      {/* BARRA EST. */}
      <div style={{ background: '#0D0D0D', padding: '14px 5%', borderBottom: '1px solid #1C1C1C', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fe3812' }}></div>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' as const }}>Est. 2025</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#9fff00' }}></div>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' as const }}>Officina Digitale</span>
        </div>
        <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' as const }}>Italia</span>
      </div>

      {/* 3 BLOCCHI MANIFESTO */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '72px', maxWidth: '760px' }}>

          {/* 01 */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#fe3812', fontFamily: 'monospace', marginBottom: '16px' }}>01 ——</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
              Il problema che<br />volevamo <span style={{ color: '#fe3812' }}>risolvere.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>
              Se sei un web developer italiano bravo davvero, dove vai per farti trovare? LinkedIn è rumore. Behance è una galleria anonima. Upwork ti mette in gara con il mondo intero sul prezzo.
            </p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85, marginBottom: '24px' }}>
              <span style={{ color: '#666' }}>Non esisteva un posto pensato per i professionisti digitali italiani di qualità.</span> Un posto dove il lavoro parlasse per te, non il profilo. Dove i clienti cercassero davvero, non sfogliassero a caso.
            </p>
            <div style={{ borderLeft: '2px solid #1D9E75', paddingLeft: '20px', background: '#080A09', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '10px' }}>
                "Avevo un portfolio forte. Ma nessuno che cercasse quello che facevo io riusciva a trovarmi. I clienti giusti non sapevano dove cercare."
              </p>
              <span style={{ fontSize: '10px', color: '#2a2a2a', letterSpacing: '1.5px', fontFamily: 'monospace' }}>— un web developer italiano, 2024</span>
            </div>
          </div>

          {/* 02 */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#fe3812', fontFamily: 'monospace', marginBottom: '16px' }}>02 ——</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
              La nostra<br />risposta.
            </h2>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>
              Abbiamo costruito OFF32 con un&apos;idea precisa: <span style={{ color: '#666' }}>la qualità si seleziona, non si aspetta.</span> Non è una directory aperta dove chiunque si iscrive. È una community dove si entra solo se il lavoro lo merita.
            </p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85 }}>
              Ogni professionista che vedi su OFF32 è stato valutato dal team. Guardiamo il portfolio, non il curriculum. Guardiamo i progetti, non i follower. Guardiamo il lavoro vero.
            </p>
          </div>

          {/* 03 */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', color: '#fe3812', fontFamily: 'monospace', marginBottom: '16px' }}>03 ——</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '16px' }}>
              Il nome.<br /><span style={{ color: '#fe3812' }}>OFF32.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85, marginBottom: '16px' }}>
              Un&apos;officina non è una fabbrica. Non produce in serie. In un&apos;officina ogni pezzo è fatto con le mani, con attenzione, con mestiere.
            </p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.85 }}>
              <span style={{ color: '#666' }}>32 è la temperatura a cui l&apos;acqua cambia stato</span> — il punto in cui qualcosa di solido diventa qualcosa di nuovo. È quello che facciamo: prendiamo professionisti già bravi e li portiamo dove meritano di stare.
            </p>
          </div>

        </div>
      </section>

      {/* VALORI — griglia 2x2 */}
      <section style={{ background: '#111', padding: '80px 5%', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// i nostri valori</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', marginBottom: '48px' }}>Cosa ci muove ogni giorno.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1A1A1A', border: '1px solid #1A1A1A', borderRadius: '12px', overflow: 'hidden' }} className="values-grid">
          {values.map(v => (
            <div key={v.num} style={{ background: '#0D0D0D', padding: '32px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#fe3812', fontFamily: 'monospace', paddingTop: '3px', flexShrink: 0 }}>{v.num}</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#888', marginBottom: '8px' }}>{v.title}</div>
                <div style={{ fontSize: '12px', color: '#333', lineHeight: 1.75 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// chi c&apos;è dietro</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', marginBottom: '48px' }}>Il team OFF32.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="team-grid">
          {team.map(m => (
            <div key={m.initials} style={{ background: '#111', border: '1px solid #1A1A1A', borderRadius: '12px', padding: '28px', textAlign: 'center' as const }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: m.bg, border: `1px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: m.color, margin: '0 auto 16px' }}>{m.initials}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#ddd', marginBottom: '4px' }}>{m.name}</div>
              <div style={{ fontSize: '11px', color: '#333', letterSpacing: '0.5px', marginBottom: '12px' }}>{m.role}</div>
              <div style={{ fontSize: '12px', color: '#2a2a2a', lineHeight: 1.65, marginBottom: '14px' }}>{m.bio}</div>
              <span style={{ fontSize: '9px', padding: '4px 12px', border: '1px solid #1C1C1C', borderRadius: '999px', color: '#333', letterSpacing: '1px' }}>{m.city}</span>
            </div>
          ))}
        </div>
      </section>

      {/* NUMERI */}
      <div style={{ background: '#111', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
        {[
          { num: '48+', label: 'professionisti', green: false },
          { num: '230+', label: 'progetti realizzati', green: false },
          { num: '100%', label: 'profili verificati', green: true },
          { num: '0', label: 'profili mediocri', green: false },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' as const, padding: '40px 20px', borderRight: i < 3 ? '1px solid #1A1A1A' : 'none' }}>
            <div style={{ fontSize: '38px', fontWeight: 800, color: s.green ? '#9fff00' : '#fff', letterSpacing: '-1.5px', lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#222', textTransform: 'uppercase' as const, marginTop: '8px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA FINALE */}
      <section style={{ background: '#fe3812', padding: '96px 5%', textAlign: 'center' as const }}>
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const, marginBottom: '20px' }}>// entra nell&apos;officina</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '16px' }}>
          Sei il tipo di<br />professionista che<br />cerchiamo?
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', lineHeight: 1.7 }}>
          Se il tuo lavoro parla per te, c&apos;è posto per te in OFF32. Fai domanda — ci vuole 5 minuti.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="/apply" style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '14px 36px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            candidati adesso →
          </a>
          <a href="/discover" style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: '12px', padding: '14px 36px', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            scopri i professionisti
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#9fff00', padding: '24px 5%', borderTop: '1px solid #8aee00' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['DISCOVER', 'BLOG', 'PRIVACY POLICY'].map(l => (
              <a key={l} href="#" style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', textDecoration: 'none', fontWeight: 600 }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', fontWeight: 700 }}>OFF32</span>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['CONTACT', 'CONNECT@OFF32.COM', '© 2025 OFF32'].map(l => (
              <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}
