'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { getXp, useApp } from '@/lib/store'
import { ACHIEVEMENTS } from '@/lib/achievements'

const card = { background: 'var(--bg-surface)', border: '1px solid var(--border)' }
const muted = { color: 'var(--text-muted)' }

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
}

export default function AchievementsView() {
  const { progress } = useApp()
  const xp = getXp(progress)
  const level = Math.floor(xp / 100) + 1
  const intoLevel = xp % 100
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.check(progress)).length

  const stats = [
    { label: 'Lessons done', value: progress.completedLessons.length },
    { label: 'Quizzes taken', value: Object.keys(progress.quizScores).length },
    { label: 'Active days', value: progress.activeDays.length },
    { label: 'Badges', value: `${unlockedCount}/${ACHIEVEMENTS.length}` },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Level card */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8" style={card}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 10% 40%, var(--accent-glow), transparent 60%)',
          }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide" style={muted}>Current level</p>
            <p className="text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              {level}
            </p>
          </div>
          <p className="text-sm" style={muted}>{xp} XP total</p>
        </div>
        <div className="relative mt-5 h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-elevated)' }}>
          <motion.div
            className="h-full origin-left rounded-full"
            style={{ background: 'var(--accent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: intoLevel / 100 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </div>
        <p className="relative mt-2 text-xs" style={muted}>
          {100 - intoLevel} XP to level {level + 1}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={card}>
            <p className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
            <p className="mt-1 text-xs" style={muted}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ACHIEVEMENTS.map((a) => {
          const unlocked = a.check(progress)
          const Icon = a.icon
          return (
            <motion.li
              key={a.id}
              variants={item}
              className="flex items-center gap-4 rounded-2xl p-5"
              style={{
                background: 'var(--bg-surface)',
                border: `1px solid ${unlocked ? 'var(--accent)' : 'var(--border)'}`,
                opacity: unlocked ? 1 : 0.55,
                boxShadow: unlocked ? '0 0 24px var(--accent-glow)' : 'none',
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: 'var(--bg-elevated)',
                  color: unlocked ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {unlocked ? <Icon size={22} /> : <Lock size={18} />}
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {a.title}
                </h3>
                <p className="mt-0.5 text-xs" style={muted}>{a.description}</p>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}