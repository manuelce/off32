import type { CSSProperties } from 'react'

const LINE = '1px solid #0D0D0D'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

export default function ProjectStart() {
  return (
    <section className="project-start" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', borderTop: LINE, background: '#f0ebe0', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <div style={{ padding: '72px 40px' }}>
        <div style={{ ...meta, color: '#fe3812', marginBottom: 16 }}>Inizia un progetto</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, letterSpacing: '-1px', lineHeight: 1.02, margin: 0 }}>Hai un progetto in mente?</h2>
      </div>
      <div style={{ borderLeft: LINE, padding: '72px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 24 }}>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3a3a', maxWidth: 520, margin: 0 }}>Raccontacelo. Trasformiamo idee in comunicazione che funziona davvero.</p>
        <a href="/contatti" style={{ display: 'inline-block', border: LINE, color: '#0D0D0D', textDecoration: 'none', fontSize: 12, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '14px 22px', background: 'transparent', alignSelf: 'flex-start' }}>Scrivici →</a>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .project-start { grid-template-columns: 1fr !important; }
          .project-start > div { border-left: none !important; }
          .project-start > div + div { border-top: 1px solid #0D0D0D; }
        }
      `}</style>
    </section>
  )
}
