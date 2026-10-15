/** Contenuti pagina developmentconAI. Sezioni con confirmed:false non vengono renderizzate. */

export const DEVELOPMENTCONAI_PATH = '/developmentconai'

export const developmentconai = {
  path: DEVELOPMENTCONAI_PATH,
  /** Nome visibile (casing brand). */
  displayName: 'developmentconAI',
  hero: {
    title: 'developmentconAI',
    subtitle: '',
    confirmed: false,
  },
  sections: [
    { id: 'overview', title: '', body: '', confirmed: false },
    { id: 'approach', title: '', body: '', confirmed: false },
    { id: 'contact', title: '', body: '', confirmed: false },
  ],
  /** Link interni da/verso questa pagina: non aggiunti finché confirmed. */
  links: {
    fromFullstack: { href: '/full-stack', label: '', confirmed: false },
    toFullstack: { href: '/full-stack', label: '', confirmed: false },
    navbar: { confirmed: false },
  },
  seo: {
    title: 'developmentconAI',
    description: 'developmentconAI · OFF32. Contenuti in aggiornamento.',
  },
} as const
