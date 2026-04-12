import type { MetadataRoute } from 'next'
import { blogPosts, cityPages, legalPages, oraDetailSlugs, routeSpecs, softwareProjects } from '@/data/buildV2'

const siteUrl = 'https://3d3d.ca'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedRoutes = [
    '/',
    '/marine',
    '/the-ken',
    '/strx',
    '/newport-bermuda',
    '/3d3d',
    '/ora',
    '/quote',
    '/about',
    '/contact',
    '/faq',
    '/fleet',
    '/materials',
    '/workshops',
    '/projects',
    '/projects/jb-welded-propeller',
    '/media',
    '/network',
    '/blog',
    ...Object.keys(legalPages).map((slug) => `/${slug}`),
  ]

  const oraRoutes = softwareProjects
    .filter((project) => oraDetailSlugs.has(project.slug))
    .map((project) => `/ora/${project.slug}`)

  const cityRoutes = cityPages.map((page) => `/3d-printing/${page.slug}`)
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`)

  return [...fixedRoutes, ...oraRoutes, ...cityRoutes, ...blogRoutes]
    .filter((path, index, routes) => routes.indexOf(path) === index)
    .map((path) => ({
      url: `${siteUrl}${path === '/' ? '' : path}`,
      lastModified: new Date('2026-04-11'),
      changeFrequency: path === routeSpecs.home.path ? 'weekly' : 'monthly',
      priority: path === routeSpecs.home.path ? 1 : 0.7,
    }))
}
