'use client'
import { toLocalDateKey } from './streak'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { MotionConfig } from 'framer-motion'

export type Settings = {
  name: string
  dailyGoal: number
  accent: string
  reducedMotion: boolean
}

export type Progress = {
  completedLessons: string[] // "course-slug:lesson-id"
  quizScores: Record<string, number> // best % per course slug
  activeDays: string[] // YYYY-MM-DD
}

const DEFAULT_SETTINGS: Settings = {
  name: 'Student',
  dailyGoal: 30,
  accent: '#3b82f6',
  reducedMotion: false,
}

const DEFAULT_PROGRESS: Progress = {
  completedLessons: [],
  quizScores: {},
  activeDays: [],
}

const STORAGE_KEY = 'learnos:v1'

type AppContextValue = {
  ready: boolean
  settings: Settings
  progress: Progress
  updateSettings: (patch: Partial<Settings>) => void
  completeLesson: (key: string) => void
  saveQuizScore: (slug: string, pct: number) => void
  resetProgress: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const today = () => toLocalDateKey()

function markActive(p: Progress): Progress {
  return p.activeDays.includes(today())
    ? p
    : { ...p, activeDays: [...p.activeDays, today()] }
}

/** 10 XP per lesson + up to 50 XP per quiz */
export function getXp(p: Progress) {
  const quizXp = Object.values(p.quizScores).reduce(
    (sum, score) => sum + Math.round(score / 2),
    0
  )
  return p.completedLessons.length * 10 + quizXp
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS)
  const [ready, setReady] = useState(false)

  // Load once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        setSettings({ ...DEFAULT_SETTINGS, ...saved.settings })
        setProgress({ ...DEFAULT_PROGRESS, ...saved.progress })
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true)
  }, [])

  // Save on every change (after the first load)
  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ settings, progress }))
    } catch {
      /* storage full or blocked */
    }
  }, [settings, progress, ready])

  // Apply accent color globally
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', settings.accent)
    root.style.setProperty(
      '--accent-glow',
      `color-mix(in srgb, ${settings.accent} 30%, transparent)`
    )
  }, [settings.accent])

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }))
  }, [])

  const completeLesson = useCallback((key: string) => {
    setProgress((p) =>
      p.completedLessons.includes(key)
        ? p
        : markActive({ ...p, completedLessons: [...p.completedLessons, key] })
    )
  }, [])

  const saveQuizScore = useCallback((slug: string, pct: number) => {
    setProgress((p) =>
      markActive({
        ...p,
        quizScores: {
          ...p.quizScores,
          [slug]: Math.max(p.quizScores[slug] ?? 0, pct),
        },
      })
    )
  }, [])

  const resetProgress = useCallback(() => setProgress(DEFAULT_PROGRESS), [])

  return (
    <AppContext.Provider
      value={{
        ready,
        settings,
        progress,
        updateSettings,
        completeLesson,
        saveQuizScore,
        resetProgress,
      }}
    >
      <MotionConfig reducedMotion={settings.reducedMotion ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}