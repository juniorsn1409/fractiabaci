//  S# SEVERITY
//
//  Trail.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useHydrateProgress, useProgressStore } from '@/stores/useProgressStore'

import { TRAIL_LESSONS, trailStates } from './lessons'
import { TrailPath } from './TrailPath'
import { TrailRail } from './TrailRail'

import styles from './index.module.css'

/** Tela "Aprender": banner da unidade, trilha em zigue-zague e trilho lateral. */
export const Trail = () => {
  useHydrateProgress()
  const completed = useProgressStore((s) => s.completedLessons)
  const states = trailStates(completed)
  const doneCount = states.filter((s) => s === 'done').length
  const availableCount = TRAIL_LESSONS.filter((l) => l.available).length

  return (
    <main className={styles.page}>
      <section className={styles.center} aria-labelledby="unit-title">
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            <span className={styles.bannerKicker}>UNIDADE 1</span>
            <h1 id="unit-title" className={styles.bannerTitle}>
              As casas do ábaco
            </h1>
            <span className={styles.bannerSub}>
              {doneCount} de {availableCount}{' '}
              {availableCount === 1 ? 'lição disponível' : 'lições disponíveis'}
              {' · mais em breve'}
            </span>
          </div>
          <span className={styles.bannerDiscs} aria-hidden="true">
            <span className={`${styles.bannerDisc} ${styles.hundred}`}>
              100
            </span>
            <span className={`${styles.bannerDisc} ${styles.ten}`}>10</span>
            <span className={`${styles.bannerDisc} ${styles.unit}`}>1</span>
          </span>
        </div>

        <TrailPath states={states} />
      </section>

      <TrailRail />
    </main>
  )
}
