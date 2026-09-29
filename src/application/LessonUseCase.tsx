//  S# SEVERITY
//
//  LessonUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
//  Roteiro da lição. Os discos ficam no ábaco (AbacusUseCase); aqui só
//  entram as contagens na hora de verificar.
//

import {
  PLACE_ORDER,
  emptyCounts,
  toCounts,
  toTotal,
} from '@/application/AbacusUseCase'
import { PlaceValueType } from '@/domain/CustomTypesModel'
import {
  LessonDigit,
  LessonPlace,
  LessonState,
  PlaceCounts,
} from '@/domain/LessonModel'

export { PLACE_ORDER, emptyCounts, toCounts, toTotal }

export const DEFAULT_TARGETS = [34, 52, 120, 213, 305]
export const XP_PER_STEP = 10

const PLACE_NAMES: Record<LessonPlace, [string, string]> = {
  [PlaceValueType.unit]: ['unidade', 'unidades'],
  [PlaceValueType.ten]: ['dezena', 'dezenas'],
  [PlaceValueType.hundred]: ['centena', 'centenas'],
}

/** Dígitos do alvo, sem zeros à esquerda (34 → dezena 3, unidade 4). */
export const toDigits = (n: number): LessonDigit[] => {
  const counts = toCounts(n)
  const start = PLACE_ORDER.findIndex((place) => counts[place] !== 0)
  const from = start === -1 ? PLACE_ORDER.length - 1 : start
  return PLACE_ORDER.slice(from).map((place) => ({
    place,
    digit: counts[place],
  }))
}

export const createLesson = (
  targets: number[] = DEFAULT_TARGETS,
): LessonState => ({
  targets: [...targets],
  step: 0,
  status: 'idle',
  hint: '',
  hintNonce: 0,
  xp: 0,
  attempts: targets.map(() => 0),
  firstTryCorrect: 0,
  summary: null,
})

export const isLocked = (state: LessonState): boolean =>
  state.status === 'success' || state.status === 'complete'

export const buildHint = (counts: PlaceCounts, target: number): string => {
  const want = toCounts(target)
  for (const place of PLACE_ORDER) {
    const diff = want[place] - counts[place]
    if (diff !== 0) {
      const n = Math.abs(diff)
      const word = PLACE_NAMES[place][n === 1 ? 0 : 1]
      if (diff > 0) return `${n === 1 ? 'Falta' : 'Faltam'} ${n} ${word}.`
      return `Tem ${n} ${word} a mais. Arraste para fora ou para a lixeira.`
    }
  }
  return ''
}

/** Confere o que está montado no ábaco contra o alvo do passo atual. */
export const checkAnswer = (
  state: LessonState,
  counts: PlaceCounts = emptyCounts(),
): LessonState => {
  if (isLocked(state)) return state

  const target = state.targets[state.step]
  const attempts = [...state.attempts]
  attempts[state.step] = (attempts[state.step] ?? 0) + 1

  if (toTotal(counts) === target) {
    return {
      ...state,
      attempts,
      status: 'success',
      hint: '',
      xp: state.xp + XP_PER_STEP,
      firstTryCorrect:
        attempts[state.step] === 1
          ? state.firstTryCorrect + 1
          : state.firstTryCorrect,
    }
  }

  return {
    ...state,
    attempts,
    status: 'hint',
    hint: buildHint(counts, target),
    hintNonce: state.hintNonce + 1,
  }
}

export const dismissHint = (state: LessonState): LessonState =>
  state.status === 'hint' ? { ...state, status: 'idle', hint: '' } : state

export const nextStep = (state: LessonState): LessonState => {
  if (state.status !== 'success') return state

  if (state.step >= state.targets.length - 1) {
    const steps = state.targets.length
    return {
      ...state,
      hint: '',
      status: 'complete',
      summary: {
        xpEarned: state.xp,
        accuracy: steps > 0 ? state.firstTryCorrect / steps : 0,
        firstTryCorrect: state.firstTryCorrect,
        steps,
      },
    }
  }

  return { ...state, hint: '', step: state.step + 1, status: 'idle' }
}
