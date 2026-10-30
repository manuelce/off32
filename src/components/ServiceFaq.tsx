'use client'

import { useState } from 'react'
import { emphasizeBrandTerms } from '@/lib/emphasize-terms'
import type { ServiceFaq } from '@/lib/services'

const LINE = '1px solid #0D0D0D'

export default function ServiceFaqList({
  faqs,
  fullWidth = false,
  emphasize = false,
}: {
  faqs: ServiceFaq[]
  fullWidth?: boolean
  emphasize?: boolean
}) {
  const [open, setOpen] = useState<number | null>(0)

  if (faqs.length === 0) return null

  return (
    <div style={{ width: '100%' }}>
      {faqs.map((faq, i) => (
        <div
          key={faq.q}
          style={{ borderTop: LINE, borderBottom: i === faqs.length - 1 ? LINE : 'none' }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
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
            <span style={{ flex: 1 }}>{emphasize ? emphasizeBrandTerms(faq.q) : faq.q}</span>
            <span style={{ fontSize: 20, color: '#8a8378', flex: 'none' }}>{open === i ? '–' : '+'}</span>
          </button>
          {open === i ? (
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: '#3a3a3a',
                margin: '0 0 18px',
                maxWidth: fullWidth ? '100%' : '68ch',
                width: fullWidth ? '100%' : undefined,
              }}
            >
              {emphasize ? emphasizeBrandTerms(faq.a) : faq.a}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}
