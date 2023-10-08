//  S# SEVERITY
//
//  DraggingPartUseCaseInterface.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 05/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { DragControls, PanInfo } from 'framer-motion'

interface DraggingPartUseCaseInterface {
  controls: DragControls
  dragging(event: React.PointerEvent): void
  detecting(info: PanInfo, type: string): boolean
  handleDragginEnd(
    info: PanInfo,
    type: string,
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    detecting: React.SetStateAction<boolean>,
    setDetecting: React.Dispatch<React.SetStateAction<boolean>>,
  ): void
}

export default DraggingPartUseCaseInterface
