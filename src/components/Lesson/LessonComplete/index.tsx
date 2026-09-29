//  S# SEVERITY
//
//  LessonComplete.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useRouter } from 'next/navigation'

import { Variants, motion } from 'framer-motion'

import { ClayButton } from '@/components/ClayButton'
import { ClayCard } from '@/components/ClayCard'
import { LessonSummary } from '@/domain/LessonModel'

import { flash, useSafeVariants } from '@/styles/motion'

import styles from './index.module.css'

export interface LessonCompleteProps {
  summary: LessonSummary
}

const STARS = [0, 1, 2]

/** Estrela surgindo com quique; `custom={index}` defasa 0.18s cada. */
const starPop: Variants = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: (index = 0) => ({
    scale: [0, 1.3, 0.9, 1],
    rotate: [-30, 10, 0, 0],
    opacity: [0, 1, 1, 1],
    transition: {
      delay: 0.2 + index * 0.18,
      duration: 0.5,
      times: [0, 0.6, 0.8, 1],
      ease: 'easeOut',
    },
  }),
}

export const LessonComplete = ({ summary }: LessonCompleteProps) => {
  const router = useRouter()
  const starVariants = useSafeVariants(starPop)
  const flashVariants = useSafeVariants(flash)
  const accuracy = Math.round(summary.accuracy * 100)

  return (
    <section className={styles.complete} aria-labelledby="lesson-complete">
      <motion.h1
        id="lesson-complete"
        className={styles.title}
        variants={flashVariants}
        initial="hidden"
        animate="visible"
      >
        Lição completa!
      </motion.h1>

      <div
        className={styles.stars}
        role="img"
        aria-label="Três estrelas conquistadas"
      >
        {STARS.map((index) => (
          <motion.svg
            key={index}
            className={styles.star}
            width="64"
            height="64"
            viewBox="0 0 24 24"
            aria-hidden="true"
            variants={starVariants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
          </motion.svg>
        ))}
      </div>

      <div className={styles.stats}>
        <ClayCard padding="sm" radius="lg" className={styles.stat}>
          <span className={styles.statLabel}>XP ganho</span>
          <span className={`${styles.statValue} ${styles.xp}`}>
            +{summary.xpEarned}
          </span>
        </ClayCard>
        <ClayCard padding="sm" radius="lg" className={styles.stat}>
          <span className={styles.statLabel}>Acertos de primeira</span>
          <span className={`${styles.statValue} ${styles.accuracy}`}>
            {accuracy}%
          </span>
        </ClayCard>
      </div>

      <ClayButton
        fullWidth
        className={styles.cta}
        onClick={() => router.push('/trilha')}
      >
        CONTINUAR
      </ClayButton>
    </section>
  )
}
