'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react'
import { NAV_ITEMS, isActivePath } from '@/lib/nav'

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

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
      aria-label="Main navigation"
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative z-20 hidden h-screen shrink-0 flex-col overflow-hidden border-r md:flex"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
    >
      <div className="mb-2 flex items-center gap-3 px-4 py-5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ background: 'var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}
        >
          <GraduationCap size={18} color="#fff" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="whitespace-nowrap text-sm font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
            >
              Student-Dashboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-3 mb-3 h-px" style={{ background: 'var(--border)' }} />

      <div className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
              style={{
                color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              {active && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={17} className="relative z-10 shrink-0" />
              {!collapsed && (
                <span className="relative z-10 whitespace-nowrap font-medium">{label}</span>
              )}
            </Link>
          )
        })}
      </div>

      {!isTablet && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="m-3 flex items-center justify-center rounded-lg p-2"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}
    </motion.nav>
  )
}