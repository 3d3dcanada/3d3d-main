import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, cityPages } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

type CityParams = {
  params: Promise<{ city: string }>
}

export function generateStaticParams() {
  return cityPages.map((page) => ({ city: page.slug }))
}

export async function generateMetadata({ params }: CityParams): Promise<Metadata> {
  const { city } = await params
  const page = cityPages.find((item) => item.slug === city)

  if (!page) {
    return buildMetadata({ title: '3D Printing', description: '3D3D local fabrication page.', path: '/3d-printing' })
  }

  return buildMetadata({
    title: `3D Printing ${page.city}`,
    description: `3D printing and fabrication inquiries for ${page.city}, routed through 3D3D's Atlantic Canada workflow.`,
    path: `/3d-printing/${page.slug}`,
  })
}

export default async function CityPage({ params }: CityParams) {
  const { city } = await params
  const page = cityPages.find((item) => item.slug === city)

  if (!page) {
    notFound()
  }

  return (
    <PageFrame currentPath="/3d3d">
      <Hero
        eyebrow="Atlantic Canada"
        title={`3D printing for ${page.city}.`}
        subtitle="Local manufacturing should stay close to the problem. Send the file, the failure mode, and the deadline."
        image="/media/workshop/modular-parts-flatlay.jpg"
        accent="teal"
        ctas={[{ label: 'Start a quote', href: '/quote' }, { label: 'Network page', href: '/network', ghost: true }]}
      />
      <section className="section--light">
        <div className="content-section__shell">
          <Card accent={ACCENTS.teal} eyebrow={page.city} title="Start with the part and the deadline.">
            <p className="section-copy">
              Send photos, files, measurements, material constraints, and where the part needs to live. Local operator claims should stay limited to confirmed availability.
            </p>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
