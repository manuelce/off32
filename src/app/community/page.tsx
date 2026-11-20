import ProjectStart from '@/components/ProjectStart'
import SiteFooter from '@/components/SiteFooter'
import { BreadcrumbJsonLd, EventsJsonLd } from '@/components/ServiceJsonLd'
import SplitPageTitle from '@/components/SplitPageTitle'
import {
  COMMUNITY_BIO_MENTION,
  COMMUNITY_BOARD,
  COMMUNITY_GROUP,
  COMMUNITY_MEMBERS_LABEL,
  COMMUNITY_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINE,
  INSTAGRAM_URL,
  PARTICIPATION_NOTE,
  WHATSAPP_INVITE_URL,
} from '@/lib/community'
import { detailsInCommunity, EVENT_KIND_LABEL, eventWhen, events } from '@/lib/events'

const PURPLE = '#694aff'
const CREAM = '#F0EBE0'
const LINE = '1px solid #0D0D0D'
const CREAM_LINE = `1px solid ${CREAM}`

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

const button = {
  display: 'inline-block',
  border: LINE,
  color: '#0D0D0D',
  textDecoration: 'none',
  fontSize: 12,
  letterSpacing: '0.8px',
  textTransform: 'uppercase' as const,
  padding: '14px 22px',
  background: 'transparent',
}

export default function CommunityPage() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Community' },
  ]
  const upcoming = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'))

  return (
    <main style={{ background: CREAM, minHeight: '100vh', fontFamily: "'Axiforma', 'Helvetica Neue', sans-serif", color: '#0D0D0D' }}>
      <BreadcrumbJsonLd items={crumbs} />
      <EventsJsonLd events={events} />

      <SplitPageTitle
        className="community-title"
        background={PURPLE}
        color={CREAM}
        border={CREAM_LINE}
        lines={[
          { text: 'Community.', align: 'right' },
          { text: 'Confronto.', align: 'left' },
        ]}
      />

      <div style={{ background: '#0D0D0D', padding: '16px 5%', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        {[
          [COMMUNITY_MEMBERS_LABEL, ''],
          [COMMUNITY_BOARD, 'e un gruppo'],
          ['Instagram', INSTAGRAM_HANDLE],
        ].map(([strong, rest]) => (
          <span key={strong} style={{ fontSize: 11, letterSpacing: '1.5px', color: '#666', textTransform: 'uppercase' }}>
            <strong style={{ color: '#fff', fontWeight: 600 }}>{strong}</strong> {rest}
          </span>
        ))}
      </div>

      <section id="manifesto" style={{ padding: '72px 5% 24px', maxWidth: 820 }}>
        <div style={{ ...meta, color: '#fe3812', marginBottom: 14 }}>Manifesto</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(36px, 4.4vw, 60px)', letterSpacing: '-1.2px', lineHeight: 1.05, margin: '0 0 18px' }}>
          {INSTAGRAM_LINE}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>
          {COMMUNITY_NAME} è la community WhatsApp di OFF32. {COMMUNITY_MEMBERS_LABEL}. Nella bio di Instagram c’è {COMMUNITY_BIO_MENTION}.
        </p>
      </section>

      <section style={{ padding: '36px 5% 12px', maxWidth: 820 }}>
        <div style={{ ...meta, marginBottom: 14 }}>Per chi è</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.6px', margin: '0 0 12px' }}>
          Uno spazio per conoscersi
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3a3a3a', margin: 0 }}>
          Per chi vuole uno spazio di confronto, dove le idee diventano progetti. Il gruppo si chiama «{COMMUNITY_GROUP}».
        </p>
      </section>

      <section style={{ padding: '36px 5% 12px', maxWidth: 820 }}>
        <div style={{ ...meta, marginBottom: 14 }}>Come si entra</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.6px', margin: '0 0 12px' }}>
          Instagram e WhatsApp
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3a3a3a', margin: '0 0 20px' }}>
          Scrivici su Instagram {INSTAGRAM_HANDLE}. Nella bio trovi {COMMUNITY_BIO_MENTION}. L’invito alla community WhatsApp «{COMMUNITY_NAME}» è qui sotto.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={button}>Instagram</a>
          <a href={WHATSAPP_INVITE_URL} target="_blank" rel="noreferrer" style={{ ...button, background: '#0D0D0D', color: CREAM }}>Entra nella community</a>
        </div>
      </section>

      <section style={{ padding: '48px 5% 12px' }}>
        <div style={{ ...meta, marginBottom: 14 }}>Cosa c’è dentro</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <article style={{ border: LINE, background: '#fff', padding: '22px 18px', boxShadow: '6px 6px 0 #694aff' }}>
            <div style={meta}>{COMMUNITY_BOARD}</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3a3a3a', margin: '12px 0 0' }}>
              La bacheca della community {COMMUNITY_NAME}.
            </p>
          </article>
          <article style={{ border: LINE, background: '#fff', padding: '22px 18px', boxShadow: '6px 6px 0 #694aff' }}>
            <div style={meta}>Gruppo</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3a3a3a', margin: '12px 0 0' }}>
              «{COMMUNITY_GROUP}»
            </p>
          </article>
        </div>
      </section>

      <section id="calendario" style={{ padding: '56px 5% 72px' }}>
        <div style={{ ...meta, marginBottom: 14 }}>Calendario</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.8px', margin: '0 0 8px' }}>
          Prossimi appuntamenti
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: '#3a3a3a', maxWidth: 560, margin: '0 0 22px' }}>
          Lo stesso calendario della pagina Eventi. {PARTICIPATION_NOTE}
        </p>
        <div style={{ display: 'grid', gap: 16 }}>
          {upcoming.map(event => {
            const external = Boolean(event.href && event.href.startsWith('http'))
            return (
              <article key={event.slug} id={event.slug} style={{ border: LINE, background: '#fff', padding: '22px 20px', boxShadow: '7px 7px 0 #0D0D0D' }}>
                <div style={meta}>{EVENT_KIND_LABEL[event.kind]}</div>
                <h3 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 32, letterSpacing: '-0.5px', margin: '10px 0' }}>{event.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3a3a3a', margin: '0 0 8px' }}>{event.summary}</p>
                {eventWhen(event) ? <p style={{ fontSize: 14, lineHeight: 1.5, margin: '0 0 8px' }}>{eventWhen(event)}</p> : null}
                {event.format ? <p style={{ fontSize: 14, lineHeight: 1.5, margin: '0 0 8px' }}>{event.format}</p> : null}
                {detailsInCommunity(event) ? (
                  <p style={{ fontSize: 14, lineHeight: 1.5, margin: '0 0 16px' }}>{PARTICIPATION_NOTE}</p>
                ) : null}
                {event.href ? (
                  <a href={event.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} style={button}>
                    {event.cta ?? 'Partecipa'}
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <ProjectStart
        kicker="Community"
        title="Entra nella community"
        body={`${COMMUNITY_NAME}, su WhatsApp. ${PARTICIPATION_NOTE}`}
        cta="Entra nella community →"
        href={WHATSAPP_INVITE_URL}
        external
      />

      <SiteFooter />
    </main>
  )
}
