//  S# SEVERITY
//
//  page.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { Bead } from '@/components/Bead'
import { Footer } from '@/components/Footer'
import { Main } from '@/components/Main'

export default function App() {
  return (
    <>
      <Main>
        <Bead />
      </Main>
      <Footer></Footer>
    </>
  )
}
