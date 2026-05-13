'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

type Status = 'idle' | 'loading' | 'success'
type ContactType = 'professionista' | 'cliente' | 'altro' | null

export default function ContattiPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [contactType, setContactType] = useState<ContactType>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1400)
  }

  if (status === 'success') {
    return (
      <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '40px 5%', textAlign: 'center' as const }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#9fff00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '24px' }}>✓</div>
          <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: '36px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-1px', marginBottom: '16px' }}>Messaggio inviato.</h1>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.75, marginBottom: '32px' }}>
            Grazie {form.name.split(' ')[0]}. Ti risponderemo entro <strong style={{ color: '#555' }}>24 ore</strong> all&apos;indirizzo <strong style={{ color: '#555' }}>{form.email}</strong>.
          </p>
          <a href="/" style={{ display: 'inline-block', background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            torna alla homepage →
          </a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <Navbar />

      {/* SPLIT LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 58px)' }} className="contact-grid">

        {/* SINISTRA */}
        <div style={{ padding: '64px 5%', borderRight: '1px solid #E0D8CC', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '16px' }}>// contatti · off32.it/contatti</div>
            <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#0D0D0D', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: '24px' }}>
              Parliamo.<br />Siamo persone{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                reali.
                <span style={{ position: 'absolute', left: '-2px', bottom: '4px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
              </span>
            </h1>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
              Nessun bot, nessun form automatico. Il tuo messaggio arriva direttamente al team OFF32 e ti risponde una persona entro 24 ore.
            </p>

            {/* canali diretti */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px', marginBottom: '48px' }}>
              {[
                { icon: '✉', label: 'Email', value: 'connect@off32.it', href: 'mailto:connect@off32.it' },
                { icon: '📸', label: 'Instagram', value: '@off32channel', href: 'https://instagram.com/off32channel' },
                { icon: '💼', label: 'LinkedIn', value: 'OFF32 — Officina Digitale', href: 'https://linkedin.com' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', textDecoration: 'none', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F8F5F0', border: '1px solid #EDE8DF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '2px' }}>{c.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D0D0D' }}>{c.value}</div>
                  </div>
                  <span style={{ color: '#CCC8C0', fontSize: '14px' }}>→</span>
                </a>
              ))}
            </div>

            {/* percorsi rapidi */}
            <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '16px', fontFamily: 'monospace' }}>// percorsi rapidi</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                {[
                  { label: 'Vuoi entrare come professionista?', href: '/apply', cta: 'candidati →' },
                  { label: 'Cerchi un professionista?', href: '/client/apply', cta: 'invia brief →' },
                  { label: 'Vuoi scoprire i piani?', href: '/pricing', cta: 'vedi pricing →' },
                  { label: 'Vuoi sapere chi siamo?', href: '/about', cta: 'leggi il manifesto →' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid #F5F0E8' : 'none' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>{item.label}</span>
                    <a href={item.href} style={{ fontSize: '11px', color: '#fe3812', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>{item.cta}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* risposta */}
          <div style={{ marginTop: '48px', display: 'flex', gap: '12px' }}>
            {[{ num: '24h', label: 'tempo di risposta' }, { num: '100%', label: 'risposta umana' }, { num: '0', label: 'bot automatici' }].map(s => (
              <div key={s.label} style={{ flex: 1, background: '#fff', border: '1px solid #E0D8CC', borderRadius: '10px', padding: '14px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px' }}>{s.num}</div>
                <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DESTRA — form */}
        <div style={{ padding: '64px 5%', background: '#fff' }}>
          <div style={{ maxWidth: '480px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Invia un messaggio</div>
            <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '32px' }}>Risposta garantita entro 24 ore lavorative</div>

            {/* tipo di contatto */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>sono un *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '6px' }}>
                {[
                  { value: 'professionista', label: '🎨 Professionista' },
                  { value: 'cliente', label: '💼 Cliente' },
                  { value: 'altro', label: '👋 Altro' },
                ].map(t => (
                  <div key={t.value} onClick={() => setContactType(t.value as ContactType)} style={{ padding: '10px 8px', border: `1px solid ${contactType === t.value ? '#fe3812' : '#EDE8DF'}`, borderRadius: '8px', cursor: 'pointer', background: contactType === t.value ? '#FDF5F2' : '#F8F5F0', textAlign: 'center' as const, fontSize: '11px', color: contactType === t.value ? '#fe3812' : '#888', fontWeight: contactType === t.value ? 700 : 400, transition: 'all 0.15s' }}>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            {/* nome + email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>nome e cognome *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Mario Rossi" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="mario@email.com" style={inputStyle} />
              </div>
            </div>

            {/* oggetto */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>oggetto</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="Di cosa vuoi parlarci?" style={inputStyle} />
            </div>

            {/* messaggio */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>messaggio *</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Scrivi qui il tuo messaggio…" rows={6} style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 } as any} />
            </div>

            {/* suggerimento contestuale */}
            {contactType === 'professionista' && (
              <div style={{ background: '#EEF8F3', border: '1px solid #1D9E7530', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F6E56', marginBottom: '2px' }}>Vuoi entrare in OFF32?</div>
                  <div style={{ fontSize: '11px', color: '#888', lineHeight: 1.5 }}>Per candidarti usa la pagina <a href="/apply" style={{ color: '#0F6E56', fontWeight: 700 }}>Apply →</a> — è più veloce e ottieni risposta in 7 giorni.</div>
                </div>
              </div>
            )}

            {contactType === 'cliente' && (
              <div style={{ background: '#FDF0EB', border: '1px solid #E84A1A25', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>💡</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#993C1D', marginBottom: '2px' }}>Cerchi un professionista?</div>
                  <div style={{ fontSize: '11px', color: '#888', lineHeight: 1.5 }}>Compila la <a href="/client/apply" style={{ color: '#993C1D', fontWeight: 700 }}>brief di progetto →</a> per essere abbinato al talento giusto in 48 ore.</div>
                </div>
              </div>
            )}

            <div style={{ height: '1px', background: '#F0EBE4', marginBottom: '20px' }}></div>

            <p style={{ fontSize: '10px', color: '#CCC8C0', lineHeight: 1.65, marginBottom: '20px' }}>
              I tuoi dati non vengono condivisi con terze parti. Leggi la nostra <a href="/privacy-policy" style={{ color: "#AAA098", cursor: "pointer" }}>
  privacy policy
</a>.
            </p>

            <button onClick={handleSubmit} disabled={status === 'loading'} style={{ width: '100%', background: status === 'loading' ? '#888' : '#0D0D0D', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '14px 24px', borderRadius: '999px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', letterSpacing: '0.5px', transition: 'background 0.2s' }}>
              {status === 'loading' ? 'Invio in corso…' : 'invia messaggio →'}
            </button>
          </div>
        </div>

      </div>

       {/* ── 11 FOOTER — come il vecchio 3 colonne ── */}
       <footer style={{ background: '#9fff00', padding: '24px 5%', borderTop: '1px solid #8aee00' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div style={{ display: 'flex', gap: '28px' }}>
            {[
              { label: 'DISCOVER', href: '/discover' },
              { label: 'BLOG', href: '/blog' },
              { label: 'PRIVACY POLICY', href: '/privacy-policy' },
              { label: 'COOKIE', href: '/cookie-policy' },
              { label: 'TERMS & CONDITIONS', href: '/terms-and-conditions' },
              { label: 'INFO', href: '/informativa-professionisti' },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>{l.label}</a>
            ))}
            </div>
           
            <div style={{ display: 'flex', gap: '28px' }}>
              {['CONTACT', 'CONNECT@OFF32.IT', '© 2025 OFF32'].map(l => (
                <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px', cursor: 'pointer' }}>{l}</span>
              ))}
            </div>
          </div>
        </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #CCC8C0; }
        input:focus, textarea:focus { outline: none; border-color: #fe3812 !important; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '9px', letterSpacing: '2px',
  color: '#CCC8C0', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#F8F5F0', border: '1px solid #EDE8DF',
  borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
  color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
}
