//  S# SEVERITY
//
//  page.tsx
//  Trilha
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Trail } from '@/components/Trail'

export const metadata: Metadata = {
  title: 'Aprender | Fracti Abacus',
  description:
    'Trilha de lições da unidade 1: as casas do ábaco, com unidades, dezenas e centenas.',
}

export default function TrailPage() {
  return (
    <>
      <SiteHeader active="aprender" />
      <Trail />
    </>
  )
}
