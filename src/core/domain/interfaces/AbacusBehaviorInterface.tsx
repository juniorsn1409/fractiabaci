//  S# SEVERITY
//
//  AbacusBehaviorInterface.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.

import { Dispatch, SetStateAction } from 'react'

interface AbacusBehaviorInterface {
  addingParts(
    parts: string[],
    setParts: Dispatch<SetStateAction<string[]>>,
  ): void
}

export default AbacusBehaviorInterface
