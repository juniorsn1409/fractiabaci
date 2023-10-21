//  S# SEVERITY
//
//  layout.tsx
//
//  Created by Edson Júnior Ananias de Lima on 30/09/23.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import type { Metadata } from 'next'

import { Poppins } from 'next/font/google'

import { ReactNode } from 'react'

import { Background } from '@/components/Background'
import { Header } from '@/components/Header'

import './../../public/globals.css'

const font = Poppins({
  weight: '500',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fracti Abacus | Ábaco de Papel',
  description: 'Ábaco de Papel',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <Background>
          <Header />
          {children}
        </Background>
      </body>
    </html>
  )
}
