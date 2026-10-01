'use client'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Works', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/workshop' },
  { label: 'Blog', href: '/blog' },
]

const CTA_LABEL = 'Contattaci →'

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
          <a href="/contatti" className="nav-cta" style={{ display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', background: '#0D0D0D', color: '#fff', fontSize: '15px', fontWeight: 400, padding: '10px 24px', border: '1px solid #0D0D0D', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.3px' }}>
            {CTA_LABEL}
          </a>
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
        <a href="/contatti" style={{ background: '#0D0D0D', color: '#fff', fontSize: '14px', fontWeight: 400, padding: '8px 18px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.3px' }}>
          {CTA_LABEL}
        </a>
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
          borderRadius: '999px', padding: '6px 10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          pointerEvents: 'auto',
        }}>
          {NAV_LINKS.map(link => {
            const current = isCurrent(pathname, link.href)
            return (
              <a key={link.label} href={link.href} aria-current={current ? 'page' : undefined} style={{ fontSize: '14px', color: current ? '#9fff00' : '#fe3812', padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link.label}</a>
            )
          })}
        </div>
      </div>

      <style>{`
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
