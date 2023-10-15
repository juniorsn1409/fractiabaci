//  S# SEVERITY
//
//  Board/BoardSideRight/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface BoardSideRightProps {
  children?: ReactNode
}

export const BoardSideRight: React.FC<BoardSideRightProps> = ({ children }) => {
  return (
    <motion.div
      id={`add`}
      style={{
        width: '8%',
        height: '95%',
        margin: '1%',
        display: 'flex',
        borderRadius: '8px',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      {children}
    </motion.div>
  )
}
