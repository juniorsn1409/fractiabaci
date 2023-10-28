//
//  DraggingUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PanInfo, DragControls } from 'framer-motion'

import { BeadModel } from '@/domain/BeadModel'
import { Dispatch, SetStateAction } from 'react'

export class DraggingUseCase {
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

  public dragging(event: React.PointerEvent, controls: DragControls): void {
    controls.start(event, { snapToCursor: true })
  }

  public handleCounting(
    info: PanInfo,
    type: string,
    amount: number,
    setAmount: React.Dispatch<React.SetStateAction<number>>,
    isInside: React.SetStateAction<boolean>,
    setIsInside: React.Dispatch<React.SetStateAction<boolean>>,
  ): void {
    const isDetecting = this.detecting(info, type)
    if (isDetecting && !isInside && amount < 10) {
      setIsInside(true)
      setAmount(amount + 1)
    } else if (!isDetecting && isInside && amount >= 0) {
      setIsInside(false)
      setAmount(amount - 1)
    }
  }

  public handleDelet(
    info: PanInfo,
    id: string,
    bead: BeadModel[],
    setBeads: Dispatch<SetStateAction<BeadModel[]>>,
  ): void {
    const isDetectingDelete = this.detecting(info, 'delet')
    if (isDetectingDelete) {
      const newBead = bead.filter((bead) => bead.id !== id)
      setBeads(newBead)
    }
  }
}
