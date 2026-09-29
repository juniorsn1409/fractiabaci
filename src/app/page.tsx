//  S# SEVERITY
//
//  page.tsx
//  Ábaco livre
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { FreeAbacus } from '@/components/FreeAbacus'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Fracti Abacus | Ábaco livre',
  description: 'Arraste os discos e monte números no ábaco de papel',
}

export default function App() {
  return <FreeAbacus header={<SiteHeader active="abaco" />} />
}
