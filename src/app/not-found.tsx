//  S# SEVERITY
//
//  not-found.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <div>
        <p>404</p>
        <h1>Página não encontrada</h1>
        <p>Lamentamos, mas não conseguimos encontrar a página que procura.</p>
        <div>
          <Link href="/">Voltar para Página Inicial</Link>
          <Link href="/">
            Entre em contato com o suporte
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </>
  )
}
