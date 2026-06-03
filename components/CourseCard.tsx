'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { Course } from '@/lib/types'

type IconName = keyof typeof Icons

const CARD_GRADIENTS = [
  'radial-gradient(ellipse at top left,   rgba(59,130,246,0.13) 0%, transparent 65%)',
  'radial-gradient(ellipse at top right,  rgba(139,92,246,0.13) 0%, transparent 65%)',
  'radial-gradient(ellipse at bottom left,rgba(214, 77, 53, 0.11) 0%, transparent 65%)',
  'radial-gradient(ellipse at top left,   rgba(249,115,22,0.11) 0%, transparent 65%)',
]

const ACCENT_COLORS = ['#3b82f6', '#8b5cf6', '#c92910', '#f97316']

interface Props {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: Props) {
  const [barWidth, setBarWidth] = useState(0)

  // Animate progress bar after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidth(course.progress)
    }, 400 + index * 120)
    return () => clearTimeout(timer)
  }, [course.progress, index])

  // Dynamic icon from lucide-react
  // @ts-ignore
const IconComponent: React.ComponentType<LucideProps> = Icons[course.icon_name] ?? Icons['BookOpen']

  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length]
  const gradient    = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  return (
    <motion.article
      className="relative rounded-2xl p-5 overflow-hidden flex flex-col gap-4 h-full"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        minHeight: 160,
        padding: '1.75rem',
      }}
      whileHover={{
        scale: 1.02,
        borderColor: `${accentColor}55`,
        boxShadow: `0 0 28px ${accentColor}18`,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Per-card gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: gradient }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.18,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/*  icon + progress */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="p-2 rounded-lg"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
          }}
        >
          <IconComponent size={17} color={accentColor} />
        </div>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-md"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
          }}
        >
          {course.progress}%
        </span>
      </div>

      {/* Title + progress bar */}
      <div className="relative z-10 flex flex-col gap-2 mt-auto">
        <h3
          className="text-sm font-semibold leading-snug"
          style={{
            fontFamily: 'Syne, sans-serif',
            color: 'var(--text-primary)',
          }}
        >
          {course.title}
        </h3>

        {/* Track */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 5, background: 'var(--bg-elevated)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
              boxShadow: `0 0 8px ${accentColor}55`,
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.article>
  )
}