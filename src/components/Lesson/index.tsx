//  S# SEVERITY
//
//  Lesson.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useCallback, useEffect, useRef } from 'react'

import { motion, useAnimationControls } from 'framer-motion'

import { toTotal } from '@/application/LessonUseCase'
import { AbacusBoard, AbacusToast } from '@/components/AbacusBoard'
import { ClayButton } from '@/components/ClayButton'
import { FeedbackSheet } from '@/components/FeedbackSheet'
import { useAbacusCounts, useAbacusStore } from '@/stores/useAbacusStore'
import { useLessonStore } from '@/stores/useLessonStore'
import { useProgressActions } from '@/stores/useProgressStore'

import { shake, useSafeVariants } from '@/styles/motion'

import { LessonComplete } from './LessonComplete'
import { LessonPrompt } from './LessonPrompt'
import { LessonTopBar } from './LessonTopBar'

import styles from './index.module.css'

/** ID da lição na trilha (src/components/Trail/lessons.ts). */
export const LESSON_ID = 'monte-numeros'

/** Numerais dentro dos discos (ajuda crianças daltônicas). Sem UI por ora. */
export const SHOW_NUMERALS = true

export interface LessonProps {
  showNumerals?: boolean
}

export const Lesson = ({ showNumerals = SHOW_NUMERALS }: LessonProps) => {
  const { lesson, actions } = useLessonStore()
  const abacusActions = useAbacusStore((state) => state.actions)
  const counts = useAbacusCounts()
  const shakeVariants = useSafeVariants(shake)
  const shakeControls = useAnimationControls()
  const progressActions = useProgressActions()
  const savedSummaryRef = useRef<object | null>(null)

  const { targets, step, status, hintNonce } = lesson
  const total = toTotal(counts)
  const steps = targets.length
  const isComplete = status === 'complete'
  const isSuccess = status === 'success'
  const locked = isSuccess || isComplete
  const isLastStep = step >= steps - 1
  const progress = isComplete
    ? 1
    : steps > 0
    ? (step + (isSuccess ? 1 : 0)) / steps
    : 0

  // Cada visita começa uma lição nova.
  useEffect(() => {
    actions.reset()
  }, [actions])

  // Cada passo começa com o quadro vazio.
  useEffect(() => {
    abacusActions.reset()
  }, [step, abacusActions])

  // Lição concluída: grava o progresso uma única vez (XP no cabeçalho/trilha).
  useEffect(() => {
    const summary = lesson.summary
    if (!isComplete || !summary || savedSummaryRef.current === summary) return
    savedSummaryRef.current = summary
    progressActions.completeLesson(LESSON_ID, summary.xpEarned)
  }, [isComplete, lesson.summary, progressActions])

  // Resposta errada: o quadro treme.
  useEffect(() => {
    if (hintNonce > 0) shakeControls.start('shake')
  }, [hintNonce, shakeControls])

  // Mexer num disco fecha a dica ("Tentar de novo" implícito).
  const handleDragStart = useCallback(() => {
    actions.dismissHint()
  }, [actions])

  const handleCheck = useCallback(() => {
    abacusActions.dismissToast()
    actions.check(counts)
  }, [abacusActions, actions, counts])

  return (
    <div className={styles.screen}>
      <header className={styles.top}>
        <LessonTopBar
          value={progress}
          current={Math.min(step + 1, steps)}
          total={steps}
        />
      </header>

      {isComplete && lesson.summary ? (
        <div className={styles.completeWrap}>
          <LessonComplete summary={lesson.summary} />
        </div>
      ) : (
        <>
          <main className={styles.main}>
            <aside className={styles.panel}>
              <LessonPrompt target={targets[step]} />

              <div className={styles.built} aria-live="polite">
                <span className={styles.builtLabel}>Você montou</span>
                <strong className={styles.total}>{total}</strong>
              </div>

              <div className={styles.tip}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18h6" />
                  <path d="M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
                </svg>
                <span>
                  Solte cada disco na casa da mesma cor. Com 10 discos juntos,
                  eles viram 1 da próxima casa.
                </span>
              </div>
            </aside>

            <motion.div
              className={styles.boardWrap}
              variants={shakeVariants}
              initial="idle"
              animate={shakeControls}
            >
              <AbacusBoard
                locked={locked}
                showNumerals={showNumerals}
                onDragStart={handleDragStart}
              />
            </motion.div>
          </main>

          <footer className={styles.bottom}>
            <ClayButton
              className={styles.check}
              disabled={total === 0 || locked}
              onClick={handleCheck}
            >
              VERIFICAR
            </ClayButton>
          </footer>

          <AbacusToast className={styles.toast} />

          <FeedbackSheet
            type="success"
            variant="band"
            position="fixed"
            open={isSuccess}
            title="Mandou bem!"
            message="+10 XP"
            action={
              <ClayButton fullWidth onClick={actions.next}>
                {isLastStep ? 'TERMINAR LIÇÃO' : 'CONTINUAR'}
              </ClayButton>
            }
          />

          <FeedbackSheet
            type="hint"
            variant="band"
            position="fixed"
            open={status === 'hint'}
            title="Quase lá!"
            message={lesson.hint}
            action={
              <ClayButton
                fullWidth
                variant="secondary"
                onClick={actions.dismissHint}
              >
                Tentar de novo
              </ClayButton>
            }
          />
        </>
      )}
    </div>
  )
}
