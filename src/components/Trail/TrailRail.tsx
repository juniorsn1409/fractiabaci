//  S# SEVERITY
//
//  TrailRail.tsx
//  Trail
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import Link from 'next/link'

import { ClayCard } from '@/components/ClayCard'
import { StarIcon, TrophyIcon } from '@/components/Icons'
import { ProgressBar } from '@/components/ProgressBar'
import {
  DAILY_GOAL_XP,
  selectXpToday,
  useProgressStore,
} from '@/stores/useProgressStore'

import { TRAIL_LESSONS } from './lessons'

import styles from './index.module.css'

export const TrailRail = () => {
  const xpToday = useProgressStore(selectXpToday)
  const completed = useProgressStore((s) => s.completedLessons)

  const doneCount = TRAIL_LESSONS.filter((l) => completed.includes(l.id)).length

  const achievements = [
    {
      id: 'first',
      title: 'Primeira lição',
      hint: 'Conclua 1 lição',
      earned: doneCount >= 1,
    },
    {
      id: 'unit1',
      title: 'Unidade 1 completa',
      hint: `Conclua as ${TRAIL_LESSONS.length} lições`,
      earned: doneCount >= TRAIL_LESSONS.length,
    },
  ]
  const earnedCount = achievements.filter((a) => a.earned).length

  return (
    <aside className={styles.rail} aria-label="Seu progresso">
      <ClayCard padding="md" radius="xl" className={styles.railCard}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Meta diária</h2>
          <span className={styles.cardMeta}>
            {Math.min(xpToday, DAILY_GOAL_XP)} / {DAILY_GOAL_XP} XP
          </span>
        </div>
        <ProgressBar
          value={xpToday / DAILY_GOAL_XP}
          label="Meta diária de XP"
          valueText={`${xpToday} de ${DAILY_GOAL_XP} XP`}
          height={18}
        />
        <span className={styles.cardSub}>
          {xpToday >= DAILY_GOAL_XP
            ? 'Meta de hoje cumprida!'
            : 'Ganhe XP completando lições.'}
        </span>
      </ClayCard>

      <ClayCard padding="md" radius="xl" className={styles.railCard}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Conquistas</h2>
          <span className={styles.cardMeta}>
            {earnedCount} de {achievements.length}
          </span>
        </div>
        <ul className={styles.badges}>
          {achievements.map((a) => (
            <li
              key={a.id}
              className={`${styles.badge} ${
                a.earned ? styles.badgeEarned : ''
              }`}
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                {a.id === 'unit1' ? (
                  <TrophyIcon size={22} />
                ) : (
                  <StarIcon size={22} />
                )}
              </span>
              <span className={styles.badgeText}>
                <span className={styles.badgeTitle}>{a.title}</span>
                <span className={styles.badgeHint}>
                  {a.earned ? 'Conquistada!' : a.hint}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </ClayCard>

      <div className={styles.freeCard}>
        <span className={styles.freeKicker}>PARA EXPLORAR</span>
        <span className={styles.freeTitle}>Ábaco livre</span>
        <span className={styles.freeText}>
          Monte qualquer número arrastando os discos, sem pressa.
        </span>
        <Link href="/" className={styles.freeLink}>
          ABRIR O ÁBACO
        </Link>
      </div>
    </aside>
  )
}
