import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Lorenzo Salvatori',
  'Lorenzo Salvatori è full stack developer in OFF32. Web design, siti, marketing automation e intelligenza artificiale.',
  '/about/lorenzo-salvatori',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
