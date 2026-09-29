//  S# SEVERITY
//
//  not-found.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import Link from 'next/link'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.number} aria-hidden="true">
          <span className={styles.digit}>
            <span className={`${styles.digitValue} ${styles.hundred}`}>4</span>
            <span className={`${styles.disc} ${styles.discHundred}`} />
          </span>
          <span className={styles.digit}>
            <span className={`${styles.digitValue} ${styles.ten}`}>0</span>
            <span className={`${styles.disc} ${styles.discTen}`} />
          </span>
          <span className={styles.digit}>
            <span className={`${styles.digitValue} ${styles.unit}`}>4</span>
            <span className={`${styles.disc} ${styles.discUnit}`} />
          </span>
        </div>
        <p className={styles.code}>
          Erro 404 · 4 centenas, 0 dezenas e 4 unidades
        </p>
        <h1 className={styles.title}>Ops! Essa página sumiu do ábaco</h1>
        <p className={styles.text}>
          Não encontramos o endereço que você procurou. Que tal voltar e montar
          mais alguns números?
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.cta}>
            VOLTAR AO INÍCIO
          </Link>
          <Link href="/trilha" className={styles.secondary}>
            Ir para a trilha
          </Link>
        </div>
      </div>
    </main>
  )
}
