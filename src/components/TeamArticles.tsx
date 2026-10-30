import Link from 'next/link'
import { articlesByAuthor } from '@/lib/seo'

const LINE = '1px solid #0D0D0D'
const CREAM = '#F0EBE0'

const meta = {
  fontSize: 11,
  letterSpacing: '1.8px',
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
}

export default function TeamArticles({ authorUrl }: { authorUrl: string }) {
  const articles = articlesByAuthor(authorUrl)
  if (articles.length === 0) return null

  return (
    <section
      aria-labelledby="team-articles"
      style={{
        padding: '56px 40px 72px',
        borderTop: LINE,
        background: CREAM,
      }}
      className="team-articles"
    >
      <h2
        id="team-articles"
        style={{
          fontFamily: "'Canela', Georgia, serif",
          fontWeight: 300,
          fontSize: 'clamp(32px, 4vw, 48px)',
          letterSpacing: '-1px',
          margin: '0 0 36px',
          color: '#0D0D0D',
        }}
      >
        Articoli
      </h2>

      <div className="team-articles-grid">
        {articles.map(article => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="team-article-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, 42%) minmax(0, 1fr)',
              gap: 20,
              alignItems: 'start',
              textDecoration: 'none',
              color: '#0D0D0D',
            }}
          >
            <div
              style={{
                border: LINE,
                overflow: 'hidden',
                background: '#e7e0d4',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    border: LINE,
                    padding: '4px 10px',
                    background: '#fff',
                    color: '#0D0D0D',
                  }}
                >
                  {'tag' in article ? article.tag : 'Blog'}
                </span>
                {'dateLabel' in article ? (
                  <span style={{ fontSize: 13, color: '#7a746c' }}>{article.dateLabel}</span>
                ) : null}
              </div>
              <div
                style={{
                  fontFamily: "'Canela', Georgia, serif",
                  fontWeight: 300,
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.5px',
                }}
              >
                {article.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .team-articles-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px 48px;
        }
        .team-article-card:hover img {
          transform: scale(1.02);
        }
        .team-article-card img {
          transition: transform 0.45s ease;
        }
        @media (max-width: 900px) {
          .team-articles-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 1024px) {
          .team-articles { padding: 48px 20px 64px !important; }
        }
        @media (max-width: 520px) {
          .team-article-card {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  )
}
