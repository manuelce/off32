import { SITE_NAME, SITE_URL } from '@/lib/seo'
import type { Crumb } from '@/components/ServiceBreadcrumb'
import { PARTICIPATION_NOTE } from '@/lib/community'
import { detailsInCommunity, EVENT_KIND_LABEL, type Off32Event } from '@/lib/events'
import type { ServiceFaq, ServicePage } from '@/lib/services'

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ServiceJsonLd({
  service,
  path,
}: {
  service: ServicePage
  path: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: 'IT',
    url: `${SITE_URL}${path}`,
    serviceType: service.keyword,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function eventNode(event: Off32Event) {
  const pageUrl = event.href && event.href.startsWith('/')
    ? `${SITE_URL}${event.href}`
    : `${SITE_URL}/workshop#${event.slug}`
  const description = [
    event.summary,
    detailsInCommunity(event) ? PARTICIPATION_NOTE : null,
  ].filter(Boolean).join(' ')

  return {
    '@type': 'Event',
    name: `${EVENT_KIND_LABEL[event.kind]} OFF32: ${event.title}`,
    description,
    startDate: event.startDate ?? event.date,
    eventAttendanceMode: event.attendance === 'online'
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: 'it',
    url: pageUrl,
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(event.attendance === 'online'
      ? {
          location: {
            '@type': 'VirtualLocation',
            name: event.platform ?? 'Online',
            ...(event.sessionUrl ? { url: event.sessionUrl } : {}),
          },
        }
      : {}),
    ...(event.price
      ? {
          offers: {
            '@type': 'Offer',
            price: event.price.replace(/[^\d]/g, ''),
            priceCurrency: 'EUR',
            url: pageUrl,
          },
        }
      : {}),
  }
}

/** Eventi con data. Nessun luogo fisico e nessun URL di sessione se non sono pubblici. */
export function EventsJsonLd({ events }: { events: Off32Event[] }) {
  const dated = events.filter(event => event.status === 'upcoming' && (event.startDate || event.date))
  if (dated.length === 0) return null
  const data = {
    '@context': 'https://schema.org',
    '@graph': dated.map(eventNode),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({ faqs }: { faqs: ServiceFaq[] }) {
  if (faqs.length === 0) return null
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
