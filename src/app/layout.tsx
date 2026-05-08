import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OFF32 — Officina digitale',
  description: 'Il network dei professionisti digitali italiani.',
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
    <ClerkProvider>
      <html lang="it">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}