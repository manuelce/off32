import type { ReactNode } from 'react'

const INK = '#141414'

/** Longer phrases first so they win over shorter overlaps. */
const BRAND_TERMS = [
  'brand identity',
  'brand strategy',
  'brand positioning',
  'strategia',
  'content strategy',
  'content creation',
  'creative direction',
  'direzione creativa',
  'art direction',
  'web design',
  'Core Web Vitals',
  'SEO tecnica',
  'SEO prodotto',
  'design system',
  'landing page',
  'e-commerce',
  'AI Strategy',
  'AI Automation',
  'AI Agents',
  'AI Workflows',
  'AI Integration',
  'roadmap AI',
  'workflow AI',
  'agente AI',
  'agenti AI',
  'automazione',
  'ChatGPT',
  'Claude',
  'logo design',
  'identità visiva',
  'brand guidelines',
  'tono di voce',
  'tone of voice',
  'copywriting SEO',
  'testi per siti web',
  'palette cromatica',
  'palette colori',
  'manuale di utilizzo',
  'elementi grafici',
  'linee guida',
  'riposizionamento',
  'posizionamento',
  'wireframe',
  'copywriting',
  'performance',
  'Shopify',
  'Next.js',
  'restyling',
  'tipografia',
  'checkout',
  'naming',
  'Figma',
  'palette',
  'colori',
  'concept',
  'funnel',
  'logo',
  'SEO',
  'UX',
  'UI',
]

const BRAND_PATTERN = new RegExp(
  `(${BRAND_TERMS.map(t => {
    const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Word boundary for single tokens so "UI"≠"cui" and "logo"≠"catalogo"
    if (!t.includes(' ') && /^[A-Za-zÀ-ú.]+$/.test(t)) return `\\b${escaped}\\b`
    return escaped
  }).join('|')})`,
  'gi',
)

export function emphasizeBrandTerms(text: string): ReactNode[] {
  return text.split(BRAND_PATTERN).map((part, i) =>
    BRAND_TERMS.some(t => t.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} style={{ fontWeight: 700, color: INK }}>
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
