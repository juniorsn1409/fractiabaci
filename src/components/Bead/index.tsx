//  S# SEVERITY
//
//  Bead.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useState } from 'react'

import { motion, useDragControls } from 'framer-motion'

import { useScreenStore } from '@/stores/useScreenStore'

import { PlaceValueType } from '@/domain/CustomTypesModel'
import { BeadModel } from '@/domain/BeadModel'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'
import { DraggingUseCase } from '@/application/DraggingUseCase'

import styles from './index.module.css'

const choosingColor = new ChoosingColorUseCase()
const draggingBead = new DraggingUseCase()

export const Bead: React.FC<BeadModel> = ({
  id,
  type,
  beads,
  setBeads,
  amountUnit,
  setAmountUnit,
  amountTen,
  setAmountTen,
  amountHundred,
  setAmountHundred,
}) => {
  console.log(`Renderizou`)
  const [inside, setInside] = useState(false)

  const controls = useDragControls()
  const { screen } = useScreenStore()

  return (
    <motion.div
      id={`${id}`}
      className={`${styles.bead}`}
      drag
      dragControls={controls}
      dragConstraints={screen.size}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={(event) => {
        draggingBead.dragging(event, controls)
      }}
      onDragEnd={(event, info) => {
        const detecting = draggingBead.detecting(info, type.toString())

        switch (type) {
          case PlaceValueType.unit:
            if (detecting && !inside) {
              if (amountUnit !== 9 || amountTen !== 9 || amountHundred !== 9) {
                setInside(true)
                draggingBead.increase(amountUnit, setAmountUnit)
              }
            } else if (!detecting && inside) {
              setInside(false)
              draggingBead.decrease(amountUnit, setAmountUnit)
            }
            break
          case PlaceValueType.ten:
            if (detecting && !inside) {
              if (amountTen !== 9 || amountHundred !== 9) {
                setInside(true)
                draggingBead.increase(amountTen, setAmountTen)
              }
            } else if (!detecting && inside) {
              setInside(false)
              draggingBead.decrease(amountTen, setAmountTen)
            }
            break
          case PlaceValueType.hundred:
            if (detecting && !inside) {
              if (amountHundred !== 9) {
                setInside(true)
                draggingBead.increase(amountHundred, setAmountHundred)
              }
            } else if (!detecting && inside) {
              setInside(false)
              draggingBead.decrease(amountHundred, setAmountHundred)
            }
            break
        }

        draggingBead.handleDelet(info, id, beads, setBeads)
      }}
      style={{
        zIndex: 1,
        width: '4%',
        paddingTop: '4%',
        maxWidth: '4%',
        minWidth: '2%',
        position: 'absolute',
        touchAction: 'none',
        borderRadius: '50%',
        backgroundColor: `${choosingColor.colorBead(type)}`,
      }}
    />
  )
}
