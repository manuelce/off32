'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SKILLS = ['tutti', 'web dev', 'illustrazione', '3D / motion', 'UX / UI', 'marketing', 'copywriting']
const CITIES = ['Milano', 'Roma', 'Torino', 'Bologna', 'Napoli', 'Firenze', 'Remote']
const LEVELS = ['senior', 'mid', 'junior']

const PROFESSIONALS_STATIC = [
  { initials: 'MR', name: 'Marco Ricci', role: 'Web Developer', city: 'Milano', tags: ['React', 'Next.js', 'Shopify'], bg: '#EEF8F3', color: '#0F6E56', premium: true, projects: 34, rating: 4.9, available: true, level: 'senior', skill: 'web dev', bio: 'Sviluppo eCommerce performanti e app web custom. Non faccio vetrine — faccio strumenti che vendono.', slug: 'marco-ricci' },
  { initials: 'SL', name: 'Sara Longo', role: 'Illustratrice', city: 'Roma', tags: ['Branding', 'Editorial', 'Procreate'], bg: '#EEEDFE', color: '#534AB7', premium: true, projects: 21, rating: 5.0, available: true, level: 'senior', skill: 'illustrazione', bio: 'Illustratrice editoriale e brand designer. Trasforma concetti complessi in immagini memorabili.', slug: 'sara-longo' },
  { initials: 'AF', name: 'Alex Ferro', role: '3D Artist', city: 'Torino', tags: ['Blender', 'Cinema 4D', 'Motion'], bg: '#FDF0EB', color: '#993C1D', premium: true, projects: 18, rating: 4.8, available: true, level: 'senior', skill: '3D / motion', bio: '3D artist e motion designer. Crea mondi digitali con attenzione maniacale ai dettagli.', slug: 'alex-ferro' },
  { initials: 'GV', name: 'Giulia Vitale', role: 'UX Designer', city: 'Napoli', tags: ['Figma', 'Research', 'Webflow'], bg: '#FEF8EE', color: '#854F0B', premium: false, projects: 29, rating: 4.7, available: true, level: 'mid', skill: 'UX / UI', bio: 'Designer con ossessione per la semplicità. Ogni interfaccia che progetto deve essere intuitiva al primo tocco.', slug: 'giulia-vitale' },
  { initials: 'DC', name: 'Dario Conti', role: 'Full Stack Developer', city: 'Bologna', tags: ['Vue.js', 'Laravel', 'MySQL'], bg: '#EEF8F3', color: '#0F6E56', premium: false, projects: 41, rating: 4.5, available: false, level: 'senior', skill: 'web dev', bio: 'Full stack developer con 8 anni di esperienza. Specializzato in architetture scalabili e API performanti.', slug: 'dario-conti' },
  { initials: 'FM', name: 'Federica Mele', role: 'Motion Designer', city: 'Firenze', tags: ['After Effects', 'Lottie', '3D'], bg: '#FDF0EB', color: '#993C1D', premium: false, projects: 15, rating: 4.9, available: true, level: 'mid', skill: '3D / motion', bio: 'Motion designer con focus su animazioni web e video. Ogni pixel si muove con un motivo preciso.', slug: 'federica-mele' },
  { initials: 'LP', name: 'Luca Pellegrini', role: 'Brand Designer', city: 'Milano', tags: ['Branding', 'Figma', 'Illustrator'], bg: '#EEEDFE', color: '#534AB7', premium: false, projects: 23, rating: 4.6, available: true, level: 'mid', skill: 'UX / UI', bio: 'Brand designer con esperienza nel settore luxury e startup. Il brand è la prima impressione — deve durare.', slug: 'luca-pellegrini' },
  { initials: 'RB', name: 'Roberta Bianchi', role: 'Copywriter', city: 'Roma', tags: ['Copy', 'Content', 'SEO'], bg: '#F0FEF0', color: '#2D7A2D', premium: false, projects: 38, rating: 4.8, available: true, level: 'senior', skill: 'copywriting', bio: 'Copywriter con 10 anni di esperienza. Le parole giuste al momento giusto cambiano tutto.', slug: 'roberta-bianchi' },
  { initials: 'TM', name: 'Tommaso Mari', role: 'Marketing Strategist', city: 'Milano', tags: ['Meta Ads', 'Google Ads', 'SEO'], bg: '#FEF8EE', color: '#854F0B', premium: false, projects: 19, rating: 4.4, available: false, level: 'mid', skill: 'marketing', bio: 'Stratega digitale con focus su performance marketing. I numeri non mentono — li faccio parlare.', slug: 'tommaso-mari' },
]

const sideLabel: React.CSSProperties = {
  fontSize: '9px', letterSpacing: '2px', color: '#AAA098',
  textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'monospace',
}

export default function DiscoverPage() {
  const [activeSkill, setActiveSkill] = useState('tutti')
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('rilevanza')
  const [dbProfessionals, setDbProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfessionals = async () => {
      const { data } = await supabase
        .from('professionals')
        .select(`*, professional_skills ( level, skills ( name, category ) )`)
        .eq('status', 'approved')
        .order('plan', { ascending: false })

      if (data && data.length > 0) {
        const mapped = data.map(p => ({
          initials: p.full_name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'XX',
          name: p.full_name,
          role: p.username || 'Professionista',
          city: p.city || 'Italia',
          tags: p.professional_skills?.map((ps: any) => ps.skills?.name).filter(Boolean).slice(0, 3) || [],
          bg: '#EEF8F3', color: '#0F6E56',
          premium: p.plan === 'studio',
          projects: 0, rating: 5.0,
          available: p.available,
          level: 'senior', skill: 'web dev',
          bio: p.bio || 'Professionista verificato OFF32.',
          slug: p.username,
        }))
        setDbProfessionals(mapped)
      }
      setLoading(false)
    }
    fetchProfessionals()
  }, [])

  const allProfessionals = dbProfessionals.length > 0 ? dbProfessionals : PROFESSIONALS_STATIC

  const filtered = allProfessionals.filter(p => {
    if (activeSkill !== 'tutti' && p.skill !== activeSkill) return false
    if (activeCity && p.city !== activeCity) return false
    if (activeLevel && p.level !== activeLevel) return false
    if (onlyAvailable && !p.available) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  }).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'progetti') return b.projects - a.projects
    return (b.premium ? 1 : 0) - (a.premium ? 1 : 0)
  })

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {['discover', 'about', 'blog', 'contatti'].map(link => (
            <a key={link} href={`/${link}`} style={{ fontSize: '11px', color: link === 'discover' ? '#fff' : '#666', padding: '4px 14px', borderRadius: '999px', letterSpacing: '0.3px', textDecoration: 'none', background: link === 'discover' ? '#2a2a2a' : 'transparent' }}>{link}</a>
          ))}
        </div>
        <a href="/login" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
          Entra nell&apos;hub
        </a>
      </nav>

      {/* HERO SCURO */}
      <div style={{ background: '#0D0D0D', padding: '52px 5% 48px', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// discover · off32.it</div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px' }}>
          I migliori{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            professionisti
            <span style={{ position: 'absolute', left: '-2px', bottom: '6px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
          </span>{' '}digitali italiani.
        </h1>
        <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.7, maxWidth: '480px', marginBottom: '32px' }}>
          Ogni profilo è stato approvato dal team OFF32. Nessun dilettante, nessuna vetrina vuota. Solo chi ha dimostrato di saper fare.
        </p>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[
            { num: `${allProfessionals.length}+`, label: 'professionisti' },
            { num: '100%', label: 'verificati' },
            { num: '8', label: 'skill area' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#333', textTransform: 'uppercase' as const, marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }} className="discover-grid">

        {/* SIDEBAR */}
        <div style={{ background: '#E8E2D8', borderRight: '1px solid #DDD8CE', padding: '28px 20px', display: 'flex', flexDirection: 'column' as const, gap: '24px', position: 'sticky' as const, top: '58px', height: 'calc(100vh - 58px)', overflowY: 'auto' as const }}>

          {/* search */}
          <div style={{ background: '#fff', border: '1px solid #DDD8CE', borderRadius: '8px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5" cy="5" r="4" stroke="#CCC8C0" strokeWidth="1.2"/><path d="M8.5 8.5L11 11" stroke="#CCC8C0" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="cerca per nome o skill…" style={{ border: 'none', outline: 'none', fontSize: '11px', color: '#555', background: 'transparent', width: '100%', fontFamily: "'Axiforma', sans-serif" }} />
          </div>

          {/* skill */}
          <div>
            <div style={sideLabel}>// skill area</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
              {SKILLS.map(s => (
                <div key={s} onClick={() => setActiveSkill(s)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', background: activeSkill === s ? '#fff' : 'transparent', border: activeSkill === s ? '1px solid #E0D8CC' : '1px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeSkill === s ? '#fe3812' : '#CCC8C0' }}></div>
                    <span style={{ fontSize: '12px', color: activeSkill === s ? '#0D0D0D' : '#888', fontWeight: activeSkill === s ? 600 : 400 }}>{s}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#CCC8C0' }}>
                    {s === 'tutti' ? allProfessionals.length : allProfessionals.filter(p => p.skill === s).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* livello */}
          <div>
            <div style={sideLabel}>// livello</div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px' }}>
              {LEVELS.map(l => (
                <div key={l} onClick={() => setActiveLevel(activeLevel === l ? null : l)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', cursor: 'pointer' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: `1.5px solid ${activeLevel === l ? '#fe3812' : '#DDD8CE'}`, background: activeLevel === l ? '#fe3812' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {activeLevel === l && <span style={{ color: '#fff', fontSize: '9px' }}>✓</span>}
                  </div>
                  <span style={{ fontSize: '12px', color: '#888', textTransform: 'capitalize' as const }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* città */}
          <div>
            <div style={sideLabel}>// città</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px' }}>
              {CITIES.map(c => (
                <span key={c} onClick={() => setActiveCity(activeCity === c ? null : c)} style={{ fontSize: '10px', padding: '4px 10px', border: `1px solid ${activeCity === c ? '#0D0D0D' : '#E0D8CC'}`, borderRadius: '999px', color: activeCity === c ? '#fff' : '#888', background: activeCity === c ? '#0D0D0D' : '#fff', cursor: 'pointer' }}>{c}</span>
              ))}
            </div>
          </div>

          {/* disponibilità */}
          <div>
            <div style={sideLabel}>// disponibilità</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>solo disponibili</span>
              <div onClick={() => setOnlyAvailable(!onlyAvailable)} style={{ width: '36px', height: '20px', background: onlyAvailable ? '#9fff00' : '#E0D8CC', borderRadius: '10px', position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute' as const, top: '3px', left: onlyAvailable ? '19px' : '3px', width: '14px', height: '14px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>
          </div>

          {/* reset */}
          {(activeSkill !== 'tutti' || activeCity || activeLevel || onlyAvailable || search) && (
            <button onClick={() => { setActiveSkill('tutti'); setActiveCity(null); setActiveLevel(null); setOnlyAvailable(false); setSearch('') }} style={{ fontSize: '10px', color: '#fe3812', background: 'transparent', border: '1px solid #fe381230', borderRadius: '6px', padding: '8px', cursor: 'pointer', letterSpacing: '0.5px' }}>
              reset filtri ×
            </button>
          )}

        </div>

        {/* RISULTATI */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', color: '#AAA098' }}>
              {loading
                ? 'Caricamento...'
                : <>Trovati <strong style={{ color: '#0D0D0D' }}>{filtered.length}</strong> professionisti {dbProfessionals.length === 0 && <span style={{ color: '#CCC8C0' }}>(demo)</span>}</>
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#AAA098' }}>ordina per</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ fontSize: '11px', color: '#555', background: '#fff', border: '1px solid #DDD8CE', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontFamily: "'Axiforma', sans-serif", outline: 'none' }}>
                <option value="rilevanza">rilevanza</option>
                <option value="rating">rating</option>
                <option value="progetti">progetti</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center' as const, padding: '80px 0', color: '#AAA098' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
              <div style={{ fontSize: '14px' }}>Caricamento professionisti...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center' as const, padding: '80px 0', color: '#AAA098' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>Nessun professionista trovato</div>
              <div style={{ fontSize: '12px' }}>Prova a cambiare i filtri</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="results-grid">
              {filtered.map((p, idx) => (
                <a key={p.slug || idx} href={`/p/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: `${p.premium ? '1.5px' : '1px'} solid ${p.premium ? '#fe381230' : '#EDE8DF'}`, borderRadius: '10px', padding: '16px', cursor: 'pointer', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: p.bg, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: p.color, flexShrink: 0 }}>{p.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '2px' }}>{p.name}</div>
                        <div style={{ fontSize: '10px', color: '#AAA098', letterSpacing: '0.3px' }}>{p.role} · {p.city}</div>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                          {p.premium && <span style={{ fontSize: '8px', padding: '2px 7px', background: '#FDF0EB', border: '1px solid #E84A1A25', borderRadius: '999px', color: '#993C1D', letterSpacing: '1px' }}>STUDIO</span>}
                          <span style={{ fontSize: '8px', padding: '2px 7px', background: '#EEF8F3', border: '1px solid #1D9E7530', borderRadius: '999px', color: '#0F6E56', letterSpacing: '1px' }}>VERIFIED</span>
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '11px', color: '#888', lineHeight: 1.6, marginBottom: '12px' }}>{p.bio}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' as const, marginBottom: '12px' }}>
                      {p.tags.map((t: string) => <span key={t} style={{ fontSize: '9px', padding: '3px 9px', border: '1px solid #EDE8DF', borderRadius: '999px', color: '#888', background: '#F8F5F0' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #F0EBE4' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1,2,3,4,5].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '1px', background: i <= Math.round(p.rating) ? '#fe3812' : '#EDE8DF' }}></div>)}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#333' }}>{p.rating}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: p.available ? '#9fff00' : '#CCC8C0' }}></div>
                        <span style={{ fontSize: '9px', color: p.available ? '#2D7A2D' : '#AAA098', letterSpacing: '0.5px' }}>{p.available ? 'disponibile' : 'occupato'}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* paginazione */}
          {filtered.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '32px' }}>
              {['←', '1', '2', '3', '…', '8', '→'].map((p, i) => (
                <div key={i} style={{ width: '32px', height: '32px', border: `1px solid ${p === '1' ? '#0D0D0D' : '#E0D8CC'}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: p === '1' ? '#fff' : '#888', background: p === '1' ? '#0D0D0D' : '#fff', cursor: 'pointer' }}>{p}</div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 1024px) { .results-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .discover-grid { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}
