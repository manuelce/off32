import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Healing Earth Italia',
  'Brand ed e-commerce per Healing Earth Italia.',
  '/work/healing-earth',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
