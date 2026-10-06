import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Manuel Cerasuolo',
  'Manuel Cerasuolo è digital project manager in OFF32. Coordina progetti web, e-commerce e digital product dall’idea al delivery.',
  '/about/manuel-cerasuolo',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
