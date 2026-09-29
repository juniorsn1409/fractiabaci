//  S# SEVERITY
//
//  page.tsx
//  Sobre
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { About } from '@/components/About'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Sobre o projeto | Fracti Abacus',
  description:
    'Fracti Abacus: ábaco digital para crianças de 6 a 12 anos aprenderem as casas decimais. Projeto de TCC 2023.',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="sobre" />
      <About />
    </>
  )
}
