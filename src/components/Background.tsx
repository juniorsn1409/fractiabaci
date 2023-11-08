//  S# SEVERITY
//
//  Background.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import React, { ReactNode } from 'react'

import { useScreenStore } from '@/stores/useScreenStore'

import '../styles/dark.css'

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
      className="background-container"
    >
      {children}
    </div>
  )
}
