//  S# SEVERITY
//
//  Logo.tsx
//
//  Created by Edson Júnior Ananias de Lima on 10/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import Link from 'next/link'

import styles from './index.module.css'

export const Logo = () => {
  return (
    <h1 className={`${styles.logo}`}>
      <Link className={`${styles.link}`} href="/">
        Fracti Abacus
      </Link>
    </h1>
  )
}
