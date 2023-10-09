//  S# SEVERITY
//
//  AbacusBehaviorUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
import { Dispatch, SetStateAction } from 'react'
import AbacusBehaviorInterface from '@/core/domain/interfaces/AbacusBehaviorInterface'
import PartsInterface from '@/core/domain/interfaces/PartsInterface'

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'

class AbacusBehaviorUseCase implements AbacusBehaviorInterface {
  // MARK: - Public methods
  public addingParts(
    index: number,
    type: PlaceValueType,
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    parts: PartsInterface[],
    setParts: Dispatch<SetStateAction<PartsInterface[]>>,
    limitationReference: React.RefObject<HTMLDivElement>,
  ): void {
    const newPart: PartsInterface = {
      index,
      type,
      amount,
      setAmount,
      parts,
      setParts,
      limitationReference,
    }

    setParts([...parts, newPart])
  }
}

export default AbacusBehaviorUseCase
