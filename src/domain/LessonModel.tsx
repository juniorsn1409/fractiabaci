//  S# SEVERITY
//
//  LessonModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { AbacusPlace, PlaceCounts } from '@/domain/AbacusModel'

/** A lição usa as mesmas casas do ábaco. */
export type LessonPlace = AbacusPlace
export type { PlaceCounts }

export type LessonStatus = 'idle' | 'success' | 'hint' | 'complete'

export type LessonSummary = {
  xpEarned: number
  // First-try correct steps / total steps (0..1).
  accuracy: number
  firstTryCorrect: number
  steps: number
}

/**
 * Os discos moram no ábaco (useAbacusStore); a lição só guarda o roteiro,
 * o status e a pontuação. As contagens chegam em `checkAnswer(counts)`.
 */
export type LessonState = {
  targets: number[]
  step: number
  status: LessonStatus
  hint: string
  // Increments on every wrong check (board shakes).
  hintNonce: number
  xp: number
  // Number of checks made on each step (index = step).
  attempts: number[]
  firstTryCorrect: number
  summary: LessonSummary | null
}

export type LessonDigit = {
  place: LessonPlace
  digit: number
}
