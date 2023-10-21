//  S# SEVERITY
//
//  Bead.tsx
//
//  Created by Edson Júnior Ananias de Lima on 01/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useScreenStore } from '@/stores/useScreenStore'
import { motion, useDragControls } from 'framer-motion'

export function Bead() {
  const controls = useDragControls()
  const { screen } = useScreenStore()
  return (
    <motion.div
      drag
      dragControls={controls}
      dragConstraints={screen.size}
      dragElastic={0.1}
      dragListener={true}
      onPointerDown={() => {
        console.log(`onPointerDown`)
      }}
      onDragEnd={() => {
        console.log(`onDragEnd`)
      }}
      style={{
        zIndex: 1,
        width: '7%',
        paddingTop: '7%',
        maxWidth: '7%',
        minWidth: '4%',
        position: 'absolute',
        touchAction: 'none',
        borderRadius: '50%',
        backgroundColor: `var(--vermelho-ucari)`,
      }}
    />
  )
}
