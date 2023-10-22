//  S# SEVERITY
//
//  AmountUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 22/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/domain/CustomTypesModel'
import { useAmountStore } from '@/stores/useAmountStore'

export function AmountUseCase(type: PlaceValueType) {
  const useAmount = useAmountStore()
  let amount

  switch (type) {
    case PlaceValueType.unit:
      amount = useAmount.amount.unit
      break
    case PlaceValueType.ten:
      amount = useAmount.amount.ten
      break
    case PlaceValueType.hundred:
      amount = useAmount.amount.hundred
      break
    default:
      amount = 0
      break
  }

  return amount
}
