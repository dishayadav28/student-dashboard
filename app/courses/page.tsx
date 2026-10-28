import { supabase } from '@/lib/supabase'
import CourseGrid from '@/components/CourseGrid'
import ErrorTile from '@/components/ErrorTile'
import type { Course } from '@/lib/types'

export const revalidate = 60

export default async function CoursesPage() {
  let courses: Course[] = []
  let error: string | null = null

  try {
    const { data, error: sbError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })
    if (sbError) throw new Error(sbError.message)
    courses = data ?? []
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load courses'
  }

  return (
    <section className="mx-auto max-w-6xl p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Courses
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Read the notes, mark lessons complete, then test yourself with a quiz.
        </p>
      </header>
      {error ? <ErrorTile message={error} /> : <CourseGrid courses={courses} />}
    </section>
  )
}