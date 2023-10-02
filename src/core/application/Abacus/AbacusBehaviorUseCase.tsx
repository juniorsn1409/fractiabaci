//  S# SEVERITY
//
//  AbacusBehaviorUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { Dispatch, SetStateAction } from 'react'

interface AbacusBehaviorInterface {
  addingParts(
    parts: string[],
    setParts: Dispatch<SetStateAction<string[]>>,
  ): void
  // * canAddingParts(parts: string[]): boolean
}

class AbacusBehaviorUseCase implements AbacusBehaviorInterface {
  // MARK: - Public methods
  addingParts(
    parts: string[],
    setParts: Dispatch<SetStateAction<string[]>>,
  ): void {
    const newParts = Date.now().toString()
    setParts([...parts, newParts])
  }

  // *canAddingParts(parts: string[]): boolean {
  // *  if (parts.length > 9) {
  // *    return true
  // *  } else {
  // *    return false
  // *  }
  // *}
}

export default AbacusBehaviorUseCase
