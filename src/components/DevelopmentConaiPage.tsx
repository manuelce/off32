'use client'

import ProjectStart from '@/components/ProjectStart'
import { developmentconai } from '@/lib/developmentconai'

const INK = '#0D0D0D'
const CREAM = '#F0EBE0'

export default function DevelopmentConaiPage() {
  const sections = developmentconai.sections.filter(section => section.confirmed && section.title)
  const showHeroCopy = developmentconai.hero.confirmed && Boolean(developmentconai.hero.subtitle)

  return (
    <main
      className="dca-page"
      style={{
        background: CREAM,
        color: INK,
        minHeight: '100vh',
        fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      }}
    >
      <section className="dca-hero">
        <div className="dca-kicker">{`// ${developmentconai.displayName} · off32`}</div>
        <h1>{developmentconai.displayName}</h1>
        {showHeroCopy ? <p className="dca-lead">{developmentconai.hero.subtitle}</p> : null}
      </section>

      {sections.map(section => (
        <section key={section.id} className="dca-section" aria-labelledby={`dca-${section.id}`}>
          <h2 id={`dca-${section.id}`}>{section.title}</h2>
          {section.body ? <p>{section.body}</p> : null}
        </section>
      ))}

      <ProjectStart />

      <footer className="dca-footer">
        <div className="dca-footer-links">
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>
        <span>connect@off32.it · © 2025 OFF32</span>
      </footer>

      <style>{`
        .dca-kicker {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .dca-hero {
          padding: 96px 5% 72px;
          border-bottom: 1px solid ${INK};
        }
        .dca-hero h1 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(42px, 9vw, 88px);
          letter-spacing: -2px;
          line-height: 0.95;
          margin: 0;
        }
        .dca-lead {
          margin: 20px 0 0;
          font-size: 16px;
          line-height: 1.65;
          max-width: 48ch;
          color: #3a3a3a;
        }
        .dca-section {
          padding: 64px 5%;
          border-bottom: 1px solid ${INK};
        }
        .dca-section h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(28px, 4vw, 44px);
          letter-spacing: -1px;
          margin: 0 0 14px;
        }
        .dca-section p {
          margin: 0;
          font-size: 15px;
          line-height: 1.65;
          color: #3a3a3a;
          max-width: 56ch;
        }
        .dca-footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 22px 28px;
          border-top: 1px solid ${INK};
          border-bottom: 1px solid ${INK};
        }
        .dca-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .dca-footer a, .dca-footer span {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
        }
        @media (min-width: 960px) {
          .dca-hero { padding-top: 120px; }
        }
      `}</style>
    </main>
  )
}
