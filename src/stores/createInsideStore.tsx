//  S# SEVERITY
//
//  createInsideStore.tsx
//
//  Created by Edson Júnior Ananias de Lima on 23/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { create } from 'zustand'

type InsideProps = {
  value: boolean
}

type ActionsProps = {
  setTrue: () => void
  setFalse: () => void
}

type StoreProps = {
  isInside: InsideProps
  actions: ActionsProps
}

export const createInsideStore = create<StoreProps>((set) => ({
  isInside: {
    value: false,
  },
  actions: {
    setTrue: () => set({ isInside: { value: true } }),
    setFalse: () => set({ isInside: { value: false } }),
  },
}))
