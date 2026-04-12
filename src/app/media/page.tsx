import { ContentPage } from '@/components/content-page'
import { routeSpecs } from '@/data/buildV2'
import { buildMetadata } from '@/lib/seo'

const spec = routeSpecs.media

export const metadata = buildMetadata({
  title: spec.title,
  description: spec.description,
  path: spec.path,
})

export default function MediaPage() {
  return <ContentPage spec={spec} />
}
