import Link from 'next/link'
import BrandProcessDiamond from '@/components/BrandProcessDiamond'
import ProjectStart from '@/components/ProjectStart'
import TechMarquee from '@/components/TechMarquee'
import ServiceBreadcrumb from '@/components/ServiceBreadcrumb'
import ServiceFaqList from '@/components/ServiceFaq'
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from '@/components/ServiceJsonLd'
import { SeoText } from '@/components/SeoText'
import { emphasizeBrandTerms } from '@/lib/emphasize-terms'
import { visualTitleLines } from '@/lib/visual-title'
import {
  areaBySlug,
  areaPath,
  relatedServices,
  servicePath,
  type ServicePage,
} from '@/lib/services'

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'
const RED = '#fe3812'
const BLUE = '#293cf4'
const INK = '#141414'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

export default function ServicePageView({ service }: { service: ServicePage }) {
  const area = areaBySlug(service.area)
  if (!area) return null

  const path = servicePath(service)
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servizi', href: '/servizi' },
    { label: area.shortLabel, href: areaPath(area) },
    { label: service.label },
  ]
  const related = relatedServices(service)
  const isStyledLeaf =
    service.area === 'brand-creative' || service.area === 'web-digital' || service.area === 'ai-systems'
  const heroInk = isStyledLeaf ? '#ffffff' : INK
  const titleLine = `1px solid ${heroInk}`
  const { lines: titleLines, separator: titleSeparator } = visualTitleLines(service.label)
  const accent = isStyledLeaf ? BLUE : '#694aff'
  const columns = service.brandColumns

  return (
    <main style={{ background: CREAM, color: '#0D0D0D', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <ServiceJsonLd service={service} path={path} />
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd faqs={service.faqs} />

      {isStyledLeaf ? (
        <header style={{ background: BLUE, color: heroInk }}>
          <div style={{ padding: '14px 5%', ...meta, color: heroInk, borderTop: titleLine }}>
            Servizi / {area.shortLabel} / {service.label}
          </div>
          <h1 style={{ margin: 0, position: 'relative' }}>
            {titleLines.map((line, i) => (
              <span
                key={`${line}-${i}`}
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
                {i > 0 && titleSeparator ? <SeoText>{titleSeparator}</SeoText> : null}
                {line}
              </span>
            ))}
          </h1>
        </header>
      ) : (
        <>
          <ServiceBreadcrumb items={crumbs} />
          <header style={{ padding: '28px 5% 48px', borderBottom: LINE }}>
            <div style={{ ...meta, marginBottom: 14, color: RED }}>{area.shortLabel}</div>
            <h1
              style={{
                fontFamily: "'Canela', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-1.4px',
                lineHeight: 1.05,
                margin: '0 0 18px',
                maxWidth: '18ch',
              }}
            >
              {service.h1}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a3a3a', maxWidth: '62ch', margin: 0 }}>
              {service.lead}
            </p>
          </header>
        </>
      )}

      {service.slug === 'brand-identity' ? <BrandProcessDiamond /> : null}
      {service.slug === 'web-design-sviluppo' ? <TechMarquee /> : null}

      {isStyledLeaf && columns ? (
        <section
          style={{
            padding: '56px 5%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '36px 48px',
          }}
          className="bi-copy-grid"
        >
          <div>
            {columns.left.map((paragraph, i) => (
              <p
                key={`l-${i}`}
                style={{
                  fontSize: i === 0 ? 17 : 16,
                  lineHeight: i === 0 ? 1.7 : 1.75,
                  color: '#3a3a3a',
                  margin: i < columns.left.length - 1 ? '0 0 18px' : 0,
                }}
              >
                {emphasizeBrandTerms(paragraph)}
              </p>
            ))}
          </div>
          <div>
            {columns.right.map((paragraph, i) => (
              <p
                key={`r-${i}`}
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: '#3a3a3a',
                  margin: i < columns.right.length - 1 ? '0 0 18px' : 0,
                }}
              >
                {emphasizeBrandTerms(paragraph)}
              </p>
            ))}
          </div>
          <style>{`
            @media (max-width: 820px) {
              .bi-copy-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
            }
          `}</style>
        </section>
      ) : null}

      <article
        style={{
          padding: '56px 5%',
          borderBottom: isStyledLeaf ? 'none' : LINE,
          maxWidth: 920,
        }}
      >
        {service.sections.map(section => (
          <section key={section.heading} style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: "'Canela', Georgia, serif",
                fontWeight: 300,
                fontSize: 'clamp(26px, 3vw, 36px)',
                letterSpacing: '-0.8px',
                margin: '0 0 14px',
              }}
            >
              {section.heading}
            </h2>
            {section.body.map(paragraph => (
              <p
                key={paragraph.slice(0, 40)}
                style={{ fontSize: 16, lineHeight: 1.75, color: '#3a3a3a', margin: '0 0 14px', maxWidth: '68ch' }}
              >
                {isStyledLeaf ? emphasizeBrandTerms(paragraph) : paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>

      <section
        style={{
          padding: '56px 5%',
          borderBottom: isStyledLeaf ? 'none' : LINE,
          textAlign: isStyledLeaf ? 'center' : undefined,
        }}
        aria-labelledby="service-faq"
      >
        <div style={{ ...meta, marginBottom: 12 }}>FAQ</div>
        <h2
          id="service-faq"
          style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-1px',
            margin: '0 0 28px',
          }}
        >
          Domande frequenti
        </h2>
        <div
          style={{
            width: '100%',
            maxWidth: 820,
            margin: isStyledLeaf ? '0 auto' : undefined,
            textAlign: 'left',
          }}
        >
          <ServiceFaqList
            faqs={service.faqs}
            fullWidth={isStyledLeaf}
            emphasize={isStyledLeaf}
          />
        </div>
      </section>

      <section
        style={{
          padding: '56px 5%',
          borderBottom: isStyledLeaf ? 'none' : LINE,
        }}
        aria-labelledby="service-links"
      >
        <div style={{ ...meta, marginBottom: 12 }}>Approfondisci</div>
        <h2
          id="service-links"
          style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-1px',
            margin: '0 0 24px',
          }}
        >
          Collegamenti utili
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          <Link href={areaPath(area)} style={{ ...cardLink, boxShadow: `4px 4px 0 ${accent}` }}>
            <span style={meta}>Hub</span>
            <strong>{area.shortLabel}</strong>
          </Link>
          {related.map(item => (
            <Link key={item.slug} href={servicePath(item)} style={{ ...cardLink, boxShadow: `4px 4px 0 ${accent}` }}>
              <span style={meta}>Servizio correlato</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
          <Link href={service.workHref} style={{ ...cardLink, boxShadow: `4px 4px 0 ${accent}` }}>
            <span style={meta}>Progetto</span>
            <strong>{service.workLabel}</strong>
          </Link>
          <Link href={service.blogHref} style={{ ...cardLink, boxShadow: `4px 4px 0 ${accent}` }}>
            <span style={meta}>Blog</span>
            <strong>{service.blogLabel}</strong>
          </Link>
        </div>
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

const cardLink = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
  padding: '18px 16px',
  border: LINE,
  background: '#fff',
  boxShadow: '4px 4px 0 #694aff',
  textDecoration: 'none',
  color: '#0D0D0D',
}
