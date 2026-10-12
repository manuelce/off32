import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

const image = {
  url: '/works/momento/preview.webp',
  alt: 'Homepage di Momento Catering su un portatile, con il marchio al centro della fotografia.',
}

export const metadata: Metadata = pageMeta(
  'Momento Catering',
  'Sito per Momento Catering, a Malaga. Design, sviluppo WordPress e fotografia, con la stessa interfaccia dal telefono al desktop.',
  '/work/momento',
  'website',
  image,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
