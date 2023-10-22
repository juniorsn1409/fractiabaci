//  S# SEVERITY
//
//  ButtonAmount.tsx
//
//  Created by Edson Júnior Ananias de Lima on 22/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { Descriptions, PlaceValueType } from '@/domain/CustomTypesModel'
import { useAmountStore } from '@/stores/useAmountStore'

export const ButtonAmount = (props: { type: PlaceValueType }) => {
  const { actions } = useAmountStore()
  return (
    <button onClick={() => actions.increase(props.type)}>
      Amount {Descriptions[props.type]}
    </button>
  )
}
