import { LayoutDashboard, BookOpen, Trophy, Settings } from 'lucide-react'

export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export const isActivePath = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href)