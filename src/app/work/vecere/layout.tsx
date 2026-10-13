import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'

const image = {
  url: '/works/vecere/preview.jpg',
  alt: 'Bottiglia di olio extravergine Vecere, nera con etichetta oro, su fondo bianco.',
}

export const metadata: Metadata = pageMeta(
  'Olio Vecere',
  'E-commerce per Olio Vecere. Design UX-UI, WordPress e WooCommerce, video e fotografia dei prodotti.',
  '/work/vecere',
  'website',
  image,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
