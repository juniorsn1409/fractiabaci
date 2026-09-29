//  S# SEVERITY
//
//  ClayButton.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

'use client'

import { ReactNode } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'

import { pressTransition, useMotionSafe } from '@/styles/motion'

import styles from './index.module.css'

export type ClayButtonVariant = 'primary' | 'secondary' | 'disabled'

export interface ClayButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ClayButtonVariant
  fullWidth?: boolean
  children: ReactNode
}

export const ClayButton = ({
  variant = 'primary',
  fullWidth = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ClayButtonProps) => {
  const { transition } = useMotionSafe()
  const isDisabled = disabled || variant === 'disabled'
  const visual: ClayButtonVariant = isDisabled ? 'disabled' : variant

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      className={[
        styles.button,
        styles[visual],
        fullWidth ? styles.fullWidth : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      whileTap={isDisabled ? undefined : { y: 4 }}
      transition={transition(pressTransition)}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
