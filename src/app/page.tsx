//  S# SEVERITY
//
//  page.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { motion } from 'framer-motion'

import Header from '@/components/Header'
import Main from '@/components/Main'

export default function App() {
  return (
    <motion.div
      style={{
        width: `100%`,
        minWidth: `70vh`,
        minHeight: `100vh`,
        backgroundColor: `var(--braco-isabelinea)`,
      }}
    >
      <Header />
      <motion.div
        style={{
          justifyContent: `center`,
          alignItems: `center`,
          margin: `50px`,
        }}
      >
        <Main />
      </motion.div>
    </motion.div>
  )
}
