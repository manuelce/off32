import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OFF32 — Agenzia di comunicazione digitale',
  description: 'Agenzia di comunicazione digitale potenziata dall\'intelligenza artificiale. Brand, web, marketing e strategia.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}