import type { Metadata } from 'next'
import IubendaEmbed from '@/components/IubendaEmbed'
import ProjectStart from '@/components/ProjectStart'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Privacy Policy',
  'Informativa sul trattamento dei dati personali di OFF32.',
  '/privacy-policy',
)

export default function PrivacyPolicyPage() {
    return (
      <main style={{ background: "#F8F5F0", minHeight: "100vh", color: "#0D0D0D", fontFamily: '"Axiforma", "Helvetica Neue", sans-serif' }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "80px 24px" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", marginBottom: "24px", fontFamily: '"Canela", Georgia, serif', fontWeight: 300 }}>
            Privacy Policy
          </h1>

          <p style={{ marginBottom: "32px" }}>
            L&apos;informativa completa sul trattamento dei dati personali di OFF32 è redatta e
            mantenuta aggiornata tramite iubenda. Per consultarla, apri il documento qui sotto.
          </p>

          <IubendaEmbed type="privacy" />

          <p style={{ marginTop: "32px" }}>
            Per richieste relative al trattamento dei dati personali è possibile scrivere
            a <a href="mailto:connect@off32.it">connect@off32.it</a>.
          </p>
        </div>
        <ProjectStart />
      </main>
    );
  }
