//  S# SEVERITY
//
//  places.ts
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { Descriptions, PlaceValueType } from '@/domain/CustomTypesModel'
import { AbacusPlace } from '@/domain/AbacusModel'

export type PlaceTone = 'hundred' | 'ten' | 'unit'

export interface PlaceMeta {
  /** Classe de cor usada nos CSS Modules. */
  tone: PlaceTone
  /** "Centena", "Dezena", "Unidade". */
  name: string
  /** Letra exibida sob o dígito-alvo (C / D / U). */
  letter: string
  /** "centena", "dezena", "unidade". */
  singular: string
  /** "Centenas", "Dezenas", "Unidades" (título da coluna). */
  title: string
}

const build = (place: AbacusPlace, tone: PlaceTone): PlaceMeta => {
  const name = Descriptions[place]
  return {
    tone,
    name,
    letter: name.charAt(0).toUpperCase(),
    singular: name.toLowerCase(),
    title: `${name}s`,
  }
}

export const PLACE_META: Record<AbacusPlace, PlaceMeta> = {
  [PlaceValueType.hundred]: build(PlaceValueType.hundred, 'hundred'),
  [PlaceValueType.ten]: build(PlaceValueType.ten, 'ten'),
  [PlaceValueType.unit]: build(PlaceValueType.unit, 'unit'),
}
