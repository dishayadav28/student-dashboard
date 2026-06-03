interface Props {
  className?: string
}

export default function SkeletonTile({ className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl p-5 skeleton-pulse ${className}`}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        minHeight: 160,
      }}
    >
      {/* Icon placeholder */}
      <div
        className="rounded-lg mb-4"
        style={{ width: 36, height: 36, background: 'var(--bg-elevated)' }}
      />

      {/* Title lines */}
      <div
        className="rounded mb-2"
        style={{ height: 14, width: '65%', background: 'var(--bg-elevated)' }}
      />
      <div
        className="rounded mb-4"
        style={{ height: 12, width: '45%', background: 'var(--bg-elevated)' }}
      />

      {/* Progress bar */}
      <div
        className="rounded-full"
        style={{ height: 5, width: '100%', background: 'var(--bg-elevated)' }}
      />
    </div>
  )
}