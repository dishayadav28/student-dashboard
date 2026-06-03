'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',    icon: LayoutDashboard },
  { id: 'courses',      icon: BookOpen },
  { id: 'achievements', icon: Trophy },
  { id: 'settings',     icon: Settings },
]

export default function MobileNav() {
  const [active, setActive] = useState('dashboard')

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3"
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {NAV_ITEMS.map(({ id, icon: Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="relative p-2.5 rounded-xl border-0 bg-transparent cursor-pointer"
            style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-highlight"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'var(--bg-elevated)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={18} className="relative z-10" />
          </button>
        )
      })}
    </nav>
  )
}