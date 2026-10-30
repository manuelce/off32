import Link from 'next/link'
import ProjectStart from '@/components/ProjectStart'
import { BreadcrumbJsonLd } from '@/components/ServiceJsonLd'
import {
  servicePath,
  servicesByArea,
  type ServiceArea,
} from '@/lib/services'

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'
const RED = '#fe3812'
const PURPLE = '#694aff'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

export default function ServiceHubView({ area }: { area: ServiceArea }) {
  const services = servicesByArea(area.slug)
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servizi', href: '/servizi' },
    { label: area.shortLabel },
  ]
  const titleLines = area.shortLabel.includes(' & ')
    ? area.shortLabel.split(' & ')
    : [area.shortLabel]
  const INK = '#141414'
  const isStyledHub =
    area.slug === 'brand-creative' || area.slug === 'web-digital' || area.slug === 'ai-systems'
  const servicesAccent = isStyledHub ? '#293cf4' : RED
  const isBrandHub = area.slug === 'brand-creative'
  const heroInk = isStyledHub ? '#ffffff' : INK
  const titleLine = '1px solid ' + heroInk

  return (
    <main style={{ background: CREAM, color: '#0D0D0D', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <BreadcrumbJsonLd items={crumbs} />

      <header style={{ background: servicesAccent, color: heroInk }}>
        <div style={{ padding: '14px 5%', ...meta, color: heroInk, borderTop: titleLine }}>
          Servizi / {area.shortLabel}
        </div>
        <h1 style={{ margin: 0 }}>
          {titleLines.map((line, i) => (
            <span
              key={line}
              style={{
                display: 'block',
                textAlign: i % 2 === 0 ? 'right' : 'left',
                borderTop: titleLine,
                borderBottom: i === titleLines.length - 1 ? titleLine : undefined,
                padding: '18px 40px 22px',
                fontFamily: "'Canela', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(72px, 12vw, 168px)',
                lineHeight: 0.88,
                letterSpacing: '-3px',
                color: heroInk,
              }}
            >
              {line}
            </span>
          ))}
        </h1>
      </header>

      {area.slug === 'brand-creative' ? (
        <div style={{ width: '100%', lineHeight: 0 }}>
          {/* SVG vettoriale = stesso ritaglio del JPG, nitido a qualsiasi width */}
          <img
            src="/servizi/brand-creative-banner.svg"
            alt=""
            width={2400}
            height={800}
            decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      ) : null}

      <div style={{ padding: '56px 5%', maxWidth: 920 }}>
        {area.sections.map(section => (
          <section key={section.heading}>
            {section.body.map(paragraph => (
              <p
                key={paragraph.slice(0, 40)}
                style={{ fontSize: 16, lineHeight: 1.75, color: '#3a3a3a', margin: '0 0 18px', maxWidth: '68ch' }}
              >
                {paragraph
                  .split(/(brand identity|Brand Strategy|Creative Direction|Copywriting|Content Creation)/g)
                  .map((part, i) =>
                    /^(brand identity|Brand Strategy|Creative Direction|Copywriting|Content Creation)$/i.test(
                      part,
                    ) ? (
                      <strong key={i} style={{ fontWeight: 700, color: INK }}>
                        {part}
                      </strong>
                    ) : (
                      part
                    ),
                  )}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section style={{ padding: '56px 5%' }} aria-labelledby="hub-services">
        <div style={{ ...meta, marginBottom: 12, color: isStyledHub ? INK : RED }}>In quest’area</div>
        <h2
          id="hub-services"
          style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-1px',
            margin: '0 0 28px',
            color: isStyledHub ? INK : undefined,
          }}
        >
          Entriamo nel dettaglio di ogni servizio
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {services.map(service => (
            <Link
              key={service.slug}
              href={servicePath(service)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: '22px 18px',
                border: LINE,
                background: '#fff',
                boxShadow: `4px 4px 0 ${isStyledHub ? servicesAccent : PURPLE}`,
                textDecoration: 'none',
                color: INK,
              }}
            >
              <span style={{ ...meta, color: INK }}>{service.keyword}</span>
              <strong
                style={{
                  fontFamily: "'Canela', Georgia, serif",
                  fontWeight: 300,
                  fontSize: 26,
                  letterSpacing: '-0.5px',
                  color: INK,
                }}
              >
                {service.label}
              </strong>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: isStyledHub ? INK : '#3a3a3a' }}>{service.description}</span>
              <span
                style={{
                  display: 'block',
                  width: '100%',
                  boxSizing: 'border-box',
                  marginTop: 'auto',
                  border: LINE,
                  color: INK,
                  fontSize: 12,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  paddingTop: 12,
                  paddingRight: 18,
                  paddingBottom: 12,
                  paddingLeft: 18,
                  background: 'transparent',
                  boxShadow: `3px 3px 0 ${isStyledHub ? servicesAccent : PURPLE}`,
                }}
              >
                Scopri
              </span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 28, fontSize: 14 }}>
          <Link href="/servizi" style={{ color: '#0D0D0D' }}>
            ← Tutti i servizi OFF32
          </Link>
        </p>
      </section>

      <ProjectStart />

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '22px 28px',
          borderTop: LINE,
          borderBottom: LINE,
        }}
      >
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <Link key={link.label} href={link.href} style={{ ...meta, textDecoration: 'none', color: '#0D0D0D' }}>
              {link.label}
            </Link>
          ))}
        </div>
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>
    </main>
  )
}
