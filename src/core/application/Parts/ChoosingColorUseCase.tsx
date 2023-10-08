//  S# SEVERITY
//
//  ChoosingColorUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/core/domain/models/PlaceValueType'
import ChoosingColorUseCaseInterface from '@/core/domain/interfaces/ChoosingColorUseCaseInterface'

class ChoosingColorUseCase implements ChoosingColorUseCaseInterface {
  public colorParts(type: PlaceValueType): string {
    switch (type) {
      case PlaceValueType.unit:
        return 'var(--vermelho-urucum)'
      case PlaceValueType.ten:
        return 'var(--azul-atlatico)'
      case PlaceValueType.hundred:
        return 'var(--amarelo-sol)'
      default:
        return 'var(--cinza-harpia)'
    }
  }

  public colorDecimalPlace(type: PlaceValueType): string {
    switch (type) {
      case PlaceValueType.unit:
        return 'var(--vermelho-ucari)'
      case PlaceValueType.ten:
        return 'var(--azul-ararinha)'
      case PlaceValueType.hundred:
        return 'var(--amarelo-ipe)'
      default:
        return 'var(--braco-isabeline)'
    }
  }
}

export default ChoosingColorUseCase
