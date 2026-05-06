'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Tab = 'candidature' | 'clienti'
type Status = 'pending' | 'approved' | 'rejected'

export default function AdminPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<Tab>('candidature')
  const [applications, setApplications] = useState<any[]>([])
  const [clientApps, setClientApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Status | 'all'>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const [{ data: apps }, { data: clients }] = await Promise.all([
      supabase.from('applications').select('*').order('created_at', { ascending: false }),
      supabase.from('client_applications').select('*').order('created_at', { ascending: false }),
    ])
    setApplications(apps || [])
    setClientApps(clients || [])
    setLoading(false)
  }

  // ── APPROVA PROFESSIONISTA → crea profilo + professionista ──────────────
  const approveApplication = async (app: any) => {
    setActionLoading(app.id)

    // 1. Aggiorna stato candidatura
    const { error: appError } = await supabase
      .from('applications')
      .update({ status: 'approved' })
      .eq('id', app.id)

    if (appError) {
      alert('Errore aggiornamento candidatura: ' + appError.message)
      setActionLoading(null)
      return
    }

    // 2. Genera username dallo slug del nome
    const username = app.full_name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // 3. Crea profilo in auth placeholder (usiamo un uuid fisso basato sull'email)
    // Nota: il profilo reale verrà creato quando l'utente fa login con Clerk
    // Per ora creiamo direttamente il professionista con un user_id temporaneo
    const tempUserId = crypto.randomUUID()

    // 4. Prova a inserire in profiles (potrebbe fallire se esiste già)
    await supabase.from('profiles').upsert([{
      id: tempUserId,
      email: app.email,
      role: 'professional',
    }]).select()

    // 5. Crea il professionista
    const { error: profError } = await supabase
    .from('professionals')
    .upsert([{
        user_id: tempUserId,
        username: username,
        full_name: app.full_name,
        bio: app.motivation || '',
        city: app.city || '',
        status: 'approved',
        plan: 'free',
        available: true,
        experience_years: 0,
      }])

    if (profError) {
      // Se lo username esiste già aggiunge un numero
      if (profError.code === '23505') {
        const usernameAlt = username + '-' + Date.now().toString().slice(-4)
        await supabase.from('professionals').insert([{
          user_id: tempUserId,
          username: usernameAlt,
          full_name: app.full_name,
          bio: app.motivation || '',
          city: app.city || '',
          status: 'approved',
          plan: 'free',
          available: true,
          experience_years: 0,
        }])
      } else {
        alert('Errore creazione professionista: ' + profError.message)
        setActionLoading(null)
        return
      }
    }

    setActionLoading(null)
    fetchData()
  }

  const rejectApplication = async (id: string, table: string) => {
    setActionLoading(id)
    await supabase.from(table).update({ status: 'rejected' }).eq('id', id)
    setActionLoading(null)
    fetchData()
  }

  const resetToPending = async (id: string, table: string) => {
    await supabase.from(table).update({ status: 'pending' }).eq('id', id)
    fetchData()
  }

  const approveClient = async (id: string) => {
    setActionLoading(id)
    await supabase.from('client_applications').update({ status: 'approved' }).eq('id', id)
    setActionLoading(null)
    fetchData()
  }

  const filtered = applications.filter(a => filter === 'all' || a.status === filter)
  const filteredClients = clientApps.filter(a => filter === 'all' || a.status === filter)

  const counts = {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    clientPending: clientApps.filter(a => a.status === 'pending').length,
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: any = {
      pending: { bg: '#FEF3C7', color: '#92400E', label: 'In attesa' },
      approved: { bg: '#D1FAE5', color: '#065F46', label: 'Approvato' },
      rejected: { bg: '#FEE2E2', color: '#991B1B', label: 'Rifiutato' },
    }
    const c = colors[status] || colors.pending
    return <span style={{ fontSize: '9px', padding: '3px 10px', background: c.bg, color: c.color, borderRadius: '999px', fontWeight: 700, letterSpacing: '0.5px' }}>{c.label}</span>
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#0D0D0D', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '28px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' as const }}>Admin Panel</span>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9fff00' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: '#444' }}>{user?.emailAddresses[0]?.emailAddress}</span>
          <a href="/dashboard" style={{ fontSize: '11px', color: '#666', textDecoration: 'none', border: '1px solid #222', padding: '6px 14px', borderRadius: '999px' }}>dashboard →</a>
        </div>
      </nav>

      <div style={{ padding: '40px 5%' }}>

        {/* HEADER + STATS */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// pannello admin</div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '24px' }}>Gestione candidature</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '8px' }} className="stats-grid">
            {[
              { num: counts.pending, label: 'In attesa', color: '#fe3812', bg: '#FDF5F2' },
              { num: counts.approved, label: 'Approvate', color: '#0F6E56', bg: '#EEF8F3' },
              { num: counts.rejected, label: 'Rifiutate', color: '#888', bg: '#F8F5F0' },
              { num: counts.clientPending, label: 'Brief clienti', color: '#534AB7', bg: '#EEEDFE' },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, border: `1px solid ${s.color}20`, borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: s.color, letterSpacing: '-1px', lineHeight: 1, marginBottom: '4px' }}>{s.num}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '2px', background: '#E8E2D8', borderRadius: '999px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
          {[
            { id: 'candidature', label: `Professionisti (${applications.length})` },
            { id: 'clienti', label: `Clienti (${clientApps.length})` },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} style={{
              fontSize: '12px', fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? '#0D0D0D' : '#888',
              background: activeTab === tab.id ? '#fff' : 'transparent',
              border: 'none', borderRadius: '999px', padding: '8px 20px',
              cursor: 'pointer', fontFamily: "'Axiforma', sans-serif",
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* FILTRI */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[
            { value: 'all', label: 'Tutti' },
            { value: 'pending', label: 'In attesa' },
            { value: 'approved', label: 'Approvati' },
            { value: 'rejected', label: 'Rifiutati' },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value as any)} style={{
              fontSize: '11px', padding: '5px 14px',
              border: `1px solid ${filter === f.value ? '#0D0D0D' : '#EDE8DF'}`,
              borderRadius: '999px',
              background: filter === f.value ? '#0D0D0D' : '#fff',
              color: filter === f.value ? '#fff' : '#888',
              cursor: 'pointer', fontFamily: "'Axiforma', sans-serif",
            }}>{f.label}</button>
          ))}
          <button onClick={fetchData} style={{ fontSize: '11px', padding: '5px 14px', border: '1px solid #EDE8DF', borderRadius: '999px', background: '#fff', color: '#888', cursor: 'pointer', marginLeft: 'auto', fontFamily: "'Axiforma', sans-serif" }}>
            ↻ aggiorna
          </button>
        </div>

        {/* CANDIDATURE PROFESSIONISTI */}
        {activeTab === 'candidature' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center' as const, padding: '48px', color: '#AAA098' }}>Caricamento...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center' as const, padding: '48px', background: '#fff', borderRadius: '12px', border: '1px solid #EDE8DF' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
                <div style={{ fontSize: '14px', color: '#AAA098' }}>Nessuna candidatura {filter !== 'all' ? `"${filter}"` : ''}</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {filtered.map(app => (
                  <div key={app.id} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EEF8F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#0F6E56', flexShrink: 0 }}>
                          {app.full_name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>{app.full_name}</div>
                          <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{app.role} · {app.city || 'N/D'}</div>
                          <div style={{ fontSize: '11px', color: '#AAA098' }}>{app.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: '6px' }}>
                        <StatusBadge status={app.status} />
                        <span style={{ fontSize: '9px', color: '#CCC8C0', fontFamily: 'monospace' }}>
                          {new Date(app.created_at).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </div>

                    {/* skill */}
                    {app.skills?.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '12px' }}>
                        {app.skills.map((s: string) => (
                          <span key={s} style={{ fontSize: '9px', padding: '3px 10px', border: '1px solid #EDE8DF', borderRadius: '999px', color: '#888', background: '#F8F5F0' }}>{s}</span>
                        ))}
                      </div>
                    )}

                    {/* motivazione */}
                    {app.motivation && (
                      <div style={{ background: '#F8F5F0', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '12px', color: '#666', lineHeight: 1.65, fontStyle: 'italic' }}>
                        &ldquo;{app.motivation}&rdquo;
                      </div>
                    )}

                    {/* links */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
                      {app.portfolio_url && (
                        <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fe3812', textDecoration: 'none', border: '1px solid #fe381230', padding: '5px 14px', borderRadius: '999px', background: '#FDF5F2' }}>Portfolio ↗</a>
                      )}
                      {app.work_url_1 && (
                        <a href={app.work_url_1} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#555', textDecoration: 'none', border: '1px solid #EDE8DF', padding: '5px 14px', borderRadius: '999px' }}>Lavoro 1 ↗</a>
                      )}
                      {app.work_url_2 && (
                        <a href={app.work_url_2} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#555', textDecoration: 'none', border: '1px solid #EDE8DF', padding: '5px 14px', borderRadius: '999px' }}>Lavoro 2 ↗</a>
                      )}
                    </div>

                    {/* azioni */}
                    {app.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #F0EBE4' }}>
                        <button
                          onClick={() => approveApplication(app)}
                          disabled={actionLoading === app.id}
                          style={{ flex: 1, background: actionLoading === app.id ? '#888' : '#0F6E56', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '10px', borderRadius: '999px', border: 'none', cursor: actionLoading === app.id ? 'not-allowed' : 'pointer' }}
                        >
                          {actionLoading === app.id ? 'Approvazione...' : '✓ Approva e crea profilo'}
                        </button>
                        <button
                          onClick={() => rejectApplication(app.id, 'applications')}
                          disabled={actionLoading === app.id}
                          style={{ flex: 1, background: '#F8F5F0', color: '#888', fontSize: '12px', fontWeight: 700, padding: '10px', borderRadius: '999px', border: '1px solid #EDE8DF', cursor: 'pointer' }}
                        >
                          × Rifiuta
                        </button>
                      </div>
                    )}

                    {app.status === 'approved' && (
                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F0EBE4', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#0F6E56', fontWeight: 700 }}>✓ Profilo creato su discover</div>
                        <button onClick={() => resetToPending(app.id, 'applications')} style={{ fontSize: '10px', color: '#888', background: 'transparent', border: '1px solid #EDE8DF', borderRadius: '999px', padding: '4px 12px', cursor: 'pointer', marginLeft: 'auto', fontFamily: "'Axiforma', sans-serif" }}>
                          ↩ Rimetti in attesa
                        </button>
                      </div>
                    )}

                    {app.status === 'rejected' && (
                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F0EBE4' }}>
                        <button onClick={() => resetToPending(app.id, 'applications')} style={{ fontSize: '11px', color: '#888', background: 'transparent', border: '1px solid #EDE8DF', borderRadius: '999px', padding: '6px 16px', cursor: 'pointer', fontFamily: "'Axiforma', sans-serif" }}>
                          ↩ Rimetti in attesa
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BRIEF CLIENTI */}
        {activeTab === 'clienti' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center' as const, padding: '48px', color: '#AAA098' }}>Caricamento...</div>
            ) : filteredClients.length === 0 ? (
              <div style={{ textAlign: 'center' as const, padding: '48px', background: '#fff', borderRadius: '12px', border: '1px solid #EDE8DF' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
                <div style={{ fontSize: '14px', color: '#AAA098' }}>Nessuna brief cliente</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                {filteredClients.map(app => (
                  <div key={app.id} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>{app.full_name}</div>
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{app.company || 'Privato'} · {app.email}</div>
                        {app.website && <a href={app.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fe3812', textDecoration: 'none' }}>{app.website} ↗</a>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: '6px' }}>
                        <StatusBadge status={app.status} />
                        <span style={{ fontSize: '9px', color: '#CCC8C0', fontFamily: 'monospace' }}>{new Date(app.created_at).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ background: '#F8F5F0', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '4px' }}>Budget</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D' }}>{app.budget_range || 'N/D'}</div>
                      </div>
                      <div style={{ background: '#F8F5F0', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '4px' }}>Tempistiche</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D' }}>{app.timeline || 'N/D'}</div>
                      </div>
                    </div>

                    {app.skills_needed?.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '12px' }}>
                        {app.skills_needed.map((s: string) => (
                          <span key={s} style={{ fontSize: '9px', padding: '3px 10px', border: '1px solid #EDE8DF', borderRadius: '999px', color: '#888', background: '#F8F5F0' }}>{s}</span>
                        ))}
                      </div>
                    )}

                    {app.description && (
                      <div style={{ background: '#F8F5F0', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '12px', color: '#666', lineHeight: 1.65 }}>
                        {app.description}
                      </div>
                    )}

                    {app.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #F0EBE4' }}>
                        <button
                          onClick={() => approveClient(app.id)}
                          disabled={actionLoading === app.id}
                          style={{ flex: 1, background: actionLoading === app.id ? '#888' : '#534AB7', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '10px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}
                        >
                          {actionLoading === app.id ? 'Approvazione...' : '✓ Approva brief'}
                        </button>
                        <button
                          onClick={() => rejectApplication(app.id, 'client_applications')}
                          style={{ flex: 1, background: '#F8F5F0', color: '#888', fontSize: '12px', fontWeight: 700, padding: '10px', borderRadius: '999px', border: '1px solid #EDE8DF', cursor: 'pointer' }}
                        >
                          × Rifiuta
                        </button>
                      </div>
                    )}

                    {app.status !== 'pending' && (
                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F0EBE4' }}>
                        <button onClick={() => resetToPending(app.id, 'client_applications')} style={{ fontSize: '11px', color: '#888', background: 'transparent', border: '1px solid #EDE8DF', borderRadius: '999px', padding: '6px 16px', cursor: 'pointer', fontFamily: "'Axiforma', sans-serif" }}>
                          ↩ Rimetti in attesa
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>

    </main>
  )
}
