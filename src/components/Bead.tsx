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

import { BeadModel } from '@/domain/BeadModel'

import { useScreenStore } from '@/stores/useScreenStore'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'
import { DraggingUseCase } from '@/application/DraggingUseCase'

import '../styles/styles.css';

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
  const controls = useDragControls()
  const { screen } = useScreenStore()

  const [isInside, setIsInside] = useState(false)

  console.log(`Bead ${id}`)
  return (
    <motion.div
      id={`${id}`}
      className="bead-container"
      drag
      dragControls={controls}
      dragConstraints={screen.size}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={(event) => {
        draggingBead.dragging(event, controls)
      }}
      onDragEnd={(event, info) => {
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
