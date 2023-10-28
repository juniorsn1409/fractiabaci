//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { BeadModel } from '@/domain/BeadModel'
import { PlaceValueType, PositionType } from '@/domain/CustomTypesModel'

import { Board } from '@/components/Board'
import { BoardDecimalPlace } from '@/components/Board/BoardDecimalPlace'
import { BoardSideLeft } from '@/components/Board/BoardSideLeft'
import { BoardSideRight } from '@/components/Board/BoardSideRight'
import { BoardSideRightRender } from '@/components/Board/BoardSideRight/BoardSideRightRender'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'
import { Bead } from '@/components/Bead'

export default function App() {
  const [amountHundred, setAmountHundred] = useState<number>(0)
  const [hundred, setHundred] = useState<BeadModel[]>([])

  const [amountTen, setAmountTen] = useState<number>(0)
  const [ten, setTen] = useState<BeadModel[]>([])

  const [amountUnit, setAmountUnit] = useState<number>(0)
  const [unit, setUnit] = useState<BeadModel[]>([])

  const onAddBead = (
    type: PlaceValueType,
    beads: BeadModel[],
    setBeads: Dispatch<SetStateAction<BeadModel[]>>,
    amount: number,
    setAmount: Dispatch<SetStateAction<number>>,
  ) => {
    const newBead = {
      id: uuidv4(),
      type,
      beads,
      setBeads,
      amount,
      setAmount,
    }

    if (type === PlaceValueType.unit) {
      setUnit((prevUnit) => [...prevUnit, newBead])
    } else if (type === PlaceValueType.ten) {
      setTen((prevTen) => [...prevTen, newBead])
    } else if (type === PlaceValueType.hundred) {
      setHundred((prevHundred) => [...prevHundred, newBead])
    }
  }

  return (
    <>
      <Main>
        <Board>
          <BoardSideLeft />
          <BoardDecimalPlace
            type={PlaceValueType.hundred}
            amount={amountHundred}
          />
          <BoardDecimalPlace type={PlaceValueType.ten} amount={amountTen} />
          <BoardDecimalPlace type={PlaceValueType.unit} amount={amountUnit} />
          <BoardSideRight>
            <BoardSideRightRender
              type={PlaceValueType.unit}
              position={PositionType.top}
              onAddBead={() =>
                onAddBead(
                  PlaceValueType.unit,
                  unit,
                  setUnit,
                  amountUnit,
                  setAmountUnit,
                )
              }
            >
              {unit.map((bead) => (
                <Bead
                  key={bead.id}
                  id={bead.id}
                  type={bead.type}
                  beads={unit}
                  setBeads={setUnit}
                  amount={amountUnit}
                  setAmount={setAmountUnit}
                />
              ))}
            </BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.ten}
              position={PositionType.middle}
              onAddBead={() =>
                onAddBead(
                  PlaceValueType.ten,
                  ten,
                  setTen,
                  amountTen,
                  setAmountTen,
                )
              }
            >
              {ten.map((bead) => (
                <Bead
                  key={bead.id}
                  id={bead.id}
                  type={bead.type}
                  beads={ten}
                  setBeads={setTen}
                  amount={amountTen}
                  setAmount={setAmountTen}
                />
              ))}
            </BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.hundred}
              position={PositionType.bottom}
              onAddBead={() =>
                onAddBead(
                  PlaceValueType.hundred,
                  hundred,
                  setHundred,
                  amountHundred,
                  setAmountHundred,
                )
              }
            >
              {hundred.map((bead) => (
                <Bead
                  key={bead.id}
                  id={bead.id}
                  type={bead.type}
                  beads={hundred}
                  setBeads={setHundred}
                  amount={amountHundred}
                  setAmount={setAmountHundred}
                />
              ))}
            </BoardSideRightRender>
          </BoardSideRight>
        </Board>
      </Main>
      <Footer></Footer>
    </>
  )
}
