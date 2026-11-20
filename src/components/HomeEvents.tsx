import {
  COMMUNITY_MEMBERS,
  INSTAGRAM_FOLLOWERS,
  WHATSAPP_INVITE_URL,
} from '@/lib/community'
import {
  EVENT_KIND_LABEL,
  EVENT_KIND_ORDER,
  events,
  upcomingEvents,
  type EventKind,
  type Off32Event,
} from '@/lib/events'
import { fullstackCourse } from '@/lib/fullstack-course'

const CREAM = '#F0EBE0'
const INK = '#0D0D0D'
const RED = '#fe3812'
const PURPLE = '#694aff'
const LIME = '#9fff00'

const PASS_TONES = [RED, INK, PURPLE, LIME, CREAM, RED] as const

function passInk(tone: string) {
  return tone === CREAM || tone === LIME ? INK : CREAM
}

type Pass = {
  key: string
  href: string
  external: boolean
  kicker: string
  title: string
  line: string
  label: string
}

const MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']

function shortDate(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
}

function eventPass(event: Off32Event): Pass {
  const line = event.kind === 'corso'
    ? `${fullstackCourse.hoursLabel} · ${fullstackCourse.weeks} settimane · live su Meet`
    : [event.timeLabel ? `ore ${event.timeLabel}` : null, event.format].filter(Boolean).join(' · ')
  return {
    key: event.slug,
    href: event.href ?? '/workshop',
    external: Boolean(event.href?.startsWith('http')),
    kicker: event.date ? shortDate(event.date) : EVENT_KIND_LABEL[event.kind],
    title: event.title,
    line: line || event.summary,
    label: EVENT_KIND_LABEL[event.kind],
  }
}

function typePass(kind: EventKind): Pass {
  return {
    key: `tipo-${kind}`,
    href: '/workshop',
    external: false,
    kicker: 'Tipo',
    title: EVENT_KIND_LABEL[kind],
    line: 'Nel calendario della formazione',
    label: 'Formazione',
  }
}

export default function HomeEvents() {
  const dated = upcomingEvents().map(eventPass)
  const types = EVENT_KIND_ORDER.filter(kind => !events.some(event => event.status === 'upcoming' && event.kind === kind)).map(typePass)
  const passes = [...dated, ...types]

  return (
    <section id="prossimo-appuntamento" className="home-events" aria-labelledby="home-events-title">
      <div className="home-events-head">
        <h2 id="home-events-title" className="home-events-lockup">
          <span className="home-events-eventi">Eventi.</span>
        </h2>
        <p className="home-events-sticker">Lo facciamo insieme.</p>
        <a className="home-events-join" href="/workshop">Vedi eventi</a>
      </div>

      <div className="home-events-rail" role="list">
        <div className="home-events-row">
          {passes.map((pass, index) => {
            const tone = PASS_TONES[index % PASS_TONES.length]
            const ink = passInk(tone)
            return (
              <a
                key={pass.key}
                role="listitem"
                href={pass.href}
                className="home-events-pass"
                style={{ background: tone, color: ink, ['--tilt' as string]: `${index % 2 === 0 ? -2.2 : 1.8}deg` }}
                {...(pass.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="home-events-clip" aria-hidden="true" />
                <span className="home-events-pass-kicker">{pass.kicker}</span>
                <span className="home-events-pass-label">{pass.label}</span>
                <span className="home-events-pass-title">{pass.title}</span>
                <span className="home-events-pass-line">{pass.line}</span>
                <span className="home-events-barcode" aria-hidden="true" />
            </a>
          )
        })}
          <a
            href={WHATSAPP_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="home-events-pass home-events-pass-cta"
            style={{ background: INK, color: LIME, ['--tilt' as string]: '-3deg' }}
          >
            <span className="home-events-clip" aria-hidden="true" />
            <span className="home-events-pass-title">Entra nella community</span>
          </a>
        </div>
      </div>

      <div className="home-events-stats">
        <div>
          <strong>{COMMUNITY_MEMBERS}</strong>
          <span>Community</span>
        </div>
        <div>
          <strong>{INSTAGRAM_FOLLOWERS}</strong>
          <span>Instagram</span>
        </div>
        <div>
          <strong>{fullstackCourse.hours}</strong>
          <span>Agenda32</span>
        </div>
      </div>

      <div className="home-events-cta">
        <a href="/workshop">Vedi gli eventi</a>
      </div>

      <style>{`
        .home-events {
          padding: 12% 5%;
          border-bottom: 1px solid ${INK};
          background: ${CREAM};
          color: ${INK};
        }
        .home-events-head {
          position: relative;
          min-height: 168px;
          padding-bottom: 18px;
        }
        .home-events-lockup {
          display: flex;
          align-items: flex-end;
          gap: 10px 18px;
          margin: 0;
          max-width: 78%;
        }
        .home-events-eventi {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(88px, 13vw, 176px);
          line-height: 0.76;
          letter-spacing: -4px;
          color: ${PURPLE};
        }
        .home-events-sticker {
          position: absolute;
          right: 6%;
          top: 8px;
          margin: 0;
          background: ${RED};
          color: ${CREAM};
          font-size: clamp(13px, 1.3vw, 16px);
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 10px 14px;
          border: 2px solid ${INK};
          box-shadow: 5px 5px 0 ${INK};
          transform: rotate(-8deg);
        }
        .home-events-join {
          position: absolute;
          right: 12px;
          bottom: -4px;
          background: ${INK};
          color: ${LIME};
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 16px 18px;
          border: 2px solid ${INK};
          box-shadow: 7px 7px 0 ${PURPLE};
          transform: rotate(4deg);
        }
        .home-events-rail { position: relative; margin-top: 28px; }
        .home-events-row {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          padding: 10px 2px 12px;
          scroll-snap-type: x mandatory;
        }
        .home-events-pass-cta {
          justify-content: center;
          box-shadow: 7px 7px 0 ${PURPLE};
        }
        .home-events-pass-cta .home-events-pass-title {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: 0.4px;
          line-height: 1.05;
          text-transform: uppercase;
        }
        .home-events-pass {
          position: relative;
          flex: 0 0 180px;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 230px;
          margin-top: 16px;
          padding: 22px 14px 14px;
          border: 2px solid ${INK};
          text-decoration: none;
          transform: rotate(var(--tilt));
        }
        .home-events-clip {
          position: absolute;
          top: -18px;
          left: 50%;
          width: 16px;
          height: 22px;
          margin-left: -8px;
          background: ${CREAM};
          border: 2px solid ${INK};
        }
        .home-events-clip::before {
          content: '';
          position: absolute;
          top: 4px;
          left: 3px;
          width: 6px;
          height: 6px;
          border: 2px solid ${INK};
          border-radius: 50%;
        }
        .home-events-pass-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
        }
        .home-events-pass-label {
          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }
        .home-events-pass-title {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: 28px;
          letter-spacing: -0.6px;
          line-height: 0.95;
        }
        .home-events-pass-line {
          font-size: 13px;
          line-height: 1.4;
        }
        .home-events-barcode {
          margin-top: auto;
          height: 28px;
          background: repeating-linear-gradient(
            90deg,
            currentColor 0 1px,
            transparent 1px 3px,
            currentColor 3px 5px,
            transparent 5px 7px,
            currentColor 7px 8px,
            transparent 8px 11px
          );
        }
        .home-events-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 2px solid ${INK};
          margin-top: 28px;
        }
        .home-events-stats > div {
          padding: 22px 18px 18px;
          border-right: 2px solid ${INK};
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .home-events-stats > div:last-child { border-right: none; }
        .home-events-stats strong {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(52px, 6vw, 84px);
          letter-spacing: -2px;
          line-height: 0.9;
          color: ${RED};
        }
        .home-events-stats span {
          font-size: 13px;
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .home-events-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }
        .home-events-cta a {
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
        @media (min-width: 980px) {
          .home-events-row { overflow: visible; }
          .home-events-pass { flex: 0 0 196px; }
        }
        @media (max-width: 720px) {
          .home-events-head { min-height: 0; padding-bottom: 8px; }
          .home-events-lockup { max-width: none; flex-direction: column; align-items: flex-start; }
          .home-events-sticker, .home-events-join { position: static; }
          .home-events-sticker { margin: 8px 0 0 12px; }
          .home-events-join { display: inline-block; margin: 22px 0 8px auto; }
          .home-events-stats { grid-template-columns: 1fr; }
          .home-events-stats > div { border-right: none; border-bottom: 2px solid ${INK}; }
          .home-events-stats > div:last-child { border-bottom: none; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .home-events-pass { transition: transform 0.25s ease; }
          .home-events-pass:hover { transform: rotate(0deg) translateY(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-events-pass, .home-events-sticker, .home-events-join { transform: none; }
        }
      `}</style>
    </section>
  )
}
