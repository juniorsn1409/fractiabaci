//  S# SEVERITY
//
//  DraggingPartUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useDragControls, PanInfo } from 'framer-motion'
import DraggingPartUseCaseInterface from '@/core/domain/interfaces/DraggingPartUseCaseInterface'

class DraggingPartUseCase implements DraggingPartUseCaseInterface {
  controls = useDragControls()

  public dragging(event: React.PointerEvent): void {
    this.controls.start(event, { snapToCursor: true })
  }

  public detecting(info: PanInfo, type: string): boolean {
    const decimalPlace = document.getElementById(type)

    if (decimalPlace) {
      const decimalPlaceRect = decimalPlace.getBoundingClientRect()
      const { point } = info
      return (
        point.x >= decimalPlaceRect.left &&
        point.x <= decimalPlaceRect.right &&
        point.y >= decimalPlaceRect.top &&
        point.y <= decimalPlaceRect.bottom
      )
    }
    return false
  }

  public handleDragginEnd(
    info: PanInfo,
    type: string,
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    detecting: React.SetStateAction<boolean>,
    setDetecting: React.Dispatch<React.SetStateAction<boolean>>,
  ): void {
    const isDetecting = this.detecting(info, type)

    if (isDetecting && !detecting && amount < 9) {
      setDetecting(true)
      setAmount(amount + 1)
    } else if (!isDetecting && detecting) {
      setDetecting(false)
      setAmount(amount - 1)
    }
  }

  public handleDelet(info: PanInfo): boolean {
    const isDetectingDelete = this.detecting(info, 'delet')
    return isDetectingDelete
  }
}

export default DraggingPartUseCase
