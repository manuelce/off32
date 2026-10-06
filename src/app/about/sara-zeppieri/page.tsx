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
  'Sara Zeppieri è graphic e motion designer. In OFF32 segue l’identità visiva e il movimento: il segno, la grafica, il packaging, i contenuti che devono funzionare anche quando si muovono. Il suo lavoro sta nel passaggio dal digitale al materiale, e nel tenere insieme queste due misure dentro lo stesso progetto.',
  'La forma, per lei, arriva dopo. Prima c’è la ricerca, il concetto, la decisione su cosa il progetto deve essere. Un’identità regge se l’idea che la sostiene è chiara: il resto — carattere, colore, sequenza — è il modo in cui quell’idea diventa visibile. Le interessa il percorso intero, dall’intuizione alla produzione, e il dettaglio con cui un lavoro si tiene quando passa di mano.',
  'Si è formata all’Istituto Europeo di Design di Milano, dove tra il 2022 e il 2025 ha concluso il bachelor in Graphic Design & Motion Design. È lì che grafica e motion sono diventati un unico mestiere: non due competenze affiancate, ma due tempi dello stesso ragionamento. L’immagine ferma e l’immagine che dura qualche secondo chiedono la stessa precisione.',
  'Questo si vede nei progetti che ha portato avanti in proprio. Buona Domenica, il food booklet di tesi, è un oggetto editoriale costruito intorno al cibo. Poi il restyling del packaging Venchi, un packaging per Alice in Wonderland, il poster tipografico Anxiety. Libro, confezione, manifesto: formati diversi, tenuti dalla stessa attenzione per la composizione e per il modo in cui un messaggio occupa la superficie.',
  'Nel percorso ci sono anche collaborazioni fuori dallo studio. Ha lavorato come digital artist per il Radisson Blu GHR Rome e, dal 2026, come graphic designer per Marketways. Ha curato il catalogo della performance Filterless: raw dialogues, un lavoro in cui la grafica organizza un contenuto dal vivo e deve restare leggibile senza perdere il tono.',
  'Lavora volentieri in team, accanto a figure diverse, seguendo il progetto fino alla fine. Gli strumenti sono quelli del mestiere — Illustrator, Photoshop, InDesign, After Effects, Premiere, Figma — insieme all’illustrazione. Li usa per costruire identità, visual, packaging e motion. Quello che cerca è un ambiente in cui sensibilità e tecnica stiano nella stessa persona: curiosa, precisa, e disposta a rifare un passaggio se il segno non tiene.',
]

export default function SaraZeppieriPage() {
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
            Sara Zeppieri
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
            Graphic & Motion Designer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/sz.visuals_/' },
              { label: 'Behance', href: 'https://www.behance.net/sarazeppieri' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sara-zeppieri-23a419349/' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
        </div>
        <div className="profile-photo">
          <img src="/team/team-02.jpg?v=2" alt="Sara Zeppieri" />
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
