import { AlertCircle } from 'lucide-react'

interface Props {
  message: string
}

export default function ErrorTile({ message }: Props) {
  return (
    <div
      className="rounded-2xl p-5 flex items-start gap-3 col-span-full"
      style={{
        background: 'rgba(239, 68, 68, 0.07)',
        border: '1px solid rgba(239, 68, 68, 0.22)',
      }}
    >
      <AlertCircle
        size={18}
        color="#ef4444"
        className="shrink-0 mt-0.5"
      />
      <div>
        <p
          className="text-sm font-semibold mb-0.5"
          style={{ fontFamily: 'Syne, sans-serif', color: '#ef4444' }}
        >
          Failed to load courses
        </p>
        <p className="text-xs" style={{ color: '#f87171' }}>
          {message}
        </p>
      </div>
    </div>
  )
}