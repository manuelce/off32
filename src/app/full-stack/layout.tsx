import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { fullstackCourse } from '@/lib/fullstack-course'

export const metadata: Metadata = pageMeta(
  fullstackCourse.seo.title,
  fullstackCourse.seo.description,
  fullstackCourse.path,
  'website',
  fullstackCourse.seo.image,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { background: #694aff; }`}</style>
      {children}
    </>
  )
}
