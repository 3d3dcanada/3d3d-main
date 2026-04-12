import { ContentPage } from '@/components/content-page'
import { InquiryForm } from '@/components/inquiry-form'
import { routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.strx

export const metadata = buildMetadata({
  title: spec.title,
  description: spec.description,
  path: spec.path,
})

function DeploymentInquirySection() {
  return (
    <section id="deployment-inquiry" className="section--light-orange">
      <div className="content-section__shell">
        <div className="content-section__stack">
          <header className="content-section__header">
            <p className="eyebrow">Deployment inquiry</p>
            <h2 className="section-title">Where is the operation and what broke?</h2>
            <p className="section-copy">
              Tell me the port, the timeline, the failure mode, and who has authority on site. I
              reply within one business day. For same-day emergencies, email directly and mark
              urgent.
            </p>
          </header>
          <InquiryForm
            id="deployment-inquiry-form"
            subject="STRX deployment inquiry | 3D3D"
            accent="orange"
            submitLabel="Send deployment inquiry"
            fields={[
              { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
              { name: 'organization', label: 'Organization / team / vessel', type: 'text', autoComplete: 'organization' },
              { name: 'location', label: 'Location / port / site', type: 'text', required: true },
              {
                name: 'urgency',
                label: 'Urgency',
                type: 'select',
                required: true,
                options: [
                  { value: 'same-day', label: 'Same day — emergency' },
                  { value: '24-48h', label: '24–48 hours' },
                  { value: 'this-week', label: 'This week' },
                  { value: 'race-window', label: 'Tied to a race window' },
                  { value: 'planned', label: 'Planned campaign / refit' },
                ],
              },
              {
                name: 'service_mode',
                label: 'Service mode',
                type: 'select',
                required: true,
                options: [
                  { value: 'project-rescue', label: 'Project rescue' },
                  { value: 'field-fabrication', label: 'Field fabrication' },
                  { value: 'marine-ops', label: 'Marine operations / race support' },
                  { value: 'systems-setup', label: 'Systems / AI / automation' },
                  { value: 'other', label: 'Other — tell me' },
                ],
              },
              {
                name: 'failure',
                label: 'What broke or what has to exist?',
                type: 'textarea',
                required: true,
                rows: 5,
                placeholder: 'Describe the failure, the stakes, and what a successful intervention looks like.',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default function StrxPage() {
  return <ContentPage spec={spec} after={<DeploymentInquirySection />} />
}
