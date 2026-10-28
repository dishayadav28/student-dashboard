import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CourseViewer from '@/components/CourseViewer'
import { getContent, slugify } from '@/lib/content'
import type { Course } from '@/lib/types'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const course = data as Course

  return (
    <CourseViewer
      title={course.title}
      slug={slugify(course.title)}
      iconName={course.icon_name}
      content={getContent(course.title) ?? null}
    />
  )
}