//  S# SEVERITY
//
//  Disc.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { CSSProperties } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'

import { Descriptions, PlaceValueType } from '@/domain/CustomTypesModel'

import { pop, useSafeVariants } from '@/styles/motion'

import styles from './index.module.css'

/** Casas suportadas pelo disco (regra pedagógica: só muda a cor). */
export type DiscPlace =
  | PlaceValueType.unit
  | PlaceValueType.ten
  | PlaceValueType.hundred

export type DiscSize = 'sm' | 'md' | 'lg' | number

interface DiscOwnProps {
  place: DiscPlace
  /** 'sm' 44px · 'md' 56px · 'lg' 72px, ou um valor em px. */
  size?: DiscSize
  /** Mostra 1 / 10 / 100 dentro do disco (ajuda crianças daltônicas). */
  showNumeral?: boolean
  /** Entra com a animação `pop` (queda com quique). */
  animate?: boolean
  /** Rótulo acessível; padrão: "Disco da centena, vale 100". */
  label?: string
}

type MotionOverrides = 'animate' | 'initial' | 'variants' | 'children'

export type DiscProps = DiscOwnProps &
  (
    | ({ as?: 'div' } & Omit<HTMLMotionProps<'div'>, MotionOverrides>)
    | ({ as: 'button' } & Omit<HTMLMotionProps<'button'>, MotionOverrides>)
  )

const SIZES: Record<'sm' | 'md' | 'lg', number> = { sm: 44, md: 56, lg: 72 }

const PLACE: Record<
  DiscPlace,
  { value: number; className: string; fontRatio: number }
> = {
  [PlaceValueType.unit]: { value: 1, className: styles.unit, fontRatio: 0.39 },
  [PlaceValueType.ten]: { value: 10, className: styles.ten, fontRatio: 0.34 },
  [PlaceValueType.hundred]: {
    value: 100,
    className: styles.hundred,
    fontRatio: 0.31,
  },
}

export const Disc = (props: DiscProps) => {
  const {
    as = 'div',
    place,
    size = 'md',
    showNumeral = true,
    animate = false,
    label,
    className,
    style,
    ...rest
  } = props

  const variants = useSafeVariants(pop)
  const config = PLACE[place]
  const px = typeof size === 'number' ? size : SIZES[size]
  const ariaLabel =
    label ??
    `Disco da ${Descriptions[place].toLowerCase()}, vale ${config.value}`

  const shared = {
    className: [
      styles.disc,
      config.className,
      as === 'button' ? styles.interactive : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' '),
    style: {
      width: px,
      height: px,
      fontSize: Math.round(px * config.fontRatio),
      ...(style as CSSProperties),
    },
    variants,
    initial: animate ? 'hidden' : false,
    animate: 'visible',
    'aria-label': ariaLabel,
  } as const

  const numeral = showNumeral ? (
    <span aria-hidden="true">{config.value}</span>
  ) : null

  if (as === 'button') {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        {...(rest as Omit<HTMLMotionProps<'button'>, MotionOverrides>)}
        {...shared}
      >
        {numeral}
      </motion.button>
    )
  }

  return (
    <motion.div
      role="img"
      {...(rest as Omit<HTMLMotionProps<'div'>, MotionOverrides>)}
      {...shared}
    >
      {numeral}
    </motion.div>
  )
}
