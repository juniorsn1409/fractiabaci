//  S# SEVERITY
//
//  AbacusBehaviorInterface.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { Dispatch, SetStateAction } from 'react'

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'
import PartsInterface from './PartsInterface'

interface AbacusBehaviorInterface {
  addingParts(
    index: number,
    type: PlaceValueType,
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    parts: PartsInterface[],
    setParts: Dispatch<SetStateAction<PartsInterface[]>>,
    limitationReference: React.RefObject<HTMLDivElement>,
  ): void
}

export default AbacusBehaviorInterface
