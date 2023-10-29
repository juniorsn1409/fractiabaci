//  S# SEVERITY
//
//  Board/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'
import '../../styles/styles.css'

interface BoardProps {
  children?: ReactNode
}

export const Board: React.FC<BoardProps> = ({ children }) => {
  return (
    <div
    className="board-container"
    >
      {children}
    </div>
  )
}
