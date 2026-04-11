import Link from 'next/link'
import { PageFrame } from '@/components/page-frame'
import { Section } from '@/components/section'

export default function NotFound() {
  return (
    <PageFrame currentPath="/">
      <Section accent="#E84A8A" align="center" hero>
        <div className="not-found__panel">
          <p className="eyebrow">404</p>
          <h1 className="not-found__title">That route is not part of this v1 build.</h1>
          <p className="not-found__copy">
            The first pass only ships the homepage plus 3D3D, ORA, STRX, and THE KEN.
          </p>
          <div className="button-row">
            <Link href="/" className="button-link">
              Back to Homepage
            </Link>
            <a
              href="mailto:info@3d3d.ca"
              className="button-link--ghost"
            >
              Email direct
            </a>
          </div>
        </div>
      </Section>
    </PageFrame>
  )
}
