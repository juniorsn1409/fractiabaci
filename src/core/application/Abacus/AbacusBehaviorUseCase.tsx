//  S# SEVERITY
//
//  AbacusBehaviorUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { Dispatch, SetStateAction } from 'react'
import AbacusBehaviorInterface from '@/core/domain/interfaces/AbacusBehaviorInterface'

class AbacusBehaviorUseCase implements AbacusBehaviorInterface {
  // MARK: - Public methods
  public addingParts(
    parts: string[],
    setParts: Dispatch<SetStateAction<string[]>>,
  ): void {
    const newParts = Date.now().toString()
    setParts([...parts, newParts])
  }
}

export default AbacusBehaviorUseCase
