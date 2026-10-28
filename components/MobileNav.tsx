'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { NAV_ITEMS, isActivePath } from '@/lib/nav'

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-3 md:hidden"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActivePath(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className="relative rounded-xl p-2.5"
            style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {active && (
              <motion.div
                layoutId="mobile-highlight"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'var(--bg-elevated)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon size={19} className="relative z-10" />
          </Link>
        )
      })}
    </nav>
  )
}