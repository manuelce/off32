'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Delay before play, e.g. after a letter headline finishes. */
  delayMs?: number
}

/** Whole-block rise on scroll — same easing family as the letter reveal. */
export default function ScrollRiseBlock({ children, className, style, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.classList.add('is-in')
      return
    }

    let timer = 0

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          window.clearTimeout(timer)
          if (entry.isIntersecting) {
            timer = window.setTimeout(() => el.classList.add('is-in'), delayMs)
          } else {
            el.classList.remove('is-in')
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
    )

    io.observe(el)
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
    }
  }, [delayMs])

  return (
    <>
      <div ref={ref} className={['srb', className].filter(Boolean).join(' ')} style={style}>
        {children}
      </div>
      <style>{`
        .srb {
          opacity: 0;
          transform: translateY(42px);
          transition:
            opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }
        .srb.is-in {
          opacity: 1;
          transform: none;
          will-change: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .srb {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
