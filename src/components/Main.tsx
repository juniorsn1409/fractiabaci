//  S# SEVERITY
//
//  Main.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'

interface MainProps {
  children?: ReactNode
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        width: `100%`,
        height: `73%`,
        backgroundColor: `var(--branco-isabeline)`,
      }}
    >
      {children}
    </main>
  )
}
