'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const SKILLS = [
  'web dev', 'illustrazione', '3D / motion',
  'UX / UI', 'marketing', 'copywriting'
]

const ROLES = [
  'Web Developer',
  'Illustratore / Illustratrice',
  '3D Artist',
  'Motion Designer',
  'UX / UI Designer',
  'Full Stack Developer',
  'Brand Designer',
  'Copywriter',
  'Marketing Strategist',
  'Altro',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ApplyPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    city: '',
    role: '',
    portfolio_url: '',
    work_url_1: '',
    work_url_2: '',
    motivation: '',
  })

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    // validazione base
    if (!form.full_name || !form.email || !form.role || !form.portfolio_url || !form.motivation) {
      setError('Compila tutti i campi obbligatori.')
      return
    }
    if (selectedSkills.length === 0) {
      setError('Seleziona almeno una skill.')
      return
    }

    setStatus('loading')
    setError('')

    const { error: sbError } = await supabase
      .from('applications')
      .insert([{
        full_name: form.full_name,
        email: form.email,
        city: form.city,
        role: form.role,
        portfolio_url: form.portfolio_url,
        work_url_1: form.work_url_1,
        work_url_2: form.work_url_2,
        skills: selectedSkills,
        motivation: form.motivation,
        status: 'pending',
      }])

      if (sbError) {
        setStatus('error')
        setError('Qualcosa è andato storto. Riprova o scrivici a connect@off32.com')
        return
      }
  
      // Invia email di conferma
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          name: form.full_name,
          email: form.email,
        }),
      })
  
      setStatus('success')
  }

  // ── SUCCESSO ──────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '40px 5%', textAlign: 'center' as const }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#9fff00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '24px' }}>✓</div>
          <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: '36px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-1px', marginBottom: '16px' }}>Candidatura inviata.</h1>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.75, marginBottom: '32px' }}>
            Grazie {form.full_name.split(' ')[0]}. Abbiamo ricevuto la tua candidatura e la valuteremo entro 7 giorni lavorativi. Ti risponderemo via email a <strong style={{ color: '#555' }}>{form.email}</strong>.
          </p>
          <a href="/" style={{ display: 'inline-block', background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            torna alla homepage →
          </a>
        </div>
      </main>
    )
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' as const }}>Candidatura Professionista</span>
        <a href="/discover" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.3px' }}>vedi i professionisti →</a>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 58px)' }} className="apply-grid">

        {/* SINISTRA — manifesto */}
        <div style={{ padding: '64px 5%', borderRight: '1px solid #E0D8CC', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '16px' }}>// candidatura · off32.com/apply</div>
            <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#0D0D0D', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: '24px' }}>
              Non cerchiamo<br />curriculum.<br />Cerchiamo{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                lavoro
                <span style={{ position: 'absolute', left: '-2px', bottom: '4px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
              </span>{' '}vero.
            </h1>
            <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.85, marginBottom: '40px', borderLeft: '3px solid #fe3812', paddingLeft: '16px', fontStyle: 'italic' }}>
              "OFF32 non è una directory aperta. È una community selezionata. Ogni professionista che vedi qui è stato valutato dal team — non da un algoritmo."
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
              {[
                { num: '01', txt: 'Compila la candidatura — ci vuole 5 minuti. Linkaci il tuo lavoro migliore.' },
                { num: '02', txt: 'Valutiamo il tuo portfolio — il team OFF32 guarda ogni candidatura entro 7 giorni.' },
                { num: '03', txt: 'Ricevi la risposta — se sei dentro, ti mandiamo tutto quello che serve per iniziare.' },
              ].map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#fe3812', fontFamily: 'monospace', paddingTop: '2px', flexShrink: 0 }}>{s.num}</span>
                  <span style={{ fontSize: '13px', color: '#777', lineHeight: 1.65 }}>{s.txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stat in basso */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '48px' }}>
            {[
              { num: '48+', label: 'professionisti' },
              { num: '7gg', label: 'risposta' },
              { num: '0', label: 'profili mediocri' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '10px', padding: '14px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-1px' }}>{s.num}</div>
                <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DESTRA — form */}
        <div style={{ padding: '64px 5%', background: '#fff', borderTop: 'none' }}>
          <div style={{ maxWidth: '480px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Candidatura OFF32</div>
            <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '32px' }}>Tutti i campi sono obbligatori · revisione entro 7 giorni</div>

            {/* nome + città */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>nome e cognome *</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Marco Ricci" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>città</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="Milano" style={inputStyle} />
              </div>
            </div>

            {/* email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="marco@tuosito.com" style={inputStyle} />
            </div>

            {/* ruolo */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>ruolo principale *</label>
              <select name="role" value={form.role} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="">Seleziona il tuo ruolo</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* portfolio */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>link portfolio / sito personale *</label>
              <input name="portfolio_url" value={form.portfolio_url} onChange={handleChange} placeholder="https://tuosito.com" style={inputStyle} />
            </div>

            {/* lavori */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>miglior lavoro — link 1</label>
                <input name="work_url_1" value={form.work_url_1} onChange={handleChange} placeholder="https://..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>miglior lavoro — link 2</label>
                <input name="work_url_2" value={form.work_url_2} onChange={handleChange} placeholder="https://..." style={inputStyle} />
              </div>
            </div>

            {/* skill */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>skill principali *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                {SKILLS.map(skill => (
                  <div
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px',
                      border: `1px solid ${selectedSkills.includes(skill) ? '#fe3812' : '#EDE8DF'}`,
                      borderRadius: '8px', cursor: 'pointer',
                      background: selectedSkills.includes(skill) ? '#FDF5F2' : '#F8F5F0',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{
                      width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
                      border: `1.5px solid ${selectedSkills.includes(skill) ? '#fe3812' : '#E0D8CC'}`,
                      background: selectedSkills.includes(skill) ? '#fe3812' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {selectedSkills.includes(skill) && <span style={{ color: '#fff', fontSize: '9px', lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '12px', color: selectedSkills.includes(skill) ? '#fe3812' : '#888' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* motivazione */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>perché vuoi entrare in OFF32? *</label>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                placeholder="Racconta in 2-3 righe cosa fai e perché OFF32 fa per te…"
                rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 }}
              />
            </div>

            {/* divider */}
            <div style={{ height: '1px', background: '#F0EBE4', marginBottom: '20px' }}></div>

            {/* note */}
            <p style={{ fontSize: '10px', color: '#CCC8C0', lineHeight: 1.65, marginBottom: '20px' }}>
              Inviando la candidatura accetti i nostri <span style={{ color: '#AAA098', cursor: 'pointer' }}>termini di servizio</span> e la <span style={{ color: '#AAA098', cursor: 'pointer' }}>privacy policy</span>. Non condividiamo i tuoi dati con terze parti. Risposta via email entro 7 giorni lavorativi.
            </p>

            {/* errore */}
            {error && (
              <div style={{ background: '#FDF0EB', border: '1px solid #E84A1A30', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '12px', color: '#993C1D' }}>
                {error}
              </div>
            )}

            {/* submit */}
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{
                width: '100%', background: status === 'loading' ? '#888' : '#0D0D0D',
                color: '#fff', fontSize: '13px', fontWeight: 700,
                padding: '14px 24px', borderRadius: '999px',
                border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                letterSpacing: '0.5px', transition: 'background 0.2s'
              }}
            >
              {status === 'loading' ? 'Invio in corso…' : 'invia candidatura →'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #CCC8C0; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #fe3812 !important; }
        @media (max-width: 768px) {
          .apply-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '9px',
  letterSpacing: '2px',
  color: '#CCC8C0',
  textTransform: 'uppercase',
  marginBottom: '6px',
  fontFamily: 'monospace',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#F8F5F0',
  border: '1px solid #EDE8DF',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '13px',
  color: '#0D0D0D',
  letterSpacing: '0.3px',
  fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
}
