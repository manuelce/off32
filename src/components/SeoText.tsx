import type { CSSProperties, ReactNode } from 'react'

/**
 * Text that stays in the DOM (and in textContent) but takes no space.
 * Used so split headings read as separate words without shifting the layout.
 */
const hidden: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
  pointerEvents: 'none',
}

export function SeoText({ children }: { children: ReactNode }) {
  return <span style={hidden}>{children}</span>
}

/** Line break that keeps a space between the words in the text content. */
export function SeoBr() {
  return (
    <>
      <SeoText> </SeoText>
      <br />
    </>
  )
}
