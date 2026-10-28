'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, RotateCcw, Trophy, XCircle } from 'lucide-react'
import { useApp } from '@/lib/store'
import type { Question } from '@/lib/content'

const card = { background: 'var(--bg-surface)', border: '1px solid var(--border)' }
const muted = { color: 'var(--text-muted)' }

export default function Quiz({ slug, questions }: { slug: string; questions: Question[] }) {
  const { progress, saveQuizScore } = useApp()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[i]
  const best = progress.quizScores[slug]

  const choose = (n: number) => {
    if (picked !== null) return
    setPicked(n)
    if (n === q.answer) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (i + 1 < questions.length) {
      setI(i + 1)
      setPicked(null)
    } else {
      saveQuizScore(slug, Math.round((correct / questions.length) * 100))
      setFinished(true)
    }
  }

  const restart = () => {
    setI(0)
    setPicked(null)
    setCorrect(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-2xl p-8 text-center"
        style={card}
      >
        <Trophy size={36} color="#f59e0b" className="mx-auto mb-3" />
        <h2 className="text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{pct}%</h2>
        <p className="mt-2 text-sm" style={muted}>
          You got {correct} of {questions.length} correct
          {best !== undefined && <> · Best: {best}%</>}
        </p>
        <button
          onClick={restart}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <RotateCcw size={14} /> Retake quiz
        </button>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-xs" style={muted}>
        <span>Question {i + 1} of {questions.length}</span>
        {best !== undefined && <span>Best: {best}%</span>}
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full" style={{ background: 'var(--bg-elevated)' }}>
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ background: 'var(--accent)' }}
          animate={{ scaleX: (i + (picked !== null ? 1 : 0)) / questions.length }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl p-6 md:p-8"
          style={card}
        >
          <h2 className="mb-6 text-lg font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {q.q}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt, n) => {
              const answered = picked !== null
              const isRight = n === q.answer
              const isPicked = n === picked
              let border = 'var(--border)'
              if (answered && isRight) border = '#22c55e'
              else if (answered && isPicked) border = '#ef4444'

              return (
                <button
                  key={n}
                  onClick={() => choose(n)}
                  className="flex items-center justify-between rounded-xl p-4 text-left text-sm"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${border}`,
                    opacity: answered && !isRight && !isPicked ? 0.5 : 1,
                  }}
                >
                  <span>{opt}</span>
                  {answered && isRight && <CheckCircle2 size={16} color="#22c55e" />}
                  {answered && isPicked && !isRight && <XCircle size={16} color="#ef4444" />}
                </button>
              )
            })}
          </div>

          {picked !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <p className="mb-4 text-sm" style={muted}>{q.explain}</p>
              <button
                onClick={next}
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {i + 1 < questions.length ? 'Next question' : 'See results'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}