'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Lightbulb } from 'lucide-react'
import DynamicIcon from './DynamicIcon'
import Quiz from './Quiz'
import { useApp } from '@/lib/store'
import type { CourseContent } from '@/lib/content'

type Props = {
  title: string
  slug: string
  iconName: string
  content: CourseContent | null
}

const card = { background: 'var(--bg-surface)', border: '1px solid var(--border)' }
const muted = { color: 'var(--text-muted)' }

export default function CourseViewer({ title, slug, iconName, content }: Props) {
  const { progress, completeLesson } = useApp()
  const [tab, setTab] = useState<'notes' | 'quiz'>('notes')
  const [idx, setIdx] = useState(0)

  if (!content) {
    return (
      <section className="mx-auto max-w-3xl p-6 md:p-8">
        <Link href="/courses" className="mb-6 inline-flex items-center gap-2 text-sm" style={muted}>
          <ArrowLeft size={14} /> All courses
        </Link>
        <div className="rounded-2xl p-8 text-center" style={card}>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h1>
          <p className="mt-2 text-sm" style={muted}>Notes and quizzes for this course are coming soon.</p>
        </div>
      </section>
    )
  }

  const lessons = content.lessons
  const lesson = lessons[idx]
  const keyOf = (id: string) => `${slug}:${id}`
  const isDone = (id: string) => progress.completedLessons.includes(keyOf(id))
  const doneCount = lessons.filter((l) => isDone(l.id)).length
  const isLast = idx === lessons.length - 1

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      <Link href="/courses" className="mb-6 inline-flex items-center gap-2 text-sm" style={muted}>
        <ArrowLeft size={14} /> All courses
      </Link>

      <header className="mb-8 flex items-center gap-4">
        <div className="rounded-xl p-3" style={{ ...card, color: 'var(--accent)' }}>
          <DynamicIcon name={iconName} size={22} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h1>
          <div
            className="mt-3 h-1.5 max-w-sm overflow-hidden rounded-full"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ background: 'var(--accent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: doneCount / lessons.length }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-2 text-xs" style={muted}>
            {doneCount}/{lessons.length} lessons completed
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-6 flex gap-2" role="tablist">
        {(['notes', 'quiz'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className="relative rounded-lg px-4 py-2 text-sm font-medium"
            style={{ color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)' }}
          >
            {tab === t && (
              <motion.span
                layoutId="course-tab"
                className="absolute inset-0 rounded-lg"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{t === 'notes' ? 'Notes' : 'Quiz'}</span>
          </button>
        ))}
      </div>

      {tab === 'notes' ? (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <nav aria-label="Lessons" className="flex flex-col gap-2 self-start">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setIdx(i)}
                className="flex items-center gap-3 rounded-xl p-3 text-left text-sm"
                style={{
                  background: 'var(--bg-surface)',
                  border: `1px solid ${i === idx ? 'var(--accent)' : 'var(--border)'}`,
                }}
              >
                {isDone(l.id) ? (
                  <CheckCircle2 size={16} color="#22c55e" />
                ) : (
                  <Circle size={16} style={muted} />
                )}
                <span className="flex-1">
                  <span className="block font-medium">{l.title}</span>
                  <span className="text-xs" style={muted}>{l.minutes} min read</span>
                </span>
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.article
              key={lesson.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-6 md:p-8"
              style={card}
            >
              <p className="mb-2 text-xs uppercase tracking-wide" style={muted}>
                Lesson {idx + 1} of {lessons.length}
              </p>
              <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                {lesson.title}
              </h2>

              {lesson.body.map((p, i) => (
                <p key={i} className="mb-4 leading-relaxed" style={{ color: '#c9d1d9' }}>
                  {p}
                </p>
              ))}

              {lesson.code && (
                <pre
                  className="mb-4 overflow-x-auto rounded-xl p-4 text-sm leading-relaxed"
                  style={{
                    background: '#010409',
                    border: '1px solid var(--border)',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                  }}
                >
                  <code>{lesson.code.text}</code>
                </pre>
              )}

              {lesson.tip && (
                <aside
                  className="flex items-start gap-3 rounded-xl p-4 text-sm"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
                >
                  <Lightbulb size={16} color="#f59e0b" className="mt-0.5 shrink-0" />
                  <span style={{ color: '#c9d1d9' }}>{lesson.tip}</span>
                </aside>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setIdx(idx - 1)}
                  disabled={idx === 0}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm disabled:opacity-30"
                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                {!isDone(lesson.id) ? (
                  <button
                    onClick={() => completeLesson(keyOf(lesson.id))}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    <CheckCircle2 size={14} /> Mark as complete
                  </button>
                ) : isLast ? (
                  <button
                    onClick={() => setTab('quiz')}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    Take the quiz <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setIdx(idx + 1)}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    Next lesson <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      ) : (
        <Quiz slug={slug} questions={content.quiz} />
      )}
    </div>
  )
}