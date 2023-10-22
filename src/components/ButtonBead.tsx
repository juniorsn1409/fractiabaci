//  S# SEVERITY
//
//  ButtonBead.tsx
//
//  Created by Edson Júnior Ananias de Lima on 22/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { Descriptions, PlaceValueType } from '@/domain/CustomTypesModel'
import { useAbacusStore } from '@/stores/useBeadStore'

export const ButtonBead = ({ type }: { type: PlaceValueType }) => {
  const { actions } = useAbacusStore()

  const handleAddBead = () => {
    const newBead = { id: Math.random(), type }
    actions.add(newBead, type)
  }

  return <button onClick={handleAddBead}>Add {Descriptions[type]} Bead</button>
}
