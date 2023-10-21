//  S# SEVERITY
//
//  Background.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'

type BackgroundProps = {
  children?: ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div
      style={{
        width: `100vw`,
        height: `100vh`,
        minWidth: '1000px',
        minHeight: '700px',
        backgroundColor: `var(--braco-isabeline)`,
      }}
    >
      {children}
    </div>
  )
}
