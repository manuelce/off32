import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Scuppoz',
  'Web design per Scuppoz, liquori d\'Abruzzo.',
  '/work/scuppoz',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
