import { ReactNode } from 'react'

import { ChoosingColorUseCase } from '@/application/ChoosingColorUseCase'

import { PlaceValueType, PositionType } from '@/domain/CustomTypesModel'

const choosingColor = new ChoosingColorUseCase()

interface BoardSideRightRenderProps {
  children?: ReactNode
  type: PlaceValueType
  position?: PositionType
  onAddBead: (type: PlaceValueType) => void
}

export const BoardSideRightRender: React.FC<BoardSideRightRenderProps> = ({
  children,
  type,
  position,
  onAddBead,
}) => {
  const borderRadius = position === PositionType.center ? '8px' : '0px'

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
      onDoubleClick={() => {
        onAddBead(type)
      }}
    >
      {children}
    </div>
  )
}
