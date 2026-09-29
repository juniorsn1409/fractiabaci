//  S# SEVERITY
//
//  AbacusToast.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
//  RF-004: aviso no canto inferior esquerdo quando o disco cai na coluna
//  errada (ou passa de 999). Some sozinho depois de 7s (ver useAbacusStore).
//

'use client'

import { AnimatePresence, Variants, motion } from 'framer-motion'

import { useAbacusStore } from '@/stores/useAbacusStore'

import { useSafeVariants } from '@/styles/motion'

import styles from './index.module.css'

/** Entra deslizando da esquerda com leve overshoot (toastIn do protótipo). */
const toastIn: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: [-40, 6, 0],
    opacity: [0, 1, 1],
    transition: { duration: 0.45, times: [0, 0.7, 1], ease: 'easeOut' },
  },
  exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
}

export interface AbacusToastProps {
  className?: string
}

export const AbacusToast = ({ className }: AbacusToastProps) => {
  const toast = useAbacusStore((state) => state.abacus.toast)
  const variants = useSafeVariants(toastIn)

  return (
    <div
      className={[styles.region, className ?? ''].filter(Boolean).join(' ')}
      aria-live="polite"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.nonce}
            role="status"
            className={styles.toast}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--fa-hundred)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={styles.icon}
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5" />
              <path d="M12 16.5v.5" />
            </svg>
            <span className={styles.message}>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
