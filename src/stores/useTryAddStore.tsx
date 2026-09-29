//  S# SEVERITY
//
//  useTryAddStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 29/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { create } from 'zustand'

type ValueProps = {
  isTrying: boolean
}

type ActionsProps = {
  setTrue: () => void
  setFalse: () => void
}

type StoreProps = {
  values: ValueProps
  actions: ActionsProps
}

export const useTryAddStore = create<StoreProps>((set) => ({
  values: {
    isTrying: false,
  },
  actions: {
    setTrue: () =>
      set((state) => ({ values: { ...state.values, isTrying: true } })),
    setFalse: () =>
      set((state) => ({ values: { ...state.values, isTrying: false } })),
  },
}))
