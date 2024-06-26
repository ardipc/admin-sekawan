import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'ADMIN - SEKAWAN',
  description: 'ADMIN SEKAWAN',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
