import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, blogPosts } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

type BlogPostParams = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return buildMetadata({ title: 'Blog', description: '3D3D blog post.', path: '/blog' })
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <PageFrame currentPath="/blog">
      <Hero
        eyebrow={`${post.category} · ${post.date}`}
        title={post.title}
        subtitle={post.excerpt}
        image="/media/real/open-ocean-01.jpg"
        accent="lime"
        ctas={[{ label: 'Back to archive', href: '/blog' }]}
      />
      <section className="section--light-lime">
        <div className="content-section__shell">
          <Card accent={ACCENTS.lime} eyebrow={post.readTime} title="Summary.">
            <div className="article-body">
              <p className="section-copy">{post.excerpt}</p>
              <p className="section-copy">
                Category: {post.category}. Date: {post.date}. This is part of the 3D3D archive of field notes, fabrication writing, and campaign updates.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
