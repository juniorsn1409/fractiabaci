//  S# SEVERITY
//
//  Result/index.tsx
//
//  Created by Edson Júnior Ananias de Lima on 12/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import styles from './index.module.css'

type ResultModel = {
  numbers: number
}

export const Result = ({ numbers }: ResultModel) => {
  return <div className={`${styles.result}`}> Total: {numbers}</div>
}
