//  S# SEVERITY
//
//  motion.ts
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { useMemo } from 'react'

import {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
  useReducedMotion,
} from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  Presets de mola                                                    */
/* ------------------------------------------------------------------ */

export const springs = {
  /** Resposta rápida a toques (botões, discos pressionados). */
  snappy: { type: 'spring', stiffness: 520, damping: 30 },
  /** Mola com leve overshoot — equivale a cubic-bezier(.3,1.4,.5,1). */
  bouncy: { type: 'spring', stiffness: 380, damping: 18 },
  /** Movimento suave para entrar/sair de telas. */
  gentle: { type: 'spring', stiffness: 220, damping: 26 },
  /** Largura da barra de progresso (.6s com overshoot no mockup). */
  progress: { type: 'spring', stiffness: 170, damping: 17, mass: 1 },
} satisfies Record<string, Transition>

/** Transição do `whileTap` dos botões clay (afunda 4px). */
export const pressTransition: Transition = { duration: 0.08, ease: 'easeOut' }

/* ------------------------------------------------------------------ */
/*  Variants (espelham os @keyframes de Licao.dc.html)                 */
/* ------------------------------------------------------------------ */

/** Disco caindo na coluna com quique. Estados: `hidden` → `visible`. */
export const pop: Variants = {
  hidden: { scale: 0, y: -40, opacity: 0 },
  visible: {
    scale: [0, 1.2, 0.92, 1],
    y: [-40, 0, 0, 0],
    opacity: [0, 1, 1, 1],
    transition: { duration: 0.45, times: [0, 0.6, 0.8, 1], ease: 'easeOut' },
  },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
}

/** Dígito/placar surgindo (flashA/flashB). Estados: `hidden` → `visible`. */
export const flash: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: {
    scale: [0.4, 1.12, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.5, times: [0, 0.6, 1], ease: 'easeOut' },
  },
}

const PULSE_RING = 'rgba(108, 76, 241, 0.35)'
const PULSE_NONE = 'rgba(108, 76, 241, 0)'

/** Destaque da coluna ao reagrupar (10 → 1). Estados: `idle` / `pulse`. */
export const pulse: Variants = {
  idle: { scale: 1, boxShadow: `0 0 0 0px ${PULSE_NONE}` },
  pulse: {
    scale: [1, 1.06, 1],
    boxShadow: [
      `0 0 0 0px ${PULSE_NONE}`,
      `0 0 0 6px ${PULSE_RING}`,
      `0 0 0 0px ${PULSE_NONE}`,
    ],
    transition: { duration: 0.6, times: [0, 0.4, 1], ease: 'easeOut' },
  },
}

/** Resposta errada. Estados: `idle` / `shake`. */
export const shake: Variants = {
  idle: { x: 0 },
  shake: {
    x: [0, -10, 9, -6, 4, 0],
    transition: {
      duration: 0.45,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      ease: 'easeInOut',
    },
  },
}

/** Folha de feedback subindo com overshoot. Estados: `hidden` / `visible` / `exit`. */
export const sheetUp: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: ['110%', '-3%', '0%'],
    transition: { duration: 0.45, times: [0, 0.7, 1], ease: 'easeOut' },
  },
  exit: { y: '110%', transition: { duration: 0.25, ease: 'easeIn' } },
}

/** Check de acerto girando e crescendo. Estados: `hidden` → `visible`. */
export const checkPop: Variants = {
  hidden: { scale: 0, rotate: -40 },
  visible: {
    scale: [0, 1.3, 1],
    rotate: [-40, 8, 0],
    transition: {
      delay: 0.15,
      duration: 0.5,
      times: [0, 0.6, 1],
      ease: 'easeOut',
    },
  },
}

/**
 * Faísca colorida saindo do check. Use com `custom={{ dx, dy }}`.
 * Estados: `hidden` → `visible`.
 */
export const spark: Variants = {
  hidden: { x: 0, y: 0, scale: 1, opacity: 1 },
  visible: (custom: { dx: number; dy: number }) => ({
    x: custom.dx,
    y: custom.dy,
    scale: 0.2,
    opacity: 0,
    transition: { delay: 0.1, duration: 0.8, ease: 'easeOut' },
  }),
}

/**
 * Flutuação ociosa (dígitos). Use `custom={index}` para defasar (0.3s cada).
 * Estados: `rest` / `float`.
 */
export const bob: Variants = {
  rest: { y: 0 },
  float: (index = 0) => ({
    y: [0, -5, 0],
    transition: {
      duration: 2.4,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: index * 0.3,
    },
  }),
}

/**
 * Balanço ocioso dos discos na bandeja. `custom={index}` defasa 0.4s cada.
 * Estados: `rest` / `wobble`.
 */
export const wobble: Variants = {
  rest: { rotate: 0 },
  wobble: (index = 0) => ({
    rotate: [0, -6, 0, 6, 0],
    transition: {
      duration: 3,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: 'easeInOut',
      repeat: Infinity,
      delay: index * 0.4,
    },
  }),
}

/** Brilho que atravessa a barra de progresso. Estados: `rest` / `shine`. */
export const shine: Variants = {
  rest: { x: '-120%' },
  shine: {
    x: ['-120%', '320%'],
    transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
  },
}

/* ------------------------------------------------------------------ */
/*  Movimento reduzido                                                 */
/* ------------------------------------------------------------------ */

const INSTANT: Transition = { duration: 0 }

function settle(target: TargetAndTransition): TargetAndTransition {
  const settled: Record<string, unknown> = {}

  Object.entries(target).forEach(([key, value]) => {
    if (key === 'transition' || key === 'transitionEnd') return
    settled[key] = Array.isArray(value) ? value[value.length - 1] : value
  })

  return { ...(settled as TargetAndTransition), transition: INSTANT }
}

function reduceVariant(variant: Variant): Variant {
  if (typeof variant === 'function') {
    return (custom, current, velocity) => {
      const resolved = variant(custom, current, velocity)
      return typeof resolved === 'string' ? resolved : settle(resolved)
    }
  }
  return settle(variant)
}

/**
 * Converte variants para a versão sem movimento: cada estado pula direto
 * para o valor final (último keyframe), sem loops nem molas.
 */
export function reduceVariants(variants: Variants): Variants {
  const reduced: Variants = {}
  Object.entries(variants).forEach(([key, variant]) => {
    reduced[key] = reduceVariant(variant)
  })
  return reduced
}

/**
 * Hook ciente de `prefers-reduced-motion`.
 *
 * const { reduce, variants, transition } = useMotionSafe()
 * <motion.div variants={variants(pop)} transition={transition(springs.bouncy)} />
 */
export function useMotionSafe() {
  const reduce = Boolean(useReducedMotion())

  return useMemo(
    () => ({
      reduce,
      variants: (v: Variants): Variants => (reduce ? reduceVariants(v) : v),
      transition: (t: Transition): Transition => (reduce ? INSTANT : t),
    }),
    [reduce],
  )
}

/** Atalho: devolve as variants já adaptadas ao movimento reduzido. */
export function useSafeVariants(variants: Variants): Variants {
  const reduce = Boolean(useReducedMotion())
  return useMemo(
    () => (reduce ? reduceVariants(variants) : variants),
    [reduce, variants],
  )
}
