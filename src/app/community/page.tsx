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

      <section id="manifesto" style={{ padding: '72px 5% 36px' }}>
        <div style={{ ...meta, color: '#fe3812', marginBottom: 14 }}>Manifesto</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(48px, 6.2vw, 92px)', letterSpacing: '-2px', lineHeight: 0.96, margin: '0 0 20px' }}>
          {INSTAGRAM_LINE}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#3a3a3a', margin: 0, maxWidth: '68ch' }}>
          {COMMUNITY_NAME} è la community WhatsApp di OFF32. {COMMUNITY_MEMBERS_LABEL}. Nella bio di Instagram c’è {COMMUNITY_BIO_MENTION}.
        </p>
      </section>

      <section className="community-grid" style={{ padding: '0 5% 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <article style={card}>
          <div style={meta}>Per chi è</div>
          <h2 style={cardTitle}>Uno spazio per conoscersi</h2>
          <p style={cardBody}>
            Per chi vuole uno spazio di confronto, dove le idee diventano progetti. Il gruppo si chiama «{COMMUNITY_GROUP}».
          </p>
        </article>
        <article style={card}>
          <div style={meta}>Come si entra</div>
          <h2 style={cardTitle}>Instagram e WhatsApp</h2>
          <p style={cardBody}>
            Scrivici su Instagram {INSTAGRAM_HANDLE}. Nella bio trovi {COMMUNITY_BIO_MENTION}. L’invito alla community WhatsApp «{COMMUNITY_NAME}» è qui sotto.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 'auto' }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={button}>Instagram</a>
            <a href={WHATSAPP_INVITE_URL} target="_blank" rel="noreferrer" style={{ ...button, background: '#0D0D0D', color: CREAM }}>Entra nella community</a>
          </div>
        </article>
        <article style={card}>
          <div style={meta}>Cosa c’è dentro</div>
          <h2 style={cardTitle}>{COMMUNITY_BOARD}</h2>
          <p style={cardBody}>La bacheca della community {COMMUNITY_NAME}.</p>
          <p style={{ ...cardBody, marginTop: 'auto' }}>
            <strong style={{ color: '#0D0D0D' }}>Gruppo. </strong>«{COMMUNITY_GROUP}»
          </p>
        </article>
      </section>

      <section id="calendario" style={{ padding: '48px 5% 72px' }}>
        <div style={{ ...meta, marginBottom: 14 }}>Calendario</div>
        <h2 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(40px, 5vw, 68px)', letterSpacing: '-1.4px', lineHeight: 0.98, margin: '0 0 12px' }}>
          Prossimi appuntamenti
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#3a3a3a', maxWidth: '68ch', margin: '0 0 28px' }}>
          Lo stesso calendario della pagina Eventi. {PARTICIPATION_NOTE}
        </p>
        <div style={{ display: 'grid', gap: 16 }}>
          {upcoming.map(event => {
            const external = Boolean(event.href && event.href.startsWith('http'))
            return (
              <article key={event.slug} id={event.slug} className="community-event" style={{ border: LINE, background: '#fff', padding: '28px 24px', boxShadow: '7px 7px 0 #0D0D0D', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, alignItems: 'end' }}>
                <div>
                  <div style={meta}>{EVENT_KIND_LABEL[event.kind]}</div>
                  <h3 style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px, 3vw, 44px)', letterSpacing: '-0.6px', margin: '10px 0' }}>{event.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#3a3a3a', margin: 0 }}>{event.summary}</p>
                </div>
                <div>
                  {eventWhen(event) ? <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 8px' }}>{eventWhen(event)}</p> : null}
                  {event.format ? <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 8px' }}>{event.format}</p> : null}
                  {detailsInCommunity(event) ? (
                    <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 16px' }}>{PARTICIPATION_NOTE}</p>
                  ) : null}
                  {event.href ? (
                    <a href={event.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} style={button}>
                      {event.cta ?? 'Partecipa'}
                    </a>
                  ) : null}
                </div>
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

      <style>{`
        .community-title .split-page-title-row {
          padding-left: 5%;
          padding-right: 5%;
        }
        @media (max-width: 860px) {
          .community-grid { grid-template-columns: 1fr !important; }
          .community-event { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

const card = {
  border: LINE,
  background: '#fff',
  boxShadow: '6px 6px 0 #694aff',
  padding: '28px 22px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
  minHeight: 280,
}

const cardTitle = {
  fontFamily: "'Canela', Georgia, serif",
  fontWeight: 300,
  fontSize: 'clamp(28px, 2.4vw, 36px)',
  letterSpacing: '-0.6px',
  lineHeight: 1.05,
  margin: 0,
}

const cardBody = {
  fontSize: 15,
  lineHeight: 1.65,
  color: '#3a3a3a',
  margin: 0,
}
