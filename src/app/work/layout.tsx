import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Works',
  'Selezione di progetti OFF32: brand, e-commerce, web design ed editorial.',
  '/work',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
