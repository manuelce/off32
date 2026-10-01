import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta(
  'Events',
  'Workshop, corsi e talk OFF32. Cultura, inclusione e formazione. Date concordate, materiali inclusi.',
  '/workshop',
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
