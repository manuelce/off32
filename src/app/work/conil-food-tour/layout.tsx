import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Conil Food Tour',
  'Brand ed e-commerce per Conil Food Tour.',
  '/work/conil-food-tour',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
