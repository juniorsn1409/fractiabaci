//  S# SEVERITY
//
//  AbacusBehaviorModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { Dispatch, SetStateAction } from 'react'

import { PlaceValueType } from '@/domain/models/CustomTypesModel'
import { PartsModel } from '@/domain/models/PartsModel'

export interface AbacusBehaviorModel {
  addingParts(
    type: PlaceValueType,
    parts: PartsModel[],
    setParts: Dispatch<SetStateAction<PartsModel[]>>,
  ): void
}
