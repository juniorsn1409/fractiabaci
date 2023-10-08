//  S# SEVERITY
//
//  DecimalPlace/index.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { motion } from 'framer-motion'

import {
  PlaceValueType,
  Descriptions,
} from '@/core/domain/models/PlaceValueType'

import ChoosingColorUseCase from '@/core/application/Parts/ChoosingColorUseCase'

interface DecimalPlaceInterface {
  type: PlaceValueType
  amount: number
}

const choosingColorUseCase = new ChoosingColorUseCase()

export default function DecimalPlace({ type, amount }: DecimalPlaceInterface) {
  return (
    <motion.div
      id={`${type}`}
      style={{
        width: '31.6666%',
        height: '95%',
        margin: '1%',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        backgroundColor: `${choosingColorUseCase.colorDecimalPlace(type)}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.h1
        style={{
          fontSize: `200px`,
          marginBottom: `16px`,
          transition: `1.5s ease-in-out`,
        }}
      >
        {amount}
      </motion.h1>
      <motion.span
        style={{
          fontSize: `50px`,
          transition: `1.5s ease-in-out`,
        }}
      >
        {`${Descriptions[type]}`}
      </motion.span>
    </motion.div>
  )
}
