import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
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
    <html lang="pt-br" className="h-full">
      <body className={font.className + '·h-full'}>{children}</body>
    </html>
  )
}
