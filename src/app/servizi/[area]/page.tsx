import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceHubView from '@/components/ServiceHubView'
import { areaBySlug, SERVICE_AREAS } from '@/lib/services'
import { pageMeta } from '@/lib/seo'

type Props = { params: Promise<{ area: string }> }

export function generateStaticParams() {
  return SERVICE_AREAS.map(area => ({ area: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = areaBySlug(areaSlug)
  if (!area) return {}
  return pageMeta(area.title, area.description, `/servizi/${area.slug}`)
}

export default async function ServiceAreaPage({ params }: Props) {
  const { area: areaSlug } = await params
  const area = areaBySlug(areaSlug)
  if (!area) notFound()
  return <ServiceHubView area={area} />
}
