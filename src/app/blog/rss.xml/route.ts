import { blogPosts } from '@/data/buildV2'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function GET() {
  const items = blogPosts
    .map((post) => {
      const url = `https://3d3d.ca/blog/${post.slug}/`
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        `<pubDate>${new Date(`${post.date}T12:00:00-03:00`).toUTCString()}</pubDate>`,
        '</item>',
      ].join('')
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>3D3D Field Notes</title><link>https://3d3d.ca/blog/</link><description>3D3D field notes, material guides, and campaign updates.</description>${items}</channel></rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
