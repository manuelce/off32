'use client'
import { useState } from 'react'

const FREE_FEATURES = [
  { yes: true, txt: 'Profilo pubblico verificato' },
  { yes: true, txt: 'Portfolio fino a 3 lavori' },
  { yes: true, txt: 'Visibile nella directory' },
  { yes: true, txt: 'Messaggi dai clienti' },
  { yes: true, txt: 'Richieste di collaborazione' },
  { yes: false, txt: 'Badge STUDIO in evidenza' },
  { yes: false, txt: 'Analytics visite profilo' },
  { yes: false, txt: 'Priorità nei risultati' },
  { yes: false, txt: 'Dominio custom collegato' },
  { yes: false, txt: 'Featured in homepage' },
]

const STUDIO_FEATURES = [
  { txt: 'Portfolio illimitato' },
  { txt: 'Badge STUDIO in evidenza' },
  { txt: 'Priorità nei risultati discover' },
  { txt: 'Analytics visite e conversioni' },
  { txt: 'Dominio custom collegato' },
  { txt: 'Link diretto + calendario contatti' },
  { txt: 'Featured in homepage a rotazione' },
  { txt: 'Supporto prioritario' },
]

const COMPARE_ROWS = [
  { feat: 'Profilo pubblico verificato', free: '✓', studio: '✓', freeGreen: true, studioGreen: true },
  { feat: 'Portfolio lavori', free: 'max 3', studio: 'illimitato', freeGreen: false, studioGreen: false },
  { feat: 'Visibilità nella directory', free: '✓', studio: '✓', freeGreen: true, studioGreen: true },
  { feat: 'Priorità nei risultati', free: '—', studio: '✓', freeGreen: false, studioGreen: true },
  { feat: 'Badge STUDIO', free: '—', studio: '✓', freeGreen: false, studioGreen: true },
  { feat: 'Analytics profilo', free: '—', studio: '✓', freeGreen: false, studioGreen: true },
  { feat: 'Dominio custom', free: '—', studio: '✓', freeGreen: false, studioGreen: true },
  { feat: 'Featured in homepage', free: '—', studio: '✓', freeGreen: false, studioGreen: true },
  { feat: 'Messaggi clienti', free: '✓', studio: '✓', freeGreen: true, studioGreen: true },
  { feat: 'Collaborazioni', free: '✓', studio: '✓', freeGreen: true, studioGreen: true },
  { feat: 'Supporto', free: 'base', studio: 'prioritario', freeGreen: false, studioGreen: false },
  { feat: 'Prezzo', free: '0€', studio: '9€/mese', freeGreen: false, studioGreen: false },
]

const FAQS = [
  { q: 'Posso cancellare Studio quando voglio?', a: 'Sì, nessun vincolo. Cancelli in un click dalla dashboard. Il tuo profilo rimane visibile nel piano Free.' },
  { q: 'Il piano Free è davvero gratis per sempre?', a: 'Sì. Non è una prova limitata — è un piano permanente. Puoi restare Free quanto vuoi.' },
  { q: 'Come funziona il dominio custom?', a: 'Con Studio puoi collegare il tuo dominio personale al profilo OFF32. I clienti ti trovano anche su nometuosito.com.' },
  { q: 'Cosa significa "featured in homepage"?', a: 'I profili Studio appaiono a rotazione nella sezione in evidenza della homepage — visibilità extra ogni settimana.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const monthlyPrice = 9
  const annualPrice = Math.floor(monthlyPrice * 12 * 0.8)

  return (
    <main style={{ background: '#F8F5F0', minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>

      {/* NAVBAR */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 5%', background: '#fe3812', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src="/off32_green_cube.svg" alt="OFF32" style={{ height: '30px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: '2px', background: '#141414', border: '1px solid #1C1C1C', borderRadius: '999px', padding: '4px 8px' }}>
          {['discover', 'about', 'blog', 'contatti'].map(link => (
            <a key={link} href={`/${link}`} style={{ fontSize: '11px', color: '#666', padding: '4px 14px', borderRadius: '999px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <a href="/login" style={{ background: '#0D0D0D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '9px 24px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
          Entra nell&apos;hub
        </a>
      </nav>

      {/* HERO */}
      <div style={{ background: '#fff', padding: '72px 5% 56px', textAlign: 'center' as const, borderBottom: '1px solid #EDE8DF' }}>
        <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '14px' }}>// pricing · semplice e onesto</div>
        <h1 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-1.5px', lineHeight: 1.1, color: '#0D0D0D', marginBottom: '12px' }}>
          Scegli il tuo{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            spazio
            <span style={{ position: 'absolute', left: '-2px', bottom: '4px', width: 'calc(100% + 4px)', height: '8px', background: '#9fff00', zIndex: -1, borderRadius: '2px', opacity: 0.9 }}></span>
          </span>{' '}in OFF32.
        </h1>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 32px' }}>
          Entra gratis. Quando sei pronto a crescere davvero, passa a Studio. Nessuna sorpresa, nessun vincolo.
        </p>

        {/* TOGGLE MENSILE / ANNUALE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: !annual ? '#0D0D0D' : '#AAA098', fontWeight: !annual ? 700 : 400 }}>mensile</span>
          <div onClick={() => setAnnual(!annual)} style={{ width: '44px', height: '24px', background: annual ? '#0D0D0D' : '#EDE8DF', borderRadius: '12px', position: 'relative' as const, cursor: 'pointer', transition: 'background 0.2s' }}>
            <div style={{ position: 'absolute' as const, top: '3px', left: annual ? '23px' : '3px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
          </div>
          <span style={{ fontSize: '12px', color: annual ? '#0D0D0D' : '#AAA098', fontWeight: annual ? 700 : 400 }}>annuale</span>
          <span style={{ fontSize: '9px', padding: '3px 10px', background: '#EEF8F3', border: '1px solid #1D9E7540', borderRadius: '999px', color: '#0F6E56', letterSpacing: '1px', fontWeight: 700 }}>-20%</span>
        </div>
      </div>

      {/* PIANI */}
      <div style={{ padding: '48px 5% 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '760px', margin: '0 auto' }} className="plans-grid">

        {/* FREE */}
        <div style={{ background: '#fff', border: '1px solid #EDE8DF', borderRadius: '14px', padding: '36px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#CCC8C0', textTransform: 'uppercase' as const, marginBottom: '16px', fontFamily: 'monospace' }}>// piano base</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '6px' }}>Free</div>
          <div style={{ fontSize: '12px', color: '#AAA098', lineHeight: 1.65, marginBottom: '28px' }}>Entra nella community, costruisci il tuo profilo e fatti trovare. Senza carta di credito.</div>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '52px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-2px', lineHeight: 1 }}>0€</div>
            <div style={{ fontSize: '11px', color: '#CCC8C0', marginTop: '6px' }}>per sempre · nessun limite di tempo</div>
          </div>
          <a href="/apply" style={{ display: 'block', textAlign: 'center' as const, padding: '13px 24px', background: '#F8F5F0', border: '1px solid #E0D8CC', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#888', textDecoration: 'none', marginBottom: '28px', letterSpacing: '0.5px' }}>
            inizia gratis →
          </a>
          <div style={{ height: '1px', background: '#F0EBE4', marginBottom: '22px' }}></div>
          <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#CCC8C0', textTransform: 'uppercase' as const, marginBottom: '14px', fontFamily: 'monospace' }}>// cosa include</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
            {FREE_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', background: f.yes ? '#EEF8F3' : '#F8F5F0', border: `1px solid ${f.yes ? '#1D9E7530' : '#EDE8DF'}` }}>
                  {f.yes
                    ? <span style={{ color: '#0F6E56', fontSize: '9px' }}>✓</span>
                    : <span style={{ color: '#DDD8CE', fontSize: '9px' }}>×</span>
                  }
                </div>
                <span style={{ fontSize: '12px', color: f.yes ? '#555' : '#CCC8C0', lineHeight: 1.5 }}>{f.txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STUDIO */}
        <div style={{ background: '#fff', border: '1.5px solid #fe381240', borderRadius: '14px', padding: '36px', position: 'relative' as const, overflow: 'hidden' }}>
          <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: '3px', background: '#fe3812' }}></div>
          <div style={{ fontSize: '9px', letterSpacing: '2.5px', color: '#fe3812', textTransform: 'uppercase' as const, marginBottom: '16px', fontFamily: 'monospace' }}>// il più scelto</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-0.5px', marginBottom: '6px' }}>Studio</div>
          <div style={{ fontSize: '12px', color: '#AAA098', lineHeight: 1.65, marginBottom: '28px' }}>Per chi fa del lavoro digitale la propria identità. Massima visibilità, nessun limite.</div>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ fontSize: '52px', fontWeight: 800, color: '#0D0D0D', letterSpacing: '-2px', lineHeight: 1 }}>
                {annual ? Math.floor(annualPrice / 12) : monthlyPrice}
              </div>
              <div style={{ paddingBottom: '10px' }}>
                <span style={{ fontSize: '18px', color: '#AAA098', fontWeight: 400 }}>€/mese</span>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#CCC8C0', marginTop: '6px' }}>
              {annual ? `${annualPrice}€/anno · risparmi ${monthlyPrice * 12 - annualPrice}€` : 'o ' + annualPrice + '€/anno · risparmi ' + (monthlyPrice * 12 - annualPrice) + '€'}
            </div>
          </div>
          <a href="/apply" style={{ display: 'block', textAlign: 'center' as const, padding: '13px 24px', background: '#fe3812', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#fff', textDecoration: 'none', marginBottom: '28px', letterSpacing: '0.5px' }}>
            passa a Studio →
          </a>
          <div style={{ height: '1px', background: '#F0EBE4', marginBottom: '22px' }}></div>
          <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#CCC8C0', textTransform: 'uppercase' as const, marginBottom: '14px', fontFamily: 'monospace' }}>// tutto di Free, più</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
            {STUDIO_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', background: '#FDF0EB', border: '1px solid #E84A1A25' }}>
                  <span style={{ color: '#fe3812', fontSize: '9px' }}>✓</span>
                </div>
                <span style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}><strong style={{ color: '#333', fontWeight: 700 }}>{f.txt.split(' ')[0]}</strong> {f.txt.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TABELLA COMPARATIVA */}
      <div style={{ padding: '64px 5%' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px', textAlign: 'center' as const, marginBottom: '8px' }}>Confronto completo</h2>
          <p style={{ fontSize: '12px', color: '#AAA098', textAlign: 'center' as const, marginBottom: '32px' }}>tutto quello che c&apos;è dentro, senza sorprese</p>
          <div style={{ border: '1px solid #EDE8DF', borderRadius: '12px', overflow: 'hidden' }}>
            {/* header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px', background: '#F8F5F0', padding: '14px 20px', borderBottom: '1px solid #EDE8DF' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#CCC8C0', textTransform: 'uppercase' as const, fontFamily: 'monospace' }}>funzionalità</div>
              <div style={{ fontSize: '11px', fontWeight: 700, textAlign: 'center' as const, color: '#AAA098', letterSpacing: '0.5px' }}>Free</div>
              <div style={{ fontSize: '11px', fontWeight: 700, textAlign: 'center' as const, color: '#fe3812', letterSpacing: '0.5px' }}>Studio</div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 110px 110px', padding: '12px 20px', borderBottom: i < COMPARE_ROWS.length - 1 ? '1px solid #F5F0E8' : 'none', background: i % 2 === 0 ? '#fff' : '#FDFCFA', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>{row.feat}</span>
                <span style={{ fontSize: '12px', textAlign: 'center' as const, color: row.free === '✓' ? '#0F6E56' : row.free === '—' ? '#E0D8CC' : '#888', fontWeight: row.freeGreen ? 700 : 400 }}>{row.free}</span>
                <span style={{ fontSize: '12px', textAlign: 'center' as const, color: row.studio === '✓' ? '#0F6E56' : row.studio === '—' ? '#E0D8CC' : row.studio.includes('€') ? '#fe3812' : '#fe3812', fontWeight: row.studioGreen ? 700 : 600 }}>{row.studio}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#fff', padding: '64px 5%', borderTop: '1px solid #EDE8DF', borderBottom: '1px solid #EDE8DF' }}>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.5px', textAlign: 'center' as const, marginBottom: '40px' }}>Domande frequenti</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ background: '#F8F5F0', border: '1px solid #EDE8DF', borderRadius: '10px', overflow: 'hidden' }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', gap: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{f.q}</span>
                <span style={{ fontSize: '18px', color: '#AAA098', flexShrink: 0, display: 'inline-block', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 20px 16px', fontSize: '12px', color: '#888', lineHeight: 1.75 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINALE */}
      <section style={{ background: '#0D0D0D', padding: '80px 5%', textAlign: 'center' as const }}>
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#333', textTransform: 'uppercase' as const, marginBottom: '14px' }}>// entra nell&apos;officina</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#fff', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '10px' }}>
          Inizia gratis.<br />Cresci con Studio.
        </h2>
        <p style={{ fontSize: '13px', color: '#444', marginBottom: '32px' }}>Fai domanda oggi. Se sei bravo, sei dentro.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
          <a href="/apply" style={{ background: '#fe3812', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            inizia gratis →
          </a>
          <a href="/discover" style={{ background: 'transparent', color: '#444', fontSize: '12px', padding: '14px 32px', border: '1px solid #222', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.5px' }}>
            scopri Studio
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#9fff00', padding: '24px 5%', borderTop: '1px solid #8aee00' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['DISCOVER', 'BLOG', 'PRIVACY POLICY'].map(l => (
              <a key={l} href="#" style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', textDecoration: 'none', fontWeight: 600 }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1.5px', fontWeight: 700 }}>OFF32</span>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['CONTACT', 'CONNECT@OFF32.COM', '© 2025 OFF32'].map(l => (
              <span key={l} style={{ fontSize: '10px', color: '#1a1a1a', letterSpacing: '1px' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </main>
  )
}
