'use client'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Works', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/workshop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
]

const CALL_LABEL = "Call '20"

function openCall() {
  window.dispatchEvent(new Event('off32-toggle-call'))
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="nav-desktop" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 5%', background: '#fe3812',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_cube.png" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div className="nav-menu" style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {NAV_LINKS.map(link => {
            const current = isCurrent(pathname, link.href)
            return (
              <a key={link.label} href={link.href} aria-current={current ? 'page' : undefined} style={{ fontSize: '15px', color: current ? '#9fff00' : '#fe3812', padding: '6px 16px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link.label}</a>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button type="button" className="nav-cta" onClick={openCall}>
            {CALL_LABEL}
          </button>
        </div>
      </nav>

      {/* NAVBAR MOBILE — TOP: logo + CTA */}
      <nav className="nav-mobile-top" style={{
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: 'none',
        boxShadow: 'none',
        zIndex: 9999,
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img className="logo-dark" src="/off32_cube.png" alt="OFF32" style={{ height: '24px', width: 'auto' }} />
          {pathname === '/contatti' && (
            <img className="logo-green" src="/off32_green_cube.svg" alt="" style={{ height: '24px', width: 'auto', display: 'none' }} />
          )}
        </a>
        <button type="button" className="nav-cta" onClick={openCall}>
          {CALL_LABEL}
        </button>
      </nav>

      {/* NAVBAR MOBILE — BOTTOM: pillola con i link */}
      <div className="nav-mobile-bottom" style={{
        display: 'none', justifyContent: 'center',
        position: 'fixed', bottom: '16px', left: 0, right: 0, zIndex: 200,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', gap: '2px', alignItems: 'center',
          background: '#141414', border: '1px solid #1C1C1C',
          borderRadius: '999px', padding: '6px 8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          pointerEvents: 'auto',
        }}>
          {NAV_LINKS.map(link => {
            const current = isCurrent(pathname, link.href)
            return (
              <a key={link.label} href={link.href} aria-current={current ? 'page' : undefined} style={{ fontSize: '14px', color: current ? '#9fff00' : '#fe3812', padding: '6px 5px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.2px', textDecoration: 'none', whiteSpace: 'nowrap' }}>{link.label}</a>
            )
          })}
        </div>
      </div>

      <style>{`
        .nav-cta {
          position: relative;
          z-index: 1;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          background:
            linear-gradient(#F0EBE0, #F0EBE0) padding-box,
            conic-gradient(from var(--call-angle), #fe3812, #9fff00, #fe3812) border-box;
          color: #0D0D0D;
          border: 2px solid transparent;
          border-radius: 0;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding: 14px 16px;
          cursor: pointer;
          white-space: nowrap;
          animation: nav-call-spin 2.8s linear infinite;
        }
        .nav-cta::after {
          content: '';
          position: absolute;
          inset: -2px;
          z-index: -1;
          background: conic-gradient(from var(--call-angle), #fe3812, #9fff00, #fe3812);
          filter: blur(7px);
          opacity: 0.55;
          pointer-events: none;
        }
        @property --call-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: true;
        }
        @keyframes nav-call-spin {
          to { --call-angle: 360deg; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-cta { animation: none; }
          .nav-cta::after { opacity: 0.35; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-top { display: flex !important; }
          .nav-mobile-bottom { display: flex !important; }
          main { padding-bottom: 88px; }
        }
      `}</style>
    </>
  )
}
