'use client'

import { IUBENDA_URLS, openIubendaPolicy, type IubendaPolicy } from '@/lib/iubenda'

type IubendaEmbedProps = {
  type: IubendaPolicy
}

// The click goes through the hidden trigger in IubendaProvider, so it opens the
// iubenda popup even after client navigation; without JS it opens iubenda.com.
export default function IubendaEmbed({ type }: IubendaEmbedProps) {
  const label = type === 'cookie' ? 'Cookie Policy' : 'Privacy Policy'

  return (
    <a
      href={IUBENDA_URLS[type]}
      title={label}
      style={{
        display: 'inline-block',
        padding: '12px 20px',
        border: '1px solid #0D0D0D',
        color: '#0D0D0D',
        textDecoration: 'none',
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
      onClick={event => {
        if (openIubendaPolicy(type)) event.preventDefault()
      }}
    >
      {label}
    </a>
  )
}
