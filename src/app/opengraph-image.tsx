import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'OFF32 · Healing Earth'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/og/healing-earth.jpg'))

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <img
          src={`data:image/jpeg;base64,${photo.toString('base64')}`}
          width={1200}
          height={630}
          style={{ objectFit: 'cover' }}
        />
      </div>
    ),
    { ...size },
  )
}
