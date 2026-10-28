import SettingsForm from '@/components/SettingsForm'

export default function SettingsPage() {
  return (
    <section className="mx-auto max-w-2xl p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Settings
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Personalise your dashboard. Changes save automatically.
        </p>
      </header>
      <SettingsForm />
    </section>
  )
}