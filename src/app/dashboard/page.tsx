'use client'
import { useUser, useClerk } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [activeTab, setActiveTab] = useState('overview')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [professional, setProfessional] = useState<any>(null)
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [showAddWork, setShowAddWork] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    city: '',
    role: '',
    website: '',
    bio: '',
    available: true,
  })

  const [newWork, setNewWork] = useState({
    title: '',
    description: '',
    project_url: '',
    tags: '',
  })

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'profile', label: 'Profilo' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'messages', label: 'Messaggi' },
  ]

  useEffect(() => {
    if (!user) return
    const loadProfile = async () => {
      const email = user.emailAddresses[0]?.emailAddress
      if (!email) return

      const { data } = await supabase
        .from('professionals')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      if (data) {
        setProfessional(data)
        setForm({
          full_name: data.full_name || '',
          city: data.city || '',
          role: data.username?.split('-').slice(0, -1).join(' ') || '',
          website: '',
          bio: data.bio || '',
          available: data.available ?? true,
        })

        const { data: portfolio } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('professional_id', data.id)
          .order('order_index', { ascending: true })

        setPortfolioItems(portfolio || [])
      } else {
        setForm(f => ({ ...f, full_name: user.fullName || '' }))
      }
    }
    loadProfile()
  }, [user])

  const saveProfile = async () => {
    if (!professional) return
    setSaving(true)
    const { error } = await supabase
      .from('professionals')
      .update({ full_name: form.full_name, city: form.city, bio: form.bio, available: form.available })
      .eq('id', professional.id)
    setSaving(false)
    if (!error) { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000) }
    else alert('Errore: ' + error.message)
  }

  const addPortfolioItem = async () => {
    if (!professional || !newWork.title) return
    setSaving(true)
    const tags = newWork.tags.split(',').map(t => t.trim()).filter(Boolean)
    const { error } = await supabase.from('portfolio_items').insert([{
      professional_id: professional.id,
      title: newWork.title,
      description: newWork.description,
      project_url: newWork.project_url,
      tags,
      order_index: portfolioItems.length,
    }])
    if (!error) {
      setNewWork({ title: '', description: '', project_url: '', tags: '' })
      setShowAddWork(false)
      const { data } = await supabase.from('portfolio_items').select('*').eq('professional_id', professional.id).order('order_index', { ascending: true })
      setPortfolioItems(data || [])
    } else alert('Errore: ' + error.message)
    setSaving(false)
  }

  const deletePortfolioItem = async (id: string) => {
    await supabase.from('portfolio_items').delete().eq('id', id)
    setPortfolioItems(prev => prev.filter(p => p.id !== id))
  }

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !professional) return
    const ext = file.name.split('.').pop()
    const path = `${professional.id}.${ext}`
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (error) { alert('Errore upload: ' + error.message); return }
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    await supabase.from('professionals').update({ avatar_url: publicUrl }).eq('id', professional.id)
    setProfessional((prev: any) => ({ ...prev, avatar_url: publicUrl }))
  }

  const isApproved = professional?.status === 'approved'
  const maxPortfolio = professional?.plan === 'studio' ? Infinity : 3

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#F8F5F0', border: '1px solid #EDE8DF',
    borderRadius: '8px', padding: '10px 14px', fontSize: '13px',
    color: '#0D0D0D', fontFamily: "'Axiforma', sans-serif",
    outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '9px', letterSpacing: '2px',
    color: '#CCC8C0', textTransform: 'uppercase', marginBottom: '6px',
    fontFamily: 'monospace',
  }

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

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
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', marginBottom: '6px' }}>
                {professional?.plan === 'studio' ? 'Studio' : 'Free'}
              </div>
              <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '12px' }}>
                {professional?.plan === 'studio' ? 'Portfolio illimitato' : 'Max 3 lavori in portfolio'}
              </div>
              {professional?.plan !== 'studio' && (
                <a href="/pricing" style={{ display: 'block', textAlign: 'center' as const, background: '#fe3812', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '8px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
                  Passa a Studio →
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: '40px 5%' }}>

          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// benvenuto</div>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '6px' }}>
                  Ciao, {user?.firstName || form.full_name || 'Professionista'} 👋
                </h1>
                <p style={{ fontSize: '13px', color: '#AAA098' }}>
                  {isApproved ? 'Il tuo profilo è attivo su OFF32.' : 'Il tuo profilo è in attesa di approvazione.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }} className="stats-grid">
                {[
                  { num: '0', label: 'visite profilo', sub: 'questa settimana' },
                  { num: '0', label: 'messaggi', sub: 'non letti' },
                  { num: portfolioItems.length.toString(), label: 'lavori', sub: 'in portfolio' },
                  { num: professional?.plan === 'studio' ? 'Studio' : 'Free', label: 'piano attuale', sub: professional?.plan === 'studio' ? 'illimitato' : 'max 3 lavori' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#555', marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '10px', color: '#AAA098' }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: isApproved ? '#9fff00' : '#fe3812', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  {isApproved ? '✓' : '⏳'}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>
                    {isApproved ? 'Profilo approvato' : 'Candidatura in revisione'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.6 }}>
                    {isApproved
                      ? 'Sei visibile su discover. Completa il profilo per essere trovato dai clienti giusti.'
                      : 'Il team OFF32 sta valutando il tuo profilo. Riceverai una email entro 7 giorni lavorativi.'}
                  </div>
                  {isApproved && professional?.username && (
                    <a href={`/p/${professional.username}`} target="_blank" style={{ fontSize: '11px', color: '#fe3812', textDecoration: 'none', fontWeight: 700, marginTop: '8px', display: 'inline-block' }}>
                      Vedi il tuo profilo pubblico →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// il tuo profilo</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D0D0D', marginBottom: '28px' }}>Modifica profilo</h2>

              {!professional && (
                <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '10px', padding: '16px', marginBottom: '24px', fontSize: '13px', color: '#92400E' }}>
                  Il tuo profilo non è ancora stato approvato.
                </div>
              )}

              <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '32px', maxWidth: '560px' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #F0EBE4' }}>
                  {professional?.avatar_url ? (
                    <img src={professional.avatar_url} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#EEF8F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#0F6E56', flexShrink: 0 }}>
                      {form.full_name?.[0]?.toUpperCase() || user?.firstName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '4px' }}>Foto profilo</div>
                    <div style={{ fontSize: '11px', color: '#AAA098', marginBottom: '10px' }}>JPG o PNG, max 2MB</div>
                    <input type="file" id="avatar-upload" accept="image/jpeg,image/png" style={{ display: 'none' }} onChange={uploadAvatar} />
                    <button onClick={() => document.getElementById('avatar-upload')?.click()}
                      style={{ fontSize: '11px', color: '#fe3812', border: '1px solid #fe381230', borderRadius: '999px', padding: '6px 16px', background: '#FDF5F2', cursor: 'pointer' }}>
                      Carica foto
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>nome completo</label>
                  <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} placeholder="Il tuo nome" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>città</label>
                  <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Milano" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>ruolo</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Web Developer" style={inputStyle} disabled />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>sito web</label>
                  <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://tuosito.com" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>bio</label>
                  <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Racconta chi sei e cosa fai in 2-3 righe…" rows={4} style={{ ...inputStyle, resize: 'none', lineHeight: 1.65 } as any} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '14px', background: '#F8F5F0', borderRadius: '8px', border: '1px solid #EDE8DF', cursor: 'pointer' }}
                  onClick={() => setForm(f => ({ ...f, available: !f.available }))}>
                  <span style={{ fontSize: '12px', color: '#555', flex: 1 }}>Disponibile per nuovi progetti</span>
                  <div style={{ width: '36px', height: '20px', background: form.available ? '#9fff00' : '#DDD8CE', borderRadius: '10px', position: 'relative' as const, transition: 'background 0.2s' }}>
                    <div style={{ position: 'absolute' as const, top: '3px', left: form.available ? '19px' : '3px', width: '14px', height: '14px', background: '#fff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }}></div>
                  </div>
                </div>

                <button onClick={saveProfile} disabled={saving || !professional}
                  style={{ width: '100%', background: saving ? '#888' : saveSuccess ? '#0F6E56' : '#0D0D0D', color: '#fff', fontSize: '13px', fontWeight: 700, padding: '14px', borderRadius: '999px', border: 'none', cursor: saving || !professional ? 'not-allowed' : 'pointer', letterSpacing: '0.5px', transition: 'background 0.2s' }}>
                  {saving ? 'Salvataggio...' : saveSuccess ? '✓ Salvato!' : 'salva modifiche →'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '8px' }}>// i tuoi lavori</div>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0D0D0D' }}>Portfolio</h2>
                </div>
                {isApproved && portfolioItems.length < maxPortfolio && (
                  <button onClick={() => setShowAddWork(true)} style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '10px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
                    + aggiungi lavoro
                  </button>
                )}
              </div>

              {showAddWork && (
                <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D0D0D', marginBottom: '20px' }}>Nuovo lavoro</div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>titolo *</label>
                    <input value={newWork.title} onChange={e => setNewWork(w => ({ ...w, title: e.target.value }))} placeholder="es. Sito eCommerce per brand moda" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>descrizione</label>
                    <textarea value={newWork.description} onChange={e => setNewWork(w => ({ ...w, description: e.target.value }))} placeholder="Descrivi brevemente il progetto..." rows={3} style={{ ...inputStyle, resize: 'none' } as any} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>link al progetto</label>
                    <input value={newWork.project_url} onChange={e => setNewWork(w => ({ ...w, project_url: e.target.value }))} placeholder="https://mioprogetto.com" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>tag (separati da virgola)</label>
                    <input value={newWork.tags} onChange={e => setNewWork(w => ({ ...w, tags: e.target.value }))} placeholder="React, Shopify, UX" style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={addPortfolioItem} disabled={saving || !newWork.title} style={{ flex: 1, background: '#0D0D0D', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
                      {saving ? 'Salvataggio...' : 'Aggiungi lavoro →'}
                    </button>
                    <button onClick={() => setShowAddWork(false)} style={{ background: '#F8F5F0', color: '#888', fontSize: '12px', padding: '12px 20px', borderRadius: '999px', border: '1px solid #EDE8DF', cursor: 'pointer' }}>
                      Annulla
                    </button>
                  </div>
                </div>
              )}

              {portfolioItems.length === 0 ? (
                <div style={{ background: '#fff', border: '1.5px dashed #EDE8DF', borderRadius: '12px', padding: '48px', textAlign: 'center' as const }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎨</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>Nessun lavoro ancora</div>
                  <div style={{ fontSize: '12px', color: '#AAA098', marginBottom: '20px', lineHeight: 1.6 }}>
                    Aggiungi il tuo primo lavoro al portfolio.<br />Piano Free: max 3 lavori.
                  </div>
                  {isApproved && (
                    <button onClick={() => setShowAddWork(true)} style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '11px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>
                      aggiungi il primo lavoro →
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                  {portfolioItems.map(item => (
                    <div key={item.id} style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D0D0D', marginBottom: '6px' }}>{item.title}</div>
                        {item.description && <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.6, marginBottom: '10px' }}>{item.description}</div>}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                          {item.tags?.map((t: string) => (
                            <span key={t} style={{ fontSize: '9px', padding: '3px 10px', border: '1px solid #EDE8DF', borderRadius: '999px', color: '#888', background: '#F8F5F0' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        {item.project_url && (
                          <a href={item.project_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#fe3812', textDecoration: 'none', border: '1px solid #fe381230', padding: '6px 14px', borderRadius: '999px', background: '#FDF5F2' }}>
                            Vedi ↗
                          </a>
                        )}
                        <button onClick={() => deletePortfolioItem(item.id)} style={{ fontSize: '11px', color: '#888', background: '#F8F5F0', border: '1px solid #EDE8DF', padding: '6px 14px', borderRadius: '999px', cursor: 'pointer' }}>
                          Elimina
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '16px', padding: '14px 18px', background: '#FDF5F2', border: '1px solid #fe381220', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Piano {professional?.plan === 'studio' ? 'Studio' : 'Free'} — {portfolioItems.length}/{professional?.plan === 'studio' ? '∞' : '3'} lavori utilizzati</span>
                {professional?.plan !== 'studio' && (
                  <a href="/pricing" style={{ fontSize: '11px', color: '#fe3812', fontWeight: 700, textDecoration: 'none' }}>Passa a Studio per portfolio illimitato →</a>
                )}
              </div>
            </div>
          )}

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
        input:focus, textarea:focus { border-color: #fe3812 !important; outline: none; }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

    </main>
  )
}
