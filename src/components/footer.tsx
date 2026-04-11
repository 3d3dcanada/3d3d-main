import { SOCIAL_LINKS } from '@/data/siteNav'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Social links row */}
        <div className="footer-socials">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={link.label}
              title={link.label}
            >
              <svg width="15" height="15" viewBox={link.viewBox} fill="currentColor">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Info line */}
        <p>
          <a href="mailto:info@3d3d.ca" style={{ color: 'var(--accent-teal)' }}>info@3d3d.ca</a>
          {' · '}3D3D · Ken · Atlantic Canada
        </p>
      </div>
    </footer>
  )
}
