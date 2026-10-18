'use client'

import { useEffect, useRef, useState } from 'react'
import FullStackApplyForm from '@/components/FullStackApplyForm'
import FullStackFaq from '@/components/FullStackFaq'
import { fullstackCourse, isConfirmed } from '@/lib/fullstack-course'
import { track } from '@/lib/track'

const INK = '#0D0D0D'
const CREAM = '#F0EBE0'
const PURPLE = '#694aff'
const RED = '#fe3812'

function scrollToApply() {
  track('fullstack_cta_click')
  document.getElementById('candidati')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ProjectVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    void video.play()
    setPlaying(true)
  }

  return (
    <div className={`fs-video-frame${playing ? ' is-playing' : ''}`}>
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        poster={poster || undefined}
        src={src}
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        Il tuo browser non supporta il video.
      </video>
      {!playing && (
        <button
          type="button"
          className="fs-video-play"
          onClick={handlePlay}
          aria-label="Riproduci video"
        >
          <span className="fs-video-play-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  )
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
    { label: 'Partenza', value: fullstackCourse.startLabel },
    { label: 'Durata', value: `${fullstackCourse.weeks} settimane / ${fullstackCourse.hoursLabel}` },
    { label: 'Prezzo di lancio', value: fullstackCourse.price },
    { label: 'Lezione gratis', value: '1 ora prima di iscriverti' },
  ]
  return (
    <main className="fs-page" style={{ background: CREAM, color: INK, minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif" }}>
      {/* 01 · Hero */}
      <section className="fs-hero" aria-labelledby="fs-hero-title">
        <div className="fs-hero-project">
          <span className="fs-badge">{fullstackCourse.hero.badge}</span>
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
            <h1 id="fs-hero-title">{fullstackCourse.hero.title}</h1>
            <div className="fs-intro">
              {fullstackCourse.hero.lines.map(line => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="fs-cta-block">
              <button type="button" className="fs-cta" onClick={scrollToApply}>
                {fullstackCourse.cta.primary}
              </button>
              <p className="fs-urgency">
                {fullstackCourse.weeks} settimane / {fullstackCourse.hoursLabel} · parte l’{fullstackCourse.startLabel} · max {fullstackCourse.maxParticipants.value} posti
              </p>
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

      {/* 02 · Video progetto — riattiva con projectVideo.confirmed: true */}
      {isConfirmed(fullstackCourse.projectVideo) && (
        <section className="fs-section fs-project-video" aria-labelledby="fs-project-video-title">
          <div className="fs-kicker">{fullstackCourse.projectVideo.kicker}</div>
          <h2 id="fs-project-video-title">{fullstackCourse.projectVideo.title}</h2>
          <p className="fs-section-lead">{fullstackCourse.projectVideo.lead}</p>
          {fullstackCourse.projectVideo.src ? (
            <ProjectVideoPlayer
              src={fullstackCourse.projectVideo.src}
              poster={fullstackCourse.projectVideo.poster || undefined}
            />
          ) : (
            <div className="fs-video-frame">
              <div className="fs-video-placeholder" aria-hidden="true">
                <span>Video in arrivo</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 03 · Per chi è + outcome */}
      <section className="fs-for-who" aria-labelledby="fs-for-who-title">
        <div className="fs-for-who-inner">
          <div className="fs-kicker">{fullstackCourse.forWho.kicker}</div>
          <h2 id="fs-for-who-title">{fullstackCourse.forWho.title}</h2>
          <p className="fs-for-who-lead">{fullstackCourse.forWho.lead}</p>
          <div className="fs-for-who-cols">
            <article className="fs-for-who-panel">
              <h3>{fullstackCourse.forWho.audienceTitle}</h3>
              <ul className="fs-for-who-checks">
                {fullstackCourse.forWho.points.map(point => (
                  <li key={point.title}>
                    <span className="fs-for-who-check" aria-hidden="true">√</span>
                    <div>
                      <strong>{point.title}</strong>
                      <p>{point.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
            <article className="fs-for-who-panel">
              <h3>{fullstackCourse.forWho.outcomesTitle}</h3>
              <ul className="fs-for-who-checks">
                {fullstackCourse.forWho.outcomes.map(item => (
                  <li key={item}>
                    <span className="fs-for-who-check" aria-hidden="true">√</span>
                    <div>
                      <strong>{item}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 04 · Percorso in 5 tappe + stack */}
      <section className="fs-section fs-learn" aria-labelledby="fs-learn">
        <div className="fs-learn-head">
          <div className="fs-kicker">Il percorso</div>
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
                <p className="fs-orbit-outcome">{step.outcome}</p>
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

      {/* 04 · Perché questo corso (+ chi ti guiderà) */}
      <section className="fs-section fs-why" aria-labelledby="fs-why-title">
        <div className="fs-kicker">Perché questo corso</div>
        <h2 id="fs-why-title">Gruppo piccolo, supporto reale</h2>
        <div className="fs-value-grid">
          {fullstackCourse.whyOff32.map(point => (
            <article key={point.title} className="fs-value-card">
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
        {isConfirmed(fullstackCourse.instructor) && (
          <div className="fs-why-guide" aria-labelledby="fs-instructor-title">
            <div className="fs-kicker" id="fs-instructor-title">Chi ti guiderà</div>
            <div className="fs-instructor-card">
              <img
                src={fullstackCourse.instructor.image}
                alt={fullstackCourse.instructor.name}
                width={160}
                height={160}
              />
              <div>
                <p className="fs-instructor-role">{fullstackCourse.instructor.role}</p>
                <h3>{fullstackCourse.instructor.name}</h3>
                <p className="fs-instructor-bio">{fullstackCourse.instructor.bio}</p>
                <a href={fullstackCourse.instructor.href}>Scopri di più</a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 05 · Feedback alunni */}
      <section className="fs-section fs-testimonials" aria-labelledby="fs-testimonials-title">
        <div className="fs-kicker">Feedback</div>
        <h2 id="fs-testimonials-title">Cosa dicono gli allievi</h2>
        <div className="fs-testimonials-grid">
          {fullstackCourse.testimonials.map(item => (
            <blockquote key={`${item.name}-${item.role}`} className="fs-testimonial-card">
              <header className="fs-testimonial-head">
                {'image' in item && item.image ? (
                  <img
                    className="fs-testimonial-avatar"
                    src={item.image}
                    alt=""
                    width={44}
                    height={44}
                  />
                ) : (
                  <span
                    className="fs-testimonial-avatar"
                    style={{ background: item.avatar }}
                    aria-hidden="true"
                  >
                    {item.name.trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <div>
                  <cite>{item.name}</cite>
                  <span className="fs-testimonial-role">{item.role}</span>
                </div>
              </header>
              <p className="fs-testimonial-quote">{item.quote}</p>
              <footer className="fs-testimonial-source">
                {item.source === 'google' ? (
                  <span className="fs-source-google">
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </span>
                ) : (
                  <span className="fs-source-superprof">Superprof</span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* 06 · Risultato dichiarato */}
      <section className="fs-section fs-offer" aria-labelledby="fs-offer-title">
        <div className="fs-offer-main">
          <div className="fs-offer-copy">
            <div className="fs-kicker">{fullstackCourse.offer.kicker}</div>
            <h2 id="fs-offer-title">{fullstackCourse.offer.title}</h2>
            <p className="fs-section-lead">{fullstackCourse.offer.lead}</p>
            <div className="fs-offer-cta">
              <button type="button" className="fs-cta" onClick={scrollToApply}>
                {fullstackCourse.cta.primary}
              </button>
              <p className="fs-offer-note">{fullstackCourse.freeLesson.body}</p>
            </div>
          </div>
          <div className="fs-offer-visual">
            <div className="fs-browser">
              <div className="fs-browser-bar" aria-hidden="true">
                <span /><span /><span />
                <div className="fs-browser-url">{fullstackCourse.offer.visual.url}</div>
              </div>
              <div className="fs-browser-screen">
                <img
                  src={fullstackCourse.offer.visual.src}
                  alt={fullstackCourse.offer.visual.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · FAQ */}
      <FullStackFaq />

      {/* 08 · CTA finale */}
      <section id="candidati" className="fs-apply" aria-labelledby="fs-apply-title">
        <div className="fs-apply-center">
          <FullStackApplyForm />
        </div>
        <ul className="fs-apply-points">
          {fullstackCourse.cta.finalPoints.map(point => (
            <li key={point}>
              <span aria-hidden="true">✓</span>
              {point}
            </li>
          ))}
        </ul>
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
          padding: 0 0 56px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 40px;
          border-bottom: none;
          box-sizing: border-box;
        }
        .fs-hero-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
          padding: 0 5%;
        }
        .fs-hero-project {
          text-align: center;
          width: 100vw;
          margin: 0 calc(50% - 50vw) 40px;
          padding: 140px 5% 96px;
          box-sizing: border-box;
          background: ${PURPLE};
          color: ${CREAM};
          border-bottom: 1px solid #141414;
        }
        .fs-hero-project .fs-badge {
          align-self: center;
          margin: 0 auto 22px;
          background: ${CREAM};
          box-shadow: 3px 3px 0 ${INK};
        }
        .fs-hero-project h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 5.5vw, 64px);
          letter-spacing: -1.4px;
          line-height: 1.02;
          margin: 0 auto 14px;
          max-width: 72ch;
          color: ${CREAM};
        }
        .fs-project-name {
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.8px;
          margin: 0 auto 16px;
          max-width: 72ch;
          color: ${CREAM};
        }
        .fs-hero-project .fs-project-summary {
          color: rgba(240, 235, 224, 0.88);
        }
        .street-word { position: relative; display: inline-block; }
        .events-underline {
          position: absolute;
          left: -1%;
          bottom: 0.02em;
          width: 104%;
          height: 0.22em;
          background: ${RED};
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
        .fs-for-who {
          width: 100%;
          margin: 0;
          padding: 72px 0;
          border-bottom: none;
          background: #fff;
        }
        .fs-for-who-inner {
          width: 100%;
          padding: 0 5%;
          box-sizing: border-box;
        }
        .fs-for-who h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(32px, 5vw, 52px);
          letter-spacing: -1.2px;
          line-height: 1.05;
          margin: 0 0 16px;
          max-width: 22ch;
        }
        .fs-for-who-lead {
          font-size: 16px;
          line-height: 1.65;
          color: #3a3a3a;
          max-width: 52ch;
          margin: 0 0 32px;
        }
        .fs-for-who-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          width: 100%;
        }
        .fs-for-who-panel {
          border: 1px solid ${INK};
          background: ${CREAM};
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 22px 22px 20px;
        }
        .fs-for-who-panel h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(24px, 3vw, 32px);
          letter-spacing: -0.6px;
          margin: 0 0 18px;
          max-width: 16ch;
        }
        .fs-for-who-checks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .fs-for-who-checks li {
          display: grid;
          grid-template-columns: 22px minmax(0, 1fr);
          gap: 10px;
          align-items: start;
        }
        .fs-for-who-check {
          color: ${PURPLE};
          font-size: 16px;
          font-weight: 800;
          line-height: 1.35;
        }
        .fs-for-who-checks strong {
          display: block;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
          line-height: 1.35;
        }
        .fs-for-who-checks p {
          margin: 4px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: #3a3a3a;
          font-weight: 400;
        }
        @media (min-width: 900px) {
          .fs-for-who {
            padding: 88px 0;
          }
          .fs-for-who-cols {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
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
          background: ${RED};
          color: ${CREAM};
          border: 1px solid ${RED};
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
            padding-top: 0;
            padding-bottom: 64px;
            min-height: 90vh;
            min-height: 90dvh;
          }
          .fs-hero-project {
            padding-top: 156px;
            padding-bottom: 108px;
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
            padding-top: 0;
            padding-bottom: 48px;
          }
          .fs-hero-project {
            padding-top: 124px;
            padding-bottom: 80px;
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
        .fs-section.fs-why {
          border-bottom: none;
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
        .fs-project-video .fs-video-frame {
          position: relative;
          width: 100%;
          margin: 0;
          background: #fff;
          border: 1px solid ${INK};
          box-shadow: 10px 10px 0 ${PURPLE};
          overflow: hidden;
          aspect-ratio: 16 / 9;
        }
        .fs-project-video .fs-video-frame video,
        .fs-project-video .fs-video-placeholder {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: ${INK};
        }
        .fs-project-video .fs-video-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${CREAM};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .fs-video-play {
          position: absolute;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 0;
          z-index: 2;
        }
        .fs-video-play:hover {
          translate: calc(-50% + 1px) calc(-50% + 1px);
          box-shadow: 3px 3px 0 ${PURPLE};
        }
        .fs-video-play-icon {
          display: block;
          width: 0;
          height: 0;
          margin-left: 4px;
          border-style: solid;
          border-width: 11px 0 11px 18px;
          border-color: transparent transparent transparent ${PURPLE};
        }
        @media (min-width: 900px) {
          .fs-project-video {
            text-align: center;
          }
          .fs-project-video h2,
          .fs-project-video .fs-section-lead {
            margin-left: auto;
            margin-right: auto;
          }
          .fs-project-video .fs-video-frame {
            width: 80%;
            margin-left: auto;
            margin-right: auto;
          }
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
          width: min(220px, 36%);
          transform: translate(-50%, -50%);
          text-align: left;
        }
        .fs-orbit-item-1 { left: 50%; top: 8%; text-align: center; width: min(260px, 44%); }
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
        .fs-orbit-item .fs-orbit-outcome {
          margin-top: 8px;
          font-size: clamp(12px, 1.25vw, 14px);
          line-height: 1.45;
          color: ${CREAM};
          font-weight: 600;
        }
        .fs-info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: start;
        }
        .fs-info-split h2 {
          max-width: 16ch;
        }
        .fs-includes h2 {
          max-width: 18ch;
        }
        .fs-instructor-card {
          display: grid;
          grid-template-columns: minmax(148px, 42%) minmax(0, 1fr);
          gap: 18px;
          align-items: stretch;
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 6px 6px 0 ${PURPLE};
          padding: 16px;
        }
        .fs-instructor-card img {
          width: 100%;
          height: 100%;
          min-height: 168px;
          object-fit: cover;
          object-position: center 18%;
          display: block;
          border: 1px solid ${INK};
          align-self: stretch;
        }
        .fs-instructor-card > div {
          align-self: center;
          min-width: 0;
        }
        .fs-instructor-role {
          margin: 0 0 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .fs-instructor-card h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(24px, 2.8vw, 32px);
          letter-spacing: -0.8px;
          margin: 0 0 10px;
        }
        .fs-instructor-bio {
          margin: 0 0 14px;
          font-size: 14px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .fs-instructor-card a {
          color: ${INK};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.4px;
        }
        .fs-feature-list {
          list-style: none;
          margin: 28px 0 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          max-width: 760px;
        }
        .fs-feature-list li {
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 14px 16px;
          font-size: 15px;
          line-height: 1.45;
        }
        .fs-value-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 28px;
        }
        .fs-value-card {
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 20px 22px;
        }
        .fs-value-card h3 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(22px, 2.6vw, 28px);
          letter-spacing: -0.5px;
          margin: 0 0 8px;
        }
        .fs-value-card p {
          margin: 0;
          font-size: 15px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        .fs-offer-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          align-items: center;
        }
        .fs-offer-copy {
          min-width: 0;
        }
        .fs-offer h2 {
          max-width: 18ch;
        }
        .fs-offer .fs-section-lead {
          margin-bottom: 0;
        }
        .fs-offer-visual {
          width: 100%;
          min-width: 0;
        }
        .fs-offer-cta {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .fs-offer-note {
          margin: 0;
          max-width: 48ch;
          font-size: 14px;
          line-height: 1.55;
          color: #3a3a3a;
        }
        @media (min-width: 900px) {
          .fs-offer-main {
            grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
            gap: 48px;
          }
        }
        .fs-testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-top: 28px;
        }
        .fs-testimonial-card {
          margin: 0;
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 20px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .fs-testimonial-head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .fs-testimonial-avatar {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid ${INK};
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0;
          object-fit: cover;
          object-position: center top;
        }
        .fs-testimonial-head cite {
          display: block;
          font-style: normal;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .fs-testimonial-role {
          display: block;
          margin-top: 2px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #3a3a3a;
        }
        .fs-testimonial-quote {
          margin: 0;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(16px, 1.8vw, 19px);
          letter-spacing: -0.25px;
          line-height: 1.4;
          color: ${INK};
          flex: 1;
        }
        .fs-testimonial-source {
          margin-top: auto;
          display: flex;
          align-items: center;
        }
        .fs-source-google,
        .fs-source-superprof {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: #6a6a6a;
        }
        .fs-source-google svg {
          display: block;
          flex-shrink: 0;
        }
        .fs-why-guide {
          margin-top: 48px;
        }
        .fs-why-guide .fs-kicker {
          margin-bottom: 14px;
        }
        .fs-why-guide .fs-instructor-card {
          max-width: none;
          width: 100%;
        }
        @media (min-width: 720px) {
          .fs-why-guide .fs-instructor-card {
            width: calc(50% - 7px);
          }
        }
        .fs-includes-head {
          margin-bottom: 20px;
        }
        .fs-includes-price {
          margin: 10px 0 0;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          letter-spacing: -0.8px;
        }
        .fs-includes-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .fs-includes-list-wide {
          max-width: 960px;
        }
        .fs-includes-list li {
          border: 1px solid ${INK};
          background: #fff;
          box-shadow: 4px 4px 0 ${PURPLE};
          padding: 14px 16px;
          font-size: 14px;
          line-height: 1.45;
        }
        .fs-includes-cta {
          margin-top: 28px;
        }
        @media (min-width: 720px) {
          .fs-feature-list,
          .fs-value-grid,
          .fs-includes-list-wide {
            grid-template-columns: 1fr 1fr;
          }
          .fs-testimonials-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 960px) {
          .fs-testimonials-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (min-width: 960px) {
          .fs-info-grid {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            gap: 48px;
          }
        }
        @media (max-width: 640px) {
          .fs-instructor-card {
            grid-template-columns: 1fr;
          }
          .fs-instructor-card img {
            width: 100%;
            height: auto;
            min-height: 0;
            aspect-ratio: 1 / 1;
          }
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
        .fs-learn .fs-stack-block {
          text-align: center;
        }
        .fs-learn .fs-stack-block .fs-kicker {
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
          background: ${PURPLE};
          color: ${CREAM};
          text-align: center;
          border-bottom: none;
          min-height: 100vh;
          min-height: 100dvh;
          padding: 96px 5% 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          box-sizing: border-box;
        }
        .fs-apply-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }
        .fs-apply h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 6.2vw, 72px);
          letter-spacing: -1.6px;
          line-height: 1.05;
          max-width: 16ch;
          margin: 0 auto 22px;
          color: ${CREAM};
        }
        .fs-apply-accent {
          color: rgba(240, 235, 224, 0.72);
        }
        .fs-apply-lead {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.55;
          color: rgba(240, 235, 224, 0.88);
          margin: 0 0 36px;
          max-width: 36ch;
        }
        .fs-apply-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .fs-apply .fs-cta {
          background: ${RED};
          color: ${CREAM};
          border-color: ${RED};
          box-shadow: 4px 4px 0 ${CREAM};
          text-decoration: none;
        }
        .fs-apply .fs-cta:hover {
          box-shadow: 3px 3px 0 ${CREAM};
        }
        .fs-apply-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px 28px;
          width: 100%;
          max-width: 980px;
        }
        .fs-apply-points li {
          display: inline-flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.4;
          color: rgba(240, 235, 224, 0.9);
          text-align: left;
          max-width: 28ch;
        }
        .fs-apply-points li span {
          color: ${RED};
          font-weight: 700;
          flex: none;
        }
        @media (max-width: 720px) {
          .fs-apply {
            min-height: 100svh;
            padding: 88px 5% 36px;
            gap: 22px;
          }
          .fs-apply h2 {
            max-width: 14ch;
          }
          .fs-apply-points {
            flex-direction: column;
            align-items: center;
            gap: 14px;
          }
          .fs-apply-points li {
            max-width: 34ch;
            text-align: left;
          }
        }
        .fs-footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 22px 28px;
          background: ${PURPLE};
          border-top: 1px solid rgba(240, 235, 224, 0.28);
          border-bottom: none;
        }
        .fs-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .fs-footer a, .fs-footer span {
          font-size: 11px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: ${CREAM};
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
