//  S# SEVERITY
//
//  Board/BoardSideRight/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode } from 'react'

import styles from './index.module.css'

type BoardSideRightProps = {
  children?: ReactNode
}

export const BoardSideRight: React.FC<BoardSideRightProps> = ({ children }) => {
  return (
    <div id={`add`} className={`${styles.sideRight}`}>
      {children}
    </div>
  )
}
