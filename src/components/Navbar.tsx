'use client'
import { useAuth } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="nav-desktop" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 5%', background: '#fe3812',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {[
            { label: 'Discover', href: '/discover' },
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contatti', href: '/contatti' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ fontSize: '11px', color: '#666', padding: '4px 14px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isSignedIn ? (
            <a href="/dashboard" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
              Dashboard →
            </a>
          ) : (
            <>
              <a href="/login" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.3px', padding: '9px 4px' }}>
                Accedi
              </a>
              <a href="/apply" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
                Unisciti all&apos;officina
              </a>
            </>
          )}
        </div>
      </nav>

      {/* NAVBAR MOBILE */}
      <nav className="nav-mobile" style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: '#0D0D0D', borderTop: '1px solid #1C1C1C',
        padding: '12px 5%', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '24px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #222', borderRadius: '999px', padding: '4px 8px' }}>
          {[
            { label: 'discover', href: '/discover' },
            { label: 'about', href: '/about' },
            { label: 'blog', href: '/blog' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ fontSize: '10px', color: '#666', padding: '3px 10px', borderRadius: '999px', cursor: 'pointer', textDecoration: 'none' }}>{link.label}</a>
          ))}
        </div>
        <a href={isSignedIn ? '/dashboard' : '/login'} style={{ background: '#fe3812', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '7px 16px', borderRadius: '999px', textDecoration: 'none' }}>
          {isSignedIn ? 'dashboard' : 'entra'}
        </a>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}