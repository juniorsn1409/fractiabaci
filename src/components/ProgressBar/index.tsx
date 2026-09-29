//  S# SEVERITY
//
//  ProgressBar.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { motion } from 'framer-motion'

import { shine, springs, useMotionSafe } from '@/styles/motion'

import styles from './index.module.css'

export interface ProgressBarProps {
  /** Progresso de 0 a 1 (valores fora do intervalo são limitados). */
  value: number
  /** Rótulo acessível; padrão "Progresso da lição". */
  label?: string
  /** Texto lido pelo leitor de tela, ex.: "3 de 5". */
  valueText?: string
  /** Altura da trilha em px (padrão 20). */
  height?: number
  className?: string
}

export const ProgressBar = ({
  value,
  label = 'Progresso da lição',
  valueText,
  height = 20,
  className,
}: ProgressBarProps) => {
  const { variants, transition, reduce } = useMotionSafe()
  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0))
  const percent = Math.round(clamped * 100)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={valueText}
      className={[styles.track, className ?? ''].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <motion.div
        className={styles.fill}
        initial={{ width: '0%' }}
        animate={{ width: `${clamped * 100}%` }}
        transition={transition(springs.progress)}
      >
        {!reduce && clamped > 0 && (
          <motion.span
            aria-hidden="true"
            className={styles.shine}
            variants={variants(shine)}
            initial="rest"
            animate="shine"
          />
        )}
      </motion.div>
    </div>
  )
}
