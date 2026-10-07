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
  'Lorenzo Salvatori è full stack developer in OFF32. Il suo lavoro sta nel web: progetta siti, costruisce automazioni di marketing e usa l’intelligenza artificiale come strumento per facilitare il processo, non per sostituirlo. Vive e lavora a Macerata, nelle Marche.',
  'Dal 2023 è growth marketer, web designer e content creator in Atteggiamento Digitale, società benefit e agenzia di crescita, a Pollenza. Lì implementa la marketing automation, crea contenuti video e realizza siti web. Sono tre parti dello stesso incarico: il sito, ciò che lo alimenta, e il sistema che tiene i contatti in movimento.',
  'Dal 2022 collabora come growth marketer con Atelier Michele Schiavoni architetti, in provincia di Macerata. Per lo studio ha realizzato il sito, implementato il CRM e seguito l’ottimizzazione SEO, tecnica e semantica. Il progetto non si chiude quando la pagina è online: continua nel modo in cui viene trovata e nel modo in cui lo studio tiene le relazioni.',
  'È questo il filo. Un sito, da solo, non basta. Serve la struttura che lo fa trovare, il sistema che organizza i contatti, i contenuti che lo tengono vivo. Web, SEO, CRM e automazione, nel suo modo di lavorare, stanno nello stesso progetto e si correggono a vicenda.',
  'In OFF32 questo diventa sviluppo. I siti e i prodotti digitali li segue per intero, dalla realizzazione alla parte che deve continuare a funzionare. L’intelligenza artificiale entra dove serve a sbloccare un passaggio: una bozza, una variante, un controllo. La direzione resta di chi costruisce.',
]

export default function LorenzoSalvatoriPage() {
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
            Lorenzo Salvatori
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
            Full Stack Developer
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
            <a href="https://www.linkedin.com/in/lorenzo-salvatori-094bab12b/" target="_blank" rel="noreferrer" style={{ ...meta, textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
        <div className="profile-photo">
          <img src="/team/team-03.jpg" alt="Lorenzo Salvatori" />
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
