import Link from 'next/link'
import { getActiveNavLabel } from '@/data/siteNav'

type SiteHeaderProps = {
  currentPath: string
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const activeLabel = getActiveNavLabel(currentPath)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div>
          <p className="site-header__eyebrow">3d3d.ca</p>
          <p className="site-header__title">{activeLabel}</p>
        </div>

        <div className="site-header__actions">
          <Link href="/" className="site-header__action">
            Home
          </Link>
          <a
            href="mailto:info@3d3d.ca"
            className="site-header__action site-header__action--accent"
          >
            Email
          </a>
        </div>
      </div>
    </header>
  )
}
