import type { CSSProperties } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Card } from '@/components/card'
import { FleetGrid } from '@/components/fleet-grid'
import { PageFrame } from '@/components/page-frame'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Section } from '@/components/section'
import { WorkshopGrid } from '@/components/workshop-grid'
import { FLEET, FLEET_STATS } from '@/data/fleet'
import { THREEDTHREED_PAGE } from '@/data/siteContent'
import { WORKSHOPS } from '@/data/workshops'
import { buildMetadata } from '@/lib/seo'

const FORM_ENDPOINT = 'https://formspree.io/f/mldlydbl'

export const metadata = buildMetadata({
  title: '3D3D',
  description:
    'Distributed 3D printing cooperative. Atlantic Canada. Marine, motorsport, restoration, and field-deployable fabrication.',
  path: '/3d3d',
})

export default function ThreeDThreeDPage() {
  return (
    <PageFrame currentPath="/3d3d">
      {/* === HERO (dark cinematic) === */}
      <Section
        accent="#40C4C4"
        imageSrc="/media/workshop/printer-action-cf.jpg"
        imagePosition="center"
        align="start"
        hero
      >
        <Card
          accent="#40C4C4"
          eyebrow="3D3D — the root cooperative"
          title={THREEDTHREED_PAGE.heroTitle}
          titleAs="h1"
          subtitle={THREEDTHREED_PAGE.intro}
          hero
        >
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: '3D3D' }]} />
          <p className="section-copy">{THREEDTHREED_PAGE.supporting}</p>
          <div className="button-row">
            <a href="#quote-intake" className="button-link">
              Start Quote Intake
            </a>
            <a href="mailto:info@3d3d.ca" className="button-link--ghost">
              Email Direct
            </a>
          </div>
        </Card>
      </Section>

      {/* === SERVICE MODES (light section) === */}
      <section className="section--light" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in-fade">
            <Card accent="#40C4C4" eyebrow="Service modes" title="Three ways the work gets done.">
              <div className="section-list">
                {THREEDTHREED_PAGE.serviceModes.map((mode, i) => (
                  <ScrollReveal
                    key={mode.title}
                    variant="scroll-in-left"
                    delay={(i + 1) as 1 | 2 | 3}
                  >
                    <div
                      className="section-list__item"
                      style={{ '--card-accent': '#40C4C4' } as CSSProperties}
                    >
                      <h3 className="section-list__title">{mode.title}</h3>
                      <p className="section-list__body">{mode.body}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* === FLEET (dark cinematic) === */}
      <Section accent="#FF6B2B" imageSrc="/media/workshop/core-one-l.avif" imagePosition="center" align="start">
        <div className="section-stack">
          <ScrollReveal variant="scroll-in">
            <Card accent="#FF6B2B" eyebrow="Fleet" title="Six printers. One operator.">
              <p className="section-copy">
                Machine selection follows from the material the job needs, not the other way around.
              </p>
            </Card>
          </ScrollReveal>

          <div className="stat-grid">
            {[
              { label: 'Printers', value: String(FLEET_STATS.totalPrinters), accent: '#40C4C4' },
              { label: 'Materials supported', value: String(FLEET_STATS.materialsSupported), accent: '#E84A8A' },
              { label: 'Max build volume', value: FLEET_STATS.maxBuildVolume, accent: '#FF6B2B' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} variant="scroll-in-pop" delay={(i + 1) as 1 | 2 | 3}>
                <div className="stat-card" style={{ '--card-accent': stat.accent } as CSSProperties}>
                  <p className="stat-card__label">{stat.label}</p>
                  <p className="stat-card__value">{stat.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <FleetGrid printers={FLEET} />
        </div>
      </Section>

      {/* === WORKSHOPS (light pink section) === */}
      <section className="section--light-pink" style={{ padding: '5rem 0' }}>
        <div style={{ width: 'min(100%, var(--content-max))', margin: '0 auto', padding: '0 1.5rem' }}>
          <ScrollReveal variant="scroll-in">
            <Card accent="#AAFF2A" eyebrow="Workshops" title="Maritime workshop tour — Summer 2026.">
              <p className="section-copy">
                Marinas, community spaces, and hands-on sessions across the Maritimes.
                From the $80 printer to the industrial Core One L. Everyone leaves with something they made.
              </p>
            </Card>
          </ScrollReveal>

          <WorkshopGrid workshops={WORKSHOPS} />
        </div>
      </section>

      {/* === QUOTE INTAKE (dark cinematic) === */}
      <Section
        accent="#40C4C4"
        imageSrc="/media/workshop/machine-parts-flatlay.jpg"
        imagePosition="center"
        align="start"
      >
        <ScrollReveal variant="scroll-in">
          <form
            id="quote-intake"
            action={FORM_ENDPOINT}
            method="POST"
            className="form-shell"
            style={{ '--card-accent': '#40C4C4' } as CSSProperties}
          >
            <input type="hidden" name="_subject" value="3D3D Quote Request | 3D3D" />
            <input type="hidden" name="source" value="3d3d-page-quote-intake" />
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-100vw', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="quote-website">Leave blank</label>
              <input type="text" id="quote-website" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <p className="eyebrow">Quote intake</p>
            <h2 className="section-title">{THREEDTHREED_PAGE.quoteTitle}</h2>
            <p className="form-note">{THREEDTHREED_PAGE.quoteCopy}</p>

            <div className="form-grid form-grid--two">
              <label className="form-field">
                <span className="form-field__label">Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label className="form-field">
                <span className="form-field__label">Email</span>
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="form-grid form-grid--two">
              <label className="form-field">
                <span className="form-field__label">Service mode</span>
                <select name="service_mode" defaultValue="Remote">
                  <option>Remote — ship or send photos</option>
                  <option>On-site — I come to you</option>
                  <option>Extended — deep project work</option>
                </select>
              </label>
              <label className="form-field">
                <span className="form-field__label">Material environment</span>
                <select name="environment" defaultValue="">
                  <option value="">Select if known</option>
                  <option>Marine — saltwater, UV, vibration</option>
                  <option>Automotive — heat, chemicals, flex</option>
                  <option>Indoor — standard conditions</option>
                  <option>Industrial — high load, temperature</option>
                  <option>Unsure — advise me</option>
                </select>
              </label>
            </div>

            <label className="form-field">
              <span className="form-field__label">Describe the part or problem</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="What broke? What do you need made? Where does the part live and what does it face?"
              />
            </label>

            <label className="form-field">
              <span className="form-field__label">Attach files (optional)</span>
              <input type="file" name="attachment" accept=".jpg,.jpeg,.png,.pdf,.stl,.step,.3mf" />
            </label>

            <div className="form-consent">
              <input type="checkbox" id="casl-3d3d" name="casl_consent" value="yes" required />
              <label htmlFor="casl-3d3d">
                I consent to receiving messages from 3D3D regarding this inquiry. Unsubscribe any time.
              </label>
            </div>

            <div className="button-row">
              <button type="submit" className="button-link">
                Send Quote Request
              </button>
              <a href="mailto:info@3d3d.ca" className="button-link--ghost">
                Email instead
              </a>
            </div>
          </form>
        </ScrollReveal>
      </Section>
    </PageFrame>
  )
}
