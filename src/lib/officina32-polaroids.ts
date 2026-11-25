/**
 * Segnaposto della lavagna in /officina32.
 * Per sostituire una polaroid basta cambiare `src` e `name`.
 * Le foto sono ritratti di fantasia, non persone della community.
 */
export type OfficinaPolaroid = {
  src: string
  name: string
  top: number
  left: number
  rotate: number
  z: number
  /** Se valorizzato, la polaroid resta visibile anche su mobile, in questa posizione. */
  mobileTop?: number
  mobileLeft?: number
}

export const OFFICINA_POLAROIDS: OfficinaPolaroid[] = [
  { src: '/officina32/polaroid/giulia.webp', name: 'Giulia', top: 4, left: 4, rotate: -8, z: 3, mobileTop: 5, mobileLeft: 4 },
  { src: '/officina32/polaroid/marco.webp', name: 'Marco', top: 6, left: 27, rotate: 6, z: 5, mobileTop: 4, mobileLeft: 36 },
  { src: '/officina32/polaroid/chiara.webp', name: 'Chiara', top: 3, left: 50, rotate: -4, z: 4, mobileTop: 6, mobileLeft: 66 },
  { src: '/officina32/polaroid/luca.webp', name: 'Luca', top: 7, left: 70, rotate: 7, z: 6, mobileTop: 50, mobileLeft: 5 },
  { src: '/officina32/polaroid/sofia.webp', name: 'Sofia', top: 30, left: 2, rotate: 5, z: 7, mobileTop: 52, mobileLeft: 36 },
  { src: '/officina32/polaroid/andrea.webp', name: 'Andrea', top: 34, left: 25, rotate: -6, z: 8, mobileTop: 48, mobileLeft: 66 },
  { src: '/officina32/polaroid/martina.webp', name: 'Martina', top: 28, left: 48, rotate: 8, z: 9 },
  { src: '/officina32/polaroid/davide.webp', name: 'Davide', top: 32, left: 70, rotate: -5, z: 4 },
  { src: '/officina32/polaroid/elena.webp', name: 'Elena', top: 54, left: 6, rotate: -3, z: 10 },
  { src: '/officina32/polaroid/matteo.webp', name: 'Matteo', top: 56, left: 28, rotate: 6, z: 11 },
  { src: '/officina32/polaroid/sara.webp', name: 'Sara', top: 52, left: 50, rotate: -7, z: 12 },
  { src: '/officina32/polaroid/francesco.webp', name: 'Francesco', top: 55, left: 70, rotate: 4, z: 9 },
]
