import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'OFF32 — Agenzia di comunicazione digitale'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const [canela, axiforma, logo] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Canela-Light.otf')),
    readFile(join(process.cwd(), 'public/fonts/Axiforma-Bold.woff')),
    readFile(join(process.cwd(), 'public/off32_cube.png')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F0EBE0',
          color: '#0D0D0D',
        }}
      >
        <div style={{ height: 18, width: '100%', background: '#fe3812' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            padding: '52px 64px 48px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={`data:image/png;base64,${logo.toString('base64')}`} height={52} alt="" />
            <div
              style={{
                fontFamily: 'Axiforma',
                fontSize: 22,
                letterSpacing: 3,
                color: '#fe3812',
                textTransform: 'uppercase',
              }}
            >
              Officina digitale
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Canela',
                fontSize: 84,
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: -2,
                maxWidth: 980,
              }}
            >
              Comunicazione digitale potenziata dall&apos;intelligenza.
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 36,
                paddingTop: 22,
                borderTop: '1px solid #0D0D0D',
                fontFamily: 'Axiforma',
                fontSize: 24,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              <div>Brand · Web · Campagne</div>
              <div>off32.it</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Canela', data: canela, style: 'normal', weight: 300 },
        { name: 'Axiforma', data: axiforma, style: 'normal', weight: 700 },
      ],
    },
  )
}
