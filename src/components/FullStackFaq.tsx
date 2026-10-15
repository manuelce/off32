'use client'

import { useState, type CSSProperties } from 'react'
import { confirmedItems, fullstackCourse } from '@/lib/fullstack-course'

const LINE = '1px solid #0D0D0D'

const meta: CSSProperties = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase',
  color: '#0D0D0D',
}

const heading: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontSize: 'clamp(32px, 4vw, 48px)',
  fontWeight: 300,
  letterSpacing: '-1px',
  lineHeight: 1.02,
  margin: 0,
  color: '#0D0D0D',
}

const body: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.75,
  color: '#3a3a3a',
  maxWidth: 'none',
  width: '100%',
  padding: '0 0 18px',
  margin: 0,
}

export default function FullStackFaq() {
  const faqs = confirmedItems(fullstackCourse.faqs)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (faqs.length === 0) return null

  return (
    <section style={{ paddingBottom: '8%' }} aria-labelledby="fs-faq-title">
      <div style={{ textAlign: 'center', padding: '48px 28px 32px' }}>
        <div style={{ ...meta, marginBottom: 12 }}>FAQ</div>
        <h2 id="fs-faq-title" style={heading}>Domande frequenti</h2>
      </div>
      <div style={{ width: '80%', margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            style={{ borderTop: LINE, borderBottom: i === faqs.length - 1 ? LINE : 'none' }}
          >
            <button
              type="button"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#0D0D0D',
                fontFamily: 'inherit',
                padding: '18px 0',
                fontSize: 15,
              }}
            >
              <span>{faq.q}</span>
              <span style={{ fontSize: 20, color: '#8a8378' }}>{openFaq === i ? '–' : '+'}</span>
            </button>
            {openFaq === i ? <p style={body}>{faq.a}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}
