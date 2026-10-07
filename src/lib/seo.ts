import type { Metadata } from 'next'

export const SITE_URL = 'https://www.off32.it'
export const SITE_NAME = 'OFF32'
export const SITE_DESCRIPTION =
  'Agenzia di comunicazione digitale potenziata dall\'intelligenza artificiale. Brand, web, marketing e strategia.'

export const BLOG_POSTS = [
  {
    slug: 'come-costruire-brand-digitale',
    title: 'Come costruire un brand digitale che dura nel tempo',
    description: 'Il brand non è un logo. È la promessa che fai ogni giorno ai tuoi clienti. Ecco come in OFF32 affrontiamo l\'identità visiva.',
  },
  {
    slug: 'scegliere-clienti-giusti',
    title: 'Imparare a dire no: l\'arte di scegliere i clienti giusti',
    description: 'Non tutti i progetti sono quelli giusti. Ecco come decidiamo con chi lavorare, e perché la qualità di un\'agenzia dipende dalle scelte che fa.',
  },
  {
    slug: 'ecommerce-performante-2025',
    title: 'eCommerce performante nel 2025: cosa funziona davvero',
    description: 'Un negozio converte quando l\'offerta è chiara, la pagina è veloce e il checkout non chiede sforzo. Il resto è rumore.',
  },
] as const

export function pageMeta(title: string, description: string, path: string, type: 'website' | 'article' = 'website'): Metadata {
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
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
