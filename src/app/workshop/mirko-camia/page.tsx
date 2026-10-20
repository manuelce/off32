'use client'

import type { CSSProperties } from 'react'

const INK = '#0D0D0D'
const CREAM = '#F0EBE0'
const PURPLE = '#694aff'
const RED = '#fe3812'
const LINE = `1px solid ${INK}`

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: 1.8,
  textTransform: 'uppercase',
  color: INK,
}

const facts = [
  { label: 'Quando', value: 'Sabato 14 marzo 2027' },
  { label: 'Durata', value: '6 ore' },
  { label: 'Formato', value: 'Workshop live in studio' },
  { label: 'Posti', value: 'Max 14' },
]

const results = [
  {
    title: 'Illustrazione finita',
    body: 'Alla fine sai fare un’illustrazione super figa: idea chiara, composizione solida e una resa visiva forte. Non un esercizio lasciato a metà.',
  },
  {
    title: 'Dal sketch al portfolio',
    body: 'Impari un metodo concreto per partire da uno sketch e arrivare a un pezzo da mostrare. Sessione di lavoro, non lezione teorica.',
  },
  {
    title: 'Feedback di Mirko',
    body: 'Ricevi feedback diretto da Mirko Càmia sul tuo lavoro: direzione, ritmo, dettagli. Parti da zero o da uno sketch e chiudi la giornata con un pezzo completo.',
  },
  {
    title: 'Materiali da riprendere',
    body: 'Porti a casa materiali e riferimenti da usare dopo il workshop, per continuare a costruire illustrazioni con carattere e direzione chiara.',
  },
]

const steps = [
  {
    title: 'Idea e direzione',
    body: 'Partiamo da un brief leggero: soggetto, mood, composizione. Capisci cosa vuoi raccontare prima di aprire il foglio o il tablet.',
  },
  {
    title: 'Disegno e costruzione',
    body: 'Lavoriamo su linea, volume e ritmo. Mirko ti guida sul processo che usa nei suoi lavori editoriali e di branding.',
  },
  {
    title: 'Colore e finitura',
    body: 'Chiudiamo l’illustrazione: palette, contrasti, dettagli. Alla fine hai un pezzo che puoi mostrare, non un esercizio lasciato a metà.',
  },
]

export default function MirkoCamiaWorkshopPage() {
  return (
    <main
      className="mc-page"
      style={{
        background: CREAM,
        color: INK,
        minHeight: '100vh',
        fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      }}
    >
      <section className="mc-hero" aria-labelledby="mc-title">
        <div className="mc-hero-project">
          <div className="mc-hero-media" aria-hidden="true">
            <img src="/workshop/mirko-camia/hero.jpg" alt="" />
          </div>
          <div className="mc-hero-scrim" aria-hidden="true" />
          <div className="mc-hero-project-inner">
            <span className="mc-badge">Workshop · Illustrazione</span>
            <h1 id="mc-title">
              Realizza un’illustrazione che si fa notare, con Mirko Càmia
            </h1>
            <p className="mc-hero-lead">
              In 6 ore, in una giornata di marzo, lavori side by side con Mirko Càmia:
              illustratore e 80&apos;s lover. Esci con un pezzo finito, personale e
              pronto da mettere in portfolio.
            </p>
            <div className="mc-hero-cta">
              <a className="mc-cta-btn mc-cta-btn-hero" href="#candidati">
                Riserva il tuo posto
              </a>
              <p className="mc-hero-cta-note">
                Max 14 posti · scopri il metodo e verifica se il workshop fa per te.
              </p>
            </div>
            <div className="mc-facts" role="list" aria-label="Dati del workshop">
              {facts.map(fact => (
                <div key={fact.label} className="mc-fact" role="listitem">
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mc-section mc-guest" aria-labelledby="mc-guest-title">
        <div className="mc-guest-copy">
          <div className="mc-kicker">Chi ti guida</div>
          <h2 id="mc-guest-title">Mirko Càmia</h2>
          <p className="mc-section-lead">
            Illustratore con un linguaggio pop, editoriale e pieno di riferimenti
            anni ’80. Lavora su cover, branding e progetti stampati: da Il Sole 24
            Ore a Legacoop, fino a concept e remix visivi che restano in testa.
          </p>
          <a
            className="mc-link"
            href="http://mirkocamia.com/"
            target="_blank"
            rel="noreferrer"
          >
            Vai al portfolio →
          </a>
        </div>
        <div className="mc-guest-panel">
          <img
            src="/workshop/mirko-camia/mirko.jpg"
            alt="Mirko Càmia, illustratore"
          />
        </div>
      </section>

      <section className="mc-section" aria-labelledby="mc-result-title">
        <div className="mc-kicker">Il risultato</div>
        <h2 id="mc-result-title">Alla fine sai fare un’illustrazione super figa</h2>
        <p className="mc-section-lead">
          Non è una lezione teorica. È una sessione di lavoro: parti da zero o da
          uno sketch e chiudi la giornata con un’illustrazione completa, con
          carattere e direzione chiara.
        </p>
        <div className="mc-result-grid" role="list">
          {results.map(item => (
            <article key={item.title} className="mc-result-card" role="listitem">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mc-section" aria-labelledby="mc-flow-title">
        <div className="mc-kicker">Come funziona</div>
        <h2 id="mc-flow-title">Una giornata, tre tappe</h2>
        <div className="mc-steps">
          {steps.map((step, index) => (
            <article key={step.title} className="mc-step">
              <span className="mc-step-num">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="candidati" className="mc-cta" aria-labelledby="mc-cta-title">
        <div className="mc-kicker" style={{ color: CREAM }}>
          Prossima tappa
        </div>
        <h2 id="mc-cta-title">14 marzo · 6 ore · max 14 posti</h2>
        <p>
          Pagina in anteprima: non è ancora in agenda pubblica. Se vuoi essere
          tra i primi a riservare il tuo posto, scrivici.
        </p>
        <a className="mc-cta-btn" href="mailto:connect@off32.it?subject=Workshop%20Mirko%20C%C3%A0mia%20-%20Riserva%20posto">
          Riserva il tuo posto
        </a>
      </section>

      <footer className="mc-footer">
        <span style={meta}>OFF32 · Workshop non pubblicato</span>
        <span style={meta}>connect@off32.it · © 2026 OFF32</span>
      </footer>

      <style>{`
        .mc-page { overflow-x: hidden; }
        .mc-page a { color: inherit; }
        .mc-hero {
          padding: 0;
          border-bottom: none;
          box-sizing: border-box;
        }
        .mc-hero-project {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          text-align: center;
          width: 100vw;
          margin: 0 calc(50% - 50vw);
          padding: 140px 5% 56px;
          box-sizing: border-box;
          color: ${INK};
          border-bottom: 1px solid #141414;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 88vh;
          min-height: 88dvh;
        }
        .mc-hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .mc-hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        .mc-hero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(240, 235, 224, 0.98) 0%,
              rgba(240, 235, 224, 0.94) 16%,
              rgba(240, 235, 224, 0.82) 38%,
              rgba(240, 235, 224, 0.68) 58%,
              rgba(240, 235, 224, 0.48) 78%,
              rgba(240, 235, 224, 0.32) 100%
            );
        }
        .mc-hero-project-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mc-badge {
          display: inline-block;
          border: 1px solid ${INK};
          background: ${CREAM};
          color: ${INK};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 8px 12px;
          margin: 0 auto 22px;
          box-shadow: 3px 3px 0 ${INK};
        }
        .mc-hero-project h1 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(32px, 5.2vw, 58px);
          letter-spacing: -1.4px;
          line-height: 1.08;
          margin: 0 auto 18px;
          max-width: 28ch;
          color: ${INK};
        }
        .mc-hero-lead {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.55;
          color: #3a3a3a;
          margin: 0 auto 28px;
          max-width: 54ch;
        }
        .mc-hero-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin: 0 0 36px;
        }
        .mc-cta-btn-hero {
          box-shadow: 4px 4px 0 ${INK};
        }
        .mc-cta-btn-hero:hover {
          box-shadow: 3px 3px 0 ${INK};
        }
        .mc-hero-cta-note {
          margin: 0;
          font-size: 14px;
          line-height: 1.45;
          color: #3a3a3a;
          max-width: 36ch;
        }
        .mc-facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
          max-width: 1100px;
          margin: 0;
          text-align: left;
        }
        .mc-fact {
          border: 1px solid ${INK};
          background: ${CREAM};
          color: ${INK};
          box-shadow: 4px 4px 0 ${INK};
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .mc-fact span {
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .mc-fact strong {
          font-size: 16px;
          letter-spacing: -0.2px;
        }
        .mc-kicker {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin: 0 0 14px;
          font-weight: 700;
        }
        .mc-section {
          padding: 72px 5%;
          border-bottom: ${LINE};
          width: 100%;
          box-sizing: border-box;
        }
        .mc-section h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(32px, 4.5vw, 48px);
          letter-spacing: -1.2px;
          line-height: 1.05;
          margin: 0 0 16px;
          max-width: 18ch;
        }
        .mc-section-lead {
          font-size: 16px;
          line-height: 1.65;
          color: #3a3a3a;
          max-width: 52ch;
          margin: 0 0 28px;
        }
        .mc-result-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          width: 100%;
        }
        .mc-result-card {
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 22px 20px;
        }
        .mc-result-card h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(24px, 3vw, 30px);
          letter-spacing: -0.5px;
          margin: 0 0 12px;
          max-width: 14ch;
        }
        .mc-result-card p {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .mc-guest {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .mc-guest-panel {
          border: 1px solid ${INK};
          background: ${INK};
          box-shadow: 8px 8px 0 ${PURPLE};
          overflow: hidden;
          aspect-ratio: 4 / 5;
          max-height: 520px;
        }
        .mc-guest-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .mc-link {
          display: inline-block;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 2px solid ${RED};
          padding-bottom: 2px;
        }
        .mc-steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .mc-step {
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 22px 20px;
        }
        .mc-step-num {
          display: block;
          font-size: 11px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          font-weight: 700;
          color: ${PURPLE};
          margin-bottom: 10px;
        }
        .mc-step h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: 28px;
          letter-spacing: -0.6px;
          margin: 0 0 10px;
        }
        .mc-step p {
          margin: 0;
          font-size: 14px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .mc-cta {
          background: ${INK};
          color: ${CREAM};
          padding: 80px 5%;
          text-align: center;
          border-bottom: ${LINE};
        }
        .mc-cta h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(32px, 5vw, 52px);
          letter-spacing: -1.2px;
          line-height: 1.05;
          margin: 0 auto 16px;
          max-width: 16ch;
          color: ${CREAM};
        }
        .mc-cta p {
          margin: 0 auto 28px;
          max-width: 42ch;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(240, 235, 224, 0.85);
        }
        .mc-cta-btn {
          display: inline-block;
          background: ${RED};
          color: ${CREAM};
          border: 1px solid ${RED};
          box-shadow: 4px 4px 0 ${PURPLE};
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 20px;
        }
        .mc-cta-btn:hover {
          translate: 1px 1px;
          box-shadow: 3px 3px 0 ${PURPLE};
        }
        .mc-footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 22px 5%;
          border-bottom: ${LINE};
        }
        @media (min-width: 900px) {
          .mc-hero-project {
            padding-top: 156px;
            padding-bottom: 64px;
          }
          .mc-hero-project h1 {
            font-size: clamp(40px, 4.6vw, 58px);
            max-width: 28ch;
          }
          .mc-facts {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .mc-result-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
          .mc-guest {
            grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
            align-items: center;
          }
          .mc-steps {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1100px) {
          .mc-result-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 899px) {
          .mc-hero-project {
            padding-top: 124px;
            padding-bottom: 48px;
          }
          .mc-hero-project h1 {
            max-width: none;
            font-size: clamp(30px, 8vw, 42px);
          }
          .mc-section {
            padding: 56px 5%;
          }
        }
      `}</style>
    </main>
  )
}
