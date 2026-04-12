import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { siteMetadata } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  title: '3D3D — Operator. Builder. The infrastructure behind things that work.',
  description:
    '3D printing networks. AI systems. Field operations. When it matters, it holds. Founder-operated in Atlantic Canada. Four divisions: 3D3D, ORA, STRX, and THE KEN.',
  metadataBase: new URL(siteMetadata.url),
  icons: {
    icon: '/media/brand/3d3d-logo.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#060810',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
