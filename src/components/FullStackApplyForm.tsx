'use client'

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { fullstackCourse } from '@/lib/fullstack-course'
import { track } from '@/lib/track'

const INK = '#0D0D0D'
const CREAM = '#F0EBE0'
const RED = '#fe3812'

type Step = 'start' | 'name' | 'email' | 'level' | 'goal' | 'done'

const STEPS: Array<Exclude<Step, 'start' | 'done'>> = ['name', 'email', 'level', 'goal']

function utmFromSearch() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? '',
  }
}

export default function FullStackApplyForm() {
  const [step, setStep] = useState<Step>('start')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState('')
  const [goal, setGoal] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const stepIndex = STEPS.indexOf(step as (typeof STEPS)[number])
  const progress = step === 'done' ? 100 : step === 'start' ? 0 : ((stepIndex + 1) / STEPS.length) * 100

  useEffect(() => {
    if (step === 'start' || step === 'done') return
    inputRef.current?.focus()
  }, [step])

  function goNext() {
    setError('')
    if (step === 'start') {
      track('fullstack_form_open')
      setStep('name')
      return
    }
    if (step === 'name') {
      if (name.trim().length < 2) {
        setError('Scrivi il tuo nome.')
        return
      }
      setStep('email')
      return
    }
    if (step === 'email') {
      if (!email.includes('@') || email.trim().length < 5) {
        setError('Inserisci un’email valida.')
        return
      }
      setStep('level')
      return
    }
    if (step === 'level') {
      if (!level) {
        setError('Scegli un’opzione.')
        return
      }
      setStep('goal')
    }
  }

  function goBack() {
    setError('')
    if (step === 'email') setStep('name')
    else if (step === 'level') setStep('email')
    else if (step === 'goal') setStep('level')
    else if (step === 'name') setStep('start')
  }

  async function submit(event?: FormEvent) {
    event?.preventDefault()
    setError('')
    if (goal.trim().length < 4) {
      setError('Raccontaci in breve perché ti interessa.')
      return
    }
    setBusy(true)
    track('fullstack_form_submit')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          contactType: 'candidatura',
          subject: `Candidatura · ${fullstackCourse.project.name}`,
          courseSlug: fullstackCourse.slug,
          level,
          goal: goal.trim(),
          message: [
            `Candidatura corso Full Stack (${fullstackCourse.project.name}).`,
            `Livello: ${level}`,
            `Obiettivo: ${goal.trim()}`,
          ].join('\n'),
          ...utmFromSearch(),
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Invio non riuscito')
      }
      setStep('done')
    } catch {
      setError('Non siamo riusciti a inviare. Riprova o scrivi a connect@off32.it.')
    } finally {
      setBusy(false)
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return
    if (step === 'goal' && !event.metaKey && !event.ctrlKey) return
    event.preventDefault()
    if (step === 'goal') void submit()
    else goNext()
  }

  return (
    <div className="fs-typeform">
      {step !== 'start' && step !== 'done' && (
        <div className="fs-typeform-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      )}

      {step === 'start' && (
        <div className="fs-typeform-start">
          <h2 id="fs-apply-title">
            Entra nel corso <span className="fs-apply-accent">{fullstackCourse.cta.finalAccent}</span> e costruisci Agenda32.
          </h2>
          <p className="fs-apply-lead">{fullstackCourse.cta.finalBody}</p>
          <button type="button" className="fs-cta" onClick={goNext}>
            {fullstackCourse.cta.primary}
          </button>
        </div>
      )}

      {step === 'name' && (
        <form className="fs-typeform-step" onSubmit={event => { event.preventDefault(); goNext() }}>
          <p className="fs-typeform-kicker">1 / 4</p>
          <label htmlFor="fs-name">Come ti chiami?</label>
          <input
            id="fs-name"
            ref={el => { inputRef.current = el }}
            value={name}
            onChange={event => setName(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Nome e cognome"
            autoComplete="name"
            required
          />
          <div className="fs-typeform-nav">
            <button type="button" className="fs-typeform-back" onClick={goBack}>Indietro</button>
            <button type="submit" className="fs-cta">Continua</button>
          </div>
        </form>
      )}

      {step === 'email' && (
        <form className="fs-typeform-step" onSubmit={event => { event.preventDefault(); goNext() }}>
          <p className="fs-typeform-kicker">2 / 4</p>
          <label htmlFor="fs-email">La tua email?</label>
          <input
            id="fs-email"
            ref={el => { inputRef.current = el }}
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="nome@email.com"
            autoComplete="email"
            required
          />
          <div className="fs-typeform-nav">
            <button type="button" className="fs-typeform-back" onClick={goBack}>Indietro</button>
            <button type="submit" className="fs-cta">Continua</button>
          </div>
        </form>
      )}

      {step === 'level' && (
        <div className="fs-typeform-step">
          <p className="fs-typeform-kicker">3 / 4</p>
          <p className="fs-typeform-question">A che livello sei?</p>
          <div className="fs-typeform-choices" role="list">
            {fullstackCourse.form.levels.map(option => (
              <button
                key={option}
                type="button"
                role="listitem"
                className={level === option ? 'is-on' : undefined}
                onClick={() => {
                  setLevel(option)
                  setError('')
                  setTimeout(() => setStep('goal'), 180)
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="fs-typeform-nav">
            <button type="button" className="fs-typeform-back" onClick={goBack}>Indietro</button>
          </div>
        </div>
      )}

      {step === 'goal' && (
        <form className="fs-typeform-step" onSubmit={submit}>
          <p className="fs-typeform-kicker">4 / 4</p>
          <label htmlFor="fs-goal">Perché vuoi fare questo corso?</label>
          <textarea
            id="fs-goal"
            ref={el => { inputRef.current = el }}
            value={goal}
            onChange={event => setGoal(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Il tuo obiettivo in poche righe"
            rows={4}
            required
          />
          <div className="fs-typeform-nav">
            <button type="button" className="fs-typeform-back" onClick={goBack} disabled={busy}>Indietro</button>
            <button type="submit" className="fs-cta" disabled={busy}>
              {busy ? 'Invio…' : 'Invia candidatura'}
            </button>
          </div>
        </form>
      )}

      {step === 'done' && (
        <div className="fs-typeform-done">
          <h2>Candidatura inviata.</h2>
          <p>Ti ricontatteremo a breve a <strong>{email}</strong>.</p>
        </div>
      )}

      {error ? <p className="fs-typeform-error" role="alert">{error}</p> : null}

      <style>{`
        .fs-typeform {
          width: min(640px, 100%);
          margin: 0 auto;
          text-align: left;
        }
        .fs-typeform-progress {
          height: 3px;
          background: rgba(240, 235, 224, 0.25);
          margin: 0 0 28px;
          overflow: hidden;
        }
        .fs-typeform-progress span {
          display: block;
          height: 100%;
          background: ${CREAM};
          transition: width 0.25s ease;
        }
        .fs-typeform-start {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fs-typeform-start h2,
        .fs-typeform-done h2 {
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(36px, 6.2vw, 72px);
          letter-spacing: -1.6px;
          line-height: 1.05;
          max-width: 16ch;
          margin: 0 auto 22px;
          color: ${CREAM};
          text-align: center;
        }
        .fs-typeform-done {
          text-align: center;
        }
        .fs-typeform-done p {
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.55;
          color: rgba(240, 235, 224, 0.88);
          margin: 0;
        }
        .fs-typeform-kicker {
          margin: 0 0 12px;
          font-size: 12px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(240, 235, 224, 0.7);
        }
        .fs-typeform-step label,
        .fs-typeform-question {
          display: block;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: clamp(28px, 4.5vw, 44px);
          letter-spacing: -1px;
          line-height: 1.15;
          color: ${CREAM};
          margin: 0 0 22px;
        }
        .fs-typeform-step input,
        .fs-typeform-step textarea {
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          border: none;
          border-bottom: 2px solid rgba(240, 235, 224, 0.45);
          color: ${CREAM};
          font-family: inherit;
          font-size: clamp(18px, 2.4vw, 24px);
          padding: 10px 0 14px;
          outline: none;
          resize: vertical;
        }
        .fs-typeform-step input::placeholder,
        .fs-typeform-step textarea::placeholder {
          color: rgba(240, 235, 224, 0.45);
        }
        .fs-typeform-step input:focus,
        .fs-typeform-step textarea:focus {
          border-bottom-color: ${CREAM};
        }
        .fs-typeform-choices {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fs-typeform-choices button {
          text-align: left;
          background: rgba(240, 235, 224, 0.08);
          border: 1px solid rgba(240, 235, 224, 0.35);
          color: ${CREAM};
          font-family: inherit;
          font-size: 16px;
          padding: 14px 16px;
          cursor: pointer;
        }
        .fs-typeform-choices button.is-on,
        .fs-typeform-choices button:hover {
          background: ${CREAM};
          color: ${INK};
          border-color: ${CREAM};
        }
        .fs-typeform-nav {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
        }
        .fs-typeform-back {
          background: transparent;
          border: none;
          color: rgba(240, 235, 224, 0.8);
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          padding: 8px 0;
        }
        .fs-typeform-back:disabled {
          opacity: 0.5;
          cursor: wait;
        }
        .fs-typeform-error {
          margin: 16px 0 0;
          color: ${CREAM};
          background: ${RED};
          padding: 10px 12px;
          font-size: 14px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  )
}
