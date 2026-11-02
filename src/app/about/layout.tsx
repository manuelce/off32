import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'About',
  'OFF32: comunicazione digitale potenziata dall’AI. Il team: Manuel Cerasuolo, Sara Zeppieri, Lorenzo Salvatori, Sara Villani e Elisabetta Carìa.',
  '/about',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
