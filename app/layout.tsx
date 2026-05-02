import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nikita Pozhidaev — Web Developer',
  description: 'Personal portfolio of Nikita Pozhidaev — web developer from Tula, Russia. Next.js, TypeScript, React.',
  keywords: ['web developer', 'portfolio', 'Next.js', 'TypeScript', 'Tula'],
  openGraph: {
    title: 'Nikita Pozhidaev — Web Developer',
    description: 'Building commercial web products from Tula, Russia.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
