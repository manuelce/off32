const CREAM = '#F0EBE0'
const LINE = '1px solid #0D0D0D'
const INK = '#141414'

const TECHS = [
  { name: 'Next.js', src: '/tech/nextjs.svg' },
  { name: 'React', src: '/tech/react.svg' },
  { name: 'JavaScript', src: '/tech/javascript.svg' },
  { name: 'TypeScript', src: '/tech/typescript.svg' },
  { name: 'Vercel', src: '/tech/vercel.svg' },
  { name: 'Supabase', src: '/tech/supabase.svg' },
  { name: 'Clerk', src: '/tech/clerk.svg' },
  { name: 'Resend', src: '/tech/resend.svg' },
  { name: 'Cursor', src: '/tech/cursor.svg' },
  { name: 'Node.js', src: '/tech/nodejs.svg' },
  { name: 'Tailwind', src: '/tech/tailwind.svg' },
  { name: 'PostgreSQL', src: '/tech/postgresql.svg' },
  { name: 'Stripe', src: '/tech/stripe.svg' },
  { name: 'GitHub', src: '/tech/github.svg' },
] as const

function TechItem({ name, src }: { name: string; src: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 28px',
        whiteSpace: 'nowrap',
        color: INK,
        fontSize: 14,
        letterSpacing: '0.4px',
        fontWeight: 500,
      }}
    >
      <img
        src={src}
        alt=""
        width={22}
        height={22}
        style={{ width: 22, height: 22, display: 'block', flex: 'none' }}
      />
      {name}
    </span>
  )
}

export default function TechMarquee() {
  const loop = [...TECHS, ...TECHS]

  return (
    <section
      aria-label="Tecnologie"
      style={{
        borderTop: LINE,
        borderBottom: LINE,
        background: CREAM,
        overflow: 'hidden',
        padding: '18px 0',
      }}
    >
      <div className="tech-marquee-track">
        {loop.map((tech, i) => (
          <TechItem key={`${tech.name}-${i}`} name={tech.name} src={tech.src} />
        ))}
      </div>
      <style>{`
        .tech-marquee-track {
          display: flex;
          width: max-content;
          animation: tech-marquee 42s linear infinite;
        }
        .tech-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes tech-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
