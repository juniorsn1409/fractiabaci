//  S# SEVERITY
//
//  ChoosingColorModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/domain/CustomTypesModel'

export type ChoosingColorModel = {
  colorBead: (type: PlaceValueType) => string
  colorDecimalPlace: (type: PlaceValueType) => string
}
