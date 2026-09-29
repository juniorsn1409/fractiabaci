//  S# SEVERITY
//
//  layout.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { Baloo_2 as Baloo2, Nunito } from 'next/font/google'

import { ReactNode } from 'react'

import '@/styles/reset.css'
import '@/styles/tokens.css'
import '@/styles/globals.css'
import '@/styles/dark.css'

import { ThemeBoot } from '@/components/ThemeBoot'
import { THEME_INIT_SCRIPT } from '@/styles/theme'

const display = Baloo2({
  weight: ['600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--fa-font-display',
})

const body = Nunito({
  weight: ['600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--fa-font-body',
})

export const metadata: Metadata = {
  title: 'Fracti Abacus',
  description:
    'Ábaco digital para crianças de 6 a 12 anos aprenderem o valor posicional: unidades, dezenas e centenas, com lições curtas e o ábaco livre.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Aplica o tema salvo antes da primeira pintura (ver dark.css). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={body.className}>
        <ThemeBoot />
        {children}
      </body>
    </html>
  )
}
