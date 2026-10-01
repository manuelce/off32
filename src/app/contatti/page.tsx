'use client'
import { useEffect, useState, type ChangeEvent, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import { workshopBySlug } from '@/lib/workshops'

type Status = 'idle' | 'loading' | 'success' | 'error'
type ContactType = 'progetto' | 'workshop' | 'altro' | null

const INK = '#f0ebe0'
const LINE = '1px solid #f0ebe0'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: INK,
}

const labelStyle: CSSProperties = {
  ...meta,
  display: 'block',
  marginBottom: 8,
}

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: LINE,
  borderRadius: 0,
  padding: '12px 14px',
  fontSize: 14,
  color: INK,
  fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
}

const channels = [
  { label: 'Email', value: 'connect@off32.it', href: 'mailto:connect@off32.it' },
  { label: 'Instagram', value: '@off32channel', href: 'https://www.instagram.com/off32channel/' },
]

const paths = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Events', href: '/workshop' },
]

export default function ContattiPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [contactType, setContactType] = useState<ContactType>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tipo = params.get('tipo')
    const corso = params.get('corso')

    if (tipo === 'progetto' || tipo === 'workshop' || tipo === 'altro') {
      setContactType(tipo)
    }

    if (corso === 'su-misura') {
      setContactType('workshop')
      setForm(prev => ({
        ...prev,
        subject: prev.subject || 'Workshop su misura in azienda',
        message: prev.message || 'Vorrei un workshop costruito su un progetto del team.\nPersone: \nTema: \nDate preferite: ',
      }))
      return
    }

    const workshop = corso ? workshopBySlug(corso) : undefined
    if (!workshop) return

    setContactType('workshop')
    setForm(prev => ({
      ...prev,
      subject: prev.subject || workshop.title,
      message: prev.message || `Vorrei prenotare «${workshop.title}».\nPartecipanti: \nDate preferite: \nFormato: ${workshop.format}`,
    }))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, contactType }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ background: '#0D0D0D', minHeight: '100vh', color: INK, fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <Navbar />

      <section style={{ paddingTop: '15%', paddingBottom: '15%' }}>
        {status === 'success' ? (
          <div style={{ width: '80%', margin: '0 auto', border: LINE, padding: '64px 40px', textAlign: 'center' }}>
            <div style={{ ...meta, marginBottom: 16 }}>Messaggio inviato</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-1.5px', lineHeight: 0.95, margin: '0 0 20px' }}>
              Grazie {form.name.split(' ')[0]}.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: INK, maxWidth: 460, margin: '0 auto 28px' }}>
              Ti rispondiamo entro 24 ore all&apos;indirizzo {form.email}.
            </p>
            <a href="/" style={{ ...meta, display: 'inline-block', border: LINE, textDecoration: 'none', padding: '14px 22px' }}>Torna alla homepage</a>
          </div>
        ) : (
          <div className="contact-frame" style={{ width: '80%', margin: '0 auto', border: LINE }}>
            <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr' }}>
              <div style={{ borderRight: LINE, padding: '28px 28px 32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ ...meta, marginBottom: 16 }}>Scrivici</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: INK, margin: '0 0 28px' }}>
                  La vostra richiesta arriverà al nostro team che vi risponderà entro 24h.
                </p>
                <div>
                  {channels.map(channel => (
                    <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" style={{ display: 'block', borderTop: LINE, padding: '14px 0', textDecoration: 'none', color: INK }}>
                      <div style={meta}>{channel.label}</div>
                      <div style={{ marginTop: 4, fontSize: 16, fontWeight: 600 }}>{channel.value}</div>
                    </a>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 28 }}>
                  {paths.map(path => (
                    <a key={path.label} href={path.href} style={{ ...meta, textDecoration: 'none' }}>{path.label}</a>
                  ))}
                </div>
              </div>

              <form
                onSubmit={e => { e.preventDefault(); handleSubmit() }}
                style={{ padding: '28px 28px 32px' }}
              >
                <div style={{ ...meta, marginBottom: 10 }}>Sono un</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: LINE, marginBottom: 22 }}>
                  {([
                    { value: 'progetto', label: 'Progetto' },
                    { value: 'workshop', label: 'Events' },
                    { value: 'altro', label: 'Altro' },
                  ] as const).map((type, i) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setContactType(type.value)}
                      style={{
                        background: contactType === type.value ? INK : 'transparent',
                        color: contactType === type.value ? '#0D0D0D' : INK,
                        border: 'none',
                        borderRight: i < 2 ? LINE : 'none',
                        padding: '12px 8px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 12,
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <div className="contact-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={labelStyle} htmlFor="name">Nome e cognome</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Mario Rossi" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="mario@email.com" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle} htmlFor="subject">Oggetto</label>
                  <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Di cosa vuoi parlarci?" style={inputStyle} />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle} htmlFor="message">Messaggio</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Scrivi qui il tuo messaggio" rows={6} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }} />
                </div>

                {contactType === 'progetto' && (
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: INK, margin: '0 0 18px' }}>
                    Raccontaci obiettivi, tempistiche e un budget indicativo. Ti rispondiamo con una prima proposta.
                  </p>
                )}
                {contactType === 'workshop' && (
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: INK, margin: '0 0 18px' }}>
                    Indicaci date e numero di partecipanti. Il programma è nella pagina <a href="/workshop" style={{ color: INK }}>workshop</a>.
                  </p>
                )}

                <p style={{ fontSize: 12, lineHeight: 1.6, color: INK, margin: '0 0 18px' }}>
                  I tuoi dati non vengono condivisi con terze parti. Leggi la <a href="/privacy-policy" style={{ color: INK }}>privacy policy</a>.
                </p>

                {status === 'error' && (
                  <p style={{ fontSize: 13, color: '#fe3812', lineHeight: 1.6, margin: '0 0 16px' }}>
                    Non siamo riusciti a inviare il messaggio. Riprova, oppure scrivi a connect@off32.it.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: INK,
                    color: '#0D0D0D',
                    border: LINE,
                    padding: '14px 22px',
                    fontFamily: 'inherit',
                    fontSize: 12,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                  }}
                >
                  {status === 'loading' ? 'Invio in corso' : 'Invia messaggio'}
                </button>
              </form>
            </div>

            <div style={{ borderTop: LINE, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 36, letterSpacing: '-1px', lineHeight: 1 }}>24h</div>
              <div style={{ ...meta, marginTop: 8 }}>Tempo di risposta</div>
            </div>
          </div>
        )}
      </section>

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
        input::placeholder, textarea::placeholder { color: rgba(240, 235, 224, 0.45); }
        input:focus, textarea:focus { outline: 1px solid #f0ebe0; outline-offset: -1px; }
        @media (max-width: 860px) {
          .contact-frame { width: 100% !important; }
          .contact-layout { grid-template-columns: 1fr !important; }
          .contact-layout > div { border-right: none !important; border-bottom: 1px solid #f0ebe0; }
          .contact-fields { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
