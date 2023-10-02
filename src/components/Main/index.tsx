//  S# SEVERITY
//
//  Main/index.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import Parts from '@/components/Parts'
import DecimalPlace from '@/components/DecimalPlace'

import { PlaceValueType } from '@/core/domain/PlaceValueType'
import AbacusBehaviorUseCase from '@/core/application/Abacus/AbacusBehaviorUseCase'
import ChoosingColorUseCase from '@/core/application/Parts/ChoosingColorUseCase'

const abacusBehaviorUseCase = new AbacusBehaviorUseCase()
const choosingColorUseCase = new ChoosingColorUseCase()

export default function Main() {
  const limitationReference = useRef(null)

  const [qtdHundred, setQtdHundred] = useState(0)
  const [partsHundred, setPartsHundred] = useState<string[]>([])

  const [qtdTen, setQtdTen] = useState(0)
  const [partsTen, setPartsTen] = useState<string[]>([])

  const [qtdUnit, setQtdUnit] = useState(0)
  const [partsUnit, setPartsUnit] = useState<string[]>([])

  const addingPartsHundred = () => {
    abacusBehaviorUseCase.addingParts(partsHundred, setPartsHundred)
  }

  const addingPartsTen = () => {
    abacusBehaviorUseCase.addingParts(partsTen, setPartsTen)
  }

  const addingPartsUnit = () => {
    abacusBehaviorUseCase.addingParts(partsUnit, setPartsUnit)
  }

  return (
    <>
      <motion.div
        ref={limitationReference}
        style={{
          width: `100%`,
          height: `550px`,
          display: `flex`,
          overflow: `hidden`,
          borderRadius: `5px`,
          marginBottom: `10px`,
          backgroundColor: `var(--braco-isabeline)`,
        }}
      >
        <DecimalPlace type={PlaceValueType.hundred} parts={qtdHundred} />
        <DecimalPlace type={PlaceValueType.ten} parts={qtdTen} />
        <DecimalPlace type={PlaceValueType.unit} parts={qtdUnit} />

        <motion.div
          style={{
            width: `5%`,
            height: `95%`,
            margin: `1%`,
            display: `flex`,
            borderRadius: `8px`,
            alignItems: `center`,
            flexDirection: `column`,
            justifyContent: `center`,
            transition: `background-color 0.3s`,
            backgroundColor: `var(--braco-isabeline)`,
          }}
        >
          <motion.div
            style={{
              width: `100%`,
              height: `33.3%`,
              borderTopLeftRadius: `8px`,
              borderTopRightRadius: `8px`,
              backgroundColor: `${choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.unit,
              )}`,
            }}
          >
            {partsUnit.map((PartsId) => (
              <Parts
                key={PartsId}
                type={PlaceValueType.unit}
                qtdParts={qtdUnit}
                setQtdParts={setQtdUnit}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>

          <motion.div
            style={{
              width: `100%`,
              height: `33.3%`,
              backgroundColor: `${choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.ten,
              )}`,
            }}
          >
            {partsTen.map((PartsId) => (
              <Parts
                key={PartsId}
                type={PlaceValueType.ten}
                qtdParts={qtdTen}
                setQtdParts={setQtdTen}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>

          <motion.div
            style={{
              width: `100%`,
              height: `33.3%`,
              borderBottomLeftRadius: `8px`,
              borderBottomRightRadius: `8px`,
              backgroundColor: `${choosingColorUseCase.colorDecimalPlace(
                PlaceValueType.hundred,
              )}`,
            }}
          >
            {partsHundred.map((PartsId) => (
              <Parts
                key={PartsId}
                type={PlaceValueType.hundred}
                qtdParts={qtdHundred}
                setQtdParts={setQtdHundred}
                limitationReference={limitationReference}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <button onClick={addingPartsHundred}>Adicionar Peça Cenena</button>
      <button onClick={addingPartsTen}>Adicionar Peça Dezena</button>
      <button onClick={addingPartsUnit}>Adicionar Peça Unidade</button>
    </>
  )
}
