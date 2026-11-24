'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  EVENT_KIND_LABEL,
  detailsInCommunity,
  eventWhen,
  events,
  type EventKind,
  type Off32Event,
} from '@/lib/events'

const CREAM = '#F0EBE0'
const INK = '#0D0D0D'
const PURPLE = '#694aff'
const LIME = '#9fff00'

const TONES = ['#fe3812', INK, PURPLE] as const

const FILTERS = ['Tutti', 'Workshop', 'Meet-up', 'Seminari'] as const
type Filter = (typeof FILTERS)[number]
type GroupId = Exclude<Filter, 'Tutti'>

const GROUPS: { id: GroupId; kind: EventKind }[] = [
  { id: 'Workshop', kind: 'workshop' },
  { id: 'Meet-up', kind: 'meet-up' },
  { id: 'Seminari', kind: 'seminario' },
]

function ink(tone: string) {
  return tone === CREAM || tone === LIME ? INK : CREAM
}

const MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']

function shortDate(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
}

function passLine(event: Off32Event) {
  if (event.date) {
    return [event.timeLabel ? `ore ${event.timeLabel}` : null, event.format].filter(Boolean).join(' · ')
  }
  return [event.duration, event.format].filter(Boolean).join(' · ')
}

function focusFor(event: Off32Event) {
  return event.slug === 'brand-identity-ai' ? 'center 42%' : 'center center'
}

function eventsFor(kind: EventKind) {
  return events.filter(event => event.kind === kind)
}

export default function Officina32Program() {
  const [filter, setFilter] = useState<Filter>('Tutti')
  const visible = GROUPS.filter(group => filter === 'Tutti' || group.id === filter)
  const passes = visible.flatMap(group => eventsFor(group.kind))

  return (
    <>
      <section className="officina32-calendar" aria-labelledby="officina32-calendario">
        <div className="officina32-calendar-head">
          <p className="officina32-kicker">Calendario</p>
          <h2 id="officina32-calendario">In calendario</h2>
          <p className="officina32-lead">
            Workshop, meet-up e seminari. Il calendario della community OFF32. Per partecipare, entra nella community: lì arrivano i dettagli.
          </p>
          <div className="officina32-filters" role="tablist" aria-label="Filtra il calendario">
            {FILTERS.map(item => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={filter === item ? 'officina32-filter is-on' : 'officina32-filter'}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {visible.map(group => {
          const items = eventsFor(group.kind)
          const seminarLine = group.kind === 'seminario' && items.length === 0
          return (
            <section key={group.id} className="officina32-cat" aria-labelledby={`officina32-${group.kind}`}>
              <h3 id={`officina32-${group.kind}`}>{group.id}</h3>
              {items.map(event => <EventPiece key={event.slug} event={event} />)}
              {seminarLine ? (
                <p className="officina32-kindline">
                  <strong>{EVENT_KIND_LABEL.seminario}</strong>
                  <span>Nel calendario della formazione, senza una data pubblicata.</span>
                </p>
              ) : null}
              {items.length === 0 && !seminarLine ? (
                <p className="officina32-empty">Nessun appuntamento pubblicato.</p>
              ) : null}
            </section>
          )
        })}
      </section>

      {passes.length > 0 ? (
        <section className="officina32-rail" aria-label="Pass degli appuntamenti">
          <div className="officina32-track">
            <div className="officina32-linebar" aria-hidden="true" />
            <div className="officina32-row">
              {passes.map((event, index) => {
                const tone = TONES[index % TONES.length]
                const external = Boolean(event.href?.startsWith('http'))
                const inner = (
                  <>
                    <span className="officina32-clip" aria-hidden="true" />
                    <span className="officina32-pass-kicker">{event.date ? shortDate(event.date) : 'Senza data'}</span>
                    <span className="officina32-pass-label">{EVENT_KIND_LABEL[event.kind]}</span>
                    <span className="officina32-pass-title">{event.title}</span>
                    <span className="officina32-pass-line">{passLine(event)}</span>
                    <span className="officina32-barcode" aria-hidden="true" />
                  </>
                )
                const style = { background: tone, color: ink(tone), ['--tilt' as string]: `${index % 2 === 0 ? -2 : 1.6}deg` }
                if (!event.href) {
                  return (
                    <article key={event.slug} className="officina32-pass" style={style}>
                      {inner}
                    </article>
                  )
                }
                return (
                  <a
                    key={event.slug}
                    className="officina32-pass"
                    href={event.href}
                    style={style}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

function EventPiece({ event }: { event: Off32Event }) {
  const external = Boolean(event.href?.startsWith('http'))
  const when = eventWhen(event)
  const open = event.status === 'upcoming'
  return (
    <article className={open ? 'officina32-card' : 'officina32-sheet'}>
      <div className="officina32-card-photo">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.imageAlt ?? event.title}
            fill
            sizes="(max-width: 900px) 90vw, 45vw"
            style={{ objectFit: 'cover', objectPosition: focusFor(event) }}
          />
        ) : null}
        <span>{EVENT_KIND_LABEL[event.kind]}</span>
      </div>
      <div className="officina32-card-body">
        <p className="officina32-card-kicker">{event.dateLabel ?? event.duration ?? 'Senza data'}</p>
        <h3>{event.title}</h3>
        <p className="officina32-card-summary">{event.summary}</p>
        <ul className="officina32-meta">
          {event.duration && !open ? <li>Durata: {event.duration}</li> : null}
          {event.format ? <li>Formato: {event.format}</li> : null}
          {event.audience ? <li>Per: {event.audience}</li> : null}
          {when ? <li>Quando: {when}</li> : null}
          {detailsInCommunity(event) ? <li>{event.outcomes?.[0]}</li> : null}
        </ul>
        {!open && event.outcomes && event.outcomes.length > 0 ? (
          <ul className="officina32-outcomes">
            {event.outcomes.map(item => <li key={item}>{item}</li>)}
          </ul>
        ) : null}
        {open && event.href ? (
          <div className="officina32-card-foot">
            <span>{event.price ?? ''}</span>
            <a href={event.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {event.cta ?? 'Partecipa'}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}
