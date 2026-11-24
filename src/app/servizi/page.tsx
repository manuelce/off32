import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import ProjectStart from '@/components/ProjectStart'
import SiteFooter from '@/components/SiteFooter'
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb'
import { BreadcrumbJsonLd } from '@/components/ServiceJsonLd'
import { areaPath, SERVICE_AREAS, servicePath, servicesByArea } from '@/lib/services'
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

const BRIDGES = [
  {
    href: '/#analisi',
    label: 'Analisi gratuita',
    title: 'Analisi SEO',
    text: 'Controlla HTTPS, titolo, descrizione e le basi della SEO. È gratuita.',
  },
  {
    href: '/workshop',
    label: 'Formazione',
    title: 'Corsi',
    text: 'Meet-up, seminari, workshop e corsi.',
  },
  {
    href: '/workshop#community',
    label: 'Community',
    title: 'Entra nella community',
    text: 'Uno spazio di confronto. Dove le idee diventano progetti.',
  },
]

export default function ServiziIndexPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servizi' },
  ]
  const aiModules = servicesByArea('ai-systems')

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
          Tre aree. Ognuna parte da un problema e arriva a un risultato: brand, web e un unico sistema AI.
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
          {SERVICE_AREAS.map(area => {
            const cardStyle: CSSProperties = {
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
            }
            const body = (
              <>
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
                <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a' }}>
                  <strong style={{ color: '#0D0D0D' }}>Problema. </strong>
                  {area.problem}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a', marginTop: 'auto' }}>
                  <strong style={{ color: '#0D0D0D' }}>Risultato. </strong>
                  {area.outcome}
                </span>
              </>
            )
            if (area.slug === 'ai-systems') {
              return (
                <article key={area.slug} style={cardStyle}>
                  <Link href={areaPath(area)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                  </Link>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a' }}>
                    <strong style={{ color: '#0D0D0D' }}>Problema. </strong>
                    {area.problem}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a' }}>
                    <strong style={{ color: '#0D0D0D' }}>Risultato. </strong>
                    {area.outcome}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
                    <span style={meta}>Moduli</span>
                    {aiModules.map(service => (
                      <Link key={service.slug} href={servicePath(service)} style={{ fontSize: 14, color: '#0D0D0D' }}>
                        {service.label}
                      </Link>
                    ))}
                  </span>
                </article>
              )
            }
            return (
              <Link key={area.slug} href={areaPath(area)} style={cardStyle}>
                {body}
              </Link>
            )
          })}
        </div>
      </section>

      <section style={{ padding: '0 5% 56px' }}>
        <div style={{ ...meta, marginBottom: 16 }}>Collegamenti</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {BRIDGES.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: '22px 18px',
                border: LINE,
                background: '#fff',
                boxShadow: `6px 6px 0 ${PURPLE}`,
                textDecoration: 'none',
                color: '#0D0D0D',
              }}
            >
              <span style={meta}>{item.label}</span>
              <strong style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 28, letterSpacing: '-0.6px' }}>{item.title}</strong>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: '#3a3a3a' }}>{item.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <ProjectStart />

      <SiteFooter />
    </main>
  )
}
