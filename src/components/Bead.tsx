//  S# SEVERITY
//
//  Bead.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { motion, useDragControls } from 'framer-motion'
import { useState } from 'react'

import { BeadModel } from '@/domain/BeadModel'

import { useCanAddStore } from '@/stores/useCanAddStore'
import { useScreenStore } from '@/stores/useScreenStore'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'
import { DraggingUseCase } from '@/application/DraggingUseCase'
import { PlaceValueType } from '@/domain/CustomTypesModel'

const choosingColor = new ChoosingColorUseCase()
const draggingBead = new DraggingUseCase()

export const Bead: React.FC<BeadModel> = ({
  id,
  type,
  beads,
  setBeads,
  amount,
  setAmount,
}) => {
  console.log(`Renderizou`)
  const [isInside, setIsInside] = useState(false)

  const controls = useDragControls()
  const { screen } = useScreenStore()

  const {
    canAdd: { acceptUnit, acceptTen, acceptHundred },
  } = useCanAddStore()

  return (
    <motion.div
      id={`${id}`}
      drag
      dragControls={controls}
      dragConstraints={screen.size}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={(event) => {
        draggingBead.dragging(event, controls)
      }}
      onDragEnd={(event, info) => {
        if (type === PlaceValueType.unit) {
          console.log(`[BEAD] acceptUnit: ${acceptUnit}`)
        } else if (type === PlaceValueType.ten) {
          console.log(`[BEAD] acceptTen: ${acceptTen}`)
        } else if (type === PlaceValueType.hundred) {
          console.log(`[BEAD] acceptHundred: ${acceptHundred}`)
        }

        draggingBead.handleCounting(
          info,
          type.toString(),
          amount,
          setAmount,
          isInside,
          setIsInside,
        )
        draggingBead.handleDelet(info, id, beads, setBeads)
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
