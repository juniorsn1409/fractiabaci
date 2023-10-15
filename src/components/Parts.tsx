//  S# SEVERITY
//
//  Parts.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import React, { useState, useContext, Dispatch, SetStateAction } from 'react'
import { motion, useDragControls } from 'framer-motion'

import { PartsModel } from '@/domain/models/PartsModel'

import { screenSizeContext } from '@/components/Background'

import { DraggingPartUseCase } from '@/application/useCases/DraggingPartUseCase'
import { ChoosingColorUseCase } from '@/application/useCases/ChoosingColorUseCase'

const draggingPartsUseCase = new DraggingPartUseCase()
const choosingColor = new ChoosingColorUseCase()

interface partsProps extends PartsModel {
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}

export function Part({ type, amount, setAmount }: partsProps) {
  const [detecting, setDetecting] = useState(false)
  const screenSize = useContext(screenSizeContext)
  const controls = useDragControls()

  return (
    <motion.div
      id={`${type}`}
      drag
      dragControls={controls}
      dragConstraints={screenSize}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={(event) => {
        draggingPartsUseCase.dragging(event, controls)
      }}
      onDragEnd={(event, info) => {
        draggingPartsUseCase.handleDragginEnd(
          info,
          type.toString(),
          amount,
          setAmount,
          detecting,
          setDetecting,
        )
        draggingPartsUseCase.handleDelet(info)
      }}
      style={{
        zIndex: 1,
        width: '7%',
        paddingTop: '7%',
        maxWidth: '7%',
        minWidth: '4%',
        position: 'absolute',
        touchAction: 'none',
        borderRadius: '50%',
        backgroundColor: `${choosingColor.colorParts(type)}`,
      }}
    />
  )
}
