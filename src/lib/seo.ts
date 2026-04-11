import type { Metadata } from 'next'

const SITE_NAME = '3D3D'
const SITE_URL = 'https://3d3d.ca'
const DEFAULT_OG_IMAGE = '/og-default.png'

type MetadataOptions = {
  title?: string
  description: string
  path: string
  image?: string
}

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: MetadataOptions): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Operator. Builder. The infrastructure behind things that work.`

  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}

export const siteMetadata = {
  name: SITE_NAME,
  url: SITE_URL,
}
