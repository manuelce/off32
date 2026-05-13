'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

const CATEGORIES = ['tutti', 'design', 'sviluppo', 'community', 'marketing', 'casi studio']

const POSTS = [
  {
    slug: 'come-costruire-brand-digitale',
    category: 'design',
    tag: 'Design',
    title: 'Come costruire un brand digitale che dura nel tempo',
    excerpt: 'Il brand non è un logo. È la promessa che fai ogni giorno ai tuoi clienti. Ecco come i migliori professionisti OFF32 approcciano l\'identità visiva.',
    author: { initials: 'SL', name: 'Sara Longo', role: 'Illustratrice', bg: '#EEEDFE', color: '#534AB7' },
    date: 'Mar 2025', readTime: '6 min', featured: true,
    bg: '#0A1510',
  },

  {
    slug: 'scegliere-clienti-giusti',
    image: '/blog/img/prova.jpg',
    category: 'community',
    tag: 'Community',
    title: 'La selezione dei professionisti e non solo: perché la qualità non si negozia',
    excerpt: 'In OFF32 rifiutiamo il 60% delle candidature. Non per arroganza — perché crediamo che la qualità di una community dipenda da chi entra.',
    author: { initials: 'MR', name: 'Marco Ricci', role: 'Web Developer', bg: '#EEF8F3', color: '#0F6E56' },
    date: 'Feb 2025', readTime: '4 min', featured: true,
    bg: '#12102A',
  }
  ,
  {
    slug: 'ecommerce-performante-2025',
    category: 'sviluppo',
    tag: 'Sviluppo',
    title: 'eCommerce performante nel 2025: cosa funziona davvero',
    excerpt: 'Core Web Vitals, lazy loading, edge computing. Dopo 30+ eCommerce sviluppati, ecco cosa fa davvero la differenza nelle conversioni.',
    author: { initials: 'DC', name: 'Dario Conti', role: 'Full Stack', bg: '#EEF8F3', color: '#0F6E56' },
    date: 'Feb 2025', readTime: '8 min', featured: false,
    bg: '#0A0A14',
  },
  {
    slug: 'motion-design-web',
    category: 'design',
    tag: 'Design',
    title: 'Motion design per il web: quando l\'animazione aggiunge valore',
    excerpt: 'Non tutte le animazioni sono uguali. La differenza tra un\'animazione che funziona e una che disturba sta in tre principi fondamentali.',
    author: { initials: 'FM', name: 'Federica Mele', role: 'Motion Designer', bg: '#FDF0EB', color: '#993C1D' },
    date: 'Gen 2025', readTime: '5 min', featured: false,
    bg: '#1A0A06',
  },
  {
    slug: 'caso-studio-healing-earth',
    category: 'casi studio',
    tag: 'Caso Studio',
    title: 'Caso studio: Healing Earth Italia — +40% di conversioni in 30 giorni',
    excerpt: 'Come abbiamo trasformato un eCommerce che perdeva clienti in una macchina da vendite. Dati reali, scelte reali, risultati reali.',
    author: { initials: 'MR', name: 'Marco Ricci', role: 'Web Developer', bg: '#EEF8F3', color: '#0F6E56' },
    date: 'Gen 2025', readTime: '10 min', featured: false,
    bg: '#0A1510',
  },
  {
    slug: 'meta-ads-creativi-2025',
    category: 'marketing',
    tag: 'Marketing',
    title: 'Meta Ads nel 2025: i creativi che convertono davvero',
    excerpt: 'Il targeting è morto, lunga vita ai creativi. Ecco i formati, i copy e le strutture che stiamo usando con i nostri clienti per massimizzare il ROAS.',
    author: { initials: 'TM', name: 'Tommaso Mari', role: 'Marketing Strategist', bg: '#FEF8EE', color: '#854F0B' },
    date: 'Dic 2024', readTime: '7 min', featured: false,
    bg: '#140A00',
  },
  {
    slug: 'ux-ricerca-utente',
    category: 'design',
    tag: 'Design',
    title: 'UX research: perché il 90% dei designer salta questo step',
    excerpt: 'Progettare senza ricerca è come costruire una casa senza fondamenta. Ecco il processo di ricerca utente che usiamo in OFF32 per ogni progetto.',
    author: { initials: 'GV', name: 'Giulia Vitale', role: 'UX Designer', bg: '#FEF8EE', color: '#854F0B' },
    date: 'Dic 2024', readTime: '6 min', featured: false,
    bg: '#0A0A14',
  },
  {
    slug: 'collaborare-da-remoto',
    category: 'community',
    tag: 'Community',
    title: 'Come collaborare da remoto senza perdere la testa',
    excerpt: 'Tool, processi e mindset per lavorare con professionisti in tutta Italia senza che nulla vada storto. La guida che avremmo voluto avere.',
    author: { initials: 'AF', name: 'Andrea Ferri', role: 'Community Manager', bg: '#FDF0EB', color: '#993C1D' },
    date: 'Nov 2024', readTime: '5 min', featured: false,
    bg: '#120A08',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('tutti')

  const filtered = POSTS.filter(p => activeCategory === 'tutti' || p.category === activeCategory)
  const featured = filtered.filter(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
        <Navbar />

      {/* HERO */}
      <div style={{ background: '#0D0D0D', padding: '64px 5% 52px', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// blog · off32.com</div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px' }}>
          Idee, casi studio e{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            riflessioni
            <span style={{ position: 'absolute', left: '-2px', bottom: '6px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
          </span>{' '}dal mondo OFF32.
        </h1>
        <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.7, maxWidth: '480px' }}>
          I professionisti dell&apos;officina condividono quello che hanno imparato sul campo. Niente teorie — solo esperienza reale.
        </p>
      </div>

      {/* CATEGORIE */}
      <div style={{ background: '#F0EBE0', padding: '20px 5%', borderBottom: '1px solid #E0D8CC', display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
        {CATEGORIES.map(c => (
          <span key={c} onClick={() => setActiveCategory(c)} style={{ fontSize: '11px', padding: '5px 16px', border: `1px solid ${activeCategory === c ? '#fe3812' : '#E0D8CC'}`, borderRadius: '999px', color: activeCategory === c ? '#fe3812' : '#888', background: activeCategory === c ? '#FDF5F2' : '#fff', cursor: 'pointer', textTransform: 'capitalize' as const }}>
            {c}
          </span>
        ))}
      </div>

      <div style={{ padding: '48px 5%' }}>

        {/* FEATURED — 2 card grandi */}
        {featured.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '20px', fontFamily: 'monospace' }}>// in evidenza</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="featured-grid">
              {featured.map(post => (
                <a key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
                  <div style={{ height: '220px', background: post.image ? `url(${post.image}) center/cover no-repeat` : post.bg,display: 'flex', alignItems: 'flex-end', padding: '20px', position: 'relative' as const }}>
                      <span style={{ fontSize: '9px', padding: '4px 12px', background: '#fe3812', color: '#fff', borderRadius: '999px', letterSpacing: '1px', fontWeight: 700 }}>{post.tag}</span>
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0D0D0D', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.3px' }}>{post.title}</h2>
                      <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7, marginBottom: '20px' }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: post.author.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: post.author.color }}>{post.author.initials}</div>
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#333' }}>{post.author.name}</div>
                            <div style={{ fontSize: '9px', color: '#AAA098' }}>{post.date} · {post.readTime}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '11px', color: '#fe3812', fontWeight: 700 }}>leggi →</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TUTTI GLI ARTICOLI */}
        {rest.length > 0 && (
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#AAA098', textTransform: 'uppercase' as const, marginBottom: '20px', fontFamily: 'monospace' }}>// tutti gli articoli</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="posts-grid">
              {rest.map(post => (
                <a key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid #E0D8CC', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' as const }}>
                    <div style={{ height: '140px', background: post.bg, display: 'flex', alignItems: 'flex-end', padding: '14px', position: 'relative' as const }}>
                      <span style={{ fontSize: '9px', padding: '3px 10px', background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '999px', letterSpacing: '1px' }}>{post.tag}</span>
                    </div>
                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0D0D0D', lineHeight: 1.35, marginBottom: '8px', letterSpacing: '-0.2px' }}>{post.title}</h3>
                        <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.65, marginBottom: '16px' }}>{post.excerpt.substring(0, 100)}…</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F5F0E8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: post.author.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 700, color: post.author.color }}>{post.author.initials}</div>
                          <span style={{ fontSize: '10px', color: '#AAA098' }}>{post.date} · {post.readTime}</span>
                        </div>
                        <span style={{ fontSize: '10px', color: '#fe3812', fontWeight: 700 }}>→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* STATO VUOTO */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center' as const, padding: '80px 0', color: '#AAA098' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📝</div>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>Nessun articolo in questa categoria</div>
            <div style={{ fontSize: '12px' }}>Prova a selezionare un&apos;altra categoria</div>
          </div>
        )}
      </div>

      {/* NEWSLETTER */}
      <div style={{ background: '#0D0D0D', padding: '64px 5%', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '12px' }}>// rimani aggiornato</div>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#fff', letterSpacing: '-0.5px', marginBottom: '12px', lineHeight: 1.2 }}>
            Nuovi articoli ogni settimana.<br />Direttamente nella tua inbox.
          </h2>
          <p style={{ fontSize: '13px', color: '#444', marginBottom: '28px', lineHeight: 1.65 }}>
            Niente spam. Solo contenuti utili dal team e dai professionisti OFF32.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input placeholder="la tua email" style={{ flex: 1, background: '#111', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '12px 20px', fontSize: '13px', color: '#fff', fontFamily: "'Axiforma', sans-serif", outline: 'none' }} />
            <button style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '12px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', whiteSpace: 'nowrap' as const }}>
              iscriviti →
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
        input::placeholder { color: #333; }
        @media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .posts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}
