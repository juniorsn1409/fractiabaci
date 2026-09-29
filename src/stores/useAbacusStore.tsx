//  S# SEVERITY
//
//  useAbacusStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useMemo } from 'react'

import { create } from 'zustand'

import {
  TOAST_MS,
  cancelDrag,
  clearBoard,
  countDiscs,
  createAbacus,
  dismissToast,
  dropDisc,
  pickDisc,
  toTotal,
} from '@/application/AbacusUseCase'
import {
  AbacusDropTarget,
  AbacusMetrics,
  AbacusPickSource,
  AbacusState,
  PlaceCounts,
} from '@/domain/AbacusModel'

type ActionsProps = {
  /** Começa a arrastar (do pote ou de um disco do quadro). */
  pick: (source: AbacusPickSource) => void
  /**
   * Solta o disco arrastado no alvo resolvido pelo hit-test. `metrics`
   * (medidas em px) evita discos empilhados e acha lugar no reagrupamento.
   */
  drop: (target: AbacusDropTarget, metrics?: AbacusMetrics) => void
  /** Aborta o arraste; o disco volta para onde estava. */
  cancel: () => void
  /** "Limpar quadro". */
  clear: () => void
  /** Estado inicial (novo passo da lição, nova visita). */
  reset: () => void
  dismissToast: () => void
}

type StoreProps = {
  abacus: AbacusState
  actions: ActionsProps
}

let toastTimer: ReturnType<typeof setTimeout> | null = null

export const useAbacusStore = create<StoreProps>((set, get) => {
  /** RF-004: o aviso some sozinho depois de 7s. */
  const scheduleToast = () => {
    const toast = get().abacus.toast
    if (!toast) return
    if (toastTimer) clearTimeout(toastTimer)
    const { nonce } = toast
    toastTimer = setTimeout(() => {
      toastTimer = null
      set((state) => ({ abacus: dismissToast(state.abacus, nonce) }))
    }, TOAST_MS)
  }

  const stopToast = () => {
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = null
  }

  return {
    abacus: createAbacus(),
    actions: {
      pick: (source) =>
        set((state) => ({ abacus: pickDisc(state.abacus, source) })),
      drop: (target, metrics) => {
        const before = get().abacus.toast
        set((state) => ({ abacus: dropDisc(state.abacus, target, metrics) }))
        const after = get().abacus.toast
        if (after && after !== before) scheduleToast()
      },
      cancel: () => set((state) => ({ abacus: cancelDrag(state.abacus) })),
      clear: () => {
        stopToast()
        set((state) => ({ abacus: clearBoard(state.abacus) }))
      },
      reset: () => {
        stopToast()
        set({ abacus: createAbacus() })
      },
      dismissToast: () => {
        stopToast()
        set((state) => ({ abacus: dismissToast(state.abacus) }))
      },
    },
  }
})

/** Discos reconhecidos por casa (soltos ou na coluna errada não contam). */
export const useAbacusCounts = (): PlaceCounts => {
  const discs = useAbacusStore((state) => state.abacus.discs)
  return useMemo(() => countDiscs(discs), [discs])
}

export const useAbacusTotal = (): number => toTotal(useAbacusCounts())
