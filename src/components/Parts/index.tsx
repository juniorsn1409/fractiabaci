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

import { PlaceValueType } from '@/core/domain/PlaceValueType'
import DraggingPartUseCase from '@/core/application/Parts/DraggingPartUseCase'
import ChoosingColorUseCase from '@/core/application/Parts/ChoosingColorUseCase'

interface PartsInterface {
  type: PlaceValueType
  qtdParts: number
  setQtdParts: React.Dispatch<React.SetStateAction<number>>
  limitationReference: React.RefObject<HTMLDivElement>
}

const chossingColorUseCase = new ChoosingColorUseCase()

export default function Parts({
  type,
  qtdParts,
  setQtdParts,
  limitationReference,
}: PartsInterface) {
  const draggingPartUseCase = new DraggingPartUseCase()

  const [isInside, setIsInside] = useState(false)
  const size = 75

  return (
    <motion.div
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
          type,
          qtdParts,
          isInside,
          setIsInside,
          setQtdParts,
        )
      }}
      style={{
        zIndex: `1`,
        width: `${size}px`,
        height: `${size}px`,
        position: `absolute`,
        touchAction: `none`,
        borderRadius: '50%',
        backgroundColor: `${chossingColorUseCase.colorParts(type)}`,
      }}
    />
  )
}
