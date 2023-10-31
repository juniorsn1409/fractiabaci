//  S# SEVERITY
//
//  Header.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'

import { Logo } from '@/components/Logo'

import '../styles/styles.css'

interface HeaderProps {
  children?: ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header-container">
      <Logo />
      {children}
    </header>
  )
}
