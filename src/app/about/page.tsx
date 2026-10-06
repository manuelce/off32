'use client'
import type { CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'

const LINE = '1px solid #0D0D0D'

type Social = 'web' | 'instagram' | 'behance' | 'linkedin'

const team: {
  src: string
  name: string
  role: string
  tone?: boolean
  links: { kind: Social; href: string; label: string }[]
  href?: string
}[] = [
  {
    src: '/team/team-01.jpg',
    name: 'Manuel Cerasuolo',
    role: 'Project Manager',
    tone: true,
    links: [
      { kind: 'web', href: 'https://www.manuelcerasuolo.com/', label: 'Sito' },
      { kind: 'instagram', href: 'https://www.instagram.com/off32channel/', label: 'Instagram' },
    ],
    href: '/about/manuel-cerasuolo',
  },
  {
    src: '/team/team-02.jpg?v=2',
    name: 'Sara Zeppieri',
    role: 'Graphic Designer',
    tone: true,
    links: [
      { kind: 'instagram', href: 'https://www.instagram.com/sz.visuals_/', label: 'Instagram' },
      { kind: 'behance', href: 'https://www.behance.net/sarazeppieri', label: 'Behance' },
    ],
    href: '/about/sara-zeppieri',
  },
  {
    src: '/team/team-03.jpg',
    name: 'Lorenzo Salvatori',
    role: 'Full Stack Developer',
    tone: true,
    links: [
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/lorenzo-salvatori-094bab12b/', label: 'LinkedIn' },
    ],
    href: '/about/lorenzo-salvatori',
  },
  {
    src: '/team/team-04.jpg?v=5',
    name: 'Sara Villani',
    role: 'Social Media Manager',
    tone: true,
    links: [
      { kind: 'linkedin', href: 'https://www.linkedin.com/in/saravillanii/', label: 'LinkedIn' },
    ],
    href: '/about/sara-villani',
  },
]

function SocialIcon({ kind }: { kind: Social }) {
  const box = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true as const }
  if (kind === 'instagram') {
    return (
      <svg {...box} fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (kind === 'behance') {
    return (
      <svg {...box} fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    )
  }
  if (kind === 'linkedin') {
    return (
      <svg {...box} fill="currentColor">
        <path d="M4.7 3.4a2.2 2.2 0 1 0 .02 4.4 2.2 2.2 0 0 0-.02-4.4zM3 9h3.4v12H3V9zm6.2 0h3.3v1.6h.05c.46-.87 1.58-1.8 3.25-1.8 3.48 0 4.12 2.29 4.12 5.27V21h-3.4v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2.01 1.36-2.01 2.76V21H9.2V9z" />
      </svg>
    )
  }
  return (
    <svg {...box} fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.7 3.6 5.7 3.6 9s-1.2 6.3-3.6 9c-2.4-2.7-3.6-5.7-3.6-9s1.2-6.3 3.6-9z" />
    </svg>
  )
}

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const title: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(72px, 12vw, 168px)',
  lineHeight: 0.88,
  letterSpacing: '-3px',
  color: '#0D0D0D',
}

export default function AboutPage() {
  return (
    <main style={{ background: '#f0ebe0', minHeight: '100vh', color: '#0D0D0D', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <Navbar />

      <h1 className="about-title" style={{ margin: 0 }}>
        <span style={{ ...title, display: 'block', textAlign: 'right', borderTop: LINE, borderBottom: LINE, padding: '18px 40px 22px' }}>
          il nostro
        </span>
        <span style={{ ...title, display: 'block', textAlign: 'left', borderBottom: LINE, padding: '18px 40px 22px' }}>
          team
        </span>
      </h1>

      <section className="about-lead">
        <p>OFF32 è un&apos;agenzia di comunicazione digitale, multidisciplinare e indipendente.</p>
        <p>
          Il nostro lavoro comprende grafica e identità, strategia e posizionamento, siti ed esperienze digitali, comunicazione e campagne.
          Lavoriamo in team o in autonomia.
        </p>
        <p>
          La struttura è diretta. Chi fa il lavoro è anche il riferimento per ogni cliente.
          Per noi un buon progetto non nasce senza passione, intelligenza e, soprattutto, un impegno personale.
        </p>
      </section>

      <section style={{ paddingTop: 72, paddingBottom: '15%' }}>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, width: '80%', margin: '0 auto' }}>
          {team.map(person => (
            <article key={person.src} style={{ border: LINE, background: '#f0ebe0' }}>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', borderBottom: LINE }}>
                {person.href ? (
                  <a href={person.href} style={{ display: 'block', height: '100%' }}>
                    <img className={person.tone ? 'team-photo' : undefined} src={person.src} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
                  </a>
                ) : (
                  <img className={person.tone ? 'team-photo' : undefined} src={person.src} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
                )}
              </div>
              <div style={{ padding: '16px 16px 18px' }}>
                {person.href ? (
                  <a href={person.href} style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, color: 'inherit', textDecoration: 'none' }}>{person.name}</a>
                ) : (
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{person.name}</div>
                )}
                <div style={{ marginTop: 4, fontSize: 14, color: '#3a3a3a' }}>{person.role}</div>
                <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
                  {person.links.map(link => (
                    <a key={link.kind} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label} style={{ color: '#0D0D0D', display: 'inline-flex' }}>
                      <SocialIcon kind={link.kind} />
                    </a>
                  ))}
                </div>
              </div>
            </article>
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
        .team-photo { filter: grayscale(1); transition: filter 0.45s ease; }
        article:hover .team-photo { filter: grayscale(0); }
        .about-lead { width: 80%; margin: 56px auto 0; }
        .about-lead p { width: 100%; margin: 0 0 18px; font-size: 17px; line-height: 1.65; color: #0D0D0D; }
        .about-lead p:last-child { margin-bottom: 0; }
        @media (max-width: 860px) {
          .about-title { padding-top: 64px; }
          .about-lead { margin-top: 40px; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
