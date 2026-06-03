'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'courses',      label: 'Courses',      icon: BookOpen },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'settings',     label: 'Settings',     icon: Settings },
]

export default function Sidebar() {
  const [active, setActive]       = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [isTablet, setIsTablet]   = useState(false)

  // Auto-collapse on tablet
  useEffect(() => {
    const check = () => {
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024
      setIsTablet(tablet)
      if (tablet) setCollapsed(true)
      if (window.innerWidth >= 1024) setCollapsed(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col h-screen shrink-0 border-r overflow-hidden z-20"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        padding : '1rem'
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1 px-4 py-5 mb-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 0 20px var(--accent-glow)',
            
          }}
        >
          <GraduationCap size={17} color="#fff" />
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
              }}
            >
              Student-Dashboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="mx-3 mb-3 " style={{ height: 1, background: 'var(--border)', marginTop:'0.3rem'}} />

      {/* Nav items */}
      <div className="flex flex-col gap-1 px-2 flex-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer w-full text-left border-0 bg-transparent"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                transition: 'color 0.15s',
                justifyContent: collapsed ? 'center' : 'flex-start',
                marginTop: '0.1rem'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={16} className="relative z-10 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key={`label-${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 whitespace-nowrap font-medium"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      {/* Collapse button — hidden on tablet since it auto-collapses */}
      {!isTablet && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-3 p-2 rounded-lg flex items-center justify-center border-0 cursor-pointer"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
          }}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : <ChevronLeft size={14} />
          }
        </button>
      )}
    </motion.nav>
  )
}