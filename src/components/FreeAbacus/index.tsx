//  S# SEVERITY
//
//  FreeAbacus.tsx
//  Ábaco livre (home)
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode, useEffect } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { PLACE_ORDER, toTotal } from '@/application/AbacusUseCase'
import { AbacusBoard, AbacusToast } from '@/components/AbacusBoard'
import { PLACE_META } from '@/components/AbacusBoard/places'
import { ClayButton } from '@/components/ClayButton'
import { ClayCard } from '@/components/ClayCard'
import { useAbacusCounts, useAbacusStore } from '@/stores/useAbacusStore'

import { flash, useSafeVariants } from '@/styles/motion'

import styles from './index.module.css'

const STEPS = [
  'Pegue um disco no pote, à direita do quadro.',
  'Solte na casa da mesma cor.',
  'Juntou 10? Eles viram 1 disco da próxima casa.',
  'Para tirar, arraste o disco para fora ou para a lixeira.',
]

export interface FreeAbacusProps {
  /** Cabeçalho do site (SiteHeader), renderizado no servidor. */
  header?: ReactNode
  showNumerals?: boolean
}

export const FreeAbacus = ({
  header,
  showNumerals = true,
}: FreeAbacusProps) => {
  const actions = useAbacusStore((state) => state.actions)
  const counts = useAbacusCounts()
  const total = toTotal(counts)
  const flashVariants = useSafeVariants(flash)

  // Cada visita começa com o quadro vazio.
  useEffect(() => {
    actions.reset()
  }, [actions])

  return (
    <div className={styles.page}>
      {header}

      <main className={styles.main}>
        <aside className={styles.panel}>
          <ClayCard as="section" padding="lg" className={styles.intro}>
            <div className={styles.introText}>
              <h1 className={styles.title}>Ábaco livre</h1>
              <span className={styles.subtitle}>
                <span className={styles.mouse}>
                  Arraste os discos com o mouse
                </span>
                <span className={styles.touch}>
                  Arraste os discos com o dedo
                </span>
              </span>
            </div>
            <ol className={styles.steps}>
              {STEPS.map((text, index) => (
                <li key={index} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className={styles.stepText}>{text}</span>
                </li>
              ))}
            </ol>
          </ClayCard>

          <section className={styles.challenge} aria-labelledby="desafio">
            <span className={styles.challengeKicker}>QUER UM DESAFIO?</span>
            <span id="desafio" className={styles.challengeTitle}>
              Monte números e ganhe estrelas
            </span>
            <Link href="/licao" className={styles.cta}>
              COMEÇAR LIÇÃO
            </Link>
          </section>
        </aside>

        <div className={styles.work}>
          <div className={styles.boardWrap}>
            <AbacusBoard showNumerals={showNumerals} />
          </div>

          <div className={styles.totalStrip}>
            <div className={styles.totalGroup}>
              <span className={styles.totalLabel}>Total</span>
              <div
                className={styles.tiles}
                role="img"
                aria-label={`Total no ábaco: ${total}`}
              >
                {PLACE_ORDER.map((place) => {
                  const meta = PLACE_META[place]
                  return (
                    <motion.span
                      key={`${place}-${counts[place]}`}
                      className={`${styles.tile} ${styles[meta.tone]}`}
                      title={meta.title}
                      variants={flashVariants}
                      initial="hidden"
                      animate="visible"
                      aria-hidden="true"
                    >
                      {counts[place]}
                    </motion.span>
                  )
                })}
              </div>
              <span className={styles.equals} aria-live="polite">
                = {total}
              </span>
            </div>
            <ClayButton
              variant="secondary"
              className={styles.clear}
              onClick={actions.clear}
            >
              Limpar quadro
            </ClayButton>
          </div>
        </div>
      </main>

      <AbacusToast className={styles.toast} />
    </div>
  )
}
