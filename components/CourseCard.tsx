'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import DynamicIcon from './DynamicIcon'
import { useApp } from '@/lib/store'
import { getContent, slugify } from '@/lib/content'
import type { Course } from '@/lib/types'

const GRADIENTS = [
  'radial-gradient(ellipse at top left, rgba(59,130,246,0.13) 0%, transparent 65%)',
  'radial-gradient(ellipse at top right, rgba(139,92,246,0.13) 0%, transparent 65%)',
  'radial-gradient(ellipse at bottom left, rgba(20,184,166,0.11) 0%, transparent 65%)',
  'radial-gradient(ellipse at top left, rgba(249,115,22,0.11) 0%, transparent 65%)',
]
const ACCENT_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6', '#f97316']

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const { progress } = useApp()

  const slug = slugify(course.title)
  const content = getContent(course.title)
  const total = content?.lessons.length ?? 0
  const done = content
    ? content.lessons.filter((l) => progress.completedLessons.includes(`${slug}:${l.id}`)).length
    : 0
  const ratio = total ? done / total : 0
  const percent = Math.round(ratio * 100)

  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length]

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <motion.article
        className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          minHeight: 160,
          padding: '1.75rem',
        }}
        whileHover={{
          scale: 1.02,
          borderColor: `${accent}55`,
          boxShadow: `0 0 28px ${accent}18`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div
            className="rounded-lg p-2"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: accent }}
          >
            <DynamicIcon name={course.icon_name} size={17} />
          </div>
          <span
            className="rounded-md px-2 py-1 text-xs font-semibold"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
          >
            {percent}%
          </span>
        </div>

        <div className="relative z-10 mt-auto flex flex-col gap-2">
          <h3
            className="text-sm font-semibold leading-snug"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            {course.title}
          </h3>
          <div
            className="h-[5px] w-full overflow-hidden rounded-full"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}55` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ratio }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 + index * 0.1 }}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {total ? `${done}/${total} lessons` : 'Coming soon'}
          </p>
        </div>
      </motion.article>
    </Link>
  )
}