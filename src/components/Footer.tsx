//  S# SEVERITY
//
//  Footer.tsx
//
//  Created by Edson Júnior Ananias de Lima on 10/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FooterProps {
  children?: ReactNode
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <motion.footer
      style={{
        justifyContent: `center`,
        alignItems: `center`,
        width: `100%`,
        height: `20%`,
        backgroundColor: `var(--branco-isabeline)`,
      }}
    >
      {children}
    </motion.footer>
  )
}
