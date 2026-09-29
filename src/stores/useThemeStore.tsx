//  S# SEVERITY
//
//  useThemeStore.tsx
//  Store
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useEffect } from 'react'

import { create } from 'zustand'

import { THEME_STORAGE_KEY, Theme } from '@/styles/theme'

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* sem persistência */
  }
}

type StoreProps = {
  theme: Theme
  /** Lê o tema já aplicado pelo script inline. */
  sync: () => void
  toggle: () => void
}

export const useThemeStore = create<StoreProps>((set, get) => ({
  theme: 'light',
  sync: () => {
    const current = document.documentElement.getAttribute('data-theme')
    set({ theme: current === 'dark' ? 'dark' : 'light' })
  },
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },
}))

/** Sincroniza o store com o atributo `data-theme` do <html> após montar. */
export const useSyncTheme = () => {
  const sync = useThemeStore((s) => s.sync)
  useEffect(() => {
    sync()
  }, [sync])
}
