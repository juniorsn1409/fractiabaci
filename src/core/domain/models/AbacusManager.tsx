//  S# SEVERITY
//
//  AbacusManager.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 08/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import AbacusBehaviorUseCase from '@/core/application/Abacus/AbacusBehaviorUseCase'
import ChoosingColorUseCase from '@/core/application/Abacus/ChoosingColorUseCase'

class AbacusManager {
  abacusBehaviorUseCase = new AbacusBehaviorUseCase()
  choosingColorUseCase = new ChoosingColorUseCase()
}

export default AbacusManager
