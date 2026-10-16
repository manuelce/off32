import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'About',
  'Il team OFF32: Manuel Cerasuolo, Sara Zeppieri, Lorenzo Salvatori, Sara Villani e Elisabetta Carìa.',
  '/about',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
