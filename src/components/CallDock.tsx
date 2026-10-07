'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const ROME = 'Europe/Rome'
const SLOT_START = 10 * 60
const SLOT_END = 18 * 60
const SLOT = 20
const HORIZON = 180
const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function romeNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: ROME,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const read = (type: string) => Number(parts.find(part => part.type === type)?.value)
  return { year: read('year'), month: read('month'), day: read('day'), minutes: read('hour') * 60 + read('minute') }
}

function dayKey(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`
}

function parseKey(key: string) {
  const [year, month, day] = key.split('-').map(Number)
  return { year, month, day }
}

function weekday(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

function mondayIndex(year: number, month: number, day: number) {
  return (weekday(year, month, day) + 6) % 7
}

function shiftKey(key: string, days: number) {
  const { year, month, day } = parseKey(key)
  const next = new Date(Date.UTC(year, month - 1, day + days))
  return dayKey(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate())
}

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1))
}

function dayLabel(key: string) {
  const { year, month, day } = parseKey(key)
  return new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(year, month - 1, day))
}

function clock(minutes: number) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`
}

function slotsFor(key: string, todayKey: string, nowMinutes: number) {
  const times: number[] = []
  for (let start = SLOT_START; start + SLOT <= SLOT_END; start += SLOT) {
    if (key === todayKey && start <= nowMinutes) continue
    times.push(start)
  }
  return times
}

function monthCells(year: number, month: number) {
  const count = new Date(year, month, 0).getDate()
  const lead = mondayIndex(year, month, 1)
  const cells: Array<string | null> = Array.from({ length: lead }, () => null)
  for (let day = 1; day <= count; day += 1) cells.push(dayKey(year, month, day))
  return cells
}

export default function CallDock() {
  const today = useMemo(() => romeNow(), [])
  const todayKey = dayKey(today.year, today.month, today.day)
  const lastKey = shiftKey(todayKey, HORIZON)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cursor, setCursor] = useState({ year: today.year, month: today.month })
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<number | null>(null)
  const [missing, setMissing] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const cells = monthCells(cursor.year, cursor.month)
  const times = day ? slotsFor(day, todayKey, today.minutes) : []
  const when = day && slot !== null ? `${dayLabel(day)}, ${clock(slot)}–${clock(slot + SLOT)} (ora di Roma)` : ''

  function close() {
    setOpen(false)
    setStatus('idle')
    setMissing(false)
  }

  useEffect(() => {
    const toggle = () => setOpen(value => !value)
    window.addEventListener('off32-toggle-call', toggle)
    return () => window.removeEventListener('off32-toggle-call', toggle)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function moveMonth(delta: number) {
    setCursor(current => {
      const next = new Date(current.year, current.month - 1 + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() + 1 }
    })
  }

  function pickDay(key: string) {
    setDay(key)
    setSlot(null)
    setMissing(false)
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (status === 'loading') return
    if (!when) {
      setMissing(true)
      return
    }
    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: `Call '20 · ${when}`,
          message: `Richiesta di una call gratuita di 20 minuti.\n${when}`,
          when,
          contactType: 'call',
        }),
      })
      if (!response.ok) throw new Error('send')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const prevKey = dayKey(cursor.year, cursor.month, 1)
  const nextMonth = cursor.month === 12 ? { year: cursor.year + 1, month: 1 } : { year: cursor.year, month: cursor.month + 1 }
  const canGoBack = prevKey > dayKey(today.year, today.month, 1)
  const canGoForward = dayKey(nextMonth.year, nextMonth.month, 1) <= lastKey

  return (
    <>
      {open && (
        <div className="call-modal" onClick={close}>
          <div
            className="call-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-dialog-title"
            onClick={event => event.stopPropagation()}
          >
            <div className="call-panel-head">
              <h2 id="call-dialog-title">Call &apos;20</h2>
              <button ref={closeRef} type="button" className="call-close" onClick={close} aria-label="Chiudi">×</button>
            </div>
            {status === 'success' ? (
              <p className="call-note">Richiesta inviata per {when}. Ti scriviamo per confermare la call gratuita.</p>
            ) : (
              <>
                <p className="call-note">
                  Venti minuti per parlarci del progetto. La call è gratuita: scegli un giorno e un orario per bloccarla.
                </p>
                <div className="call-grid">
                  <div className="call-cal">
                    <div className="call-month">
                      <button type="button" onClick={() => moveMonth(-1)} disabled={!canGoBack} aria-label="Mese precedente">‹</button>
                      <span>{monthLabel(cursor.year, cursor.month)}</span>
                      <button type="button" onClick={() => moveMonth(1)} disabled={!canGoForward} aria-label="Mese successivo">›</button>
                    </div>
                    <div className="call-week">
                      {WEEKDAYS.map(label => <span key={label}>{label}</span>)}
                    </div>
                    <div className="call-days">
                      {cells.map((key, index) => {
                        if (!key) return <span key={`empty-${index}`} />
                        const { year, month, day: date } = parseKey(key)
                        const weekend = mondayIndex(year, month, date) >= 5
                        const disabled = weekend || key < todayKey || key > lastKey
                        const selected = key === day
                        return (
                          <button
                            key={key}
                            type="button"
                            className={selected ? 'is-on' : undefined}
                            disabled={disabled}
                            onClick={() => pickDay(key)}
                          >
                            {date}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <form onSubmit={submit}>
                    <div className="call-slot-label">
                      {day ? dayLabel(day) : 'Scegli un giorno'}
                      {slot !== null ? ` · ${clock(slot)}–${clock(slot + SLOT)}` : ''}
                    </div>
                    {day && times.length === 0 && <p className="call-empty">Nessun orario rimasto in questa giornata.</p>}
                    {times.length > 0 && (
                      <div className="call-slots">
                        {times.map(time => (
                          <button
                            key={time}
                            type="button"
                            className={slot === time ? 'is-on' : undefined}
                            onClick={() => { setSlot(time); setMissing(false) }}
                          >
                            {clock(time)}
                          </button>
                        ))}
                      </div>
                    )}
                    <label>
                      Nome
                      <input value={name} onChange={event => setName(event.target.value)} name="name" required autoComplete="name" />
                    </label>
                    <label>
                      Email
                      <input value={email} onChange={event => setEmail(event.target.value)} name="email" type="email" required autoComplete="email" />
                    </label>
                    {missing && <p className="call-error">Scegli giorno e orario.</p>}
                    {status === 'error' && <p className="call-error">Non è partita. Riprova o scrivi a connect@off32.it.</p>}
                    <button type="submit" className="call-send" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Invio…' : 'Prenota'}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`
        .call-modal {
          position: fixed;
          inset: 0;
          z-index: 10050;
          background: rgba(13, 13, 13, 0.72);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        }
        .call-dialog {
          width: min(820px, 100%);
          max-height: min(780px, calc(100vh - 48px));
          overflow: auto;
          background: #F0EBE0;
          color: #0D0D0D;
          border: 1px solid #0D0D0D;
          padding: 22px 22px 24px;
          font-family: 'Axiforma', 'Helvetica Neue', sans-serif;
        }
        .call-panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .call-panel-head h2 {
          margin: 0;
          font-family: 'Canela', Georgia, serif;
          font-weight: 300;
          font-size: 40px;
          letter-spacing: -0.6px;
          line-height: 1;
        }
        .call-close {
          border: 0;
          background: transparent;
          color: #0D0D0D;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          padding: 0 2px;
        }
        .call-note {
          margin: 14px 0 18px;
          max-width: 62ch;
          font-size: 15px;
          line-height: 1.55;
        }
        .call-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 28px;
          align-items: start;
        }
        .call-month {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 700;
          text-transform: capitalize;
        }
        .call-month button {
          width: 32px;
          height: 32px;
          border: 1px solid #0D0D0D;
          background: transparent;
          color: #0D0D0D;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
        }
        .call-month button:disabled { opacity: 0.3; cursor: default; }
        .call-week, .call-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .call-week span {
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: #3a3a3a;
          padding-bottom: 4px;
        }
        .call-days button, .call-days span {
          aspect-ratio: 1;
          min-height: 36px;
        }
        .call-days button {
          border: 1px solid #0D0D0D;
          background: transparent;
          color: #0D0D0D;
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
        }
        .call-days button:disabled {
          border-color: transparent;
          color: #b5b0a6;
          cursor: default;
        }
        .call-days button.is-on, .call-slots button.is-on {
          background: #0D0D0D;
          color: #F0EBE0;
          border-color: #0D0D0D;
        }
        .call-slot-label {
          margin-bottom: 10px;
          font-size: 13px;
          font-weight: 700;
        }
        .call-empty { margin: 0 0 14px; font-size: 14px; }
        .call-slots {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-bottom: 16px;
          max-height: 196px;
          overflow: auto;
        }
        .call-slots button {
          border: 1px solid #0D0D0D;
          background: transparent;
          color: #0D0D0D;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 4px;
          cursor: pointer;
        }
        .call-dialog label {
          display: block;
          margin-bottom: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }
        .call-dialog input {
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
        @media (max-width: 720px) {
          .call-dialog { padding: 18px 16px 20px; }
          .call-panel-head h2 { font-size: 32px; }
          .call-grid { grid-template-columns: 1fr; gap: 18px; }
          .call-slots { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </>
  )
}
