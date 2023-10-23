//  S# SEVERITY
//
//  useAmountStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 21/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/domain/CustomTypesModel'
import { create } from 'zustand'

type AmountProps = {
  unit: number
  ten: number
  hundred: number
}

type ActionsProps = {
  increase: (type: PlaceValueType) => void
  decrease: (type: PlaceValueType) => void
  cleanAmount: (type: PlaceValueType) => void
}

type StoreProps = {
  amount: AmountProps
  actions: ActionsProps
}

export const useAmountStore = create<StoreProps>((set) => ({
  amount: {
    unit: 0,
    ten: 0,
    hundred: 0,
  },
  actions: {
    increase: (type: PlaceValueType) => {
      set((state) => {
        switch (type) {
          case PlaceValueType.unit:
            return {
              amount: {
                ...state.amount,
                unit: state.amount.unit + 1,
              },
            }
          case PlaceValueType.ten:
            return {
              amount: {
                ...state.amount,
                ten: state.amount.ten + 1,
              },
            }
          case PlaceValueType.hundred:
            return {
              amount: {
                ...state.amount,
                hundred: state.amount.hundred + 1,
              },
            }
          default:
            return state
        }
      })
    },
    decrease: (type: PlaceValueType) => {
      set((state) => {
        switch (type) {
          case PlaceValueType.unit:
            return {
              amount: {
                ...state.amount,
                unit: Math.max(0, state.amount.unit - 1),
              },
            }
          case PlaceValueType.ten:
            return {
              amount: {
                ...state.amount,
                ten: Math.max(0, state.amount.ten - 1),
              },
            }
          case PlaceValueType.hundred:
            return {
              amount: {
                ...state.amount,
                hundred: Math.max(0, state.amount.hundred - 1),
              },
            }
          default:
            return state
        }
      })
    },
    cleanAmount(type: PlaceValueType) {
      set((state) => {
        switch (type) {
          case PlaceValueType.unit:
            return {
              amount: {
                ...state.amount,
                unit: Math.max(0, 0),
              },
            }
          case PlaceValueType.ten:
            return {
              amount: {
                ...state.amount,
                ten: Math.max(0, 0),
              },
            }
          case PlaceValueType.hundred:
            return {
              amount: {
                ...state.amount,
                hundred: Math.max(0, 0),
              },
            }
          default:
            return state
        }
      })
    },
  },
}))
