import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { Section } from '@/components/section'
import { ACCENTS } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'JB-Welded Propeller',
  description: 'The anchor 3D3D proof point: a get-home JB Weld propeller repair that kept crossing the Atlantic.',
  path: '/projects/jb-welded-propeller',
})

export default function PropellerCaseStudyPage() {
  return (
    <PageFrame currentPath="/projects">
      <Hero
        eyebrow="Case study"
        title="The get-home fix that did not go home."
        subtitle="A variable-pitch propeller repair for CSM became the proof: three Atlantic crossings, 50,000+ nautical miles, multiple races, still bolted on."
        image="/media/race/weddell-stern.jpg"
        accent="lime"
        ctas={[{ label: 'Start a quote', href: '/quote' }]}
      />
      <section className="section--light-lime">
        <div className="content-section__shell">
          <Card accent={ACCENTS.lime} eyebrow="The receipt" title="The standard is whether the work holds.">
            <div className="article-body">
              <p className="section-copy">
                The repair started as a practical answer to a practical problem: get the boat moving with the tools and materials available.
              </p>
              <p className="section-copy">
                It kept moving. Three Atlantic crossings later, after 50,000+ nautical miles and multiple races, the propeller repair is still part of the operating record.
              </p>
              <p className="section-copy">
                That is the proof 3D3D should lead with. Not a generic promise. A part that had to survive and did.
              </p>
            </div>
          </Card>
        </div>
      </section>
      <Section accent={ACCENTS.teal} imageSrc="/media/race/helm-offshore-cup.jpg" align="start">
        <Card accent={ACCENTS.teal} eyebrow="Next action" title="Bring the failure mode, not the sales deck.">
          <p className="section-copy">
            Photos, measurements, load, exposure, and the deadline are enough to start a serious assessment.
          </p>
          <div className="button-row">
            <a href="/quote" className="button-link">Quote a hard part</a>
            <a href="/marine" className="button-link--ghost">Marine field engineering</a>
          </div>
        </Card>
      </Section>
    </PageFrame>
  )
}
