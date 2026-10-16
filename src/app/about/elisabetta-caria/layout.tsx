import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Elisabetta Carìa',
  'Elisabetta Carìa è web designer e UX/UI designer in OFF32. Progetta siti ed e-commerce: struttura, interfacce e identità del brand.',
  '/about/elisabetta-caria',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
