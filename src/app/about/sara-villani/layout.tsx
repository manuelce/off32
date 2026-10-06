import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Sara Villani',
  'Sara Villani è social media manager in OFF32. Strategia social, piano editoriale, contenuti e analisi delle performance.',
  '/about/sara-villani',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
