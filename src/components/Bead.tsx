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
import { useAbacusStore } from '@/stores/useBeadStore'
import { createInsideStore } from '@/stores/createInsideStore'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'
import { useAmountStore } from '../stores/useAmountStore'

import {
  dragging,
  handleCounting,
  handleDelet,
} from '@/application/DraggingUseCase'
import { PlaceValueType } from '@/domain/CustomTypesModel'

const choosingColor = new ChoosingColorUseCase()

export const Bead: React.FC<BeadModel> = ({ id, type }) => {
  const controls = useDragControls()
  const useInsideStore = createInsideStore()

  const { screen } = useScreenStore()

  const {
    actions: { add, remove, cleanBead },
  } = useAbacusStore()

  const {
    amount: { unit, ten, hundred },
    actions: { increase, decrease, cleanAmount },
  } = useAmountStore()

  const {
    isInside: { value },
    actions: { setFalse, setTrue },
  } = useInsideStore

  const handleAddBead = (type: PlaceValueType) => {
    const newBead = { id: Math.random(), type }
    add(newBead, type)
  }

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
          setTrue()
          increase(type)
        } else if (!handleCounting(info, type.toString())) {
          setFalse()
          decrease(type)
        }

        if (unit > 8) {
          cleanBead(type)
          cleanAmount(type)
          handleAddBead(PlaceValueType.ten)
          console.log(`limpa unit`)
        }

        if (ten > 8) {
          cleanBead(type)
          cleanAmount(type)
          handleAddBead(PlaceValueType.hundred)
          console.log(`limpa ten`)
        }

        if (hundred > 8) {
          cleanBead(type)
          cleanAmount(type)
          console.log(`limpa hundred`)
        }

        if (handleDelet(info)) {
          remove(id, type)
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
