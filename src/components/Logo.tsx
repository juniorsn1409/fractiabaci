//  S# SEVERITY
//
//  Logo.tsx
//
//  Created by Edson Júnior Ananias de Lima on 10/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { motion } from 'framer-motion'

import Link from 'next/link'

export const Logo = () => {
  return (
    <motion.h1
      style={{
        padding: `25px`,
        fontSize: `25px`,
      }}
    >
      <Link
        href="/"
        style={{ textDecoration: 'none', color: 'var(--preto-ebano)' }}
      >
        Fracti Abacus
      </Link>
    </motion.h1>
  )
}
