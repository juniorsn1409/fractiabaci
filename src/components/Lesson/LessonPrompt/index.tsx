//  S# SEVERITY
//
//  LessonPrompt.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { motion } from 'framer-motion'

import { toDigits } from '@/application/LessonUseCase'
import { PLACE_META } from '@/components/AbacusBoard/places'
import { ClayCard } from '@/components/ClayCard'

import { bob, useSafeVariants } from '@/styles/motion'

import styles from './index.module.css'

export interface LessonPromptProps {
  target: number
}

export const LessonPrompt = ({ target }: LessonPromptProps) => {
  const variants = useSafeVariants(bob)
  const digits = toDigits(target)

  return (
    <ClayCard as="section" padding="none" className={styles.card}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          Monte no ábaco<span className={styles.titleTail}> o número</span>
        </h1>
        <span className={styles.subtitle}>
          <span className={styles.mouse}>Arraste os discos com o mouse</span>
          <span className={styles.touch}>Arraste os discos com o dedo</span>
        </span>
      </div>
      <div
        className={styles.digits}
        role="img"
        aria-label={`Número para montar: ${target}`}
      >
        {digits.map(({ place, digit }, index) => {
          const meta = PLACE_META[place]
          return (
            <motion.div
              key={`${target}-${place}`}
              className={styles.digit}
              variants={variants}
              custom={index}
              initial="rest"
              animate="float"
              aria-hidden="true"
            >
              <span className={`${styles.tile} ${styles[meta.tone]}`}>
                {digit}
              </span>
              <span className={styles.letter}>{meta.name}</span>
            </motion.div>
          )
        })}
      </div>
    </ClayCard>
  )
}
