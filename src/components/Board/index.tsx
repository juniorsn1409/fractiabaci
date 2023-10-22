//  S# SEVERITY
//
//  Board/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode } from 'react'

interface BoardProps {
  children?: ReactNode
}

export const Board: React.FC<BoardProps> = ({ children }) => {
  return (
    <div
      style={{
        width: '95%',
        height: '70%',
        minWidth: '1000px',
        minHeight: '500px',
        display: 'flex',
        overflow: 'hidden',
        borderRadius: '5px',
        backgroundColor: 'var(--branco-paz)',
      }}
    >
      {children}
    </div>
  )
}
