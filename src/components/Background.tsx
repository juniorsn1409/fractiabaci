//  S# SEVERITY
//
//  Background.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode } from 'react'

import { useScreenStore } from '@/stores/useScreenStore'

type BackgroundProps = {
  children?: ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  const {
    screen: { size },
  } = useScreenStore()
  return (
    <div
      ref={size as React.RefObject<HTMLDivElement>}
      style={{
        width: `100vw`,
        height: `100vh`,
        minWidth: '1000px',
        minHeight: '700px',
        backgroundColor: `var(--braco-isabeline)`,
      }}
    >
      {children}
    </div>
  )
}
