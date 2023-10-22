//  S# SEVERITY
//
//  Board/BoardSideRight/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { Bead } from '@/components/Bead'
import { PlaceValueType, PositionType } from '@/domain/CustomTypesModel'
import { useAbacusStore } from '@/stores/useBeadStore'
import { BoardSideRightRender } from './BoardSideRightRender'

export const BoardSideRight = () => {
  const {
    beads: { unit, ten, hundred },
  } = useAbacusStore()

  return (
    <div
      id={`add`}
      style={{
        width: '8%',
        height: '95%',
        margin: '1%',
        display: 'flex',
        borderRadius: '8px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      <BoardSideRightRender
        type={PlaceValueType.unit}
        position={PositionType.top}
      >
        {unit.map((bead) => (
          <Bead key={bead.id} id={bead.id} type={bead.type} />
        ))}
      </BoardSideRightRender>
      <BoardSideRightRender
        type={PlaceValueType.ten}
        position={PositionType.middle}
      >
        {ten.map((bead) => (
          <Bead key={bead.id} id={bead.id} type={bead.type} />
        ))}
      </BoardSideRightRender>
      <BoardSideRightRender
        type={PlaceValueType.hundred}
        position={PositionType.bottom}
      >
        {hundred.map((bead) => (
          <Bead key={bead.id} id={bead.id} type={bead.type} />
        ))}
      </BoardSideRightRender>
    </div>
  )
}
