import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Community',
  'Community WhatsApp OFF32 – Officina Digitale. Uno spazio di confronto. Dove le idee diventano progetti.',
  '/community',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
