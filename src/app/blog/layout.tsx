import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Blog',
  'Note di OFF32 su brand, clienti ed e-commerce.',
  '/blog',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
