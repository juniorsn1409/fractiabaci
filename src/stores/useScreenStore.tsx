//  S# SEVERITY
//
//  useScreenStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 21/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import React, { RefObject } from 'react'

import { create } from 'zustand'

type ScreenProps = {
  size: RefObject<Element>
}

type ActionsProps = {
  addRef: (screen: ScreenProps) => void
  removeRef: () => void
}

type StoreProps = {
  screen: ScreenProps
  actions: ActionsProps
}

export const useScreenStore = create<StoreProps>((set) => ({
  screen: {
    size: React.createRef(),
  },
  actions: {
    addRef: (screen) => set({ screen }),
    removeRef: () => set({ screen: { size: React.createRef() } }),
  },
}))
