'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

type Props = {
  children: string
  className?: string
  style?: CSSProperties
  as?: 'p' | 'blockquote' | 'h2' | 'div'
}

const ACCENT = /[àáâãäåèéêëìíîïòóôõöùúûüÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜ]/

/** Letter rise on scroll — same intensity/speed as manuelcerasuolo.com About. */
export default function ScrollRiseQuote({ children, className, style, as: Tag = 'p' }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const quote = ref.current
    if (!quote) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const text = children.trim()
    quote.setAttribute('aria-label', text)
    quote.textContent = ''

    const letters: HTMLSpanElement[] = []
    let delay = 0
    const words = text.split(/(\s+)/)
    let settleTimer = 0

    for (const chunk of words) {
      if (/^\s+$/.test(chunk)) {
        quote.appendChild(document.createTextNode(' '))
        continue
      }
      const wordEl = document.createElement('span')
      wordEl.className = 'srq-word'
      for (const char of Array.from(chunk)) {
        const span = document.createElement('span')
        span.className = ACCENT.test(char) ? 'srq-letter srq-letter--accent' : 'srq-letter'
        span.textContent = char
        span.style.transitionDelay = `${delay * 8}ms`
        wordEl.appendChild(span)
        letters.push(span)
        delay += 1
      }
      quote.appendChild(wordEl)
    }

    if (reduce) {
      quote.classList.add('is-in', 'is-settled')
      return
    }

    function reset() {
      window.clearTimeout(settleTimer)
      quote!.classList.remove('is-settled')
      letters.forEach(span => {
        span.style.transition = 'none'
        span.style.transitionDelay = '0ms'
        span.style.transform = ''
        span.style.opacity = ''
        span.style.willChange = ''
      })
      quote!.classList.remove('is-in')
      void quote!.offsetWidth
    }

    function settle() {
      // Drop compositor layers so accents (à) don't look faux-bold after transform.
      letters.forEach(span => {
        span.style.transition = 'none'
        span.style.transform = 'none'
        span.style.opacity = '1'
        span.style.willChange = 'auto'
      })
      quote!.classList.add('is-settled')
    }

    function play() {
      reset()
      letters.forEach((span, i) => {
        span.style.transition = ''
        span.style.transitionDelay = `${i * 8}ms`
        span.style.willChange = 'transform, opacity'
      })
      quote!.classList.add('is-in')
      const wait = Math.max(0, (letters.length - 1) * 8 + 340)
      settleTimer = window.setTimeout(settle, wait)
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) play()
          else reset()
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
    )

    io.observe(quote)
    return () => {
      window.clearTimeout(settleTimer)
      io.disconnect()
    }
  }, [children])

  return (
    <>
      <Tag
        ref={ref as never}
        className={['srq', className].filter(Boolean).join(' ')}
        style={style}
      >
        {children}
      </Tag>
      <style>{`
        .srq {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: geometricPrecision;
          font-synthesis: none;
        }
        .srq-word {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          vertical-align: bottom;
          padding-top: 0.18em;
          margin-top: -0.18em;
        }
        .srq-letter {
          display: inline-block;
          transform: translateY(108%);
          opacity: 0;
          font: inherit;
          font-weight: inherit;
          font-synthesis: none;
          transition:
            transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.22s;
        }
        .srq-letter--accent {
          /* Canela à reads heavier in isolation; thin the stroke optically */
          -webkit-text-stroke: 0.45px #F0EBE0;
          paint-order: stroke fill;
        }
        .srq.is-in .srq-letter {
          transform: translateY(0);
          opacity: 1;
        }
        .srq.is-settled .srq-letter {
          transform: none;
          will-change: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .srq-letter {
            transform: none;
            opacity: 1;
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
