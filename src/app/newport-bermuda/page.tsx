import { ContentPage } from '@/components/content-page'
import { InquiryForm } from '@/components/inquiry-form'
import { routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.newportBermuda

export const metadata = buildMetadata({
  title: spec.title,
  description: spec.description,
  path: spec.path,
})

function SponsorInquirySection() {
  return (
    <section id="sponsor-inquiry" className="section--light-pink">
      <div className="content-section__shell">
        <div className="content-section__stack">
          <header className="content-section__header">
            <p className="eyebrow">Sponsor the campaign</p>
            <h2 className="section-title">Put your name on the deployment.</h2>
            <p className="section-copy">
              Pick a tier, share what matters to your brand, and I will reply with next steps
              before the Newport start on June 19, 2026. Sponsor tier fulfillment is consent-bound
              and honestly scoped — no vaporware deliverables.
            </p>
          </header>
          <InquiryForm
            id="sponsor-inquiry-form"
            subject="Newport-Bermuda sponsor inquiry | 3D3D"
            accent="magenta"
            submitLabel="Send sponsor inquiry"
            fields={[
              { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
              {
                name: 'organization',
                label: 'Business / brand (optional)',
                type: 'text',
                autoComplete: 'organization',
              },
              {
                name: 'tier',
                label: 'Sponsor tier',
                type: 'select',
                required: true,
                options: [
                  { value: 'crew-25', label: 'Crew — $25 CAD' },
                  { value: 'supporter-100', label: 'Supporter — $100 CAD' },
                  { value: 'partner-500', label: 'Partner — $500 CAD' },
                  { value: 'sponsor-2500', label: 'Sponsor — $2,500 CAD' },
                  { value: 'title-10000', label: 'Title — $10,000+ CAD' },
                  { value: 'discuss', label: 'Let us discuss a custom tier' },
                ],
              },
              {
                name: 'message',
                label: 'What matters to you and what you hope to get',
                type: 'textarea',
                required: true,
                rows: 5,
                placeholder: 'Visibility, co-branded content, printer or dock signage, priority response — tell me what is real for your brand.',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default function NewportBermudaPage() {
  return <ContentPage spec={spec} after={<SponsorInquirySection />} />
}
