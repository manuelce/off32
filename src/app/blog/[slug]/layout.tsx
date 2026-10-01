import type { Metadata } from 'next'
import { BLOG_POSTS, pageMeta } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(item => item.slug === slug)
  if (!post) return pageMeta('Articolo', 'Articolo non trovato.', `/blog/${slug}`, 'article')
  return pageMeta(post.title, post.description, `/blog/${slug}`, 'article')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
