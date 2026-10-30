import Link from 'next/link'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

export type Crumb = { label: string; href?: string }

export default function ServiceBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '28px 5% 0' }}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          listStyle: 'none',
          margin: 0,
          padding: 0,
          ...meta,
        }}
      >
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {index > 0 ? <span aria-hidden="true" style={{ color: '#8a8378' }}>›</span> : null}
            {item.href ? (
              <Link href={item.href} style={{ color: '#0D0D0D', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: '#8a8378' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
