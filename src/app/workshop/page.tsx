'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Navbar from '@/components/Navbar'
import ProjectStart from '@/components/ProjectStart'
import { workshops, type Workshop } from '@/lib/workshops'

const PURPLE = '#694aff'
const CREAM = '#F0EBE0'
const LINE = `1px solid ${CREAM}`
const PHONE = '+39 375 563 9110'
const PHONE_TEL = '+393755639110'

const FILTERS = ['All', 'Workshop', 'Corsi', 'Talk']

const posters: Record<string, { bg: string; fg: string; image?: string; focus?: string }> = {
  'brand-identity-ai': { bg: '#0D0D0D', fg: '#F0EBE0', image: '/events/brand.jpg', focus: 'center 42%' },
  'design-system': { bg: '#F0EBE0', fg: '#F0EBE0', image: '/events/design.jpg', focus: 'center center' },
  'campagne-ai': { bg: '#fe3812', fg: '#F0EBE0', image: '/events/campaign.jpg', focus: 'center 45%' },
  'comunicazione-performance': { bg: '#694aff', fg: '#F0EBE0', image: '/events/talk.jpg', focus: '68% center' },
}

const title: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(72px, 12vw, 168px)',
  lineHeight: 0.88,
  letterSpacing: '-3px',
  color: CREAM,
}

function EventFlyer({ workshop }: { workshop: Workshop }) {
  const poster = posters[workshop.slug]
  return (
    <div className="event-flyer" style={{ background: poster.bg, color: poster.fg }}>
      <div className="event-flyer-title">{workshop.title}</div>
      <div className="event-flyer-photo">
        {poster.image ? (
          <img src={poster.image} alt="" style={{ objectPosition: poster.focus }} />
        ) : (
          <div className="event-flyer-fallback" style={{ background: poster.fg, color: poster.bg }}>{workshop.index}</div>
        )}
        <span className="event-flyer-side" style={{ color: poster.image ? CREAM : poster.bg }}>Events</span>
        <span className="event-flyer-bar" />
      </div>
    </div>
  )
}

export default function WorkshopPage() {
  const [filter, setFilter] = useState('All')
  const [underlineOn, setUnderlineOn] = useState(false)
  const [selected, setSelected] = useState<Workshop | null>(null)
  const underlinePlayed = useRef(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const visible = workshops.filter(workshop => filter === 'All' || workshop.kind === filter)

  useEffect(() => {
    if (underlinePlayed.current) return
    underlinePlayed.current = true
    requestAnimationFrame(() => setUnderlineOn(true))
  }, [])

  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [selected])

  return (
    <main style={{ background: '#F0EBE0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
      <Navbar />

      <h1 className="workshop-title" style={{ margin: 0, background: PURPLE }}>
        {['Cultura.', 'Inclusione.', 'Formazione.'].map((line, i) => (
          <span key={line} style={{ ...title, display: 'block', textAlign: i % 2 === 0 ? 'right' : 'left', borderTop: i === 0 ? LINE : undefined, borderBottom: LINE, padding: '18px 40px 22px' }}>
            {line}
          </span>
        ))}
      </h1>

      <div className="info-bar" style={{ background: '#0D0D0D', padding: '16px 5%', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        {[
          ['Da 2 ore', 'a una giornata'],
          ['Materiali', 'inclusi'],
          ['Date', 'concordate'],
        ].map(([strong, rest]) => (
          <span key={strong} style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#666', textTransform: 'uppercase' }}>
            <strong style={{ color: '#fff', fontWeight: 600 }}>{strong}</strong> {rest}
          </span>
        ))}
      </div>

      <section id="programma" style={{ padding: '64px 5% 80px' }}>
        <div className="events-head">
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 12 }}>// events · off32</div>
            <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(52px, 7vw, 88px)', letterSpacing: '-2px', lineHeight: 0.95, margin: '0 0 16px' }}>
              <span className="street-word">
                Events
                <span aria-hidden="true" className={underlineOn ? 'events-underline is-on' : 'events-underline'} />
              </span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#3a3a3a', maxWidth: 560, margin: 0 }}>
              Prossimi eventi, workshop, talk sia gratuiti che a pagamento, Prenota il tuo biglietto online.
            </p>
            <div className="event-filters" role="tablist" aria-label="Filtra le sessioni">
              {FILTERS.map(item => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={filter === item}
                  className={filter === item ? 'event-filter is-on' : 'event-filter'}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="events-grid">
          {visible.map(workshop => {
            const poster = posters[workshop.slug]
            return (
              <article key={workshop.slug} id={workshop.slug} className="event-card">
                <div className="event-poster" style={{ background: poster.bg, color: poster.fg }}>
                  {poster.image && (
                    <img src={poster.image} alt="" className="event-poster-img" style={{ objectPosition: poster.focus }} />
                  )}
                  <span style={{ fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 2.4vw, 36px)', letterSpacing: '-1px', lineHeight: 0.95, textTransform: 'uppercase' }}>{workshop.kind}</span>
                </div>
                <div className="event-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700 }}>
                    <span>{workshop.kind}</span>
                    <span>{workshop.duration}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 28, letterSpacing: '-0.4px', lineHeight: 1.1, margin: '12px 0' }}>{workshop.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#3a3a3a', margin: '0 0 16px' }}>{workshop.desc}</p>
                  <div style={{ borderTop: '1px solid #0D0D0D', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                    <span>Durata · {workshop.duration}</span>
                    <span>Formato · {workshop.format}</span>
                    <span>Per · {workshop.audience}</span>
                  </div>
                  <div className="event-foot">
                    <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px' }}>Su richiesta</span>
                    <button type="button" className="event-buy" onClick={() => setSelected(workshop)}>Prenota</button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        {visible.length === 0 && (
          <p style={{ marginTop: 28, fontSize: 15 }}>Nessuna sessione in questa categoria.</p>
        )}
      </section>

      {selected && (
        <div className="event-modal" onClick={() => setSelected(null)}>
          <div
            className="event-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-dialog-title"
            onClick={event => event.stopPropagation()}
          >
            <EventFlyer workshop={selected} />
            <div className="event-dialog-copy">
              <button ref={closeRef} type="button" className="event-dialog-close" aria-label="Chiudi" onClick={() => setSelected(null)}>×</button>
              <h2 id="event-dialog-title">{selected.title}</h2>
              <p>{selected.desc}</p>
              {selected.outcomes.map(outcome => (
                <p key={outcome}>{outcome}</p>
              ))}
              <div className="event-hours-label">Orari</div>
              <div className="event-hours-box">
                <strong>Su richiesta · {selected.audience}</strong>
              </div>
              <div className="event-contact-box">
                <div>Contatto</div>
                <p>
                  Telefono / <a href="https://wa.me/393755639110" target="_blank" rel="noreferrer">WhatsApp</a>:{' '}
                  <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProjectStart />

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '22px 28px', borderTop: '1px solid #0D0D0D', borderBottom: '1px solid #0D0D0D' }}>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#0D0D0D', textDecoration: 'none' }}>{link.label}</a>
          ))}
        </div>
        <span style={{ fontSize: 11, letterSpacing: '1.8px', textTransform: 'uppercase', color: '#0D0D0D' }}>connect@off32.it · © 2025 OFF32</span>
      </footer>

      <style>{`
        .street-word { position: relative; display: inline-block; }
        .events-underline {
          position: absolute;
          left: -1%;
          bottom: 0.02em;
          width: 104%;
          height: 0.22em;
          background: #694aff;
          -webkit-mask: url(/underline-street.png) center / 100% 100% no-repeat;
          mask: url(/underline-street.png) center / 100% 100% no-repeat;
          pointer-events: none;
          clip-path: inset(0 100% 0 0);
        }
        .events-underline.is-on { animation: street-draw 0.7s linear 1 forwards; }
        @keyframes street-draw {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .events-underline { animation: none; clip-path: none; }
        }
        .events-head { display: block; }
        .event-filters { display: flex; flex-wrap: nowrap; gap: 8px; justify-content: flex-start; margin-top: 22px; }
        .event-filter {
          border: 1px solid #0D0D0D;
          background: transparent;
          color: #0D0D0D;
          padding: 8px 12px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
        }
        .event-filter.is-on { background: #694aff; border-color: #694aff; color: #fff; }
        .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 40px; }
        .event-card { background: #fff; border: 1px solid #0D0D0D; box-shadow: 7px 7px 0 #0D0D0D; display: flex; flex-direction: column; min-width: 0; }
        .event-poster { position: relative; overflow: hidden; height: 210px; padding: 18px; display: flex; flex-direction: column; justify-content: flex-end; border-bottom: 1px solid #0D0D0D; }
        .event-poster-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .event-poster:has(.event-poster-img)::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(13, 13, 13, 0.5) 0%, rgba(13, 13, 13, 0.15) 42%, rgba(13, 13, 13, 0.68) 100%);
          z-index: 1;
        }
        .event-poster > span { position: relative; z-index: 2; }
        .event-body { padding: 18px 18px 16px; display: flex; flex-direction: column; flex: 1; }
        .event-foot { margin-top: auto; padding-top: 18px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .event-buy {
          background: #0D0D0D;
          color: #F0EBE0;
          border: 1px solid #0D0D0D;
          box-shadow: 3px 3px 0 #fe3812;
          text-decoration: none;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 10px 14px;
          cursor: pointer;
        }
        .event-modal {
          position: fixed;
          inset: 0;
          z-index: 400;
          background: rgba(13, 13, 13, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 16px;
        }
        .event-dialog {
          width: min(980px, 100%);
          height: min(820px, calc(100vh - 56px));
          display: grid;
          grid-template-columns: 0.86fr 1.14fr;
          grid-template-rows: minmax(0, 1fr);
          background: #F0EBE0;
          color: #0D0D0D;
          overflow: hidden;
        }
        .event-flyer {
          min-height: 0;
          display: flex;
          flex-direction: column;
          padding: 22px 18px 16px;
          overflow: hidden;
        }
        .event-flyer-title {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-weight: 800;
          font-size: clamp(26px, 2.6vw, 40px);
          letter-spacing: -1px;
          line-height: 0.88;
          text-transform: uppercase;
        }
        .event-flyer-photo { position: relative; flex: 1; min-height: 180px; margin-top: 16px; overflow: hidden; }
        .event-flyer-photo img, .event-flyer-fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .event-flyer-fallback { display: flex; align-items: flex-end; justify-content: flex-end; padding: 16px; font-weight: 800; font-size: 64px; letter-spacing: -2px; }
        .event-flyer-side {
          position: absolute;
          left: 10px;
          top: 50%;
          z-index: 2;
          writing-mode: vertical-rl;
          transform: translateY(-50%) rotate(180deg);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }
        .event-flyer-bar { position: absolute; left: 0; top: 16px; width: 34%; height: 10px; background: #fe3812; z-index: 1; }
        .event-dialog-copy { position: relative; min-height: 0; overflow: auto; padding: 36px 34px 32px; }
        .event-dialog-close {
          position: absolute;
          top: 14px;
          right: 16px;
          border: 0;
          background: transparent;
          color: #0D0D0D;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          padding: 0 4px;
        }
        .event-dialog-copy h2 {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 3vw, 40px);
          letter-spacing: -0.8px;
          line-height: 0.95;
          text-transform: uppercase;
          margin: 0 36px 18px 0;
        }
        .event-dialog-copy p { font-size: 14px; line-height: 1.55; margin: 0 0 14px; }
        .event-hours-label {
          background: #0D0D0D;
          color: #F0EBE0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 8px 12px;
          margin-top: 8px;
        }
        .event-hours-box {
          border: 1px solid #0D0D0D;
          border-top: 0;
          padding: 14px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .event-hours-box strong { font-size: 13px; letter-spacing: 0.4px; text-transform: uppercase; }
        .event-hours-box span { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; }
        .event-contact-box { border: 1px solid #0D0D0D; margin-top: 14px; padding: 14px 12px 16px; }
        .event-contact-box div { font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .event-contact-box p { margin: 0; color: #fe3812; font-weight: 700; }
        .event-contact-box a { color: #fe3812; }
        @media (max-width: 860px) {
          .workshop-title { padding-top: 64px; }
          .event-filters { flex-wrap: wrap; }
          .events-grid { grid-template-columns: 1fr; }
          .event-modal { z-index: 10001; padding: 0; align-items: stretch; }
          .event-dialog {
            position: relative;
            width: 100%;
            height: 100%;
            display: block;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          .event-flyer {
            min-height: 0;
            height: auto;
            padding: 0;
            display: block;
            overflow: visible;
          }
          .event-flyer-title { display: none; }
          .event-flyer-photo {
            width: 100%;
            height: auto;
            aspect-ratio: 3 / 4;
            margin: 0;
            flex: none;
          }
          .event-dialog-copy {
            position: static;
            overflow: visible;
            height: auto;
            padding: 28px 22px 64px;
          }
          .event-dialog-close {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 2;
            width: 36px;
            height: 36px;
            background: #F0EBE0;
            border: 1px solid #0D0D0D;
            line-height: 32px;
          }
        }
      `}</style>
    </main>
  )
}
