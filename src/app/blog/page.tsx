'use client'
import { useState, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const CATEGORIES = ['tutti', 'design', 'sviluppo', 'community', 'marketing', 'casi studio']

const POSTS = [
  {
    slug: 'come-costruire-brand-digitale',
    image: '/blog/img/brand-digitale.jpg?v=2',
    category: 'design',
    tag: 'Design',
    title: 'Come costruire un brand digitale che dura nel tempo',
    excerpt: 'Il brand non è un logo. È la promessa che fai ogni giorno ai tuoi clienti. Ecco come in OFF32 affrontiamo l\'identità visiva.',
    author: { initials: 'MC', name: 'Manuel Cerasuolo', role: 'Project Manager · OFF32', bg: '#FDF0EB', color: '#993C1D' },
    date: 'Mar 2025', readTime: '6 min', featured: true,
    bg: '#0A1510',
  },
  {
    slug: 'scegliere-clienti-giusti',
    image: '/blog/img/client_s.webp',
    category: 'community',
    tag: 'Community',
    title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti',
    excerpt: 'Non tutti i progetti sono quelli giusti. Ecco come decidiamo con chi lavorare, e perché la qualità di un\'agenzia dipende dalle scelte che fa.',
    author: { initials: 'MR', name: 'Marco Ricci', role: 'Web Developer', bg: '#EEF8F3', color: '#0F6E56' },
    date: 'Feb 2025', readTime: '4 min', featured: true,
    bg: '#12102A',
  },
  {
    slug: 'ecommerce-performante-2025',
    image: '/blog/img/ecommerce-2025.jpg',
    category: 'sviluppo',
    tag: 'Sviluppo',
    title: 'eCommerce performante nel 2025: cosa funziona davvero',
    excerpt: 'Un negozio converte quando l\'offerta è chiara, la pagina è veloce e il checkout non chiede sforzo. Il resto è rumore.',
    author: { initials: 'MC', name: 'Manuel Cerasuolo', role: 'Project Manager · OFF32', bg: '#FDF0EB', color: '#993C1D' },
    date: 'Feb 2025', readTime: '6 min', featured: false,
    bg: '#0A0A14',
  },
]

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const title: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(72px, 12vw, 168px)',
  lineHeight: 0.88,
  letterSpacing: '-3px',
  color: '#0D0D0D',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('tutti')
  const filtered = POSTS.filter(p => activeCategory === 'tutti' || p.category === activeCategory)

  return (
    <main style={{ background: '#f0ebe0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <Navbar />

      <h1 className="blog-title" style={{ margin: 0 }}>
        <span style={{ ...title, display: 'block', textAlign: 'right', borderTop: LINE, borderBottom: LINE, padding: '18px 40px 22px' }}>
          il nostro
        </span>
        <span style={{ ...title, display: 'block', textAlign: 'left', borderBottom: LINE, padding: '18px 40px 22px' }}>
          blog
        </span>
      </h1>

      <section style={{ paddingTop: '15%', paddingBottom: '15%' }}>
        <div style={{ background: '#F0EBE0', padding: '20px 5%', borderBottom: '1px solid #E0D8CC', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <span key={c} onClick={() => setActiveCategory(c)} style={{ fontSize: '11px', padding: '5px 16px', border: `1px solid ${activeCategory === c ? '#fe3812' : '#E0D8CC'}`, borderRadius: '999px', color: activeCategory === c ? '#fe3812' : '#888', background: activeCategory === c ? '#FDF5F2' : '#fff', cursor: 'pointer', textTransform: 'capitalize' }}>
              {c}
            </span>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '80%', margin: '28px auto 0' }}>
            {filtered.map((post, i) => (
              <a key={post.slug} href={`/blog/${post.slug}`} style={{ gridColumn: i === 0 ? '1 / -1' : undefined, textDecoration: 'none', color: '#0D0D0D', border: LINE, background: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 210, background: post.bg, borderBottom: LINE, overflow: 'hidden' }}>
                  {post.image && <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                </div>
                <div style={{ padding: '16px 16px 14px', borderBottom: LINE }}>
                  <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, textDecoration: 'underline', textUnderlineOffset: 3 }}>{post.title}</div>
                  <div style={{ marginTop: 10, fontSize: 12, letterSpacing: '0.4px', color: '#7a746c' }}>{post.tag}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px' }}>
                  <span style={{ fontSize: 14 }}>Leggi articolo</span>
                  <span style={{ width: 34, height: 34, border: LINE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>↗</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#AAA098' }}>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>Nessun articolo in questa categoria</div>
            <div style={{ fontSize: '12px' }}>Prova a selezionare un&apos;altra categoria</div>
          </div>
        )}
      </section>

      <ProjectStart />

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: LINE, borderBottom: LINE }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
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
        @media (max-width: 860px) {
          .blog-title { padding-top: 64px; }
          .posts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
