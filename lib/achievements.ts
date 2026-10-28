import {
  Sparkles,
  Zap,
  Target,
  Trophy,
  Crown,
  CalendarCheck,
  Medal,
  type LucideIcon,
} from 'lucide-react'
import { ALL_CONTENT } from './content'
import type { Progress } from './store'

export type Achievement = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  check: (p: Progress) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: Sparkles,
    check: (p) => p.completedLessons.length >= 1,
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 5 lessons',
    icon: Zap,
    check: (p) => p.completedLessons.length >= 5,
  },
  {
    id: 'quiz-taker',
    title: 'Quiz Taker',
    description: 'Finish your first quiz',
    icon: Target,
    check: (p) => Object.keys(p.quizScores).length >= 1,
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Score 100% on any quiz',
    icon: Trophy,
    check: (p) => Object.values(p.quizScores).some((s) => s === 100),
  },
  {
    id: 'course-master',
    title: 'Course Master',
    description: 'Complete every lesson in a course',
    icon: Crown,
    check: (p) =>
      Object.entries(ALL_CONTENT).some(([slug, c]) =>
        c.lessons.every((l) => p.completedLessons.includes(`${slug}:${l.id}`))
      ),
  },
  {
    id: 'consistent',
    title: 'Consistent',
    description: 'Study on 3 different days',
    icon: CalendarCheck,
    check: (p) => p.activeDays.length >= 3,
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Take the quiz in every course',
    icon: Medal,
    check: (p) => Object.keys(ALL_CONTENT).every((s) => p.quizScores[s] !== undefined),
  },
]