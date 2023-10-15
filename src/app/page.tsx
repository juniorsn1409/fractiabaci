//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
'use client'

import { useState } from 'react'

import { Main } from '@/components/Main'
import { Board } from '@/components/Board/index'
import { BoardDecimalPlace } from '@/components/Board/BoardDecimalPlace'
import { BoardSideLeft } from '@/components/Board/BoardSideLeft'
import { BoardSideRight } from '@/components/Board/BoardSideRight'
import { BoardSideRightRender } from '@/components/Board/BoardSideRight/BoardSideRightRender'
import { Part } from '@/components/Parts'
import { Footer } from '@/components/Footer'

import { AbacusBehaviorUseCase } from '@/application/useCases/AbacusBehaviorUseCase'

import { PlaceValueType, PositionType } from '@/domain/models/CustomTypesModel'
import { PartsModel } from '@/domain/models/PartsModel'
import { motion } from 'framer-motion'

const abacusBehavior = new AbacusBehaviorUseCase()

export default function App() {
  const [amountHundred, setAmountHundred] = useState<number>(0)
  const [partHundred, setPartHundred] = useState<PartsModel[]>([])

  const [amountTen, setAmountTen] = useState<number>(0)
  const [partTen, setPartTen] = useState<PartsModel[]>([])

  const [amountUnit, setAmountUnit] = useState<number>(0)
  const [partUnit, setPartUnit] = useState<PartsModel[]>([])

  return (
    <>
      <Main>
        <Board>
          <BoardSideLeft />
          <BoardDecimalPlace
            amount={amountHundred}
            type={PlaceValueType.hundred}
          />
          <BoardDecimalPlace amount={amountTen} type={PlaceValueType.ten} />
          <BoardDecimalPlace amount={amountUnit} type={PlaceValueType.unit} />
          <BoardSideRight>
            <BoardSideRightRender
              type={PlaceValueType.unit}
              position={PositionType.top}
            >
              {partUnit.map((partUnit, index) => (
                <Part
                  key={`${partUnit}-${index}`}
                  type={PlaceValueType.unit}
                  amount={amountUnit}
                  setAmount={setAmountUnit}
                />
              ))}
            </BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.ten}
              position={PositionType.middle}
            >
              {partTen.map((partTen, index) => (
                <Part
                  key={`${partTen}-${index}`}
                  type={PlaceValueType.ten}
                  amount={amountTen}
                  setAmount={setAmountTen}
                />
              ))}
            </BoardSideRightRender>
            <BoardSideRightRender
              type={PlaceValueType.hundred}
              position={PositionType.bottom}
            >
              {partHundred.map((partHundred, index) => (
                <Part
                  key={`${partHundred}-${index}`}
                  type={PlaceValueType.hundred}
                  amount={amountHundred}
                  setAmount={setAmountHundred}
                />
              ))}
            </BoardSideRightRender>
          </BoardSideRight>
        </Board>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() =>
              abacusBehavior.addingParts(
                PlaceValueType.hundred,
                partHundred,
                setPartHundred,
              )
            }
          >
            hundred
          </button>
          <button
            onClick={() =>
              abacusBehavior.addingParts(
                PlaceValueType.ten,
                partTen,
                setPartTen,
              )
            }
          >
            ten
          </button>
          <button
            onClick={() =>
              abacusBehavior.addingParts(
                PlaceValueType.unit,
                partUnit,
                setPartUnit,
              )
            }
          >
            unit
          </button>
        </motion.div>
      </Main>
      <Footer />
    </>
  )
}
