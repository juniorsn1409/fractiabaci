//  S# SEVERITY
//
//  lessons.ts
//  Trail
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

export type TrailLesson = {
  id: string
  title: string
  /** Rota jogável; por enquanto só existe a lição "Monte números". */
  href: string
  kind: 'lesson' | 'challenge'
  /** `false` → fase ainda não construída; aparece como "Em breve". */
  available: boolean
}

export type TrailNodeState = 'done' | 'current' | 'locked' | 'soon'

/** Unidade 1 · As casas do ábaco. */
export const TRAIL_LESSONS: TrailLesson[] = [
  {
    id: 'contando-unidades',
    title: 'Contando unidades',
    href: '/licao',
    kind: 'lesson',
    available: false,
  },
  {
    id: 'unidades-no-abaco',
    title: 'Unidades no ábaco',
    href: '/licao',
    kind: 'lesson',
    available: false,
  },
  {
    id: 'monte-numeros',
    title: 'Monte números',
    href: '/licao',
    kind: 'lesson',
    available: true,
  },
  {
    id: 'dez-viram-dezena',
    title: '10 viram 1 dezena',
    href: '/licao',
    kind: 'lesson',
    available: false,
  },
  {
    id: 'centenas',
    title: 'Centenas',
    href: '/licao',
    kind: 'lesson',
    available: false,
  },
  {
    id: 'desafio-unidade-1',
    title: 'Desafio da unidade',
    href: '/licao',
    kind: 'challenge',
    available: false,
  },
]

/**
 * Estado de cada nó: fases ainda não construídas → `soon`; concluídas →
 * `done`; a primeira disponível não concluída → `current`; as seguintes →
 * `locked`.
 */
export const trailStates = (completed: string[]): TrailNodeState[] => {
  let currentGiven = false
  return TRAIL_LESSONS.map((lesson) => {
    if (!lesson.available) return 'soon'
    if (completed.includes(lesson.id)) return 'done'
    if (!currentGiven) {
      currentGiven = true
      return 'current'
    }
    return 'locked'
  })
}
