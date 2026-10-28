'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import { useApp } from '@/lib/store'

const ACCENTS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Rose', value: '#f43f5e' },
]

const card = { background: 'var(--bg-surface)', border: '1px solid var(--border)' }
const muted = { color: 'var(--text-muted)' }

export default function SettingsForm() {
  const { settings, updateSettings, resetProgress } = useApp()
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      {/* Profile */}
      <section className="rounded-2xl p-6" style={card}>
        <h2 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Profile
        </h2>
        <label htmlFor="name" className="mb-2 block text-xs" style={muted}>
          Display name
        </label>
        <input
          id="name"
          value={settings.name}
          maxLength={24}
          onChange={(e) => updateSettings({ name: e.target.value })}
          className="w-full rounded-lg px-3 py-2 text-sm outline-none"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      </section>

      {/* Daily goal */}
      <section className="rounded-2xl p-6" style={card}>
        <h2 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Daily goal
        </h2>
        <label htmlFor="goal" className="mb-3 flex justify-between text-xs" style={muted}>
          <span>Minutes of study per day</span>
          <span style={{ color: 'var(--text-primary)' }}>{settings.dailyGoal} min</span>
        </label>
        <input
          id="goal"
          type="range"
          min={10}
          max={120}
          step={5}
          value={settings.dailyGoal}
          onChange={(e) => updateSettings({ dailyGoal: Number(e.target.value) })}
          className="w-full"
          style={{ accentColor: 'var(--accent)' }}
        />
      </section>

      {/* Accent color */}
      <section className="rounded-2xl p-6" style={card}>
        <h2 className="mb-4 text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Accent color
        </h2>
        <div className="flex gap-3">
          {ACCENTS.map((c) => (
            <button
              key={c.value}
              onClick={() => updateSettings({ accent: c.value })}
              aria-label={c.name}
              aria-pressed={settings.accent === c.value}
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: c.value,
                outline: settings.accent === c.value ? '2px solid #fff' : 'none',
                outlineOffset: 2,
              }}
            >
              {settings.accent === c.value && <Check size={14} color="#fff" />}
            </button>
          ))}
        </div>
      </section>

      {/* Reduce motion */}
      <section className="flex items-center justify-between rounded-2xl p-6" style={card}>
        <div>
          <h2 className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
            Reduce motion
          </h2>
          <p className="mt-1 text-xs" style={muted}>Turn off movement-based animations.</p>
        </div>
        <button
          role="switch"
          aria-checked={settings.reducedMotion}
          onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
          className="flex h-6 w-11 items-center rounded-full px-0.5"
          style={{
            background: settings.reducedMotion ? 'var(--accent)' : 'var(--bg-elevated)',
            border: '1px solid var(--border)',
          }}
        >
          <motion.span
            className="block h-5 w-5 rounded-full bg-white"
            animate={{ x: settings.reducedMotion ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </section>

      {/* Danger zone */}
      <section
        className="flex items-center justify-between rounded-2xl p-6"
        style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
      >
        <div>
          <h2 className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: '#f87171' }}>
            Reset progress
          </h2>
          <p className="mt-1 text-xs" style={muted}>Clears completed lessons, quiz scores and badges.</p>
        </div>
        <button
          onClick={() => {
            if (confirmReset) {
              resetProgress()
              setConfirmReset(false)
            } else {
              setConfirmReset(true)
            }
          }}
          onBlur={() => setConfirmReset(false)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ background: confirmReset ? '#ef4444' : 'var(--bg-elevated)', color: '#fff' }}
        >
          <RotateCcw size={14} /> {confirmReset ? 'Click to confirm' : 'Reset'}
        </button>
      </section>
    </div>
  )
}