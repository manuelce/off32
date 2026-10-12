import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

const image = {
  url: '/works/monochrome/preview.jpg',
  alt: 'Homepage di Monochrome, divisa tra viola e nero, con il nome a tutta pagina.',
}

export const metadata: Metadata = pageMeta(
  'Monochrome',
  'Sito per lo studio di Sofia Gonzalez. Prototipo, tema WordPress, colore e carattere restano uguali su ogni pagina.',
  '/work/monochrome',
  'website',
  image,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
