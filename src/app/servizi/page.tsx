import type { Metadata } from 'next'
import Link from 'next/link'
import ProjectStart from '@/components/ProjectStart'
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb'
import { BreadcrumbJsonLd } from '@/components/ServiceJsonLd'
import { areaPath, SERVICE_AREAS } from '@/lib/services'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Servizi OFF32: brand, web e AI',
  'Comunicazione digitale potenziata dall’AI: Brand & Creative, Web & Digital e AI Systems in un unico flusso.',
  '/servizi',
)

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'
const PURPLE = '#694aff'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

export default function ServiziIndexPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servizi' },
  ]

  return (
    <main style={{ background: CREAM, color: '#0D0D0D', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceBreadcrumb items={crumbs} />

      <header style={{ padding: '28px 5% 48px', borderBottom: LINE }}>
        <div style={{ ...meta, marginBottom: 14 }}>OFF32</div>
        <h1
          style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '-1.6px',
            lineHeight: 0.98,
            margin: '0 0 16px',
            maxWidth: '12ch',
          }}
        >
          Servizi
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a3a3a', maxWidth: '52ch', margin: 0 }}>
          Tre aree, un solo modo di lavorare: chiarezza di obiettivo, design e tecnica nello stesso flusso, AI dove toglie lavoro ripetitivo.
        </p>
      </header>

      <section style={{ padding: '56px 5%', borderBottom: LINE }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {SERVICE_AREAS.map(area => (
            <Link
              key={area.slug}
              href={areaPath(area)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '28px 22px',
                border: LINE,
                background: '#fff',
                boxShadow: `6px 6px 0 ${PURPLE}`,
                textDecoration: 'none',
                color: '#0D0D0D',
                minHeight: 220,
              }}
            >
              <span style={meta}>{area.keyword}</span>
              <strong
                style={{
                  fontFamily: "'Canela', Georgia, serif",
                  fontWeight: 300,
                  fontSize: 'clamp(28px, 3vw, 36px)',
                  letterSpacing: '-0.8px',
                  lineHeight: 1.05,
                }}
              >
                {area.shortLabel}
              </strong>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a', marginTop: 'auto' }}>
                {area.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ProjectStart />

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          padding: '22px 5%',
          borderTop: LINE,
          borderBottom: LINE,
        }}
      >
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contatti', href: '/contatti' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
          ].map(link => (
            <Link key={link.label} href={link.href} style={{ ...meta, textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>
    </main>
  )
}
