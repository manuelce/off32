import type { Metadata } from 'next'
import { BLOG_POSTS, SITE_NAME, SITE_URL, pageMeta } from '@/lib/seo'

function postImage(post: (typeof BLOG_POSTS)[number]) {
  return 'image' in post && post.image && 'imageAlt' in post && post.imageAlt
    ? { url: post.image, alt: post.imageAlt }
    : undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(item => item.slug === slug)
  if (!post) return pageMeta('Articolo', 'Articolo non trovato.', `/blog/${slug}`, 'article')
  const article = 'datePublished' in post
    ? {
        publishedTime: post.datePublished,
        modifiedTime: 'dateModified' in post ? post.dateModified : undefined,
        authors: 'authorName' in post ? [post.authorName] : undefined,
      }
    : undefined
  return pageMeta(post.title, post.description, `/blog/${slug}`, 'article', postImage(post), article)
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find(item => item.slug === slug)
  const image = post ? postImage(post) : undefined
  const jsonLd = post && image && 'datePublished' in post && 'authorName' in post
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: [`${SITE_URL}${image.url}`],
        datePublished: post.datePublished,
        ...('dateModified' in post ? { dateModified: post.dateModified } : {}),
        inLanguage: 'it',
        author: {
          '@type': 'Person',
          name: post.authorName,
          ...('authorUrl' in post ? { url: `${SITE_URL}${post.authorUrl}` } : {}),
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/off32_cube.png` },
        },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      }
    : null

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      ) : null}
      {children}
    </>
  )
}
