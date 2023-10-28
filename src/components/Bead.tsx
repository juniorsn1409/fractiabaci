//  S# SEVERITY
//
//  Bead.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { motion, useDragControls } from 'framer-motion'

import { BeadModel } from '@/domain/BeadModel'

import { useScreenStore } from '@/stores/useScreenStore'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'

import {
  dragging,
  handleCounting,
  handleDelet,
} from '@/application/DraggingUseCase'
import { PlaceValueType } from '@/domain/CustomTypesModel'

const choosingColor = new ChoosingColorUseCase()

export const Bead: React.FC<BeadModel> = ({ id, type }) => {
  const controls = useDragControls()
  const { screen } = useScreenStore()

  return (
    <motion.div
      id={`${id}`}
      drag
      dragControls={controls}
      dragConstraints={screen.size}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={(event) => {
        dragging(event, controls)
      }}
      onDragEnd={(event, info) => {
        if (handleCounting(info, type.toString())) {
          console.log(`[BAED] `)
        } else if (!handleCounting(info, type.toString())) {
          console.log(`[BAED] `)
        }
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
        backgroundColor: `${choosingColor.colorBead(type)}`,
      }}
    />
  )
}
