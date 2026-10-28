'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import DynamicIcon from './DynamicIcon'
import { useApp } from '@/lib/store'
import { getContent, slugify } from '@/lib/content'
import type { Course } from '@/lib/types'

const ACCENTS = ['#3b82f6', '#8b5cf6', '#14b8a6', '#f97316']

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
}

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const { progress } = useApp()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {courses.map((course, i) => {
        const slug = slugify(course.title)
        const content = getContent(course.title)
        const total = content?.lessons.length ?? 0
        const done = content
          ? content.lessons.filter((l) => progress.completedLessons.includes(`${slug}:${l.id}`)).length
          : 0
        const pct = total ? done / total : 0
        const best = progress.quizScores[slug]
        const accent = ACCENTS[i % ACCENTS.length]

        return (
          <motion.div key={course.id} variants={item}>
            <Link href={`/courses/${course.id}`} className="block h-full">
              <motion.article
                whileHover={{ scale: 1.02, borderColor: `${accent}66` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-6"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${accent}22, transparent 65%)`,
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="rounded-lg p-2.5"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: accent }}
                  >
                    <DynamicIcon name={course.icon_name} size={20} />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {total ? `${done}/${total} lessons` : 'Coming soon'}
                  </span>
                </div>

                <h2 className="relative text-base font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
                  {course.title}
                </h2>

                <div className="relative mt-auto">
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{ background: accent }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: pct }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                  {best !== undefined && (
                    <p className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Trophy size={12} /> Best quiz score: {best}%
                    </p>
                  )}
                </div>
              </motion.article>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}