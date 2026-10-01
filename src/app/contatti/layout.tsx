import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Contatti',
  'Scrivi a OFF32. Rispondiamo entro 24 ore a connect@off32.it.',
  '/contatti',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
