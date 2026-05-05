'use client'
import { useUser, useClerk } from '@clerk/nextjs'
import { useState } from 'react'

export default function DashboardPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { num: '0', label: 'visite profilo', sub: 'questa settimana' },
    { num: '0', label: 'messaggi', sub: 'non letti' },
    { num: '0', label: 'collaborazioni', sub: 'richieste' },
    { num: 'Free', label: 'piano attuale', sub: 'max 3 lavori' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'Profilo' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'messages', label: 'Messaggi' },
  ]

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/discover" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>discover</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' }}>
              {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              {user?.firstName || user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
          <button onClick={() => signOut({ redirectUrl: '/' })} style={{ background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '11px', padding: '7px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
            esci
          </button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 58px)' }} className="dash-grid">

        {/* SIDEBAR */}
        <div style={{ background: '#E8E2D8', borderRight: '1px solid #DDD8CE', padding: '32px 20px', display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '12px', fontFamily: 'monospace' }}>// dashboard</div>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
              border: 'none', textAlign: 'left' as const, width: '100%',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#0D0D0D' : '#888',
              fontSize: '13px', fontWeight: activeTab === tab.id ? 700 : 400,
              fontFamily: "'Axiforma', sans-serif",
            }}>
              {tab.label}
            </button>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #E0D8CC' }}>
            <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '8px' }}>Piano attuale</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', marginBottom: '6px' }}>Free</div>
              <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '12px' }}>Max 3 lavori in portfolio</div>
              <a href="/pricing" style={{ display: 'block', textAlign: 'center' as const, background: '#fe3812', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '8px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
                Passa a Studio →
              </a>
            </div>
          </div>
        </div>

        {/* CONTENUTO PRINCIPALE */}
        <div style={{ padding: '40px 5%' }}>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// benvenuto</div>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '6px' }}>
                  Ciao, {user?.firstName || 'Professionista'} 👋
                </h1>
                <p style={{ fontSize: '13px', color: '#AAA098' }}>Il tuo profilo OFF32 è attivo. Completa le informazioni per essere trovato dai clienti.</p>
              </div>

              {/* STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }} className="stats-grid">
                {stats.map((s, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#555', marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '10px', color: '#AAA098' }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* CHECKLIST */}
              <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '16px' }}>// completa il profilo</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0D0D0D', marginBottom: '20px' }}>Cosa manca ancora</div>
                {[
                  { done: true, label: 'Account creato', desc: 'Sei dentro OFF32' },
                  { done: false, label: 'Aggiungi bio', desc: 'Racconta chi sei e cosa fai' },
                  { done: false, label: 'Carica avatar', desc: 'Una foto professionale' },
                  { done: false, label: 'Aggiungi skill', desc: 'Indica le tue competenze e il livello' },
                  { done: false, label: 'Primo lavoro in portfolio', desc: 'Mostra il tuo lavoro migliore' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: i < 4 ? '1px solid #F5F0E8' : 'none' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', background: item.done ? '#EEF8F3' : '#F8F5F0', border: `1px solid ${item.done ? '#1D9E7530' : '#EDE8DF'}` }}>
                      {item.done ? <span style={{ color: '#0F6E56', fontSize: '10px' }}>✓</span> : <span style={{ color: '#CCC8C0', fontSize: '10px' }}>○</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: item.done ? 400 : 700, color: item.done ? '#AAA098' : '#0D0D0D', textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</div>
                      <div style={{ fontSize: '11px', color: '#AAA098', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* STATO APPROVAZIONE */}
              <div style={{ background: '#FDF5F2', border: '1px solid #fe381225', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fe3812', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>⏳</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Candidatura in revisione</div>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.6 }}>Il team OFF32 sta valutando il tuo profilo. Riceverai una email entro 7 giorni lavorativi. Nel frattempo puoi completare le informazioni del profilo.</div>
                </div>
              </div>
            </div>
          )}

          {/* PROFILO */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// il tuo profilo</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D0D0D', marginBottom: '28px' }}>Modifica profilo</h2>
              <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '32px', maxWidth: '560px' }}>
                {/* avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #F0EBE4' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#EEF8F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#0F6E56', flexShrink: 0 }}>
                    {user?.firstName?.[0] || 'U'}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Foto profilo</div>
                    <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '10px' }}>JPG o PNG, max 2MB</div>
                    <button style={{ fontSize: '11px', color: '#fe3812', border: '1px solid #fe381230', borderRadius: '999px', padding: '6px 16px', background: '#FDF5F2', cursor: 'pointer' }}>Carica foto</button>
                  </div>
                </div>
                {/* campi */}
                {[
                  { label: 'nome completo', placeholder: user?.fullName || 'Il tuo nome', type: 'text' },
                  { label: 'città', placeholder: 'Milano', type: 'text' },
                  { label: 'ruolo', placeholder: 'Web Developer', type: 'text' },
                  { label: 'sito web', placeholder: 'https://tuosito.com', type: 'url' },
                ].map(field => (
                  <div key={field.label} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', color: '#CCC8C0', textTransform: 'uppercase' as const, marginBottom: '6px', fontFamily: 'monospace' }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} style={{ width: '100%', background: '#F8F5F0', border: '1px solid #EDE8DF', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#0D0D0D', fontFamily: "'Axiforma', sans-serif", outline: 'none', boxSizing: 'border-box' as const }} />
                  </div>
                ))}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '9px', letterSpacing: '2px', color: '#CCC8C0', textTransform: 'uppercase' as const, marginBottom: '6px', fontFamily: 'monospace' }}>bio</label>
                  <textarea placeholder="Racconta chi sei e cosa fai in 2-3 righe…" rows={4} style={{ width: '100%', background: '#F8F5F0', border: '1px solid #EDE8DF', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#0D0D0D', fontFamily: "'Axiforma', sans-serif", outline: 'none', resize: 'none', lineHeight: 1.65, boxSizing: 'border-box' as const }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '14px', background: '#F8F5F0', borderRadius: '8px', border: '1px solid #EDE8DF' }}>
                  <span style={{ fontSize: '12px', color: '#555', flex: 1 }}>Disponibile per nuovi progetti</span>
                  <div style={{ width: '36px', height: '20px', background: '#9fff00', borderRadius: '10px', position: 'relative' as const, cursor: 'pointer' }}>
                    <div style={{ position: 'absolute' as const, top: '3px', left: '19px', width: '14px', height: '14px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                  </div>
                </div>
                <button style={{ width: '100%', background: '#0D0D0D', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '14px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}>
                  salva modifiche →
                </button>
              </div>
            </div>
          )}

          {/* PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// i tuoi lavori</div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D0D0D' }}>Portfolio</h2>
                </div>
                <button style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '10px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
                  + aggiungi lavoro
                </button>
              </div>
              <div style={{ background: '#fff', border: '1.5px dashed #EDE8DF', borderRadius: '12px', padding: '48px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎨</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>Nessun lavoro ancora</div>
                <div style={{ fontSize: '12px', color: '#AAA098', marginBottom: '20px', lineHeight: 1.6 }}>Aggiungi il tuo primo lavoro al portfolio.<br />Piano Free: max 3 lavori.</div>
                <button style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '11px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
                  aggiungi il primo lavoro →
                </button>
              </div>
              <div style={{ marginTop: '16px', padding: '14px 18px', background: '#FDF5F2', border: '1px solid #fe381220', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Piano Free — 0/3 lavori utilizzati</span>
                <a href="/pricing" style={{ fontSize: '11px', color: '#fe3812', fontWeight: 700, textDecoration: 'none' }}>Passa a Studio per portfolio illimitato →</a>
              </div>
            </div>
          )}

          {/* MESSAGGI */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// comunicazioni</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D0D0D', marginBottom: '28px' }}>Messaggi</h2>
              <div style={{ background: '#fff', border: '1.5px dashed #EDE8DF', borderRadius: '12px', padding: '48px', textAlign: 'center' as const }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>Nessun messaggio ancora</div>
                <div style={{ fontSize: '12px', color: '#AAA098', lineHeight: 1.6 }}>
                  Quando clienti o altri professionisti ti contatteranno,<br />i messaggi appariranno qui.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #CCC8C0; }
        input:focus, textarea:focus { border-color: #fe3812 !important; }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

    </main>
  )
}
