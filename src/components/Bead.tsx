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

import { DraggingUseCase } from '@/application/DraggingUseCase'
import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'

const chossingColor = new ChoosingColorUseCase()
const draggingBead = new DraggingUseCase()

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
        draggingBead.dragging(event, controls)
      }}
      onDragEnd={() => {
        console.log()
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
        backgroundColor: `${chossingColor.colorBead(type)}`,
      }}
    />
  )
}
