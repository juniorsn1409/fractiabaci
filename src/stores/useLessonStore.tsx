//  S# SEVERITY
//
//  useLessonStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { create } from 'zustand'

import {
  checkAnswer,
  createLesson,
  dismissHint,
  nextStep,
} from '@/application/LessonUseCase'
import { LessonState, PlaceCounts } from '@/domain/LessonModel'

type ActionsProps = {
  /** Verifica as contagens vindas do ábaco (useAbacusCounts). */
  check: (counts: PlaceCounts) => void
  next: () => void
  dismissHint: () => void
  reset: (targets?: number[]) => void
}

type StoreProps = {
  lesson: LessonState
  actions: ActionsProps
}

export const useLessonStore = create<StoreProps>((set) => ({
  lesson: createLesson(),
  actions: {
    check: (counts) =>
      set((state) => ({ lesson: checkAnswer(state.lesson, counts) })),
    next: () => set((state) => ({ lesson: nextStep(state.lesson) })),
    dismissHint: () => set((state) => ({ lesson: dismissHint(state.lesson) })),
    reset: (targets) =>
      set((state) => ({
        lesson: createLesson(targets ?? state.lesson.targets),
      })),
  },
}))
