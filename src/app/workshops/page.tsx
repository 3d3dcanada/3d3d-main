import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { InquiryForm } from '@/components/inquiry-form'
import { PageFrame } from '@/components/page-frame'
import { WorkshopGrid } from '@/components/workshop-grid'
import { ACCENTS } from '@/data/buildV2'
import { WORKSHOPS } from '@/data/workshops'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Workshops',
  description:
    '3D3D workshops and community events: intro sessions, youth STEM, libraries, festivals, and advanced techniques.',
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
        ctas={[{ label: 'Book a session', href: '#workshop-booking' }]}
      />

      <section className="section--light-lime">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.lime} eyebrow="Curriculum" title="Old scope retained, cleaner framing.">
              <p className="section-copy">
                These are the workshop and event products from the existing 3D3D scope, kept practical and bookable.
                Click any card to see the curriculum and pricing tiers, or head straight to the booking form below.
              </p>
            </Card>
            <WorkshopGrid workshops={WORKSHOPS} />
          </div>
        </div>
      </section>

      <section id="workshop-booking" className="section--light-pink">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <header className="content-section__header">
              <p className="eyebrow">Book a workshop</p>
              <h2 className="section-title">Pick a format and tell me the venue.</h2>
              <p className="section-copy">
                Public session, library, school, seniors group, festival booth, private hands-on.
                Send the format you want, rough date window, expected attendance, and any access
                notes. I reply within one business day.
              </p>
            </header>
            <InquiryForm
              id="workshop-booking-form"
              subject="Workshop booking inquiry | 3D3D"
              accent="lime"
              submitLabel="Send booking inquiry"
              fields={[
                { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
                { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
                {
                  name: 'organization',
                  label: 'Organization / venue',
                  type: 'text',
                  autoComplete: 'organization',
                  placeholder: 'Library, school, community center, marina, festival, etc.',
                },
                {
                  name: 'format',
                  label: 'Workshop format',
                  type: 'select',
                  required: true,
                  options: [
                    { value: 'intro-3d-printing', label: 'Introduction to 3D Printing' },
                    { value: 'cardboard-boat-regatta', label: 'Cardboard Boat Regatta' },
                    { value: 'youth-stem-day', label: 'Youth STEM Discovery Day' },
                    { value: 'library-workshop', label: 'Library 3D Printing Workshop' },
                    { value: 'festival-booth', label: 'Festival & Event Booth' },
                    { value: 'youth-3d-printing', label: 'Youth 3D Printing Adventure' },
                    { value: 'seniors-tech', label: '3D Printing for Seniors' },
                    { value: 'advanced-techniques', label: 'Advanced Techniques Bootcamp' },
                    { value: 'discuss', label: 'Not sure — let us discuss' },
                  ],
                },
                { name: 'location', label: 'Location (city / region)', type: 'text', required: true },
                { name: 'date_window', label: 'Date window', type: 'text', placeholder: 'e.g. Sept–Oct 2026, a specific weekend, etc.' },
                { name: 'attendance', label: 'Expected attendance', type: 'text', placeholder: 'e.g. 12 youth ages 10–14, 20 adults, etc.' },
                {
                  name: 'notes',
                  label: 'Notes (space, power, accessibility, sponsor?)',
                  type: 'textarea',
                  rows: 4,
                  placeholder: 'Anything I should know before I quote and commit.',
                },
              ]}
            />
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
