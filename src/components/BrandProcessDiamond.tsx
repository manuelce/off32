const BLUE = '#293cf4'
const INK = '#141414'
const CREAM = '#F0EBE0'
const RED = '#fe3812'

const STEPS = [
  {
    id: '01',
    title: 'Brief & ricerca',
    text: 'Mercato, competitor, pubblico, toni da evitare.',
    accent: '#141414',
  },
  {
    id: '02',
    title: 'Concept',
    text: '1 o 2 direzioni. Raffiniamo il segno principale.',
    accent: RED,
  },
  {
    id: '03',
    title: 'Sistema',
    text: 'Palette, tipografia, griglia, usi digitali e stampa.',
    accent: BLUE,
  },
  {
    id: '04',
    title: 'Guidelines',
    text: 'Regole usabili dal team. Consegna e collaudo.',
    accent: '#141414',
  },
] as const

function Orbit({
  step,
  reverse,
}: {
  step: (typeof STEPS)[number]
  reverse?: boolean
}) {
  return (
    <div className="bps-orbit" aria-hidden="true">
      <span className={`bps-track${reverse ? ' is-rev' : ''}`}>
        <span className="bps-ring" style={{ borderColor: step.accent }} />
        <span
          className="bps-planet"
          style={{
            background: step.accent,
            boxShadow: `0 0 0 3px ${step.accent}38`,
          }}
        />
      </span>
      <span className="bps-core" style={{ background: step.accent, borderColor: INK }}>
        {step.id}
      </span>
    </div>
  )
}

function ArrowAcross() {
  return (
    <div className="bps-arrow-h" aria-hidden="true">
      <svg viewBox="0 0 200 24" preserveAspectRatio="none">
        <path d="M0 12 H188" fill="none" stroke={INK} strokeWidth="1.15" strokeDasharray="4 6" className="bps-dash" />
        <path d="M185 3.5 L200 12 L185 20.5" fill="none" stroke={INK} strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function BrandProcessDiamond() {
  return (
    <section
      aria-labelledby="process-diamond"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '48px 5%',
        background: CREAM,
      }}
    >
      <h2
        id="process-diamond"
        style={{
          fontSize: 11,
          letterSpacing: '1.8px',
          textTransform: 'uppercase',
          color: BLUE,
          margin: '0 0 28px',
          fontWeight: 400,
        }}
      >
        Metodo
      </h2>

      <div className="bps" role="list" aria-label="Processo brand identity">
        <div className="bps-axis">
          {STEPS.map((step, i) => (
            <div key={`axis-${step.id}`} className="bps-axis-piece">
              {i > 0 ? <ArrowAcross /> : null}
              <Orbit step={step} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>

        <div className="bps-labels">
          {STEPS.map((step, i) => (
            <div key={step.id} className="bps-label-piece">
              {i > 0 ? <span className="bps-label-gap" aria-hidden="true" /> : null}
              <div className="bps-copy" role="listitem">
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bps {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bps-axis {
          display: flex;
          align-items: center;
          width: 100%;
        }
        .bps-axis-piece {
          display: contents;
        }
        .bps-orbit {
          position: relative;
          width: 72px;
          height: 72px;
          flex: 0 0 72px;
        }
        .bps-track {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: bps-spin 18s linear infinite;
        }
        .bps-track.is-rev {
          animation-name: bps-spin-rev;
          animation-duration: 22s;
        }
        .bps-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border-width: 1.5px;
          border-style: solid;
          opacity: 0.85;
        }
        .bps-planet {
          position: absolute;
          top: 0;
          left: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .bps-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${CREAM};
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          border: 1.5px solid ${INK};
          z-index: 1;
        }
        .bps-arrow-h {
          flex: 1 1 0;
          min-width: 32px;
          height: 24px;
          margin-left: 5%;
          margin-right: 5%;
          display: flex;
          align-items: center;
        }
        .bps-arrow-h svg {
          width: 100%;
          height: 24px;
          display: block;
          overflow: visible;
        }
        .bps-labels {
          display: flex;
          width: 100%;
          align-items: start;
        }
        .bps-label-piece {
          display: contents;
        }
        .bps-label-gap {
          flex: 1 1 0;
          min-width: 32px;
          margin-left: 5%;
          margin-right: 5%;
        }
        .bps-copy {
          flex: 0 0 72px;
          width: 72px;
          position: relative;
        }
        .bps-copy strong,
        .bps-copy p {
          width: max(168px, 12vw);
          max-width: 220px;
        }
        .bps-copy strong {
          display: block;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(18px, 1.8vw, 24px);
          letter-spacing: -0.4px;
          color: ${INK};
          margin-bottom: 4px;
        }
        .bps-copy p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #3a3a3a;
        }
        .bps-dash {
          animation: bps-dash 3.8s linear infinite;
        }
        @keyframes bps-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bps-spin-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes bps-dash {
          to { stroke-dashoffset: -40; }
        }
        @media (max-width: 900px) {
          .bps-axis {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }
          .bps-axis-piece {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .bps-arrow-h {
            width: 24px;
            height: 40px;
            margin: 8px 0 8px 24px;
            flex: none;
            transform: rotate(90deg);
          }
          .bps-labels {
            flex-direction: column;
            gap: 28px;
            margin-top: 8px;
          }
          .bps-label-piece { display: block; }
          .bps-label-gap { display: none; }
          .bps-copy {
            flex: none;
            width: auto;
          }
          .bps-copy strong,
          .bps-copy p {
            width: auto;
            max-width: 42ch;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bps-track, .bps-dash { animation: none; }
        }
      `}</style>
    </section>
  )
}
