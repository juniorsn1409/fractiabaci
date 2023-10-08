//  S# SEVERITY
//
//  DecimalPlaceInterface.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 06/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'

interface DecimalPlaceInterface {
  type: PlaceValueType
  amount: number
  parts: string[]
}

export default DecimalPlaceInterface
