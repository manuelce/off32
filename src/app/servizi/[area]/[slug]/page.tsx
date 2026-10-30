import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServicePageView from '@/components/ServicePageView'
import { areaBySlug, SERVICE_PAGES, serviceBySlug, servicePath } from '@/lib/services'
import { pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ area: string; slug: string }> }

export function generateStaticParams() {
  return SERVICE_PAGES.map(service => ({
    area: service.area,
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: areaSlug, slug } = await params
  const service = serviceBySlug(slug)
  if (!service || service.area !== areaSlug) return {}
  return pageMeta(service.title, service.description, servicePath(service))
}

export default async function ServiceLeafPage({ params }: Props) {
  const { area: areaSlug, slug } = await params
  const service = serviceBySlug(slug)
  const area = areaBySlug(areaSlug)
  if (!service || !area || service.area !== areaSlug) notFound()
  return <ServicePageView service={service} />
}
