'use client'

import { motion } from 'framer-motion'
import HeroTile from './HeroTile'
import CourseCard from './CourseCard'
import ActivityTile from './ActivityTile'
import ErrorTile from './ErrorTile'
import type { Course } from '@/lib/types'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 24,
    },
  },
}

interface Props {
  courses: Course[]
  error: string | null
}

export default function BentoGrid({ courses, error }: Props) {
  return (
    <>
      {/* Responsive grid styles via style tag */}
      <style>{`
        .bento-grid {
          display: grid;
          gap: 1.25rem;
          padding: 2rem;
        }

        /* Mobile: single column */
        @media (max-width: 767px) {
          .bento-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 1rem;
          }
          .hero-tile    { grid-column: span 1; }
          .activity-tile { grid-column: span 1; }
          .course-tile  { grid-column: span 1; }
          .error-tile   { grid-column: span 1; }
        }

        /* Tablet: 2 columns */
        @media (min-width: 768px) and (max-width: 1023px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 1.5rem;
          }
          .hero-tile    { grid-column: span 2; }
          .activity-tile { grid-column: span 1; }
          .course-tile  { grid-column: span 1; }
          .error-tile   { grid-column: span 2; }
        }

        /* Desktop: 3 columns */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 2rem;
          }
          .hero-tile    { grid-column: span 2; }
          .activity-tile { grid-column: span 1; }
          .course-tile  { grid-column: span 1; }
          .error-tile   { grid-column: span 3; }
        }
      `}</style>

      <motion.div
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero tile */}
        <motion.div className="hero-tile" variants={itemVariants}>
          <HeroTile />
        </motion.div>

        {/* Activity tile */}
        <motion.div className="activity-tile" variants={itemVariants}>
          <ActivityTile />
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div className="error-tile" variants={itemVariants}>
            <ErrorTile message={error} />
          </motion.div>
        )}

        {/* Course cards */}
        {courses.map((course, i) => (
          <motion.div key={course.id} className="course-tile" variants={itemVariants}>
            <CourseCard course={course} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}