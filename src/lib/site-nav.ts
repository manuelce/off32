/** Voci di navigazione e footer, uguali su tutte le pagine. */

export const NAV_LINKS = [
  { label: 'Lavori', href: '/work' },
  { label: 'Eventi', href: '/workshop' },
  { label: 'Studio', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contatti', href: '/contatti' },
] as const

/** Stesse voci della nav, più le pagine legali già presenti nel footer. */
export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Cookie', href: '/cookie-policy' },
  { label: 'Terms', href: '/terms-and-conditions' },
] as const
