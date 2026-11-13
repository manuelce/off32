import type { Metadata } from 'next'
import IubendaEmbed from '@/components/IubendaEmbed'
import ProjectStart from '@/components/ProjectStart'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Cookie Policy',
  'Come OFF32 usa i cookie su questo sito.',
  '/cookie-policy',
)

export default function CookiePolicyPage() {
    return (
      <main style={{ background: "#F8F5F0", minHeight: "100vh", color: "#0D0D0D", fontFamily: '"Axiforma", "Helvetica Neue", sans-serif' }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "80px 24px" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", marginBottom: "24px", fontFamily: '"Canela", Georgia, serif', fontWeight: 300 }}>
            Cookie Policy
          </h1>

          <p style={{ marginBottom: "32px" }}>
            La cookie policy completa di OFF32, con l&apos;elenco dei cookie e delle tecnologie
            utilizzate su questo sito, è redatta e mantenuta aggiornata tramite iubenda.
            Per consultarla, apri il documento qui sotto.
          </p>

          <IubendaEmbed type="cookie" />
        </div>
        <ProjectStart />
      </main>
    );
  }
