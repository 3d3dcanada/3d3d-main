'use client'

import { CONTACT_EMAIL, FORMSPREE_ENDPOINT } from '@/data/buildV2'

export function ContactForm({ subject = 'Contact Request | 3D3D' }: { subject?: string }) {
  return (
    <form id="contact-form" className="form-shell" action={FORMSPREE_ENDPOINT} method="POST" encType="multipart/form-data">
      <input type="hidden" name="_subject" value={subject} />
      <div className="form-field form-field--hidden" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave blank</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid form-grid--two">
        <label className="form-field">
          <span className="form-field__label">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="form-field">
          <span className="form-field__label">Email</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>
      <div className="form-grid form-grid--two">
        <label className="form-field">
          <span className="form-field__label">Subject</span>
          <select name="subject" required defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Marine Hardware</option>
            <option>On-Site Deployment</option>
            <option>Remote Assessment</option>
            <option>Reverse Engineering</option>
            <option>Automotive Restoration</option>
            <option>ORA / Software</option>
            <option>Other</option>
          </select>
        </label>
        <label className="form-field">
          <span className="form-field__label">Timeline</span>
          <input name="timeline" />
        </label>
      </div>
      <label className="form-field">
        <span className="form-field__label">File upload</span>
        <input name="upload" type="file" accept=".jpg,.jpeg,.png,.pdf,.stl,.step,.3mf" />
      </label>
      <label className="form-field">
        <span className="form-field__label">What broke?</span>
        <textarea name="message" rows={6} required />
      </label>
      <label className="form-consent">
        <input type="checkbox" name="casl_consent" required />
        <span>
          I consent to 3D3D contacting me about this request. I can withdraw by emailing{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See <a href="/casl">CASL</a> and <a href="/privacy">privacy</a>.
        </span>
      </label>
      <button type="submit" className="button-link">
        Send request
      </button>
      <p className="form-note">Email-only contact. Direct inbox, consent-bound follow-up.</p>
    </form>
  )
}
