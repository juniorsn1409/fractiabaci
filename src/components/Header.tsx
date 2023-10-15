//  S# SEVERITY
//
//  Header.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { Logo } from '@/components/Logo'

interface HeaderProps {
  children?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <motion.header
      style={{
        display: `flex`,
        alignItems: `center`,
        width: `100%`,
        height: `7%`,
        justifyContent: `space-between`,
        backgroundColor: `var(--branco-isabeline)`,
      }}
    >
      <Logo />
      {children}
    </motion.header>
  )
}
