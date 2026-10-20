import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMeta(
    'Workshop illustrazione con Mirko Càmia',
    'Workshop di 6 ore a marzo: con Mirko Càmia impari a realizzare un’illustrazione forte, personale e pronta da mostrare.',
    '/workshop/mirko-camia',
  ),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
