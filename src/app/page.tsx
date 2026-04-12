import { ContentPage } from '@/components/content-page'
import { routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.home

export const metadata = buildMetadata({
  description: spec.description,
  path: spec.path,
})

export default function HomePage() {
  return <ContentPage spec={spec} />
}
