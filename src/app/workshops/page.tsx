import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { WorkshopGrid } from '@/components/workshop-grid'
import { ACCENTS } from '@/data/buildV2'
import { WORKSHOPS } from '@/data/workshops'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Workshops',
  description: '3D3D workshops and community events: intro sessions, youth STEM, libraries, festivals, and advanced techniques.',
  path: '/workshops',
})

export default function WorkshopsPage() {
  return (
    <PageFrame currentPath="/workshops">
      <Hero
        eyebrow="Workshops"
        title="Make the machine less mysterious."
        subtitle="Hands-on 3D printing workshops, library sessions, youth STEM days, senior-friendly intros, and festival activations."
        image="/media/workshop/rv-lab-01.jpg"
        accent="lime"
        ctas={[{ label: 'Book a session', href: 'mailto:info@3d3d.ca?subject=Workshop booking inquiry' }]}
      />
      <section className="section--light-lime">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.lime} eyebrow="Curriculum" title="Old scope retained, cleaner framing.">
              <p className="section-copy">
                These are the workshop and event products from the existing 3D3D scope, kept practical and bookable.
              </p>
            </Card>
            <WorkshopGrid workshops={WORKSHOPS} />
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
