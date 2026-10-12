import type { Metadata } from 'next'

export const SITE_URL = 'https://www.off32.it'
export const SITE_NAME = 'OFF32'
export const SITE_DESCRIPTION =
  'Agenzia di comunicazione digitale potenziata dall\'intelligenza artificiale. Brand, web, marketing e strategia.'

export const BRAND_ARTICLE_IMAGE = {
  url: '/blog/img/brand-digitale.jpg?v=2',
  alt: 'Tavolo di un progetto di brand, visto dall’alto: una mano disegna su una tavoletta grafica, accanto a un laptop e a un monitor pieno di immagini.',
}

export const CLIENT_ARTICLE_IMAGE = {
  url: '/blog/img/client_s.webp',
  alt: 'Stretta di mano tra due persone a un tavolo di lavoro, con un portatile aperto e colleghi intorno.',
}

export const ECOMMERCE_ARTICLE_IMAGE = {
  url: '/blog/img/ecommerce-2025.jpg',
  alt: 'Scatola di cartone aperta, con carta velina, un pacchetto e un nastro nero, accanto a un laptop chiuso su un tavolo di legno.',
  width: 1280,
  height: 720,
}

export const BLOG_POSTS = [
  {
    slug: 'come-costruire-brand-digitale',
    title: 'Come costruire un brand digitale che dura nel tempo',
    description: 'Come si costruisce un brand digitale che dura: posizione chiara, poche regole visive e un tono che resta riconoscibile quando cambiano sito e campagne.',
    image: BRAND_ARTICLE_IMAGE.url,
    imageAlt: BRAND_ARTICLE_IMAGE.alt,
  },
  {
    slug: 'scegliere-clienti-giusti',
    title: 'Quando una collaborazione funziona',
    description: 'Una collaborazione funziona quando tempi, materiali e decisioni sono chiari per entrambi. Ecco come in OFF32 capiamo se un progetto è quello giusto.',
    image: CLIENT_ARTICLE_IMAGE.url,
    imageAlt: CLIENT_ARTICLE_IMAGE.alt,
  },
  {
    slug: 'ecommerce-performante-2025',
    title: 'eCommerce performante nel 2025: cosa funziona davvero',
    description: 'Un e-commerce performante si decide sulla scheda prodotto, sulla velocità del telefono e su un checkout che mostra subito prezzo, spedizione e reso.',
    image: ECOMMERCE_ARTICLE_IMAGE.url,
    imageAlt: ECOMMERCE_ARTICLE_IMAGE.alt,
    datePublished: '2025-02-01',
    dateModified: '2026-10-12',
    authorName: 'Lorenzo Salvatori',
    authorUrl: '/about/lorenzo-salvatori',
  },
] as const

export function pageMeta(
  title: string,
  description: string,
  path: string,
  type: 'website' | 'article' = 'website',
  image?: { url: string; alt: string },
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[] },
): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} · OFF32`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'it_IT',
      type,
      ...(image ? { images: [{ url: image.url, alt: image.alt }] } : {}),
      ...(type === 'article' && article
        ? {
            publishedTime: article.publishedTime,
            ...(article.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
            ...(article.authors ? { authors: article.authors } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  }
}
