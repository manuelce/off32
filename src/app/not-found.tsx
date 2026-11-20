import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import { NAV_LINKS } from '@/lib/site-nav'

export const metadata: Metadata = {
  title: { absolute: 'Pagina non trovata · OFF32' },
  description: 'La pagina che cerchi non esiste o è stata spostata. Torna alla home di OFF32 o scegli una sezione del sito.',
  // Replaces the layout's index,follow. Next also inserts a single noindex on 404.
  robots: null,
  alternates: { canonical: null },
}

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
  textDecoration: 'none',
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Lavori', href: '/work' },
  { label: 'Servizi', href: '/servizi' },
  ...NAV_LINKS.filter(link => link.href !== '/work'),
]

export default function NotFound() {
  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <div className="not-found-wrap" style={{ padding: '18vh 8% 12vh' }}>
        <div style={{ ...meta, marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-1px', lineHeight: 1.05, margin: '0 0 20px' }}>
          Pagina non trovata
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: '46ch', margin: '0 0 28px' }}>
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {links.map(link => (
            <a key={link.href} href={link.href} style={meta}>{link.label}</a>
          ))}
        </div>
      </div>

      <SiteFooter />

      <style>{`
        @media (max-width: 768px) {
          .not-found-wrap { padding-top: 96px !important; }
        }
      `}</style>
    </main>
  )
}
