import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card } from '@/components/card'
import { Hero } from '@/components/hero'
import { PageFrame } from '@/components/page-frame'
import { ACCENTS, oraDetailSlugs, softwareProjects } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

type OraParams = {
  params: Promise<{ slug: string }>
}

const detailProjects = softwareProjects.filter((project) => oraDetailSlugs.has(project.slug))

export function generateStaticParams() {
  return detailProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: OraParams): Promise<Metadata> {
  const { slug } = await params
  const project = detailProjects.find((item) => item.slug === slug)

  if (!project) {
    return buildMetadata({ title: 'ORA', description: 'ORA project detail.', path: '/ora' })
  }

  return buildMetadata({
    title: `${project.name} | ORA`,
    description: project.tagline,
    path: `/ora/${project.slug}`,
  })
}

export default async function OraDetailPage({ params }: OraParams) {
  const { slug } = await params
  const project = detailProjects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <PageFrame currentPath="/ora">
      <Hero
        eyebrow={`${project.category} · ${project.status}`}
        title={project.name}
        subtitle={project.tagline}
        image="/media/workshop/printer-frame-shot.jpg"
        accent={project.accent}
        ctas={[{ label: 'Back to ORA', href: '/ora' }]}
      />
      <section className="section--light-pink">
        <div className="content-section__shell">
          <Card accent={ACCENTS[project.accent]} eyebrow="Project brief" title="Inside the ORA portfolio.">
            <div className="article-body">
              <p className="section-copy">{project.tagline}</p>
              <p className="section-copy">
                Category: {project.category}. Status: {project.status}. This is one project inside ORA, the wider Operational Reasoning Architecture portfolio.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </PageFrame>
  )
}
