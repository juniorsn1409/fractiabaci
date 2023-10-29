//  S# SEVERITY
//
//  BoardDecimalPlace.tsx
//
//  Created by Edson Júnior Ananias de Lima on 13/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { Descriptions } from '@/domain/CustomTypesModel'
import { DecimalPlaceModel } from '@/domain/DecimalPlaceModel'
import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'
import '../../styles/styles.css'

const choosingColor = new ChoosingColorUseCase()

export const BoardDecimalPlace = ({ type, amount }: DecimalPlaceModel) => {
  return (
    <div
      id={`${type.toString()}`}
      className="board-decimal-place"
      style={{
        backgroundColor: `${choosingColor.colorDecimalPlace(type)}`,
      }}
    >
      <h1>
        {amount}
      </h1>
      <span>
        {`${Descriptions[type]}`}
      </span>
    </div>
  )
}
