'use client'

import { motion } from 'framer-motion'

// Generate a fixed 15-week × 7-day activity grid
// using a seeded-ish pattern so it looks realistic
function buildGrid(weeks: number, days: number): number[][] {
  return Array.from({ length: weeks }, (_, wi) =>
    Array.from({ length: days }, (_, di) => {
      const seed = (wi * 7 + di * 3 + wi * di) % 17
      if (seed < 6)  return 0
      if (seed < 10) return 1
      if (seed < 13) return 2
      if (seed < 16) return 3
      return 4
    })
  )
}

const GRID = buildGrid(15, 7)

const LEVEL_COLORS = [
  'var(--bg-elevated)',
  'rgba(59,130,246,0.22)',
  'rgba(59,130,246,0.42)',
  'rgba(59,130,246,0.62)',
  '#3b82f6',
]

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function ActivityTile() {
  return (
    <motion.section
      className="relative rounded-2xl p-7 overflow-hidden h-full"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        minHeight: 160,
        padding: '1.75rem',
      }}
      whileHover={{
        scale: 1.01,
        borderColor: 'rgba(59,130,246,0.25)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2
          className="text-sm font-semibold"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
        >
          Learning Activity
        </h2>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Last 15 weeks
        </span>
      </div>

      {/* Grid */}
      <div className="relative z-10 flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1">
          {DAY_LABELS.map((d, i) => (
            <span
              key={i}
              className="text-xs leading-none flex items-center justify-center"
              style={{ width: 12, height: 12, color: 'var(--text-muted)', fontSize: 9 }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Cells */}
        {GRID.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                className="rounded-sm"
                style={{
                  width: 12,
                  height: 12,
                  background: LEVEL_COLORS[level],
                  flexShrink: 0,
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.003,
                  type: 'spring',
                  stiffness: 500,
                  damping: 25,
                }}
                whileHover={{ scale: 1.5, zIndex: 10 }}
                title={`Week ${wi + 1}, level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 flex items-center gap-2 mt-4">
        <span className="text-xs" style={{ color: 'var(--text-muted)', fontSize: 10 }}>
          Less
        </span>
        {LEVEL_COLORS.map((color, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{ width: 10, height: 10, background: color }}
          />
        ))}
        <span className="text-xs" style={{ color: 'var(--text-muted)', fontSize: 10 }}>
          More
        </span>
      </div>
    </motion.section>
  )
}