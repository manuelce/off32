import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'The Duel',
  'Progetto editorial The Duel.',
  '/work/duel',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
