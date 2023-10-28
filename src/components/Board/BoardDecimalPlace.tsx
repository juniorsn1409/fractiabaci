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

const choosingColor = new ChoosingColorUseCase()

export const BoardDecimalPlace = ({ type, amount }: DecimalPlaceModel) => {
  return (
    <div
      id={`${type}`}
      style={{
        height: '95%',
        width: '27.333%',
        margin: '1%',
        display: 'flex',
        borderRadius: '8px',
        backgroundColor: `${choosingColor.colorDecimalPlace(type)}`,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      <h1
        style={{
          fontSize: `200px`,
          marginBottom: `16px`,
          transition: `1.5s ease-in-out`,
        }}
      >
        {amount}
      </h1>
      <span
        style={{
          fontSize: `50px`,
          transition: `1.5s ease-in-out`,
        }}
      >
        {`${Descriptions[type]}`}
      </span>
    </div>
  )
}
