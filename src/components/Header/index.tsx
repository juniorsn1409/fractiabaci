//  S# SEVERITY
//
//  Header/index.tsx
//  Presentation
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.div
      style={{
        display: `flex`,
        padding: `20px`,
        fontSize: `25px`,
        alignItems: `center`,
        justifyContent: `space-between`,
        color: `var(--preto-ebano)`,
        backgroundColor: `var(--braco-paz)`,
      }}
    >
      Fracti Abacus
    </motion.div>
  )
  // return <div className="headerContainer">Fracti Abacus</div>
}
