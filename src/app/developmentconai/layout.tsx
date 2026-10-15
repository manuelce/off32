import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { developmentconai } from '@/lib/developmentconai'

export const metadata: Metadata = pageMeta(
  developmentconai.seo.title,
  developmentconai.seo.description,
  developmentconai.path,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
