//  S# SEVERITY
//
//  LessonTopBar.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import Link from 'next/link'

import { ProgressBar } from '@/components/ProgressBar'

import styles from './index.module.css'

export interface LessonTopBarProps {
  /** Progresso de 0 a 1. */
  value: number
  /** Passo atual (1-based) e total, ex.: 2 e 5 → "2 de 5". */
  current: number
  total: number
}

export const LessonTopBar = ({ value, current, total }: LessonTopBarProps) => {
  return (
    <div className={styles.bar}>
      <Link href="/trilha" aria-label="Sair da lição" className={styles.close}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </svg>
      </Link>
      <ProgressBar
        value={value}
        height={20}
        valueText={`${current} de ${total}`}
        className={styles.progress}
      />
      <span className={styles.label}>
        {current} de {total}
      </span>
    </div>
  )
}
