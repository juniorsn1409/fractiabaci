//  S# SEVERITY
//
//  DecimalPlaceModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 06/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { PlaceValueType } from '@/domain/models/CustomTypesModel'

export interface DecimalPlaceModel {
  type: PlaceValueType
  amount: number
}
