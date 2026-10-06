'use client'
import type { CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const paragraphs = [
  'Manuel Cerasuolo è digital project manager. In OFF32 coordina progetti web, e-commerce e digital product dall’idea al delivery. Da oltre dieci anni costruisce prodotti digitali tra design, sviluppo ed e-commerce, e li segue in un unico flusso: dalla direzione al rilascio.',
  'Il suo lavoro è tenere insieme le parti. Design, sviluppo e contenuto restano allineati fino alla consegna. Non è un passaggio di mano tra reparti: è un coordinamento continuo, così il progetto non si perde tra una fase e l’altra e arriva intero.',
  'Sul design lavora su interfacce, brand e prototipi, dal sistema visivo al dettaglio: UI/UX, identità, design system. Sullo sviluppo entra nel full-stack — JavaScript, React, Next.js, Python — con CMS, animazioni e interazioni su misura. Il flusso è assistito dall’intelligenza artificiale, che accelera il lavoro senza sostituire la direzione.',
  'Prima di costruire, decide. Le sessioni di consulenza servono a questo: strategia, processi, direzione. È il momento in cui si capisce cosa vale la pena fare, e in quanto tempo, prima di aprire un file. La chiarezza viene prima della produzione.',
  'Tra i progetti, Healing Earth Italia: uno Shopify custom pensato per migliorare l’esperienza d’acquisto e la struttura del brand. Conil Food Tour, un lavoro che doveva raccontare l’identità di un tour operator in modo autentico e funzionale. Henge, un progetto web per un brand di design, con attenzione all’esperienza, al posizionamento e alla qualità esecutiva.',
  'Accanto ai progetti c’è la formazione. Spiega WordPress, HTML, JavaScript e sviluppo web a chi parte da zero o vuole andare più a fondo, con un metodo che tiene insieme pratica e teoria. È lo stesso modo di lavorare che usa con i clienti: chiaro, concreto, e senza promettere un risultato che il progetto non può tenere.',
]

export default function ManuelCerasuoloPage() {
  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <Navbar />

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
            Manuel Cerasuolo
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
            Digital Project Manager
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
            {[
              { label: 'Sito', href: 'https://www.manuelcerasuolo.com/' },
              { label: 'Instagram', href: 'https://www.instagram.com/off32channel/' },
              { label: 'Email', href: 'mailto:info@manuelcerasuolo.com' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
        </div>
        <div className="profile-photo">
          <img src="/team/team-01.jpg" alt="Manuel Cerasuolo" />
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
        <span style={meta}>connect@off32.it · © 2025 OFF32</span>
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
