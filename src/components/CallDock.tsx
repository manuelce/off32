'use client'

import { useEffect, useState, type FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function CallDock() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: 'Call gratuita di 20 minuti',
          message: 'Richiesta di una call gratuita di 20 minuti.',
          contactType: 'call',
        }),
      })
      if (!response.ok) throw new Error('send')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="call-dock">
      {open && (
        <div className="call-panel" role="dialog" aria-label="Prenota una call gratuita di 20 minuti">
          <div className="call-panel-head">
            <span>Call gratuita · 20&apos;</span>
            <button type="button" className="call-close" onClick={() => setOpen(false)} aria-label="Chiudi">×</button>
          </div>
          {status === 'success' ? (
            <p className="call-note">Richiesta inviata. Ti scriviamo per fissare i 20 minuti.</p>
          ) : (
            <form onSubmit={submit}>
              <p className="call-note">Nome e email. Ti rispondiamo per fissare la call.</p>
              <label>
                Nome
                <input value={name} onChange={event => setName(event.target.value)} name="name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input value={email} onChange={event => setEmail(event.target.value)} name="email" type="email" required autoComplete="email" />
              </label>
              {status === 'error' && <p className="call-error">Non è partita. Riprova o scrivi a connect@off32.it.</p>}
              <button type="submit" className="call-send" disabled={status === 'loading'}>
                {status === 'loading' ? 'Invio…' : 'Prenota'}
              </button>
            </form>
          )}
        </div>
      )}
      <button
        type="button"
        className="call-fab"
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        Prenota una call gratuita di 20&apos;
      </button>
      <style>{`
        .call-dock {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          max-width: calc(100vw - 32px);
        }
        .call-fab {
          background: #F0EBE0;
          color: #0D0D0D;
          border: 2px solid #0D0D0D;
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding: 14px 16px;
          cursor: pointer;
          text-align: left;
          animation: call-border 8s linear infinite;
        }
        .call-panel {
          width: min(320px, calc(100vw - 32px));
          background: #F0EBE0;
          color: #0D0D0D;
          border: 1px solid #0D0D0D;
          padding: 16px 16px 18px;
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
        }
        .call-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .call-close {
          border: 0;
          background: transparent;
          color: #0D0D0D;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          padding: 0 2px;
        }
        .call-note {
          margin: 12px 0 14px;
          font-size: 14px;
          line-height: 1.45;
        }
        .call-panel label {
          display: block;
          margin-bottom: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }
        .call-panel input {
          display: block;
          width: 100%;
          margin-top: 6px;
          box-sizing: border-box;
          border: 1px solid #0D0D0D;
          background: transparent;
          color: #0D0D0D;
          font-family: inherit;
          font-size: 14px;
          padding: 10px 12px;
        }
        .call-send {
          width: 100%;
          margin-top: 4px;
          background: #0D0D0D;
          color: #F0EBE0;
          border: 1px solid #0D0D0D;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 12px 14px;
          cursor: pointer;
        }
        .call-send:disabled { opacity: 0.6; cursor: default; }
        .call-error { margin: 0 0 10px; font-size: 13px; color: #fe3812; }
        @keyframes call-border {
          0%, 20% { border-color: #0D0D0D; }
          25%, 45% { border-color: #9fff00; }
          50%, 70% { border-color: #694aff; }
          75%, 95% { border-color: #fe3812; }
          100% { border-color: #0D0D0D; }
        }
        @media (max-width: 768px) {
          .call-dock { right: 16px; bottom: 88px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .call-fab { animation: none; }
        }
      `}</style>
    </div>
  )
}
