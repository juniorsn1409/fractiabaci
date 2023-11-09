//  S# SEVERITY
//
//  Board/BoardSideLeft.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { FaRegTrashAlt } from 'react-icons/fa'

import '@/styles/styles.css'
import styles from './index.module.css'

export const BoardSideLeft = () => {
  return (
    <div id={`delet`} className={`${styles.sideLeft}`}>
      <FaRegTrashAlt className={`${styles.icon}`} />
    </div>
  )
}
