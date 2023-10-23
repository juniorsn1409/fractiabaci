//
//  DraggingUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PanInfo, DragControls } from 'framer-motion'

export function detecting(info: PanInfo, type: string): boolean {
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

export function dragging(
  event: React.PointerEvent,
  controls: DragControls,
): void {
  controls.start(event, { snapToCursor: true })
}

export function handleCounting(info: PanInfo, type: string): boolean {
  if (detecting(info, type)) {
    return true
  }
  return false
}

export function handleDelet(info: PanInfo): boolean {
  if (detecting(info, 'delet')) {
    return true
  }
  return false
}
