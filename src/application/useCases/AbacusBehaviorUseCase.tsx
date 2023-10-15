//  S# SEVERITY
//
//  AbacusBehaviorUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
import { Dispatch, SetStateAction } from 'react'
import { AbacusBehaviorModel } from '@/domain/models/AbacusBehaviorModel'
import { PartsModel } from '@/domain/models/PartsModel'

import { PlaceValueType } from '@/domain/models/CustomTypesModel'

export class AbacusBehaviorUseCase implements AbacusBehaviorModel {
  // MARK: - Public methods
  public addingParts(
    type: PlaceValueType,
    parts: PartsModel[],
    setParts: Dispatch<SetStateAction<PartsModel[]>>,
  ): void {
    const newPart: PartsModel = {
      type,
    }
    setParts([...parts, newPart])
  }
}
