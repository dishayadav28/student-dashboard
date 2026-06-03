'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const STREAK = 14


export default function HeroTile() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.article
      className="relative rounded-2xl p-6 overflow-hidden h-full"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        minHeight: 160,
        padding: '2rem',
      }}
      whileHover={{
        scale: 1.01,
        borderColor: 'rgba(59,130,246,0.3)',
        boxShadow: '0 0 28px rgba(59,130,246,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 15% 50%, rgba(59,130,246,0.10) 0%, transparent 55%)',
            'radial-gradient(ellipse at 85% 15%, rgba(139,92,246,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      /> 
    

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between gap-4 p-4">
        <div className="flex-1">
          <p
            className="text-xs font-medium mb-1.5 tracking-wide uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            {today}
          </p>
          <h1
            className="text-2xl font-bold mb-1.5 leading-tight "
            style={{
              fontFamily: 'Syne, sans-serif',
              color: 'var(--text-primary)',
            }}
          >
            Welcome back, Disha!
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            You have 4 active courses.
          </p>

          
          
        </div>

        {/* Streak badge */}
        <div
          className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl shrink-0 "
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            padding: '0.5rem'
          }}
        >
          <Flame size={20} color="#f97316" />
          <span
            className="text-2xl font-bold leading-none"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            {STREAK}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            day streak
          </span>
        </div>
      </div>
    </motion.article>
  )
}