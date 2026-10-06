import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Sara Zeppieri',
  'Sara Zeppieri è graphic e motion designer in OFF32. Identità visive, packaging, editoria e motion.',
  '/about/sara-zeppieri',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
