//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { Board } from '@/components/Board'
import { Footer } from '@/components/Footer'
import { Instructions } from '@/components/Instructions'
import { Main } from '@/components/Main'

export default function App() {
  return (
    <>
      <Main>
        <Instructions />
        <Board />
      </Main>
      <Footer></Footer>
    </>
  )
}
