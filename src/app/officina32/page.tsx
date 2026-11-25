import Image from 'next/image'
import Officina32Program from '@/components/Officina32Program'
import {
  COMMUNITY_BIO_MENTION,
  COMMUNITY_BOARD,
  COMMUNITY_GROUP,
  COMMUNITY_MEMBERS,
  COMMUNITY_MEMBERS_LABEL,
  COMMUNITY_NAME,
  INSTAGRAM_FOLLOWERS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINE,
  INSTAGRAM_URL,
  WHATSAPP_INVITE_URL,
} from '@/lib/community'
import { events } from '@/lib/events'
import { SITE_DESCRIPTION, SITE_URL } from '@/lib/seo'

const CREAM = '#F0EBE0'
const INK = '#0D0D0D'
const RED = '#fe3812'
const PURPLE = '#694aff'
const LIME = '#9fff00'
const PAPER = '#fff'

export default function Officina32Page() {
  const meetup = events.find(event => event.kind === 'meet-up' && event.image)

  const pageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Officina32 · OFF32 community',
    url: `${SITE_URL}/officina32`,
    description: INSTAGRAM_LINE,
    isPartOf: { '@type': 'WebSite', name: 'OFF32', url: SITE_URL },
  }

  return (
    <main className="officina32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />

      <header className="officina32-bar">
        <a href="/" className="officina32-logo" aria-label="OFF32, torna al sito">
          <img src="/off32_cube.png" alt="" width={36} height={36} />
        </a>
        <a className="officina32-back" href="/">Scopri OFF32</a>
      </header>

      <section className="officina32-hero">
        <div className="officina32-hero-copy">
          <p className="officina32-kicker">Community</p>
          <h1>Officina32</h1>
          <p className="officina32-line">{INSTAGRAM_LINE}</p>
          <p className="officina32-members">
            {COMMUNITY_MEMBERS} persone nella community WhatsApp «{COMMUNITY_NAME}».
          </p>
          <a className="officina32-join" href={WHATSAPP_INVITE_URL} target="_blank" rel="noreferrer">
            Entra nella community
          </a>
        </div>
        {meetup?.image ? (
          <figure className="officina32-hero-figure">
            <Image
              src={meetup.image}
              alt={meetup.imageAlt ?? meetup.title}
              fill
              priority
              sizes="(max-width: 900px) 90vw, 42vw"
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
            />
            <span className="officina32-sticker">
              <strong>{COMMUNITY_MEMBERS}</strong>
              persone
            </span>
          </figure>
        ) : null}
      </section>

      <section className="officina32-facts" aria-label="Numeri della community">
        <div>
          <strong>{COMMUNITY_MEMBERS}</strong>
          <span>Community</span>
        </div>
        <div>
          <strong>{INSTAGRAM_FOLLOWERS}</strong>
          <span>Instagram</span>
        </div>
      </section>

      <Officina32Program />

      <section className="officina32-community" aria-labelledby="officina32-manifesto">
        <div className="officina32-community-head">
          <p className="officina32-kicker">Manifesto</p>
          <h2 id="officina32-manifesto">{INSTAGRAM_LINE}</h2>
          <p className="officina32-lead">
            {COMMUNITY_NAME} è la community WhatsApp di OFF32. {COMMUNITY_MEMBERS_LABEL}. Nella bio di Instagram c’è {COMMUNITY_BIO_MENTION}.
          </p>
        </div>
        <div className="officina32-grid">
          <article>
            <p className="officina32-card-kicker">Per chi è</p>
            <h3>Uno spazio per conoscersi</h3>
            <p>Per chi vuole uno spazio di confronto, dove le idee diventano progetti. Il gruppo si chiama «{COMMUNITY_GROUP}».</p>
          </article>
          <article>
            <p className="officina32-card-kicker">Come si entra</p>
            <h3>Instagram e WhatsApp</h3>
            <p>Scrivici su Instagram {INSTAGRAM_HANDLE}. Nella bio trovi {COMMUNITY_BIO_MENTION}. L’invito alla community WhatsApp «{COMMUNITY_NAME}» è qui sotto.</p>
            <div className="officina32-actions">
              <a className="officina32-back" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
              <a className="officina32-join is-compact" href={WHATSAPP_INVITE_URL} target="_blank" rel="noreferrer">Entra nella community</a>
            </div>
          </article>
          <article>
            <p className="officina32-card-kicker">Cosa c’è dentro</p>
            <h3>{COMMUNITY_BOARD}</h3>
            <p>La bacheca della community {COMMUNITY_NAME}.</p>
            <p className="officina32-group"><strong>Gruppo. </strong>«{COMMUNITY_GROUP}»</p>
          </article>
        </div>
      </section>

      <section className="officina32-close">
        <div>
          <p className="officina32-kicker is-light">Il sito</p>
          <h2>OFF32</h2>
          <p>{SITE_DESCRIPTION}</p>
        </div>
        <a className="officina32-back is-on-dark" href="/">Scopri OFF32</a>
      </section>

      <style>{`
        .officina32 {
          min-height: 100vh;
          background: ${CREAM};
          color: ${INK};
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          overflow-x: clip;
        }
        .officina32-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 5%;
        }
        .officina32-logo img { display: block; width: 36px; height: auto; }
        .officina32-back {
          display: inline-block;
          border: 1px solid ${INK};
          color: ${INK};
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 14px 22px;
          background: transparent;
          box-shadow: 3px 3px 0 ${PURPLE};
        }
        .officina32-back.is-on-dark {
          border-color: ${CREAM};
          color: ${CREAM};
          box-shadow: 3px 3px 0 ${LIME};
        }
        .officina32-kicker {
          margin: 0 0 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: ${RED};
        }
        .officina32-kicker.is-light { color: ${LIME}; }
        .officina32-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding: 8px 5% 36px;
          align-items: end;
        }
        .officina32 h1 {
          margin: 0;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(56px, 14vw, 92px);
          line-height: 0.84;
          letter-spacing: -2px;
          color: ${PURPLE};
        }
        .officina32-line {
          margin: 16px 0 0;
          max-width: 16ch;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(28px, 7vw, 40px);
          line-height: 1.08;
          letter-spacing: -0.6px;
        }
        .officina32-members {
          margin: 14px 0 0;
          max-width: 36ch;
          font-size: 16px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .officina32-join {
          display: inline-block;
          margin-top: 20px;
          background: ${INK};
          color: ${LIME};
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 16px 18px;
          border: 2px solid ${INK};
          box-shadow: 6px 6px 0 ${PURPLE};
        }
        .officina32-join.is-compact { margin-top: 0; font-size: 12px; padding: 14px 16px; }
        .officina32-hero-figure {
          position: relative;
          margin: 0;
          aspect-ratio: 16 / 10;
          border: 1px solid ${INK};
          box-shadow: 10px 10px 0 ${PURPLE};
          background: ${INK};
          overflow: hidden;
        }
        .officina32-sticker {
          position: absolute;
          z-index: 2;
          top: 14px;
          right: 14px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: ${RED};
          color: ${CREAM};
          padding: 10px 14px;
          border: 2px solid ${INK};
          box-shadow: 5px 5px 0 ${INK};
          transform: rotate(6deg);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }
        .officina32-sticker strong {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: 36px;
          letter-spacing: -1px;
          line-height: 0.9;
          text-transform: none;
        }
        .officina32-facts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          background: ${INK};
          color: ${CREAM};
          padding: 22px 5%;
        }
        .officina32-facts strong {
          display: block;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 8vw, 64px);
          letter-spacing: -1.5px;
          line-height: 0.9;
          color: ${LIME};
        }
        .officina32-facts span {
          display: block;
          margin-top: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }
        .officina32-calendar,
        .officina32-community { padding: 56px 5% 8px; }
        .officina32-calendar-head,
        .officina32-community-head { max-width: 46rem; }
        .officina32 h2 {
          margin: 0;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(40px, 6vw, 72px);
          letter-spacing: -1.6px;
          line-height: 0.96;
        }
        .officina32-lead {
          margin: 16px 0 0;
          max-width: 62ch;
          font-size: 16px;
          line-height: 1.65;
          color: #3a3a3a;
        }
        .officina32-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
        .officina32-filter {
          border: 1px solid ${INK};
          background: transparent;
          color: ${INK};
          padding: 8px 12px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
        }
        .officina32-filter.is-on { background: ${PURPLE}; border-color: ${PURPLE}; color: ${CREAM}; }
        .officina32-board {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 28px;
          align-items: stretch;
        }
        .officina32-empty {
          margin: 0;
          padding: 18px 20px;
          border: 1px solid ${INK};
          background: ${PAPER};
          box-shadow: 6px 6px 0 ${PURPLE};
          font-size: 15px;
          line-height: 1.5;
          color: #3a3a3a;
        }
        .officina32-card,
        .officina32-sheet,
        .officina32-grid article {
          background: ${PAPER};
          border: 1px solid ${INK};
          box-shadow: 7px 7px 0 ${INK};
          min-width: 0;
        }
        .officina32-card { display: flex; flex-direction: column; height: 100%; }
        .officina32-sheet {
          display: grid;
          grid-template-columns: 1fr;
          margin-top: 20px;
        }
        .officina32-card-photo {
          position: relative;
          overflow: hidden;
          height: 220px;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          border-bottom: 1px solid ${INK};
          background: ${INK};
        }
        .officina32-card-photo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(13, 13, 13, 0.45) 0%, rgba(13, 13, 13, 0.12) 42%, rgba(13, 13, 13, 0.62) 100%);
          z-index: 1;
        }
        .officina32-card-photo span {
          position: relative;
          z-index: 2;
          color: ${CREAM};
          font-weight: 800;
          font-size: clamp(28px, 4vw, 40px);
          letter-spacing: -1px;
          line-height: 0.95;
          text-transform: uppercase;
        }
        .officina32-card-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 18px 18px;
          flex: 1;
        }
        .officina32-card-kicker {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .officina32-card h3,
        .officina32-sheet h3,
        .officina32-grid h3 {
          margin: 0;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(28px, 3vw, 40px);
          letter-spacing: -0.6px;
          line-height: 1.05;
        }
        .officina32-card-summary,
        .officina32-grid p {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: #3a3a3a;
        }
        .officina32-meta,
        .officina32-outcomes {
          margin: 0;
          padding: 12px 0 0;
          border-top: 1px solid ${INK};
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          line-height: 1.45;
          list-style: none;
        }
        .officina32-outcomes { list-style: disc; padding-left: 18px; }
        .officina32-card-foot {
          margin-top: auto;
          padding-top: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .officina32-card-foot span {
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.3px;
        }
        .officina32-card-foot a {
          background: ${INK};
          color: ${CREAM};
          border: 1px solid ${INK};
          box-shadow: 3px 3px 0 ${RED};
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 12px 14px;
        }
        .officina32-kinds {
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .officina32-kinds li {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 18px 20px;
          border: 1px solid ${INK};
          background: ${PAPER};
          box-shadow: 6px 6px 0 ${PURPLE};
        }
        .officina32-kinds strong {
          font-size: 12px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .officina32-kinds span { font-size: 14px; line-height: 1.5; color: #3a3a3a; }
        .officina32-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 28px;
        }
        .officina32-grid article {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 240px;
          padding: 28px 22px;
          box-shadow: 6px 6px 0 ${PURPLE};
        }
        .officina32-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
        }
        .officina32-group { margin-top: auto; color: ${INK}; }
        .officina32-group strong { color: ${INK}; }
        .officina32-rail { position: relative; margin-top: 48px; padding: 8px 5% 36px; }
        .officina32-track { position: relative; }
        .officina32-linebar {
          position: absolute;
          top: 0;
          left: 50%;
          width: 100vw;
          height: 2px;
          transform: translateX(-50%);
          background: ${INK};
        }
        .officina32-row {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding: 0 2px 24px;
          scroll-snap-type: x mandatory;
        }
        .officina32-pass {
          position: relative;
          flex: 0 0 min(78vw, 240px);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 250px;
          margin-top: 16px;
          padding: 22px 14px 14px;
          border: 2px solid ${INK};
          text-decoration: none;
          transform: rotate(var(--tilt));
        }
        .officina32-clip {
          position: absolute;
          top: -18px;
          left: 50%;
          width: 16px;
          height: 22px;
          margin-left: -8px;
          background: ${CREAM};
          border: 2px solid ${INK};
        }
        .officina32-clip::before {
          content: '';
          position: absolute;
          top: 4px;
          left: 3px;
          width: 6px;
          height: 6px;
          border: 2px solid ${INK};
          border-radius: 50%;
        }
        .officina32-pass-kicker,
        .officina32-pass-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .officina32-pass-title {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: 28px;
          letter-spacing: -0.6px;
          line-height: 0.95;
        }
        .officina32-pass-line { font-size: 13px; line-height: 1.4; }
        .officina32-barcode {
          margin-top: auto;
          height: 26px;
          background: repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 3px, currentColor 3px 5px, transparent 5px 8px);
        }
        .officina32-close {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 22px;
          margin-top: 12px;
          padding: 48px 5% 64px;
          background: ${PURPLE};
          color: ${CREAM};
        }
        .officina32-close h2 { color: ${CREAM}; }
        .officina32-close p:last-child {
          margin: 12px 0 0;
          max-width: 46ch;
          font-size: 16px;
          line-height: 1.6;
        }
        @media (min-width: 900px) {
          .officina32-hero {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 48px;
            padding: 12px 5% 56px;
            align-items: stretch;
          }
          .officina32-hero-copy { display: flex; flex-direction: column; align-items: flex-start; }
          .officina32-hero-copy .officina32-join { margin-top: auto; }
          .officina32 h1 { font-size: clamp(84px, 6.6vw, 112px); }
          .officina32-line { font-size: clamp(32px, 2.4vw, 44px); max-width: 14ch; }
          .officina32-hero-figure { aspect-ratio: 5 / 4; min-height: 420px; }
          .officina32-facts { padding: 28px 5%; }
          .officina32-calendar,
          .officina32-community { padding: 80px 5% 12px; }
          .officina32-board { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
          .officina32-card-photo { height: 200px; }
          .officina32-sheet {
            grid-template-columns: minmax(280px, 0.9fr) 1.2fr;
            margin-top: 28px;
          }
          .officina32-sheet .officina32-card-photo {
            height: 100%;
            min-height: 320px;
            border-bottom: none;
            border-right: 1px solid ${INK};
          }
          .officina32-sheet .officina32-card-body { padding: 28px; }
          .officina32-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .officina32-grid article { min-height: 300px; }
          .officina32-kinds li {
            display: grid;
            grid-template-columns: 200px 1fr;
            align-items: baseline;
            column-gap: 24px;
          }
          .officina32-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 320px));
            justify-content: start;
            overflow: visible;
            gap: 48px;
            padding-bottom: 28px;
          }
          .officina32-pass { flex: none; width: auto; min-height: 270px; }
          .officina32-close {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 40px;
            padding: 64px 5% 72px;
          }
          .officina32-close .officina32-back { flex: 0 0 auto; }
        }
        @media (max-width: 899px) {
          .officina32-linebar { display: none; }
          .officina32-row {
            flex-direction: column;
            overflow: visible;
            gap: 40px;
            padding: 10px 0 12px;
          }
          .officina32-pass {
            flex: none;
            width: 100%;
            min-height: 210px;
            transform: none;
          }
          .officina32-pass::after {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            width: 100vw;
            height: 2px;
            transform: translateX(-50%);
            background: ${INK};
          }
          .officina32-pass-title { font-size: 34px; }
        }
        @media (hover: hover) {
          .officina32-pass { transition: transform 0.25s ease; }
          .officina32-pass:hover { transform: rotate(0deg) translateY(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .officina32-pass { transform: none; }
        }
      `}</style>
    </main>
  )
}
