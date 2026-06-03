import { supabase } from '@/lib/supabase'
import BentoGrid from '@/components/BentoGrid'
import type { Course } from '@/lib/types'

// Revalidate every 60 seconds
export const revalidate = 60

export default async function DashboardPage() {
  let courses: Course[] = []
  let error: string | null = null

  try {
    const { data, error: supabaseError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })

    if (supabaseError) {
      throw new Error(supabaseError.message)
    }

    courses = data ?? []
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message
    } else {
      error = 'An unexpected error occurred while fetching courses.'
    }
  }

  return <BentoGrid courses={courses} error={error} />
}