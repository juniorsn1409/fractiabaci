//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { Board } from '@/components/Board'
import { BoardDecimalPlace } from '@/components/Board/BoardDecimalPlace'
import { BoardSideLeft } from '@/components/Board/BoardSideLeft'
import { BoardSideRight } from '@/components/Board/BoardSideRight'
import { ButtonBead } from '@/components/ButtonBead'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

import { PlaceValueType } from '@/domain/CustomTypesModel'

export default function App() {
  return (
    <>
      <Main>
        <Board>
          <BoardSideLeft />
          <BoardDecimalPlace type={PlaceValueType.hundred} />
          <BoardDecimalPlace type={PlaceValueType.ten} />
          <BoardDecimalPlace type={PlaceValueType.unit} />
          <BoardSideRight />
        </Board>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <ButtonBead type={PlaceValueType.hundred} />
          <ButtonBead type={PlaceValueType.ten} />
          <ButtonBead type={PlaceValueType.unit} />
        </div>
      </Main>
      <Footer></Footer>
    </>
  )
}
