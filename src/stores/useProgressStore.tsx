//  S# SEVERITY
//
//  useProgressStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useEffect } from 'react'

import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'

/** Meta diária de XP exibida na trilha. */
export const DAILY_GOAL_XP = 30

const STORAGE_KEY = 'fa-progress'

/** localStorage protegido: SSR, modo privado e cota cheia nunca quebram a tela. */
const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value)
    } catch {
      /* sem persistência: o progresso vive só nesta aba */
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name)
    } catch {
      /* idem */
    }
  },
}

/** Data local no formato AAAA-MM-DD. */
const dayKey = (date: Date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const yesterdayKey = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return dayKey(date)
}

type ProgressData = {
  /** XP total acumulado. */
  xp: number
  /** Dias seguidos com atividade (terminando hoje ou ontem). */
  streakDays: number
  /** IDs das lições concluídas (ver `TRAIL_LESSONS`). */
  completedLessons: string[]
  /** Último dia com atividade (AAAA-MM-DD) ou null. */
  lastActiveDay: string | null
  /** XP ganho em `xpTodayDay`. */
  xpToday: number
  xpTodayDay: string | null
}

type ActionsProps = {
  /** Soma XP e atualiza a sequência de dias. */
  addXp: (amount: number) => void
  /** Marca a lição como concluída (idempotente) e soma `xp` opcional. */
  completeLesson: (lessonId: string, xp?: number) => void
  /** Zera todo o progresso. */
  reset: () => void
}

type StoreProps = ProgressData & { actions: ActionsProps }

const INITIAL: ProgressData = {
  xp: 0,
  streakDays: 0,
  completedLessons: [],
  lastActiveDay: null,
  xpToday: 0,
  xpTodayDay: null,
}

/** Aplica um dia de atividade + XP ao estado. */
const registerActivity = (state: ProgressData, amount: number) => {
  const today = dayKey()
  const gained = Math.max(0, Math.round(amount))

  let streakDays = state.streakDays
  if (state.lastActiveDay !== today) {
    streakDays = state.lastActiveDay === yesterdayKey() ? streakDays + 1 : 1
  }

  return {
    xp: state.xp + gained,
    streakDays,
    lastActiveDay: today,
    xpToday: (state.xpTodayDay === today ? state.xpToday : 0) + gained,
    xpTodayDay: today,
  }
}

export const useProgressStore = create<StoreProps>()(
  persist(
    (set) => ({
      ...INITIAL,
      actions: {
        addXp: (amount) => set((state) => registerActivity(state, amount)),
        completeLesson: (lessonId, xp = 0) =>
          set((state) => ({
            ...registerActivity(state, xp),
            completedLessons: state.completedLessons.includes(lessonId)
              ? state.completedLessons
              : [...state.completedLessons, lessonId],
          })),
        reset: () => set({ ...INITIAL }),
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      // Reidratado no cliente via useHydrateProgress (evita mismatch do SSR).
      skipHydration: true,
      partialize: (state): ProgressData => ({
        xp: state.xp,
        streakDays: state.streakDays,
        completedLessons: state.completedLessons,
        lastActiveDay: state.lastActiveDay,
        xpToday: state.xpToday,
        xpTodayDay: state.xpTodayDay,
      }),
    },
  ),
)

/** Carrega o progresso salvo após a montagem (chame em qualquer tela). */
export const useHydrateProgress = () => {
  useEffect(() => {
    if (!useProgressStore.persist.hasHydrated()) {
      useProgressStore.persist.rehydrate()
    }
  }, [])
}

/** Sequência válida hoje: zera se o último dia ativo foi antes de ontem. */
export const selectCurrentStreak = (state: ProgressData) =>
  state.lastActiveDay === dayKey() || state.lastActiveDay === yesterdayKey()
    ? state.streakDays
    : 0

/** XP de hoje (zera na virada do dia). */
export const selectXpToday = (state: ProgressData) =>
  state.xpTodayDay === dayKey() ? state.xpToday : 0

export const useProgressActions = () => useProgressStore((s) => s.actions)
