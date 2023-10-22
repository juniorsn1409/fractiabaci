//  S# SEVERITY
//
//  useBeadStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 21/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { BeadModel } from '@/domain/BeadModel'
import { PlaceValueType } from '@/domain/CustomTypesModel'
import { create } from 'zustand'

type BeadProps = {
  unit: BeadModel[]
  ten: BeadModel[]
  hundred: BeadModel[]
}

type ActionsProps = {
  add: (bead: BeadModel, type: PlaceValueType) => void
  remove: (beadId: number, type: PlaceValueType) => void
}

type StoreProps = {
  beads: BeadProps
  actions: ActionsProps
}

export const useAbacusStore = create<StoreProps>((set) => ({
  beads: {
    unit: [],
    ten: [],
    hundred: [],
  },
  actions: {
    add: (bead: BeadModel, type: PlaceValueType) => {
      switch (type) {
        case PlaceValueType.unit:
          set((state) => ({
            beads: {
              ...state.beads,
              unit: [...state.beads.unit, bead],
            },
          }))
          break
        case PlaceValueType.ten:
          set((state) => ({
            beads: {
              ...state.beads,
              ten: [...state.beads.ten, bead],
            },
          }))
          break
        case PlaceValueType.hundred:
          set((state) => ({
            beads: {
              ...state.beads,
              hundred: [...state.beads.hundred, bead],
            },
          }))
          break
        // Adicione mais casos aqui conforme necessário para os outros valores de PlaceValueType
        default:
          break
      }
    },
    remove: (beadId: number, type: PlaceValueType) => {
      switch (type) {
        case PlaceValueType.unit:
          set((state) => ({
            beads: {
              ...state.beads,
              unit: state.beads.unit.filter((bead) => bead.id !== beadId),
            },
          }))
          break
        case PlaceValueType.ten:
          set((state) => ({
            beads: {
              ...state.beads,
              ten: state.beads.ten.filter((bead) => bead.id !== beadId),
            },
          }))
          break
        case PlaceValueType.hundred:
          set((state) => ({
            beads: {
              ...state.beads,
              hundred: state.beads.hundred.filter((bead) => bead.id !== beadId),
            },
          }))
          break
        // Adicione mais casos aqui conforme necessário para os outros valores de PlaceValueType
        default:
          break
      }
    },
  },
}))
