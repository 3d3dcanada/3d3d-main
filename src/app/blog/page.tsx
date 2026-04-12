import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, blogPosts } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const posts = [...blogPosts].sort((a, b) => String(b.date).localeCompare(String(a.date)))

export const metadata = buildMetadata({
  title: 'Blog',
  description: '3D3D field notes, campaign updates, material guides, and fabrication writing imported from the old scope.',
  path: '/blog',
})

export default function BlogIndexPage() {
  return (
    <PageFrame currentPath="/blog">
      <Hero
        eyebrow="Field notes"
        title="The writing archive is back on the route map."
        subtitle="Field notes, campaign updates, material guides, and fabrication writing from the old scope."
        image="/media/real/sunrise-offshore.jpg"
        accent="lime"
        ctas={[{ label: 'Start with latest', href: `/blog/${posts[0].slug}` }]}
      />
      <section className="section--light">
        <div className="content-section__shell">
          <div className="content-section__stack">
            <Card accent={ACCENTS.lime} eyebrow="Archive" title={`${posts.length} field notes.`}>
              <p className="section-copy">
                Marine work, material choices, campaign updates, printer setup, local manufacturing, and why the work has to hold.
              </p>
            </Card>
            <div className="info-grid">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="info-card-link">
                  <article className="info-card" style={{ '--card-accent': ACCENTS.lime } as CSSProperties}>
                    <p className="info-card__meta">{post.category} · {post.readTime}</p>
                    <h3 className="info-card__title">{post.title}</h3>
                    <p className="info-card__body">{post.excerpt}</p>
                    <span className="info-card__link">Read &rarr;</span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  )
}
