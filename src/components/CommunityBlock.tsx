import { SITE_URL } from '@/lib/seo'
import {
  COMMUNITY_BIO_MENTION,
  COMMUNITY_BOARD,
  COMMUNITY_GROUP,
  COMMUNITY_MEMBERS_LABEL,
  COMMUNITY_NAME,
  INSTAGRAM_HANDLE,
  INSTAGRAM_LINE,
  INSTAGRAM_URL,
  WHATSAPP_INVITE_URL,
} from '@/lib/community'

const CREAM = '#F0EBE0'
const INK = '#0D0D0D'
const LINE = '1px solid #0D0D0D'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: INK,
}

const button = {
  display: 'inline-block',
  border: LINE,
  color: INK,
  textDecoration: 'none',
  fontSize: 12,
  letterSpacing: '0.8px',
  textTransform: 'uppercase' as const,
  padding: '14px 22px',
  background: 'transparent',
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

const communityLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/workshop#community`,
  name: 'Community OFF32',
  url: `${SITE_URL}/workshop#community`,
  description: `${INSTAGRAM_LINE} ${COMMUNITY_NAME}, ${COMMUNITY_MEMBERS_LABEL}.`,
  isPartOf: {
    '@type': 'WebPage',
    name: 'Eventi',
    url: `${SITE_URL}/workshop`,
  },
}

export default function CommunityBlock() {
  return (
    <section id="community" aria-labelledby="community-manifesto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(communityLd) }} />
      <div id="manifesto" style={{ padding: '72px 5% 36px' }}>
        <div style={{ ...meta, color: '#fe3812', marginBottom: 14 }}>Manifesto</div>
        <h2 id="community-manifesto" style={{ fontFamily: "'Canela', Georgia, serif", fontWeight: 300, fontSize: 'clamp(48px, 6.2vw, 92px)', letterSpacing: '-2px', lineHeight: 0.96, margin: '0 0 20px' }}>
          {INSTAGRAM_LINE}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#3a3a3a', margin: 0, maxWidth: '68ch' }}>
          {COMMUNITY_NAME} è la community WhatsApp di OFF32. {COMMUNITY_MEMBERS_LABEL}. Nella bio di Instagram c’è {COMMUNITY_BIO_MENTION}.
        </p>
      </div>

      <div className="community-grid" style={{ padding: '0 5% 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
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
            <a href={WHATSAPP_INVITE_URL} target="_blank" rel="noreferrer" style={{ ...button, background: INK, color: CREAM }}>Entra nella community</a>
          </div>
        </article>
        <article style={card}>
          <div style={meta}>Cosa c’è dentro</div>
          <h2 style={cardTitle}>{COMMUNITY_BOARD}</h2>
          <p style={cardBody}>La bacheca della community {COMMUNITY_NAME}.</p>
          <p style={{ ...cardBody, marginTop: 'auto' }}>
            <strong style={{ color: INK }}>Gruppo. </strong>«{COMMUNITY_GROUP}»
          </p>
        </article>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .community-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
