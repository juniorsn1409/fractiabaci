//  S# SEVERITY
//
//  BeadModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 08/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
import { PlaceValueType } from '@/domain/CustomTypesModel'
import { Dispatch, SetStateAction } from 'react'

export type BeadModel = {
  id: string
  type: PlaceValueType
  beads: BeadModel[]
  setBeads: Dispatch<SetStateAction<BeadModel[]>>
  amountUnit: number
  setAmountUnit: Dispatch<SetStateAction<number>>
  amountTen: number
  setAmountTen: Dispatch<SetStateAction<number>>
  amountHundred: number
  setAmountHundred: Dispatch<SetStateAction<number>>
}
