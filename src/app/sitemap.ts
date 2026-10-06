import type { MetadataRoute } from 'next'
import { BLOG_POSTS, SITE_URL } from '@/lib/seo'

const paths = [
  '',
  '/work',
  '/work/healing-earth',
  '/work/scuppoz',
  '/work/conil-food-tour',
  '/work/duel',
  '/about',
  '/about/manuel-cerasuolo',
  '/about/sara-zeppieri',
  '/about/lorenzo-salvatori',
  '/about/sara-villani',
  '/workshop',
  '/blog',
  '/contatti',
  '/privacy-policy',
  '/cookie-policy',
  '/terms-and-conditions',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = paths.map(path => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.startsWith('/work/') || path.startsWith('/privacy') || path.startsWith('/cookie') || path.startsWith('/terms') ? 0.4 : 0.8,
  }))

  const posts = BLOG_POSTS.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...pages, ...posts]
}
