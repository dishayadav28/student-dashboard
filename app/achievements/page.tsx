import AchievementsView from '@/components/AchievementsView'

export default function AchievementsPage() {
  return (
    <section className="mx-auto max-w-5xl p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Achievements
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Earn XP and unlock badges as you learn.
        </p>
      </header>
      <AchievementsView />
    </section>
  )
}