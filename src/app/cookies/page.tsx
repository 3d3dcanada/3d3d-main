import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, legalPages } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const page = legalPages.cookies

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <PageFrame currentPath="/cookies">
      <Hero eyebrow="Legal" title={page.title} subtitle={page.description} image="/media/backgrounds/home-hero-workbench.jpg" accent="teal" />
      <section className="section--light">
        <div className="content-section__shell">
          <Card accent={ACCENTS.teal} eyebrow="Policy" title={page.title}>
            <div className="article-body">
              {page.copy.map((paragraph) => <p key={paragraph} className="section-copy">{paragraph}</p>)}
            </div>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
