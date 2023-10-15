//  S# SEVERITY
//
//  Background.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
'use client'

import { ReactNode, useRef, createContext } from 'react'
import { motion } from 'framer-motion'

interface BackgroundProps {
  children?: ReactNode
}

export const screenSizeContext = createContext<React.RefObject<null> | null>(
  null,
)

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  const screenSize = useRef(null)
  return (
    <motion.div
      ref={screenSize}
      style={{
        width: `100vw`,
        height: `100vh`,
        minWidth: '1000px',
        minHeight: '700px',
        backgroundColor: `var(--braco-isabeline)`,
      }}
    >
      <screenSizeContext.Provider value={screenSize}>
        {children}
      </screenSizeContext.Provider>
    </motion.div>
  )
}
