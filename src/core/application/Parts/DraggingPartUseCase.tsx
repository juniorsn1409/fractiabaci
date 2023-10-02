//  S# SEVERITY
//
//  DraggingPartUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useDragControls, DragControls, PanInfo } from 'framer-motion'

import { PlaceValueType } from '@/core/domain/PlaceValueType'

interface DraggingPartUseCaseInterface {
  controls: DragControls
  dragging(event: React.PointerEvent): void
  isInsideOfDecimalPlace(info: PanInfo, type: PlaceValueType): boolean
  handleDragginEnd(
    info: PanInfo,
    type: PlaceValueType,
    qtdParts: number,
    isInside: React.SetStateAction<boolean>,
    setIsInside: React.Dispatch<React.SetStateAction<boolean>>,
    setQtdParts: React.Dispatch<React.SetStateAction<number>>,
  ): void
}

class DraggingPartUseCase implements DraggingPartUseCaseInterface {
  // MARK: - Public properties
  controls = useDragControls()

  // MARK: - Public methods
  public dragging(event: React.PointerEvent): void {
    this.controls.start(event, { snapToCursor: true })
  }

  isInsideOfDecimalPlace(info: PanInfo, type: PlaceValueType) {
    const decimalPlace = document.getElementById(`${type}`)
    if (decimalPlace) {
      const decimalPlaceRect = decimalPlace.getBoundingClientRect()
      return (
        info.point.x >= decimalPlaceRect.left &&
        info.point.x <= decimalPlaceRect.right &&
        info.point.y >= decimalPlaceRect.top &&
        info.point.y <= decimalPlaceRect.bottom
      )
    }
    return false
  }

  public handleDragginEnd(
    info: PanInfo,
    type: PlaceValueType,
    qtdParts: number,
    isInside: React.SetStateAction<boolean>,
    setIsInside: React.Dispatch<React.SetStateAction<boolean>>,
    setQtdParts: React.Dispatch<React.SetStateAction<number>>,
  ): void {
    if (this.isInsideOfDecimalPlace(info, type) && !isInside && qtdParts < 9) {
      setQtdParts(qtdParts + 1)
      setIsInside(true)
    } else if (!this.isInsideOfDecimalPlace(info, type) && isInside) {
      setQtdParts(qtdParts - 1)
      setIsInside(false)
    }
  }
}

export default DraggingPartUseCase
