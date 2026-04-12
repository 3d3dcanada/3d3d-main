import { ContentPage } from '@/components/content-page'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.home

export const metadata = buildMetadata({
  description: spec.description,
  path: spec.path,
})

function HomeNewsletterSection() {
  return (
    <section id="newsletter" className="section--light">
      <div className="content-section__shell">
        <div className="content-section__stack content-section__stack--narrow">
          <header className="content-section__header">
            <p className="eyebrow">Stay in the loop</p>
            <h2 className="section-title">Field reports, campaign notes, when the work warrants it.</h2>
            <p className="section-copy">
              Newport-Bermuda build-up, mission debriefs, new materials, and quiet weeks when
              nothing happens. Low frequency. Unsubscribe any time.
            </p>
          </header>
          <NewsletterSignup variant="card" source="home" />
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return <ContentPage spec={spec} after={<HomeNewsletterSection />} />
}
