'use client'
import { useState } from 'react'

const PROFESSIONALS: Record<string, any> = {
  'marco-ricci': {
    initials: 'MR', name: 'Marco Ricci', role: 'Web Developer', specialty: 'Full Stack',
    city: 'Milano', country: 'Italia', email: 'marco@off32.com',
    bg: '#EEF8F3', color: '#0F6E56', premium: true, projects: 34, rating: 4.9,
    available: true, experience: 6, collabs: 12, languages: 'IT / EN',
    memberSince: 'gen 2025',
    bio: 'Sviluppo esperienze digitali che funzionano davvero. Specializzato in eCommerce performanti, app web custom e integrazioni complesse. Non faccio vetrine — faccio strumenti che vendono.',
    socials: { instagram: '#', linkedin: '#', website: 'https://marcoricci.com' },
    skills: [
      { name: 'React / Next.js', level: 3 },
      { name: 'Shopify', level: 3 },
      { name: 'Node.js', level: 2 },
      { name: 'TypeScript', level: 2 },
      { name: 'WooCommerce', level: 3 },
      { name: 'Supabase', level: 1 },
    ],
    portfolio: [
      { title: 'Healing Earth Italia', tags: ['eCommerce', 'WooCommerce', 'SEO'], url: 'https://healingearth.it', bg: '#0A1510' },
      { title: 'Momento Catering', tags: ['Web Design', 'Branding'], url: 'https://momentocatering.com', bg: '#120A08' },
      { title: 'Scuppoz Food Tour', tags: ['Shopify', 'Custom CMS'], url: 'https://scuppoz.it', bg: '#0A0A14' },
    ],
    reviews: [
      { initials: 'AC', name: 'Anna Colombo', company: 'CEO · Healing Earth Italia', rating: 5, text: 'Marco ha trasformato il nostro eCommerce in qualcosa che funziona davvero. Le vendite sono cresciute del 40% nel primo mese. Professionalità e risultati concreti.', date: 'marzo 2025', project: 'healing earth italia' },
      { initials: 'LB', name: 'Luca Bianchi', company: 'Founder · Momento Catering', rating: 4, text: 'Lavoro preciso, tempi rispettati, comunicazione chiara. Esattamente quello che cercavo. Lo ricontatterò per i prossimi progetti.', date: 'gennaio 2025', project: 'momento catering' },
    ],
    similar: [
      { initials: 'GV', name: 'Giulia Vitale', role: 'UX Designer', bg: '#FEF8EE', color: '#854F0B', slug: 'giulia-vitale' },
      { initials: 'DC', name: 'Dario Conti', role: 'Full Stack', bg: '#EEF8F3', color: '#0F6E56', slug: 'dario-conti' },
      { initials: 'AF', name: 'Alex Ferro', role: '3D Artist', bg: '#FDF0EB', color: '#993C1D', slug: 'alex-ferro' },
    ]
  },
}

const DEFAULT = PROFESSIONALS['marco-ricci']

export default function ProfilePage({ params }: { params: { username: string } }) {
  const p = PROFESSIONALS[params.username] || DEFAULT
  const [contactOpen, setContactOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const Stars = ({ rating }: { rating: number }) => (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: '9px', height: '9px', borderRadius: '1px', background: i <= rating ? '#fe3812' : '#EDE8DF' }}></div>
      ))}
    </div>
  )

  const SkillDots = ({ level }: { level: number }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1,2,3].map(i => (
        <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i <= level ? (level === 3 ? '#9fff00' : '#fe3812') : '#EDE8DF' }}></div>
      ))}
    </div>
  )

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {['discover', 'about', 'blog', 'contatti'].map(link => (
            <a key={link} href={`/${link}`} style={{ fontSize: '11px', color: '#666', padding: '4px 14px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <a href="/apply" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
          Entra nell&apos;hub
        </a>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ background: '#E8E2D8', padding: '10px 5%', borderBottom: '1px solid #DDD8CE', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <a href="/" style={{ fontSize: '10px', color: '#AAA098', textDecoration: 'none', fontFamily: 'monospace' }}>off32.com</a>
        <span style={{ fontSize: '10px', color: '#CCC8C0' }}>/</span>
        <a href="/discover" style={{ fontSize: '10px', color: '#AAA098', textDecoration: 'none', fontFamily: 'monospace' }}>discover</a>
        <span style={{ fontSize: '10px', color: '#CCC8C0' }}>/</span>
        <span style={{ fontSize: '10px', color: '#555', fontFamily: 'monospace' }}>{params.username}</span>
      </div>

      {/* PROFILE HERO */}
      <div style={{ background: '#fff', padding: '48px 5%', borderBottom: '1px solid #EDE8DF', display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start' }} className="profile-hero">
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
          {/* avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: p.bg, border: `2px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: p.color }}>
              {p.initials}
            </div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '20px', height: '20px', background: '#9fff00', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
          </div>
          {/* info */}
          <div>
            <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#AAA098', marginBottom: '10px' }}>off32.com / discover / {params.username}</div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', color: '#0D0D0D', marginBottom: '6px', lineHeight: 1 }}>{p.name}</h1>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '14px' }}>{p.role} · <span style={{ color: '#fe3812', fontWeight: 600 }}>{p.specialty}</span></div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: '11px', color: '#AAA098' }}>📍 {p.city}, {p.country}</span>
              <span style={{ fontSize: '9px', padding: '3px 10px', background: '#EEF8F3', border: '1px solid #1D9E7540', borderRadius: '3px', color: '#0F6E56', letterSpacing: '1.5px', fontWeight: 700 }}>OFF32 VERIFIED</span>
              {p.premium && <span style={{ fontSize: '9px', padding: '3px 10px', background: '#FDF0EB', border: '1px solid #E84A1A30', borderRadius: '3px', color: '#993C1D', letterSpacing: '1.5px', fontWeight: 700 }}>STUDIO</span>}
            </div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.75, maxWidth: '520px', marginBottom: '20px' }}>{p.bio}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
              {p.skills.slice(0, 5).map((s: any) => (
                <span key={s.name} style={{ fontSize: '10px', padding: '4px 12px', border: `1px solid ${s.level === 3 ? '#9fff00' : '#EDE8DF'}`, borderRadius: '999px', color: s.level === 3 ? '#2D7A2D' : '#888', background: s.level === 3 ? '#F0FEF0' : '#F8F5F0' }}>{s.name}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px', minWidth: '210px' }}>
          <button onClick={() => setContactOpen(true)} style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '13px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}>
            contatta {p.name.split(' ')[0]} →
          </button>
          <button style={{ background: 'transparent', color: '#888', fontSize: '12px', padding: '11px 24px', border: '1px solid #EDE8DF', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', background: '#F8F5F0' } as any}>
            richiedi collaborazione
          </button>
          {/* mini stats */}
          <div style={{ background: '#F8F5F0', border: '1px solid #EDE8DF', borderRadius: '10px', padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            {[{ n: `${p.projects}+`, l: 'progetti' }, { n: p.rating.toString(), l: 'rating' }, { n: p.experience.toString(), l: 'anni exp.' }, { n: p.collabs.toString(), l: 'collab.' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' as const }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px' }}>{s.n}</div>
                <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginTop: '3px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* social */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '4px' }}>
            {[
              { label: 'IG', href: p.socials.instagram },
              { label: 'LI', href: p.socials.linkedin },
              { label: 'WEB', href: p.socials.website },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', border: '1px solid #EDE8DF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#888', textDecoration: 'none', background: '#fff', letterSpacing: '0.5px', fontWeight: 600 }}>{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '0', borderTop: '1px solid #EDE8DF' }} className="profile-body">

        {/* MAIN */}
        <div style={{ borderRight: '1px solid #EDE8DF' }}>

          {/* PORTFOLIO */}
          <div style={{ padding: '36px 5%', borderBottom: '1px solid #EDE8DF', background: '#fff' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '14px' }}>// portfolio</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.3px', marginBottom: '20px' }}>Lavori selezionati</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="portfolio-grid">
              {p.portfolio.map((work: any, i: number) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ height: '140px', background: work.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const }}>
                    <span style={{ fontSize: '9px', color: '#1a1a1a', letterSpacing: '1px', fontFamily: 'monospace' }}>{work.url.replace('https://', '')}</span>
                    <div style={{ position: 'absolute' as const, inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    </div>
                  </div>
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>{work.title}</div>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' as const, marginBottom: '10px' }}>
                      {work.tags.map((t: string) => <span key={t} style={{ fontSize: '9px', padding: '2px 8px', border: '1px solid #EDE8DF', borderRadius: '999px', color: '#888', background: '#F8F5F0' }}>{t}</span>)}
                    </div>
                    <a href={work.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#9fff00', textDecoration: 'none', paddingTop: '10px', borderTop: '1px solid #F0EBE4', fontWeight: 600 }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9fff00', flexShrink: 0 }}></div>
                      vedi il sito ↗
                    </a>
                  </div>
                </div>
              ))}
              {/* locked card */}
              {p.premium === false && (
                <div style={{ background: '#F8F5F0', border: '1.5px dashed #EDE8DF', borderRadius: '10px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', minHeight: '220px', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F0EBE0', border: '1px solid #EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🔒</div>
                  <div style={{ fontSize: '10px', color: '#CCC8C0', textAlign: 'center' as const, lineHeight: 1.5 }}>piano free · max 3 lavori</div>
                  <a href="/pricing" style={{ fontSize: '10px', color: '#fe3812', cursor: 'pointer', textDecoration: 'underline' }}>passa a Studio →</a>
                </div>
              )}
            </div>
          </div>

          {/* SKILLS */}
          <div style={{ padding: '36px 5%', borderBottom: '1px solid #EDE8DF', background: '#FDFCFA' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '14px' }}>// competenze</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.3px', marginBottom: '20px' }}>Skill & livello</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="skills-grid">
              {p.skills.map((s: any) => (
                <div key={s.name} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '8px', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#555' }}>{s.name}</span>
                  <SkillDots level={s.level} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
              {[{ color: '#9fff00', label: 'senior' }, { color: '#fe3812', label: 'mid' }, { color: '#EDE8DF', label: 'junior', border: '1px solid #DDD8CE' }].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: l.color, border: l.border || 'none' }}></div>
                  <span style={{ fontSize: '9px', color: '#AAA098', letterSpacing: '1px' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEWS */}
          <div style={{ padding: '36px 5%', background: '#fff' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '14px' }}>// recensioni clienti</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.3px', marginBottom: '20px' }}>Cosa dicono di {p.name.split(' ')[0]}</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              {p.reviews.map((r: any, i: number) => (
                <div key={i} style={{ background: '#F8F5F0', border: '1px solid #EDE8DF', borderRadius: '10px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E8E0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#888', flexShrink: 0 }}>{r.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '1px' }}>{r.name}</div>
                      <div style={{ fontSize: '10px', color: '#AAA098' }}>{r.company}</div>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.7, fontStyle: 'italic' }}>&ldquo;{r.text}&rdquo;</p>
                  <div style={{ fontSize: '9px', color: '#CCC8C0', marginTop: '8px', letterSpacing: '0.5px', fontFamily: 'monospace' }}>{r.date} · progetto: {r.project}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div style={{ background: '#F0EBE0', padding: '28px 20px', display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>

          {/* disponibilità */}
          <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '10px', padding: '18px' }}>
            <div style={sideLabel}>// disponibilità</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.available ? '#9fff00' : '#CCC8C0' }}></div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: p.available ? '#2D7A2D' : '#888' }}>{p.available ? 'Disponibile' : 'Non disponibile'}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#AAA098' }}>Accetta nuovi progetti e collaborazioni</div>
          </div>

          {/* info rapide */}
          <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '10px', padding: '18px' }}>
            <div style={sideLabel}>// info rapide</div>
            {[
              { k: 'Esperienza', v: `${p.experience} anni` },
              { k: 'Lingua', v: p.languages },
              { k: 'Progetti', v: `${p.projects}+` },
              { k: 'Rating medio', v: `${p.rating} / 5` },
              { k: 'Collaborazioni', v: p.collabs.toString() },
              { k: 'Membro dal', v: p.memberSince },
            ].map(row => (
              <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #F5F0E8' }}>
                <span style={{ fontSize: '11px', color: '#AAA098' }}>{row.k}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333' }}>{row.v}</span>
              </div>
            ))}
          </div>

          {/* professionisti simili */}
          <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '10px', padding: '18px' }}>
            <div style={sideLabel}>// professionisti simili</div>
            {p.similar.map((s: any) => (
              <a key={s.slug} href={`/p/${s.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #F5F0E8', textDecoration: 'none', cursor: 'pointer' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#555' }}>{s.name}</div>
                  <div style={{ fontSize: '9px', color: '#AAA098' }}>{s.role}</div>
                </div>
                <span style={{ fontSize: '12px', color: '#CCC8C0' }}>→</span>
              </a>
            ))}
          </div>

          {/* CTA contatto */}
          <div style={{ background: '#0D0D0D', borderRadius: '10px', padding: '22px', textAlign: 'center' as const }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#444', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// sei un cliente?</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '14px' }}>Contatta {p.name.split(' ')[0]}<br />direttamente.</div>
            <button onClick={() => setContactOpen(true)} style={{ background: '#fe3812', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '11px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', width: '100%' }}>
              invia messaggio →
            </button>
          </div>

        </div>
      </div>

      {/* MODAL CONTATTO */}
      {contactOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={() => setContactOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '480px', width: '100%', zIndex: 1 }}>
            {sent ? (
              <div style={{ textAlign: 'center' as const }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#9fff00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '20px' }}>✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0D0D0D', marginBottom: '8px' }}>Messaggio inviato!</h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '24px' }}>{p.name.split(' ')[0]} riceverà il tuo messaggio e ti risponderà il prima possibile.</p>
                <button onClick={() => { setContactOpen(false); setSent(false); setMessage('') }} style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>chiudi</button>
              </div>
            ) : (
              <>
                <button onClick={() => setContactOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#AAA098' }}>×</button>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// contatta {p.name.split(' ')[0]}</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '24px' }}>Invia un messaggio</h3>
                <div style={{ marginBottom: '14px' }}>
                  <label style={formLabel}>il tuo nome</label>
                  <input placeholder="Mario Rossi" style={formInput} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={formLabel}>la tua email</label>
                  <input type="email" placeholder="mario@azienda.com" style={formInput} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={formLabel}>oggetto del progetto</label>
                  <input placeholder="es. eCommerce per brand moda" style={formInput} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={formLabel}>messaggio</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Raccontaci il tuo progetto…" rows={4} style={{ ...formInput, resize: 'none', lineHeight: 1.65 } as any} />
                </div>
                <button onClick={() => setSent(true)} style={{ width: '100%', background: '#fe3812', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '14px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}>
                  invia messaggio →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #CCC8C0; }
        input:focus, textarea:focus { outline: none; border-color: #fe3812 !important; }
        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .profile-hero { grid-template-columns: 1fr !important; }
          .profile-body { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}

const sideLabel: React.CSSProperties = {
  fontSize: '9px', letterSpacing: '2px', color: '#AAA098',
  textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'monospace',
}

const formLabel: React.CSSProperties = {
  display: 'block', fontSize: '9px', letterSpacing: '2px',
  color: '#CCC8C0', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace',
}

const formInput: React.CSSProperties = {
  width: '100%', background: '#F8F5F0', border: '1px solid #EDE8DF',
  borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
  color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
}
