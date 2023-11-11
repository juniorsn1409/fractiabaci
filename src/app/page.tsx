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
import { Background } from '@/components/Background'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { SwitchMode } from '@/components/SwitchMode'

export default function App() {
  return (
    <Background>
      <Header>
        <Logo />
        <SwitchMode />
      </Header>
      <Main>
        <Instructions />
        <Board />
      </Main>
      <Footer></Footer>
    </Background>
  )
}
