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
  'Sara Villani è social media manager in OFF32. Si occupa di digital marketing e della gestione dei canali: strategia, piano editoriale, contenuti e lettura dei numeri. È laureata magistrale in Economia e Management all’Università degli Studi Internazionali di Roma, con un focus sul marketing e sull’export digitale.',
  'Sta frequentando il Master in Digital Marketing, Comunicazione e Social Media Management con Uninform Group. È il percorso con cui approfondisce la progettazione delle strategie di comunicazione, la gestione dei social e l’analisi dei dati, per ottimizzare quello che un canale produce davvero.',
  'In V.B. Digital è digital marketing e social media manager. Segue Instagram, Facebook e LinkedIn: costruisce e pianifica il piano editoriale, produce video, Reel, foto e copy, monta i contenuti, gestisce le campagne pubblicitarie, l’email marketing e le automazioni. Poi legge i dati e corregge la strategia.',
  'Lo stesso ruolo lo ricopre in Tampieri & Partners e in Adventura. Il lavoro parte dall’ideazione e arriva alla pubblicazione, con i contenuti ottimizzati per ogni piattaforma. Le campagne su Meta e LinkedIn sono orientate alla lead generation e alle performance. C’è anche un supporto all’e-commerce: contenuti, comunicazione ed esperienza digitale, con l’obiettivo di far crescere le vendite.',
  'Nel 2025 ha conseguito la certificazione HubSpot Social Media Marketing e la certificazione Google Analytics di Skillshop. Sono due strumenti dello stesso mestiere: da una parte la strategia e i contenuti, dall’altra il modo in cui le persone si muovono e quello che i numeri permettono di decidere.',
  'In OFF32 questo è il social. La precisione sta nel piano, la creatività nel contenuto, l’orientamento al risultato nella misura. Un brand cresce se la voce resta riconoscibile e se, periodo dopo periodo, si sa che cosa ha funzionato.',
]

export default function SaraVillaniPage() {
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
            Sara Villani
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
            Social Media Manager
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
            <a href="https://www.linkedin.com/in/saravillanii/" target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
        <div className="profile-photo">
          <img src="/team/team-04.jpg?v=5" alt="Sara Villani" />
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
