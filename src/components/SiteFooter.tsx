import { FOOTER_LINKS } from '@/lib/site-nav'

type Tone = 'cream' | 'dark' | 'purple'

const TONES: Record<Tone, { color: string; border: string; background: string; borderBottom: string }> = {
  cream: {
    color: '#0D0D0D',
    border: '1px solid #0D0D0D',
    background: '#F0EBE0',
    borderBottom: '1px solid #0D0D0D',
  },
  dark: {
    color: '#f0ebe0',
    border: '1px solid #f0ebe0',
    background: 'transparent',
    borderBottom: '1px solid #f0ebe0',
  },
  purple: {
    color: '#F0EBE0',
    border: '1px solid rgba(240,235,224,0.28)',
    background: '#694aff',
    borderBottom: 'none',
  },
}

export default function SiteFooter({ tone = 'cream' }: { tone?: Tone }) {
  const palette = TONES[tone]
  const meta = {
    fontSize: 11,
    letterSpacing: '1.8px',
    textTransform: 'uppercase' as const,
    color: palette.color,
    textDecoration: 'none',
  }

  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '22px 28px',
        borderTop: palette.border,
        borderBottom: palette.borderBottom,
        background: palette.background,
        fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif",
      }}
    >
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
        {FOOTER_LINKS.map(link => (
          <a key={link.href} href={link.href} style={meta}>
            {link.label}
          </a>
        ))}
      </div>
      <span style={meta}>connect@off32.it · © 2026 OFF32</span>
    </footer>
  )
}
