//  S# SEVERITY
//
//  PartsInterface.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 08/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'

interface PartsInterface {
  type: PlaceValueType
  amount: number
  setAmount: React.Dispatch<React.SetStateAction<number>>
  limitationReference: React.RefObject<HTMLDivElement>
}

export default PartsInterface
