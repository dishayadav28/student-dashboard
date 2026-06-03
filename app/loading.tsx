import SkeletonTile from '@/components/SkeletonTile'

export default function Loading() {
  return (
    <div
      className="grid gap-4 p-4 md:p-6"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      }}
    >
      {/* Hero skeleton — wide */}
      <div className="col-span-1 sm:col-span-2">
        <SkeletonTile />
      </div>

      {/* Other tiles */}
      {[...Array(5)].map((_, i) => (
        <SkeletonTile key={i} />
      ))}
    </div>
  )
}