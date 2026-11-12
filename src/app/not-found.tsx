import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Pagina non trovata · OFF32' },
  description: 'La pagina che cerchi non esiste o è stata spostata. Torna alla home di OFF32 o scegli una sezione del sito.',
  // Replaces the layout's index,follow. Next also inserts a single noindex on 404.
  robots: null,
  alternates: { canonical: null },
}

const LINE = '1px solid #0D0D0D'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
  textDecoration: 'none',
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Events', href: '/workshop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
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
            <a key={link.label} href={link.href} style={meta}>{link.label}</a>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .not-found-wrap { padding-top: 96px !important; }
        }
      `}</style>
    </main>
  )
}
