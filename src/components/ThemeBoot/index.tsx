//  S# SEVERITY
//
//  ThemeBoot.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { useEffect } from 'react'

import { THEME_STORAGE_KEY } from '@/styles/theme'

/**
 * Rede de segurança do script inline de tema: quando o React renderiza o
 * <html> inteiro no cliente (ex.: 404 no `next dev`), scripts inline não
 * rodam — então reaplicamos o tema salvo após montar.
 */
export const ThemeBoot = () => {
  useEffect(() => {
    const root = document.documentElement
    if (root.hasAttribute('data-theme')) return
    let theme = 'light'
    try {
      if (window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark') {
        theme = 'dark'
      }
    } catch {
      /* sem acesso ao storage: fica claro */
    }
    root.setAttribute('data-theme', theme)
  }, [])

  return null
}
