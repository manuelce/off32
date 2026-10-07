type WorkLink = {
  href: string
  image: string
  title: string
}

export default function WorkSwitch({ previous, next }: { previous: WorkLink, next: WorkLink }) {
  const works = [
    { ...previous, label: '← Precedente', align: 'left' as const },
    { ...next, label: 'Prossimo →', align: 'right' as const },
  ]

  return (
    <section aria-label="Altri lavori" style={{ padding: '48px 0 0' }}>
      <div className="work-switch" style={{
        width: '95%',
        margin: '0 auto',
        padding: '2%',
        border: '1px solid #0D0D0D',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}>
        {works.map(work => (
          <a key={work.href} href={work.href} style={{ position: 'relative', display: 'block', width: '18%', textDecoration: 'none', color: '#0D0D0D' }}>
            <img src={work.image} alt={work.title} style={{ width: '100%', height: 88, objectFit: 'cover', display: 'block' }} />
            <span className="work-switch-label" style={{
              position: 'absolute', bottom: 6,
              left: work.align === 'left' ? 6 : 'auto',
              right: work.align === 'right' ? 6 : 'auto',
              background: '#F0EBE0', padding: '3px 6px',
              fontSize: 10, letterSpacing: '0.6px', textTransform: 'uppercase',
            }}>
              {work.label}
            </span>
          </a>
        ))}
      </div>
      <style>{`
        .work-switch-label { opacity: 0; transition: opacity 0.18s ease; }
        .work-switch a:hover .work-switch-label,
        .work-switch a:focus-visible .work-switch-label { opacity: 1; }
        @media (max-width: 1024px) {
          .work-switch-label { opacity: 1; }
        }
        @media (max-width: 768px) {
          .work-switch a { width: 20% !important; }
          .work-switch img { height: 64px !important; }
        }
      `}</style>
    </section>
  )
}
