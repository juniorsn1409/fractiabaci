// S# SEVERITY
//
// Main/index.tsx
// Presentation
//
// Created by Edson Júnior Ananias de Lima on 01/10/23.
// Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import PartsInterface from '@/core/domain/interfaces/PartsInterface'
import { PlaceValueType } from '@/core/domain/models/PlaceValueType'

import AbacusManager from '@/core/domain/models/AbacusManager'
import DraggingPartUseCase from '@/core/application/Parts/DraggingPartUseCase'

import Parts from '@/components/Parts'
import DecimalPlace from '@/components/DecimalPlace'

const abacusManager = new AbacusManager()

export default function Main() {
  const limitationReference = useRef(null)

  const [amountHundred, setAmountHundred] = useState(0)
  const [amountTen, setAmountTen] = useState(0)
  const [amountUnit, setAmountUnit] = useState(0)

  const [partsHundred, setPartsHundred] = useState<PartsInterface[]>([])
  const [partsTen, setPartsTen] = useState<PartsInterface[]>([])
  const [partsUnit, setPartsUnit] = useState<PartsInterface[]>([])

  const addPart = (
    type: PlaceValueType,
    amountState: number,
    setAmountState: React.Dispatch<React.SetStateAction<number>>,
    partsState: PartsInterface[],
    setPartsState: React.Dispatch<React.SetStateAction<PartsInterface[]>>,
  ) => {
    const index = partsState.length
    abacusManager.abacusBehaviorUseCase.addingParts(
      index,
      type,
      amountState,
      setAmountState,
      partsState,
      setPartsState,
      limitationReference,
    )
  }

  return (
    <>
      <motion.div
        ref={limitationReference}
        style={{
          width: '100%',
          height: '600px',
          display: 'flex',
          overflow: 'hidden',
          borderRadius: '5px',
          marginBottom: '10px',
          backgroundColor: 'var(--braco-isabeline)',
        }}
      >
        <motion.div
          id="delet"
          style={{
            width: '5%',
            height: '95%',
            margin: '1%',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
            backgroundColor: '#262626',
          }}
        ></motion.div>

        <DecimalPlace type={PlaceValueType.hundred} amount={amountHundred} />
        <DecimalPlace type={PlaceValueType.ten} amount={amountTen} />
        <DecimalPlace type={PlaceValueType.unit} amount={amountUnit} />

        <motion.div
          style={{
            width: '5%',
            height: '95%',
            margin: '1%',
            display: 'flex',
            borderRadius: '8px',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
            backgroundColor: 'var(--braco-isabeline)',
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '33.3333%',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              backgroundColor: `${abacusManager.choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.unit,
              )}`,
            }}
          >
            {partsUnit.map((part, index) => (
              <Parts
                key={`${part}-${index}`}
                index={index}
                type={PlaceValueType.unit}
                amount={amountUnit}
                setAmount={setAmountUnit}
                parts={partsHundred}
                setParts={setPartsHundred}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>

          <motion.div
            style={{
              width: '100%',
              height: '33.3333%',
              backgroundColor: `${abacusManager.choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.ten,
              )}`,
            }}
          >
            {partsTen.map((part, index) => (
              <Parts
                key={`${part}-${index}`}
                index={index}
                type={PlaceValueType.ten}
                amount={amountTen}
                setAmount={setAmountTen}
                parts={partsTen}
                setParts={setPartsTen}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>
          <motion.div
            style={{
              width: '100%',
              height: '33.3333%',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              backgroundColor: `${abacusManager.choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.hundred,
              )}`,
            }}
          >
            {partsHundred.map((part, index) => (
              <Parts
                key={`${part}-${index}`}
                index={index}
                type={PlaceValueType.hundred}
                amount={amountHundred}
                setAmount={setAmountHundred}
                parts={partsUnit}
                setParts={setPartsUnit}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <button
        onClick={() =>
          addPart(
            PlaceValueType.hundred,
            amountHundred,
            setAmountHundred,
            partsHundred,
            setPartsHundred,
          )
        }
      >
        Adicionar Centena
      </button>
      <button
        onClick={() =>
          addPart(
            PlaceValueType.ten,
            amountTen,
            setAmountTen,
            partsTen,
            setPartsTen,
          )
        }
      >
        Adicionar Peça Dezena
      </button>
      <button
        onClick={() =>
          addPart(
            PlaceValueType.unit,
            amountUnit,
            setAmountUnit,
            partsUnit,
            setPartsUnit,
          )
        }
      >
        Adicionar Peça Unidade
      </button>
    </>
  )
}
