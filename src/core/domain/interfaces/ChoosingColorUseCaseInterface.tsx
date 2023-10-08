//  S# SEVERITY
//
//  ChoosingColorUseCaseInterface.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'

interface ChoosingColorUseCaseInterface {
  colorParts: (type: PlaceValueType) => string
  colorDecimalPlace: (type: PlaceValueType) => string
}

export default ChoosingColorUseCaseInterface
