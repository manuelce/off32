import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const title = 'Officina32 · OFF32 community'
const description =
  'La community WhatsApp di OFF32: 80 persone, il meet-up Ci conosciamo e il corso Agenda32. Uno spazio di confronto. Dove le idee diventano progetti.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/officina32' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/officina32`,
    siteName: SITE_NAME,
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/events/conosciamoci.jpg',
        alt: 'Griglia di ritratti di persone che sorridono, immagine del meet-up Ci conosciamo.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/events/conosciamoci.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
