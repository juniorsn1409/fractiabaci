//  S# SEVERITY
//
//  theme.ts
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'fa-theme'

/**
 * Script inline (layout.tsx) que aplica o tema antes da primeira pintura,
 * evitando o "flash" claro → escuro. Padrão claro; só fica escuro se a
 * pessoa escolheu (localStorage `fa-theme`).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`
