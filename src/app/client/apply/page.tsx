'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const SKILLS_NEEDED = [
  'web developer', 'illustratore', '3D / motion',
  'UX / UI designer', 'marketing', 'copywriter'
]

const BUDGETS = [
  { label: '500 — 1.500€', sub: 'landing page, small' },
  { label: '1.500 — 5.000€', sub: 'sito, branding' },
  { label: '5.000 — 15.000€', sub: 'eCommerce, app' },
  { label: '15.000€+', sub: 'progetto complesso' },
]

const TIMELINES = [
  'Entro 2 settimane',
  'Entro 1 mese',
  'Entro 2-3 mesi',
  'Nessuna fretta',
]

type Status = 'idle' | 'loading' | 'success'

export default function ClientApplyPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [form, setForm] = useState({
    full_name: '', email: '', company: '',
    website: '', timeline: '', description: '',
  })

  const toggleSkill = (s: string) =>
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.description) {
      alert('Compila tutti i campi obbligatori.')
      return
    }
  
    setStatus('loading')
  
    const { error } = await supabase
      .from('client_applications')
      .insert([{
        full_name: form.full_name,
        email: form.email,
        company: form.company,
        website: form.website,
        skills_needed: selectedSkills,
        budget_range: selectedBudget,
        timeline: form.timeline,
        description: form.description,
        status: 'pending',
      }])
  
    if (error) {
      alert('Errore: ' + error.message)
      setStatus('idle')
      return
    }
  
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '40px 5%', textAlign: 'center' as const }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#9fff00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: '24px' }}>✓</div>
          <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: '36px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-1px', marginBottom: '16px' }}>Brief inviata.</h1>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.75, marginBottom: '32px' }}>
            Grazie {form.full_name.split(' ')[0]}. Abbiamo ricevuto la tua brief e la valuteremo entro <strong style={{ color: '#555' }}>48 ore lavorative</strong>. Ti risponderemo a <strong style={{ color: '#555' }}>{form.email}</strong> con le istruzioni per accedere alla piattaforma.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="/discover" style={{ background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
              sfoglia i professionisti →
            </a>
            <a href="/" style={{ background: 'transparent', color: '#888', fontSize: '12px', padding: '12px 28px', border: '1px solid #E0D8CC', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
              torna alla home
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' as const }}>Accesso Cliente</span>
        <a href="/apply" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', letterSpacing: '0.3px' }}>sei un professionista? →</a>
      </nav>

      {/* SPLIT LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 58px)' }} className="client-grid">

        {/* SINISTRA — manifesto cliente */}
        <div style={{ padding: '64px 5%', borderRight: '1px solid #E0D8CC', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '16px' }}>// sei un cliente · off32.com/client/apply</div>
            <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#0D0D0D', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: '24px' }}>
              Trova il{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                talento
                <span style={{ position: 'absolute', left: '-2px', bottom: '4px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
              </span>{' '}giusto<br />per il tuo progetto.
            </h1>
            <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.85, marginBottom: '36px', borderLeft: '3px solid #fe3812', paddingLeft: '16px', fontStyle: 'italic' }}>
              "In OFF32 non trovi dilettanti. Ogni professionista è stato selezionato dal team. Ma anche tu devi essere il tipo di cliente giusto — serio, con un progetto reale."
            </div>

            {/* step */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px', marginBottom: '40px' }}>
              {[
                { num: '01', txt: 'Raccontaci il progetto — budget, tempistiche, cosa cerchi. Ci vuole 5 minuti.' },
                { num: '02', txt: 'Valutiamo la brief — il team OFF32 verifica che il progetto sia serio e fattibile.' },
                { num: '03', txt: 'Accedi ai professionisti — sfoglia i profili, contatta chi fa per te, inizia a lavorare.' },
              ].map(s => (
                <div key={s.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#fe3812', fontFamily: 'monospace', paddingTop: '2px', flexShrink: 0 }}>{s.num}</span>
                  <span style={{ fontSize: '13px', color: '#777', lineHeight: 1.65 }}>{s.txt}</span>
                </div>
              ))}
            </div>

            {/* regole */}
            <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #F0EBE4' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '4px' }}>// il tipo di cliente che cerchiamo</div>
              </div>
              {[
                { ok: true, txt: 'Budget realistico — sai quanto vale il lavoro creativo.' },
                { ok: true, txt: 'Tempistiche sensate — capisci che un buon progetto richiede tempo.' },
                { ok: true, txt: 'Progetto definito — sai cosa vuoi, anche se non sai come farlo.' },
                { ok: true, txt: 'Rispetto del lavoro creativo — tratti il professionista da pari.' },
                { ok: false, txt: '"Ho bisogno per dopodomani" — i talenti hanno agenda piena.' },
                { ok: false, txt: 'Gare al ribasso — OFF32 non è un marketplace di prezzo.' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '12px 20px', borderBottom: i < 5 ? '1px solid #F5F0E8' : 'none', background: r.ok ? '#fff' : '#FDFAF8' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '5px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', background: r.ok ? '#EEF8F3' : '#FEF2F0', border: `1px solid ${r.ok ? '#1D9E7530' : '#E84A1A20'}` }}>
                    <span style={{ fontSize: '10px', color: r.ok ? '#0F6E56' : '#E84A1A' }}>{r.ok ? '✓' : '×'}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: r.ok ? '#555' : '#999', lineHeight: 1.55 }}>{r.txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stat */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '40px' }}>
            {[{ num: '48h', label: 'risposta' }, { num: '100%', label: 'verificati' }, { num: '0€', label: 'accesso' }].map(s => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '10px', padding: '14px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-1px' }}>{s.num}</div>
                <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DESTRA — form */}
        <div style={{ padding: '64px 5%', background: '#fff' }}>
          <div style={{ maxWidth: '480px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Brief di progetto</div>
            <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '32px' }}>Accesso gratuito · revisione entro 48 ore</div>

            {/* nome + azienda */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>nome e cognome *</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Luca Bianchi" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>azienda / brand</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Momento Srl" style={inputStyle} />
              </div>
            </div>

            {/* email */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="luca@azienda.com" style={inputStyle} />
            </div>

            {/* sito */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>sito web o profilo social</label>
              <input name="website" value={form.website} onChange={handleChange} placeholder="https://tuosito.com" style={inputStyle} />
            </div>

            {/* skill needed */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>di che tipo di professionista hai bisogno? *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                {SKILLS_NEEDED.map(skill => (
                  <div key={skill} onClick={() => toggleSkill(skill)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: `1px solid ${selectedSkills.includes(skill) ? '#fe3812' : '#EDE8DF'}`, borderRadius: '8px', cursor: 'pointer', background: selectedSkills.includes(skill) ? '#FDF5F2' : '#F8F5F0', transition: 'all 0.15s' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0, border: `1.5px solid ${selectedSkills.includes(skill) ? '#fe3812' : '#E0D8CC'}`, background: selectedSkills.includes(skill) ? '#fe3812' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectedSkills.includes(skill) && <span style={{ color: '#fff', fontSize: '9px' }}>✓</span>}
                    </div>
                    <span style={{ fontSize: '12px', color: selectedSkills.includes(skill) ? '#fe3812' : '#888' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* budget */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>budget indicativo del progetto *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                {BUDGETS.map(b => (
                  <div key={b.label} onClick={() => setSelectedBudget(b.label)} style={{ padding: '10px 12px', border: `1px solid ${selectedBudget === b.label ? '#fe3812' : '#EDE8DF'}`, borderRadius: '8px', cursor: 'pointer', background: selectedBudget === b.label ? '#FDF5F2' : '#F8F5F0', textAlign: 'center' as const, transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: selectedBudget === b.label ? '#fe3812' : '#555', marginBottom: '2px' }}>{b.label}</div>
                    <div style={{ fontSize: '9px', color: selectedBudget === b.label ? '#fe381280' : '#CCC8C0' }}>{b.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* tempistiche */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>tempistiche</label>
              <select name="timeline" value={form.timeline} onChange={handleChange} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' } as any}>
                <option value="">Seleziona le tempistiche</option>
                {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* descrizione */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>descrivi il progetto *</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Cosa devi realizzare? Più dettagli ci dai, meglio possiamo abbinarti al professionista giusto…" rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 } as any} />
            </div>

            <div style={{ height: '1px', background: '#F0EBE4', marginBottom: '20px' }}></div>

            <p style={{ fontSize: '10px', color: '#CCC8C0', lineHeight: 1.65, marginBottom: '20px' }}>
              Inviando accetti i nostri <span style={{ color: '#AAA098', cursor: 'pointer' }}>termini di servizio</span> e la <span style={{ color: '#AAA098', cursor: 'pointer' }}>privacy policy</span>. Accesso gratuito. Risposta entro 48 ore lavorative.
            </p>

            <button onClick={handleSubmit} disabled={status === 'loading'} style={{ width: '100%', background: status === 'loading' ? '#888' : '#0D0D0D', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '14px 24px', borderRadius: '999px', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer', letterSpacing: '0.5px', transition: 'background 0.2s' }}>
              {status === 'loading' ? 'Invio in corso…' : 'invia la brief →'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #CCC8C0; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #fe3812 !important; }
        @media (max-width: 768px) {
          .client-grid { grid-template-columns: 1fr !important; }
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
