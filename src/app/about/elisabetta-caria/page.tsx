'use client'
import type { CSSProperties } from 'react'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const paragraphs = [
  'Elisabetta Carìa è web designer e UX/UI designer in OFF32. Si occupa di siti web ed e-commerce: mette insieme obiettivi di business, esperienza utente e comunicazione visiva, per soluzioni digitali funzionali e coerenti con l’identità del brand.',
  'Il lavoro parte dall’analisi. Progetto, pubblico, competitor. Prima dell’aspetto visivo arriva la struttura: contenuti, priorità, percorsi di navigazione. L’interfaccia deve rendere semplici le azioni che contano. Da lì nascono wireframe, prototipi e le schermate finali.',
  'Progetta in Figma. Realizza su WordPress ed Elementor, con esperienza anche su WooCommerce. Accanto all’UX/UI c’è il visual design: gerarchia, tipografia, colori e immagini. L’obiettivo è un’esperienza riconoscibile, non solo una pagina ordinata.',
  'Per lei il design non è solo estetica. È un processo che tiene insieme forma, funzione e comunicazione. Ogni scelta ha uno scopo: rendere un contenuto più chiaro, un percorso più intuitivo, un’identità più leggibile. È in questo equilibrio che un progetto digitale tiene.',
  'In OFF32 questo è il design dei siti e dei prodotti digitali. Dalla struttura all’interfaccia, fino a ciò che il brand deve fare per farsi capire online.',
]

export default function ElisabettaCariaPage() {
  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <div className="profile-back" style={{ padding: '28px 40px 0' }}>
        <a href="/about" style={{ ...meta, textDecoration: 'none' }}>← About</a>
      </div>

      <section className="profile-grid">
        <div className="profile-copy">
          <h1 style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(48px, 5.2vw, 76px)',
            lineHeight: 0.95,
            letterSpacing: '-1.6px',
            margin: '18px 0 0',
          }}>
            Elisabetta Carìa
          </h1>
          <p style={{
            fontFamily: "'Canela', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 3.4vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.8px',
            color: '#9a9a9a',
            margin: '8px 0 0',
          }}>
            Web Designer &amp; UX/UI Designer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
            <a href="https://elisabettacaria.it/" target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>Portfolio</a>
            <a href="https://www.instagram.com/elisabettacaria_uiux/" target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>Instagram</a>
            <a href="https://www.linkedin.com/in/elisabetta-car%C3%ACa-3b8bba111/" target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
        <div className="profile-photo">
          <img src="/team/team-07.jpg" alt="Elisabetta Carìa" />
        </div>
        <div className="profile-body">
          {paragraphs.map(text => (
            <p key={text.slice(0, 24)} style={{ fontSize: 16, lineHeight: 1.75, margin: '0 0 22px' }}>{text}</p>
          ))}
        </div>
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
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
          column-gap: 56px;
          row-gap: 36px;
          align-items: start;
          padding: 8px 40px 80px;
        }
        .profile-copy { grid-column: 1; grid-row: 1; }
        .profile-body { grid-column: 1; grid-row: 2; }
        .profile-photo {
          grid-column: 2;
          grid-row: 1 / span 2;
          position: sticky;
          top: 88px;
        }
        .profile-photo img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center 18%;
          display: block;
        }
        @media (max-width: 1024px) {
          .profile-back { padding-top: 96px !important; }
          .profile-grid { grid-template-columns: 1fr; row-gap: 28px; padding: 8px 20px 72px; }
          .profile-copy, .profile-photo, .profile-body { grid-column: 1; grid-row: auto; }
          .profile-photo { position: static; }
          .profile-photo img { max-height: 72vh; }
        }
      `}</style>
    </main>
  )
}
