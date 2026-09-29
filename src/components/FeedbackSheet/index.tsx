//  S# SEVERITY
//
//  FeedbackSheet.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { checkPop, sheetUp, spark, useMotionSafe } from '@/styles/motion'

import styles from './index.module.css'

export type FeedbackSheetType = 'success' | 'hint'

/**
 * 'sheet': folha arredondada que sobe do rodapé (celular).
 * 'band': faixa de largura total no rodapé (web); vira 'sheet' abaixo de 768px.
 */
export type FeedbackSheetVariant = 'sheet' | 'band'

export interface FeedbackSheetProps {
  type: FeedbackSheetType
  title: ReactNode
  message?: ReactNode
  /** Slot para o botão de ação (ex.: <ClayButton>CONTINUAR</ClayButton>). */
  action?: ReactNode
  /** Controla a entrada/saída animada (padrão true). */
  open?: boolean
  /** 'absolute' prende ao container pai (position: relative); 'fixed' à tela. */
  position?: 'absolute' | 'fixed'
  variant?: FeedbackSheetVariant
  className?: string
}

const SPARKS = [
  { dx: -34, dy: -30, color: 'var(--fa-hundred)' },
  { dx: 34, dy: -28, color: 'var(--fa-ten)' },
  { dx: -30, dy: 30, color: 'var(--fa-unit)' },
  { dx: 36, dy: 26, color: 'var(--fa-brand)' },
  { dx: 0, dy: -42, color: 'var(--fa-progress)' },
]

export const FeedbackSheet = ({
  type,
  title,
  message,
  action,
  open = true,
  position = 'absolute',
  variant = 'sheet',
  className,
}: FeedbackSheetProps) => {
  const { variants, reduce } = useMotionSafe()
  const isSuccess = type === 'success'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={type}
          role="status"
          aria-live="polite"
          className={[
            styles.sheet,
            styles[type],
            styles[position],
            variant === 'band' ? styles.band : '',
            className ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
          variants={variants(sheetUp)}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.header}>
            {isSuccess && (
              <div className={styles.badge}>
                {!reduce &&
                  SPARKS.map((item, index) => (
                    <motion.span
                      key={index}
                      aria-hidden="true"
                      className={styles.spark}
                      style={{ background: item.color }}
                      custom={{ dx: item.dx, dy: item.dy }}
                      variants={spark}
                      initial="hidden"
                      animate="visible"
                    />
                  ))}
                <motion.div
                  aria-hidden="true"
                  className={styles.check}
                  variants={variants(checkPop)}
                  initial="hidden"
                  animate="visible"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </motion.div>
              </div>
            )}
            {!isSuccess && variant === 'band' && (
              <div className={styles.hintBadge} aria-hidden="true">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
                </svg>
              </div>
            )}
            <div className={styles.text}>
              <span className={styles.title}>{title}</span>
              {message && <span className={styles.message}>{message}</span>}
            </div>
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
