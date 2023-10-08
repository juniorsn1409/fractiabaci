//  S# SEVERITY
//
//  Parts/index.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import React, { useState } from 'react'
import { motion } from 'framer-motion'

import PartsInterface from '@/core/domain/interfaces/PartsInterface'

import DraggingPartUseCase from '@/core/application/Parts/DraggingPartUseCase'
import ChoosingColorUseCase from '@/core/application/Parts/ChoosingColorUseCase'

const chossingColorUseCase = new ChoosingColorUseCase()

export default function Parts({
  type,
  amount,
  setAmount,
  limitationReference,
}: PartsInterface) {
  const draggingPartUseCase = new DraggingPartUseCase()

  const [detecting, setDetecting] = useState(false)

  const aspectRatio = 1

  return (
    <motion.div
      id={`${type}`}
      drag
      dragConstraints={limitationReference}
      dragControls={draggingPartUseCase.controls}
      dragElastic={0.0}
      dragListener={true}
      onPointerDown={(event) => {
        draggingPartUseCase.dragging(event)
      }}
      onDragEnd={(event, info) => {
        draggingPartUseCase.handleDragginEnd(
          info,
          type.toString(),
          amount,
          setAmount,
          detecting,
          setDetecting,
        )
      }}
      style={{
        zIndex: `1`,
        width: '4%',
        paddingTop: `${4 / aspectRatio}%`,
        maxWidth: `6%`,
        minWidth: `4%`,
        position: `absolute`,
        touchAction: `none`,
        borderRadius: '50%',
        backgroundColor: `${chossingColorUseCase.colorParts(type)}`,
      }}
    />
  )
}
