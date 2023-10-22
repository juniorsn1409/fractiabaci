//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { Main } from '@/components/Main'
import { Board } from '@/components/Board'
import { BoardSideLeft } from '@/components/Board/BoardSideLeft'
import { BoardDecimalPlace } from '@/components/Board/BoardDecimalPlace'
import { BoardSideRight } from '@/components/Board/BoardSideRight'
import { BoardSideRightRender } from '@/components/Board/BoardSideRight/BoardSideRightRender'
import { Footer } from '@/components/Footer'

import { PlaceValueType, PositionType } from '@/domain/CustomTypesModel'

export default function App() {
  return (
    <>
      <Main>
        <Board>
          <BoardSideLeft />
          <BoardDecimalPlace amount={0} type={PlaceValueType.hundred} />
          <BoardDecimalPlace amount={0} type={PlaceValueType.ten} />
          <BoardDecimalPlace amount={0} type={PlaceValueType.unit} />
          <BoardSideRight>
            <BoardSideRightRender
              type={PlaceValueType.unit}
              position={PositionType.top}
            ></BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.ten}
              position={PositionType.middle}
            ></BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.hundred}
              position={PositionType.bottom}
            ></BoardSideRightRender>
          </BoardSideRight>
        </Board>
      </Main>
      <Footer></Footer>
    </>
  )
}
