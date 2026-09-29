//  S# SEVERITY
//
//  page.tsx
//  Lição
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { Lesson } from '@/components/Lesson'

export const metadata: Metadata = {
  title: 'Fracti Abacus | Lição',
  description: 'Monte números no ábaco',
}

export default function LessonPage() {
  return <Lesson />
}
