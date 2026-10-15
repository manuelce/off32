'use client'

import { useEffect, useRef, useState } from 'react'
import FullStackFaq from '@/components/FullStackFaq'
import { fullstackCourse } from '@/lib/fullstack-course'
import { track } from '@/lib/track'

const INK = '#0D0D0D'
const CREAM = '#F0EBE0'
const PURPLE = '#694aff'

function scrollToApply() {
  track('fullstack_cta_click')
  document.getElementById('candidati')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openCall() {
  track('fullstack_cta_click', { action: 'call20' })
  window.dispatchEvent(new Event('off32-toggle-call'))
}

export default function FullStackLanding() {
  const [underlineOn, setUnderlineOn] = useState(false)
  const underlinePlayed = useRef(false)

  useEffect(() => {
    track('fullstack_view')
  }, [])

  useEffect(() => {
    if (underlinePlayed.current) return
    underlinePlayed.current = true
    requestAnimationFrame(() => setUnderlineOn(true))
  }, [])

  const facts = [
    { label: 'Posti', value: `Max ${fullstackCourse.maxParticipants.value} partecipanti` },
    { label: 'Prezzo', value: fullstackCourse.priceLabel },
    { label: 'Partenza', value: fullstackCourse.startLabel },
    { label: 'Durata', value: fullstackCourse.hoursLabel },
  ]

  return (
    <main className="fs-page" style={{ background: CREAM, color: INK, minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      <section className="fs-hero">
        <div className="fs-hero-project">
          <span className="fs-badge">Per chi parte da zero</span>
          <h2 id="fs-project">{fullstackCourse.project.title}</h2>
          <p className="fs-project-name">
            <span className="street-word">
              {fullstackCourse.project.name}
              <span aria-hidden="true" className={underlineOn ? 'events-underline is-on' : 'events-underline'} />
            </span>
          </p>
          <p className="fs-project-summary">{fullstackCourse.project.summary}</p>
        </div>
        <div className="fs-hero-main">
          <div className="fs-hero-copy">
            <h1>{fullstackCourse.hero.title}</h1>
            <div className="fs-intro">
              {fullstackCourse.hero.lines.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="fs-cta-block">
              <button type="button" className="fs-cta" onClick={scrollToApply}>
                {fullstackCourse.cta.primary}
              </button>
              <p className="fs-urgency">Max {fullstackCourse.maxParticipants.value} posti</p>
            </div>
          </div>
          <div className="fs-hero-visual">
            <div className="fs-browser">
              <div className="fs-browser-bar" aria-hidden="true">
                <span /><span /><span />
                <div className="fs-browser-url">agenda32.off32.it</div>
              </div>
              <div className="fs-browser-screen">
                <img
                  src={fullstackCourse.hero.visual.src}
                  alt={fullstackCourse.hero.visual.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fs-facts-strip" aria-label="Dati del corso">
        <div className="fs-facts" role="list">
          {facts.map(fact => (
            <div key={fact.label} className="fs-fact" role="listitem">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="fs-section fs-learn" aria-labelledby="fs-learn">
        <div className="fs-learn-head">
          <div className="fs-kicker">Cosa imparerai</div>
          <h2 id="fs-learn">
            Cinque tappe <span className="fs-learn-accent">progressive</span>
          </h2>
        </div>

        <div className="fs-orbit" role="list" aria-label="Cinque tappe del percorso">
          <div className="fs-orbit-stage">
            <div className="fs-orbit-track fs-orbit-track-1" aria-hidden="true">
              <span className="fs-orbit-ring-line" />
              <span className="fs-orbit-planet" />
            </div>
            <div className="fs-orbit-track fs-orbit-track-2" aria-hidden="true">
              <span className="fs-orbit-ring-line" />
              <span className="fs-orbit-planet" />
            </div>
            <div className="fs-orbit-track fs-orbit-track-3" aria-hidden="true">
              <span className="fs-orbit-ring-line" />
              <span className="fs-orbit-planet" />
            </div>
            <div className="fs-orbit-core" aria-hidden="true">
              <img src="/off32_cube.png" alt="" width={72} height={72} />
              <span>5 tappe</span>
            </div>
            {fullstackCourse.learningSteps.map((step, index) => (
              <article
                key={step.title}
                role="listitem"
                className={`fs-orbit-item fs-orbit-item-${index + 1}`}
              >
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="fs-stack-block">
          <div className="fs-kicker">Stack completo</div>
          <ul className="fs-stack-list">
            {fullstackCourse.stack.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <FullStackFaq />

      <section id="candidati" className="fs-section fs-apply" aria-labelledby="fs-apply-title">
        <div className="fs-apply-inner">
          <div className="fs-kicker">Prossimo passo</div>
          <h2 id="fs-apply-title">{fullstackCourse.cta.finalTitle}</h2>
          <p className="fs-apply-lead">{fullstackCourse.cta.finalBody}</p>
          <button type="button" className="fs-cta" onClick={openCall}>
            {fullstackCourse.cta.call}
          </button>
          <p className="fs-apply-note">Call gratuita, senza impegno.</p>
        </div>
      </section>

      <footer className="fs-footer">
        <div className="fs-footer-links">
          {[
            { label: 'Works', href: '/work' },
            { label: 'Events', href: '/workshop' },
            { label: 'Blog', href: '/blog' },
            { label: 'Privacy', href: '/privacy-policy' },
            { label: 'Cookie', href: '/cookie-policy' },
            { label: 'Terms', href: '/terms-and-conditions' },
          ].map(link => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>
        <span>connect@off32.it · © 2025 OFF32</span>
      </footer>

      <style>{`
        .fs-page { overflow-x: hidden; }
        .fs-kicker {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-bottom: 14px;
          color: ${INK};
        }
        .fs-hero {
          min-height: 90vh;
          min-height: 90dvh;
          padding: 96px 5% 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
          border-bottom: none;
          box-sizing: border-box;
        }
        .fs-hero-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
        }
        .fs-hero-project {
          text-align: center;
          max-width: 72ch;
          margin: 24px auto 40px;
          padding: 8px 0 32px;
          width: 100%;
        }
        .fs-hero-project .fs-badge {
          align-self: center;
          margin: 0 auto 22px;
        }
        .fs-hero-project h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 5.5vw, 64px);
          letter-spacing: -1.4px;
          line-height: 1.02;
          margin: 0 0 14px;
        }
        .fs-project-name {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.8px;
          margin: 0 0 16px;
          color: ${INK};
        }
        .street-word { position: relative; display: inline-block; }
        .events-underline {
          position: absolute;
          left: -1%;
          bottom: 0.02em;
          width: 104%;
          height: 0.22em;
          background: ${PURPLE};
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
        .fs-project-summary {
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.55;
          color: #3a3a3a;
          margin: 0 auto;
          max-width: 68ch;
        }
        .fs-badge {
          display: inline-block;
          align-self: flex-start;
          border: 1px solid ${INK};
          background: #fff;
          color: ${INK};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 8px 12px;
          margin: 8px 0 28px;
          box-shadow: 3px 3px 0 ${PURPLE};
        }
        .fs-hero h1 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 6vw, 72px);
          letter-spacing: -2px;
          line-height: 0.95;
          margin: 0 0 18px;
          max-width: 12ch;
        }
        .fs-intro {
          max-width: 40ch;
          margin: 0 0 14px;
        }
        .fs-intro p {
          font-size: 15px;
          line-height: 1.55;
          color: #3a3a3a;
          margin: 0;
        }
        .fs-tech {
          font-size: 11px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0 0 24px;
          max-width: 42ch;
        }
        .fs-cta-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .fs-urgency {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: ${INK};
        }
        .fs-hero-visual { width: 100%; min-width: 0; }
        .fs-browser {
          background: #fff;
          border: 1px solid ${INK};
          box-shadow: 10px 10px 0 ${PURPLE};
          overflow: hidden;
        }
        .fs-browser-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid ${INK};
          background: ${CREAM};
        }
        .fs-browser-bar > span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${INK};
          opacity: 0.35;
        }
        .fs-browser-bar > span:nth-child(1) { opacity: 0.55; background: #fe3812; }
        .fs-browser-bar > span:nth-child(2) { opacity: 0.55; background: ${PURPLE}; }
        .fs-browser-url {
          margin-left: 8px;
          flex: 1;
          min-width: 0;
          border: 1px solid ${INK};
          background: #fff;
          padding: 4px 8px;
          font-size: 10px;
          letter-spacing: 0.4px;
          color: #3a3a3a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fs-browser-screen {
          aspect-ratio: 16 / 10;
          background: ${INK};
          overflow: hidden;
        }
        .fs-browser-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          display: block;
        }
        .fs-facts-strip {
          padding: 0 5% 56px;
          border-bottom: 1px solid ${INK};
        }
        .fs-facts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
          max-width: none;
          margin: 0;
        }
        .fs-fact {
          border: 1px solid ${INK};
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
        }
        .fs-fact span {
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .fs-fact strong {
          font-size: 16px;
          letter-spacing: -0.2px;
        }
        .fs-cta, .fs-submit {
          display: inline-block;
          background: ${INK};
          color: ${CREAM};
          border: 1px solid ${INK};
          box-shadow: 4px 4px 0 ${PURPLE};
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 14px 20px;
          cursor: pointer;
          text-decoration: none;
        }
        .fs-cta:hover, .fs-submit:hover { translate: 1px 1px; box-shadow: 3px 3px 0 ${PURPLE}; }
        .fs-cta:disabled, .fs-submit:disabled { opacity: 0.7; cursor: wait; }
        @media (min-width: 900px) {
          .fs-hero {
            gap: 48px;
            padding-top: 110px;
            padding-bottom: 64px;
            min-height: 90vh;
            min-height: 90dvh;
          }
          .fs-hero-main {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 48px;
          }
          .fs-hero h1 {
            font-size: clamp(48px, 5.4vw, 76px);
            max-width: 11ch;
          }
          .fs-facts {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        @media (max-width: 899px) {
          .fs-hero {
            min-height: 90vh;
            min-height: 90dvh;
            padding-top: 88px;
            padding-bottom: 48px;
          }
          .fs-hero h1 {
            max-width: none;
            font-size: clamp(34px, 9vw, 52px);
          }
        }
        .fs-section {
          padding: 72px 5%;
          border-bottom: 1px solid ${INK};
        }
        .fs-section h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(32px, 5vw, 52px);
          letter-spacing: -1.2px;
          line-height: 1.05;
          margin: 0 0 16px;
          max-width: 18ch;
        }
        .fs-section-lead {
          font-size: 16px;
          line-height: 1.65;
          color: #3a3a3a;
          max-width: 52ch;
          margin: 0 0 28px;
        }
        .fs-grid-4, .fs-grid-2 {
          display: grid;
          gap: 16px;
        }
        .fs-grid-4 { grid-template-columns: 1fr; }
        .fs-grid-2 { grid-template-columns: 1fr; }
        .fs-card, .fs-frame {
          background: #fff;
          border: 1px solid ${INK};
          padding: 20px 18px;
        }
        .fs-card h3, .fs-steps h3 {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
          margin: 0 0 8px;
        }
        .fs-card p, .fs-steps p, .fs-frame p, .fs-bullets {
          font-size: 14px;
          line-height: 1.6;
          color: #3a3a3a;
          margin: 0;
        }
        .fs-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .fs-steps li {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 14px;
          border: 1px solid ${INK};
          background: #fff;
          padding: 18px 16px;
        }
        .fs-step-num {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .fs-learn {
          background: ${INK};
          color: ${CREAM};
          border-bottom: 1px solid ${INK};
          padding: 96px 5% 104px;
          overflow: hidden;
        }
        .fs-learn-head {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
        }
        .fs-learn .fs-kicker,
        .fs-learn h2,
        .fs-learn .fs-section-lead {
          color: ${CREAM};
          margin-left: auto;
          margin-right: auto;
        }
        .fs-learn h2 {
          max-width: 16ch;
        }
        .fs-learn-accent { color: ${PURPLE}; }
        .fs-learn .fs-section-lead {
          max-width: 42ch;
          opacity: 0.88;
        }
        .fs-orbit {
          width: min(820px, 100%);
          margin: 0 auto 8px;
          display: flex;
          justify-content: center;
        }
        .fs-orbit-stage {
          position: relative;
          width: min(820px, 92vw);
          height: min(820px, 92vw);
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
          margin: 0 auto;
        }
        .fs-orbit-track {
          position: absolute;
          top: 50%;
          left: 50%;
          aspect-ratio: 1 / 1;
          height: auto;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .fs-orbit-ring-line {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(240, 235, 224, 0.35);
        }
        .fs-orbit-planet {
          position: absolute;
          top: 0;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${PURPLE};
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 3px rgba(105, 74, 255, 0.25);
        }
        .fs-orbit-track-1 {
          width: 86%;
          animation: fs-orbit-spin 110s linear infinite;
        }
        .fs-orbit-track-2 {
          width: 66%;
          animation: fs-orbit-spin-rev 95s linear infinite;
        }
        .fs-orbit-track-2 .fs-orbit-planet {
          top: auto;
          bottom: 0;
          transform: translate(-50%, 50%);
        }
        .fs-orbit-track-2 .fs-orbit-ring-line {
          border-color: rgba(105, 74, 255, 0.5);
        }
        .fs-orbit-track-3 {
          width: 46%;
          animation: fs-orbit-spin 120s linear infinite;
        }
        .fs-orbit-track-3 .fs-orbit-planet {
          top: 50%;
          left: 100%;
          transform: translate(-50%, -50%);
        }
        .fs-orbit-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 26%;
          height: 26%;
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: ${PURPLE};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 0 0 10px rgba(105, 74, 255, 0.18);
          animation: fs-orbit-pulse 7s ease-in-out infinite;
          z-index: 2;
        }
        .fs-orbit-core img {
          width: 42%;
          height: auto;
          display: block;
        }
        .fs-orbit-core span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: ${CREAM};
        }
        .fs-orbit-item {
          position: absolute;
          z-index: 3;
          width: min(200px, 34%);
          transform: translate(-50%, -50%);
          text-align: left;
        }
        .fs-orbit-item-1 { left: 50%; top: 9%; text-align: center; width: min(240px, 42%); }
        .fs-orbit-item-2 { left: 90%; top: 30%; }
        .fs-orbit-item-3 { left: 86%; top: 76%; }
        .fs-orbit-item-4 { left: 14%; top: 76%; text-align: right; }
        .fs-orbit-item-5 { left: 10%; top: 30%; text-align: right; }
        .fs-orbit-item h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(16px, 1.7vw, 22px);
          letter-spacing: -0.4px;
          line-height: 1.15;
          color: ${CREAM};
          margin: 0 0 6px;
        }
        .fs-orbit-item p {
          margin: 0;
          font-size: clamp(13px, 1.35vw, 15px);
          line-height: 1.5;
          color: rgba(240, 235, 224, 0.72);
        }
        @keyframes fs-orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fs-orbit-spin-rev {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes fs-orbit-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fs-orbit-track-1,
          .fs-orbit-track-2,
          .fs-orbit-track-3,
          .fs-orbit-core {
            animation: none;
          }
        }
        @media (max-width: 899px) {
          .fs-orbit {
            width: 100%;
          }
          .fs-orbit-stage {
            width: min(420px, 92vw);
            height: auto;
            aspect-ratio: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 18px;
            padding-top: 12px;
          }
          .fs-orbit-track {
            display: none;
          }
          .fs-orbit-core {
            position: relative;
            top: auto;
            left: auto;
            width: 140px;
            height: 140px;
            margin: 8px 0 20px;
            transform: none;
            animation: fs-orbit-pulse-mobile 5.5s ease-in-out infinite;
          }
          .fs-orbit-item {
            position: relative;
            left: auto !important;
            top: auto !important;
            width: 100%;
            max-width: 420px;
            transform: none;
            text-align: left !important;
            border: 1px solid rgba(240, 235, 224, 0.25);
            padding: 16px 16px 18px;
            background: rgba(240, 235, 224, 0.04);
          }
        }
        @keyframes fs-orbit-pulse-mobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .fs-stack-block { margin-top: 48px; }
        .fs-learn .fs-stack-block .fs-kicker {
          text-align: center;
          margin-bottom: 14px;
        }
        .fs-learn .fs-stack-list {
          justify-content: center;
        }
        @media (min-width: 900px) {
          .fs-learn {
            padding: 120px 5% 132px;
          }
          .fs-learn-head {
            margin-bottom: 72px;
          }
        }
        .fs-stack-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .fs-stack-list li {
          border: 1px solid ${INK};
          background: #fff;
          color: ${INK};
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.4px;
        }
        .fs-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fs-bullets li {
          border-left: 3px solid ${PURPLE};
          padding-left: 14px;
          font-size: 15px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .fs-apply {
          background: ${CREAM};
          text-align: center;
        }
        .fs-apply-inner {
          max-width: 420px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fs-apply .fs-kicker {
          margin-bottom: 12px;
        }
        .fs-apply h2 {
          max-width: 12ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 12px;
        }
        .fs-apply-lead {
          font-size: 16px;
          line-height: 1.55;
          color: #3a3a3a;
          margin: 0 0 24px;
          max-width: 28ch;
        }
        .fs-apply-note {
          margin: 14px 0 0;
          font-size: 12px;
          letter-spacing: 0.4px;
          color: #3a3a3a;
        }
        .fs-footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 22px 28px;
          border-top: 1px solid ${INK};
          border-bottom: 1px solid ${INK};
        }
        .fs-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .fs-footer a, .fs-footer span {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: ${INK};
          text-decoration: none;
        }
        @media (min-width: 720px) {
          .fs-grid-2 { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 960px) {
          .fs-grid-4 { grid-template-columns: repeat(4, 1fr); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fs-cta, .fs-submit { transition: none; }
          .fs-cta:hover, .fs-submit:hover { translate: none; }
        }
      `}</style>
    </main>
  )
}
