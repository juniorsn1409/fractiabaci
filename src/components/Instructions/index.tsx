//  S# SEVERITY
//
//  Instructions/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 09/11/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import styles from './index.module.css'


import '../../styles/styles.css'

export const Instructions = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.left}`}></div>
      <div className={`${styles.mid}`}>
        <h1>Valor Posicional Numérico</h1>
      </div>
      <div className={`${styles.right}`}>
        <h1>Duplo Clique Para Adicionar</h1>
      </div>
    </div>
  )
}
