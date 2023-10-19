//
//  DraggingPartUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PanInfo, DragControls } from 'framer-motion'
import { DraggingPartModel } from '@/domain/models/DraggingPartModel'

export class DraggingPartUseCase implements DraggingPartModel {
  // MARK: - Methods
  dragging(event: React.PointerEvent, controls: DragControls): void {
    controls.start(event, { snapToCursor: true })
  }

  detecting(info: PanInfo, type: string): boolean {
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

  handleDragginEnd(
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

  handleDelet(info: PanInfo): void {
    const isDetectingDelete = this.detecting(info, 'delet')
    if (isDetectingDelete) {
      console.log(`Detecting Side Delet`)
    }
  }

  // handleDelet(
  //   info: PanInfo,
  //   index: number,
  //   parts: PartsInterface[],
  //   setParts: Dispatch<SetStateAction<PartsInterface[]>>,
  // ): void {
  //   const isDetectingDelete = this.detecting(info, 'delet')
  //   if (isDetectingDelete) {
  //     console.log(detecting delet)
  //     const newParts = parts.filter((parts, i) => i !== index)
  //     setParts(newParts)
  //   }
  //   console.log(parts: ${parts})
  // }
}
