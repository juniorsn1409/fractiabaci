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

import styles from './index.module.css'

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
      className={`${styles.container}`}
    >
      {children}
    </div>
  )
}
