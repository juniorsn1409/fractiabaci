//  S# SEVERITY
//
//  Board/BoardSideRight/BoardSideRightRender.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
import { ReactNode } from 'react'
import { motion, MotionValue } from 'framer-motion'

import { ChoosingColorUseCase } from '@/application/useCases/ChoosingColorUseCase'

import { PlaceValueType, PositionType } from '@/domain/models/CustomTypesModel'

const choosingColor = new ChoosingColorUseCase()

interface BoardSideRightRenderProps {
  children?: ReactNode
  type: PlaceValueType
  position?: PositionType
}

export const BoardSideRightRender: React.FC<BoardSideRightRenderProps> = ({
  children,
  type,
  position,
}) => {
  const borderTopLeftRadius: MotionValue =
    position === PositionType.top ? '8px' : '0px'
  const borderTopRightRadius: MotionValue =
    position === PositionType.top ? '8px' : '0px'
  const borderBottomLeftRadius: MotionValue =
    position === PositionType.bottom ? '8px' : '0px'
  const borderBottomRightRadius: MotionValue =
    position === PositionType.bottom ? '8px' : '0px'

  return (
    <motion.div
      id={`add`}
      style={{
        width: '100%',
        height: '33.3333%',
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        backgroundColor: `${choosingColor.colorDecimalPlace(type)}`,
      }}
    >
      {children}
    </motion.div>
  )
}
