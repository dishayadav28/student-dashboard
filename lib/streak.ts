/** Local-date key like "2026-10-28" (not UTC, so it matches the user's actual day) */
export function toLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Counts consecutive active days.
 * If you haven't studied yet today, the streak is still alive
 * as long as you studied yesterday.
 */
export function computeStreak(activeDays: string[]): number {
  const days = new Set(activeDays)
  const cursor = new Date()

  if (!days.has(toLocalDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (days.has(toLocalDateKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}