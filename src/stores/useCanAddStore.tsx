//  S# SEVERITY
//
//  useCanAddStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 29/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/domain/CustomTypesModel'

import { create } from 'zustand'

type AcceptProps = {
  acceptUnit: boolean
  acceptTen: boolean
  acceptHundred: boolean
}

type ActionsProps = {
  setTrue: (type: PlaceValueType) => void
  setFalse: (type: PlaceValueType) => void
  canAdd: (type: PlaceValueType) => boolean
}

type StoreProps = {
  canAdd: AcceptProps
  actions: ActionsProps
}

export const useCanAddStore = create<StoreProps>((set, get) => ({
  canAdd: {
    acceptUnit: true,
    acceptTen: true,
    acceptHundred: true,
  },
  actions: {
    setTrue: (type: PlaceValueType) => {
      set((state) => {
        switch (type) {
          case PlaceValueType.unit:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptUnit: true,
              },
            }
          case PlaceValueType.ten:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptTen: true,
              },
            }
          case PlaceValueType.hundred:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptHundred: true,
              },
            }
          default:
            return state
        }
      })
    },
    setFalse: (type: PlaceValueType) => {
      set((state) => {
        switch (type) {
          case PlaceValueType.unit:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptUnit: false,
              },
            }
          case PlaceValueType.ten:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptTen: false,
              },
            }
          case PlaceValueType.hundred:
            return {
              ...state,
              canAdd: {
                ...state.canAdd,
                acceptHundred: false,
              },
            }
          default:
            return state
        }
      })
    },
    canAdd: (type: PlaceValueType) => {
      switch (type) {
        case PlaceValueType.unit:
          return get().canAdd.acceptUnit
        case PlaceValueType.ten:
          return get().canAdd.acceptTen
        case PlaceValueType.hundred:
          return get().canAdd.acceptHundred
        default:
          return false
      }
    },
  },
}))
