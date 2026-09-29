//  S# SEVERITY
//
//  TrailPath.tsx
//  Trail
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import Link from 'next/link'

import { CSSProperties } from 'react'

import { Variants, motion } from 'framer-motion'

import { CheckIcon, LockIcon, StarIcon, TrophyIcon } from '@/components/Icons'

import { useSafeVariants } from '@/styles/motion'

import { TRAIL_LESSONS, TrailNodeState } from './lessons'

import styles from './index.module.css'

/** Deslocamento horizontal (px) de cada nó — o zigue-zague da trilha. */
const OFFSETS = [0, -70, -34, 44, 84, 24]

/** Nós sobem em sequência (keyframes `rise` do Trilha.dc.html). */
const rise: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.6 },
  visible: (index = 0) => ({
    opacity: [0, 1, 1],
    y: [30, -4, 0],
    scale: [0.6, 1.06, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.7, 1],
      ease: 'easeOut',
      delay: index * 0.08,
    },
  }),
}

const STATE_LABEL: Record<TrailNodeState, string> = {
  done: 'concluída',
  current: 'lição atual',
  locked: 'bloqueada',
  soon: 'em breve',
}

export const TrailPath = ({ states }: { states: TrailNodeState[] }) => {
  const variants = useSafeVariants(rise)

  return (
    <ol className={styles.path} aria-label="Lições da unidade 1">
      {TRAIL_LESSONS.map((lesson, index) => {
        const state = states[index]
        const isChallenge = lesson.kind === 'challenge'
        const offset = OFFSETS[index % OFFSETS.length]

        return (
          <motion.li
            key={lesson.id}
            className={styles.step}
            style={{ '--offset': `${offset}px` } as CSSProperties}
            variants={variants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            {state === 'current' || (state === 'done' && lesson.available) ? (
              <Link
                href={lesson.href}
                className={styles.entry}
                aria-label={`${
                  state === 'done' ? 'Praticar de novo' : 'Começar'
                } a lição ${lesson.title}`}
              >
                <span className={styles.bubble} aria-hidden="true">
                  {state === 'done' ? 'PRATICAR' : 'COMEÇAR'}
                </span>
                <span className={styles.go}>
                  <span
                    className={`${styles.node} ${
                      state === 'done' ? styles.nodeDone : styles.nodeCurrent
                    }`}
                  >
                    {state === 'done' ? (
                      <CheckIcon />
                    ) : isChallenge ? (
                      <TrophyIcon size={34} />
                    ) : (
                      <StarIcon size={34} />
                    )}
                  </span>
                </span>
                <span
                  className={`${styles.stepTitle} ${styles.stepTitleCurrent}`}
                >
                  {lesson.title}
                </span>
              </Link>
            ) : (
              <>
                <span
                  className={`${styles.node} ${
                    state === 'done' ? styles.nodeDone : styles.nodeLocked
                  }`}
                  role="img"
                  aria-label={`${lesson.title}, ${STATE_LABEL[state]}`}
                >
                  {state === 'done' ? (
                    <CheckIcon />
                  ) : state === 'soon' ? (
                    <LockIcon />
                  ) : isChallenge ? (
                    <TrophyIcon />
                  ) : (
                    <LockIcon />
                  )}
                </span>
                <span className={styles.stepTitle} aria-hidden="true">
                  {lesson.title}
                </span>
                {state === 'soon' && (
                  <span className={styles.soonTag} aria-hidden="true">
                    Em breve
                  </span>
                )}
              </>
            )}
          </motion.li>
        )
      })}
    </ol>
  )
}
