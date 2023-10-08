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

import Parts from '@/components/Parts'
import DecimalPlace from '@/components/DecimalPlace'

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'
import AbacusManager from '@/core/domain/models/AbacusManager'

const abacusManager = new AbacusManager()

export default function Main() {
  const limitationReference = useRef(null)

  const [amountHundred, setAmountHundred] = useState(0)
  const [partsHundred, setPartsHundred] = useState<string[]>([])
  const addingHundred = () => {
    abacusManager.abacusBehaviorUseCase.addingParts(
      partsHundred,
      setPartsHundred,
    )
  }

  const [amountTen, setAmountTen] = useState(0)
  const [partsTen, setPartsTen] = useState<string[]>([])
  const addingTen = () => {
    abacusManager.abacusBehaviorUseCase.addingParts(partsTen, setPartsTen)
  }

  const [amountUnit, setAmountUnit] = useState(0)
  const [partsUnit, setPartsUnit] = useState<string[]>([])
  const addingUnit = () => {
    abacusManager.abacusBehaviorUseCase.addingParts(partsUnit, setPartsUnit)
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
                type={PlaceValueType.unit}
                amount={amountUnit}
                setAmount={setAmountUnit}
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
                type={PlaceValueType.ten}
                amount={amountTen}
                setAmount={setAmountTen}
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
                type={PlaceValueType.hundred}
                amount={amountHundred}
                setAmount={setAmountHundred}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <button onClick={addingHundred}>Adicionar Centena</button>
      <button onClick={addingTen}>Adicionar Peça Dezeba</button>
      <button onClick={addingUnit}>Adicionar Peça Unidade</button>
    </>
  )
}
