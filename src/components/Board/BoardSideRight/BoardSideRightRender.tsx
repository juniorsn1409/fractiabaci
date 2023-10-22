//  S# SEVERITY
//
//  Board/BoardSideRight/BoardSideRightRender.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
import { ReactNode } from 'react'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'

import { PlaceValueType, PositionType } from '@/domain/CustomTypesModel'

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
  const borderRadius = position === PositionType.top ? '8px' : '0px'

  return (
    <div
      id={`add`}
      style={{
        width: '100%',
        height: '33.3333%',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius:
          position === PositionType.bottom ? '8px' : '0px',
        borderBottomRightRadius:
          position === PositionType.bottom ? '8px' : '0px',
        backgroundColor: `${choosingColor.colorDecimalPlace(type)}`,
      }}
    >
      {children}
    </div>
  )
}
