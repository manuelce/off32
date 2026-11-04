'use client'

import { useEffect, useState, type CSSProperties } from 'react'

const LINE = '1px solid #0D0D0D'

const defaultTextStyle: CSSProperties = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(72px, 12vw, 168px)',
  lineHeight: 0.88,
  letterSpacing: '-3px',
}

type TitleLine = {
  text: string
  align: 'left' | 'right'
}

type Props = {
  lines: TitleLine[]
  className?: string
  background?: string
  color?: string
  /** Override border color (e.g. cream on purple). */
  border?: string
}

/** Same entrance as Events Cultura/Inclusione/Formazione: opposite side → final, 0.7s ease-out. */
export default function SplitPageTitle({
  lines,
  className,
  background,
  color = '#0D0D0D',
  border = LINE,
}: Props) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setInView(true))
    })
    return () => window.cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <h1
        className={['split-page-title', inView ? 'is-in' : '', className].filter(Boolean).join(' ')}
        style={{ margin: 0, background }}
      >
        {lines.map((line, i) => (
          <span
            key={`${line.text}-${i}`}
            className={line.align === 'right' ? 'split-page-title-row is-right' : 'split-page-title-row is-left'}
            style={{
              borderTop: i === 0 ? border : undefined,
              borderBottom: border,
            }}
          >
            <span
              className="split-page-title-line"
              style={{ ...defaultTextStyle, color, transitionDelay: `${i * 45}ms` }}
            >
              {line.text}
            </span>
          </span>
        ))}
      </h1>
      <style>{`
        .split-page-title-row {
          display: flex;
          align-items: baseline;
          container-type: inline-size;
          padding: 18px 40px 22px;
          overflow: hidden;
        }
        .split-page-title-row.is-right { justify-content: flex-end; }
        .split-page-title-row.is-left { justify-content: flex-start; }
        .split-page-title-line {
          display: block;
          will-change: transform;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .split-page-title:not(.is-in) .split-page-title-row.is-right .split-page-title-line {
          transform: translateX(calc(-100cqw + 100%));
        }
        .split-page-title:not(.is-in) .split-page-title-row.is-left .split-page-title-line {
          transform: translateX(calc(100cqw - 100%));
        }
        .split-page-title.is-in .split-page-title-line {
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .split-page-title-line {
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 860px) {
          .split-page-title.work-title,
          .split-page-title.about-title,
          .split-page-title.blog-title,
          .split-page-title.workshop-title {
            padding-top: 64px;
          }
        }
      `}</style>
    </>
  )
}
