import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Evolution SaaS - WhatsApp Integration Platform',
  description: 'Build powerful WhatsApp integrations with Evolution API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
