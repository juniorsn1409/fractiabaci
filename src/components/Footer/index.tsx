//  S# SEVERITY
//
//  Footer.tsx
//
//  Created by Edson Júnior Ananias de Lima on 10/10/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { ReactNode } from 'react'

import styles from './index.module.css'

type FooterProps = {
  children?: ReactNode
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return <footer className={`${styles.footer}`}>{children}</footer>
}
