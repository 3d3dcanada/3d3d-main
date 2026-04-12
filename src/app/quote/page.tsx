import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { MultiStepQuoteForm } from '@/components/multi-step-form'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.quote

export const metadata = buildMetadata({
  title: spec.title,
  description: spec.description,
  path: spec.path,
})

export default function QuotePage() {
  return (
    <PageFrame currentPath="/quote">
      <Hero {...spec.hero} />
      <section className="section--light-orange">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.orange} eyebrow="Quote prep" title="Answer the three context questions, then send the file.">
              <p className="section-copy">
                The form is intentionally short. The follow-up gets specific after the environment and risk are clear.
              </p>
            </Card>
            <MultiStepQuoteForm />
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
