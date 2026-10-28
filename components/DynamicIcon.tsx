'use client'

import * as Icons from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'

export default function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const lookup = Icons as unknown as Record<string, ComponentType<LucideProps>>
  const Icon = lookup[name] ?? Icons.BookOpen
  return <Icon {...props} />
}