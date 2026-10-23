'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Works', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/workshop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
]

const FULL_STACK_NAV_LINKS = [
  { label: 'Events', href: '/workshop' },
  { label: 'Blog', href: '/blog' },
]

const CALL_LABEL = "Call '20"

function openCall() {
  window.dispatchEvent(new Event('off32-toggle-call'))
}

function scrollToCandidati() {
  document.getElementById('candidati')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname()
  const isFullStack = pathname === '/full-stack' || pathname.startsWith('/full-stack/')
  const isMirkoWorkshop = pathname === '/workshop/mirko-camia' || pathname.startsWith('/workshop/mirko-camia/')
  const isContatti = pathname === '/contatti' || pathname.startsWith('/contatti/')
  const isPillNav = isFullStack || isMirkoWorkshop

  useEffect(() => {
    const pin = () => {
      if (!window.matchMedia('(max-width: 768px)').matches) return
      document.querySelectorAll<HTMLElement>('.nav-mobile-top, .nav-mobile-bottom').forEach(el => {
        el.style.setProperty('position', 'fixed', 'important')
      })
    }
    pin()
    window.addEventListener('pageshow', pin)
    return () => window.removeEventListener('pageshow', pin)
  }, [pathname])

  if (isPillNav) {
    return (
      <>
        <nav className="nav-fs" aria-label="Navigazione">
          <div className="nav-fs-pill">
            <a href="/" className="nav-fs-logo">
              <img src="/off32_cube_white.png" alt="OFF32" />
            </a>
            <div className="nav-fs-links">
              {FULL_STACK_NAV_LINKS.map(link => {
                const current = isCurrent(pathname, link.href)
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-current={current ? 'page' : undefined}
                    className={current ? 'is-current' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
            <button type="button" className="nav-fs-cta" onClick={scrollToCandidati}>
              {isMirkoWorkshop ? 'Riserva il tuo posto' : 'Prenota la tua lezione gratuita'}
            </button>
          </div>
        </nav>

        <div className="nav-mobile-bottom nav-fs-mobile-bottom" style={{
          justifyContent: 'center',
          position: 'fixed', bottom: '16px', left: 0, right: 0, zIndex: 200,
          pointerEvents: 'none',
        }}>
          <div style={{
            display: 'flex', gap: '2px', alignItems: 'center',
            background: 'rgba(13,13,13,0.82)',
            border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '999px', padding: '6px 8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
            pointerEvents: 'auto',
          }}>
            {FULL_STACK_NAV_LINKS.map(link => {
              const current = isCurrent(pathname, link.href)
              return (
                <a key={link.label} href={link.href} aria-current={current ? 'page' : undefined} style={{ fontSize: '14px', color: current ? '#9fff00' : '#F0EBE0', padding: '6px 5px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.2px', textDecoration: 'none', whiteSpace: 'nowrap' }}>{link.label}</a>
              )
            })}
          </div>
        </div>

        <style>{`
          .nav-fs {
            position: fixed;
            top: 18px;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            justify-content: center;
            padding: 0 16px;
            pointer-events: none;
          }
          .nav-fs-pill {
            pointer-events: auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            width: min(920px, 100%);
            padding: 8px 10px 8px 16px;
            border-radius: 999px;
            background: rgba(105, 74, 255, 0.88);
            border: 1px solid #141414;
            backdrop-filter: blur(18px) saturate(1.2);
            -webkit-backdrop-filter: blur(18px) saturate(1.2);
            box-shadow: 4px 6px 18px rgba(20, 20, 20, 0.18);
          }
          .nav-fs-logo {
            display: inline-flex;
            align-items: center;
            flex: none;
            text-decoration: none;
            z-index: 1;
          }
          .nav-fs-logo img {
            height: 32px;
            width: auto;
            display: block;
          }
          .nav-fs-links {
            position: absolute;
            left: 50%;
            top: 50%;
            translate: -50% -50%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2px;
            z-index: 1;
          }
          .nav-fs-links a {
            font-size: 14px;
            color: rgba(240, 235, 224, 0.88);
            padding: 8px 12px;
            border-radius: 999px;
            text-decoration: none;
            letter-spacing: 0.2px;
            white-space: nowrap;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .nav-fs-links a:hover,
          .nav-fs-links a.is-current {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
          }
          .nav-fs-cta {
            flex: none;
            display: inline-flex;
            align-items: center;
            border: none;
            border-radius: 999px;
            background: #fe3812;
            color: #F0EBE0;
            font-family: inherit;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.2px;
            padding: 12px 18px;
            cursor: pointer;
            white-space: nowrap;
            z-index: 1;
          }
          .nav-fs-cta:hover {
            filter: brightness(1.08);
          }
          .nav-fs-mobile-bottom { display: none; }
          @media (max-width: 860px) {
            .nav-fs-links { display: none; }
            .nav-fs-pill {
              width: auto;
              max-width: 100%;
              padding: 8px 8px 8px 14px;
            }
            .nav-fs-mobile-bottom { display: flex !important; }
            main { padding-bottom: 88px; }
          }
          @media (max-width: 768px) {
            .nav-fs { top: 14px; }
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="nav-desktop" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '14px 5%',
        background: '#fe3812',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: 'none', justifySelf: 'start' }}>
          <img
            src={isContatti ? '/off32_green_cube.png' : '/off32_cube.png'}
            alt="OFF32"
            style={{ height: '36px', width: 'auto' }}
          />
        </a>
        <div className="nav-menu" style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {NAV_LINKS.map(link => {
            const current = isCurrent(pathname, link.href)
            return (
              <a key={link.label} href={link.href} aria-current={current ? 'page' : undefined} style={{ fontSize: '15px', color: current ? '#9fff00' : '#fe3812', padding: '6px 16px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link.label}</a>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifySelf: 'end' }}>
          <button type="button" className="nav-cta" onClick={openCall}>
            {CALL_LABEL}
          </button>
        </div>
      </nav>

      {/* NAVBAR MOBILE, TOP: logo + CTA */}
      <nav className="nav-mobile-top" style={{
        alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        zIndex: 9999,
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img
            className={isContatti ? 'logo-green' : 'logo-dark'}
            src={isContatti ? '/off32_green_cube.png' : '/off32_cube.png'}
            alt="OFF32"
            style={{ height: '30px', width: 'auto' }}
          />
        </a>
        <button type="button" className="nav-cta" onClick={openCall}>
          {CALL_LABEL}
        </button>
      </nav>

      {/* NAVBAR MOBILE, BOTTOM: pillola con i link */}
      <div className="nav-mobile-bottom" style={{
        justifyContent: 'center',
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
          box-shadow: 0 0 14px rgba(254, 56, 18, 0.38);
          animation: nav-call-spin 2.8s linear infinite;
        }
        @property --call-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: true;
        }
        @keyframes nav-call-spin {
          to { --call-angle: 360deg; }
        }
        .nav-mobile-top, .nav-mobile-bottom { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .nav-cta { animation: none; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-top {
            display: flex !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
          }
          .nav-mobile-bottom {
            display: flex !important;
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 16px !important;
          }
          main { padding-bottom: 88px; }
        }
      `}</style>
    </>
  )
}
