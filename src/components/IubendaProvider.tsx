'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { IUBENDA_URLS, openIubendaPolicy, type IubendaPolicy } from '@/lib/iubenda'

const POLICY_PATHS: Record<string, IubendaPolicy> = {
  '/privacy-policy': 'privacy',
  '/cookie-policy': 'cookie',
}

// Mounted once in the root layout, so it survives client-side navigation.
// It loads iubenda.js a single time, keeps two hidden iubenda anchors that the
// script turns into popup triggers, and makes the Privacy/Cookie links in every
// footer open the iubenda popup instead of the intermediate page.
export default function IubendaProvider() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest?.('footer a[href]') as HTMLAnchorElement | null
      if (!link || link.origin !== window.location.origin) return
      const policy = POLICY_PATHS[link.pathname]
      if (policy && openIubendaPolicy(policy)) event.preventDefault()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return (
    <>
      <div hidden aria-hidden="true">
        {(Object.keys(IUBENDA_URLS) as IubendaPolicy[]).map(policy => (
          <a
            key={policy}
            id={`iubenda-trigger-${policy}`}
            href={IUBENDA_URLS[policy]}
            className="iubenda-noiframe iubenda-embed iubenda-nostyle"
            tabIndex={-1}
          >
            {policy}
          </a>
        ))}
      </div>
      <Script id="iubenda-loader" src="https://cdn.iubenda.com/iubenda.js" strategy="afterInteractive" />
    </>
  )
}
