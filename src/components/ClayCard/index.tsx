//  S# SEVERITY
//
//  ClayCard.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { HTMLAttributes, ReactNode } from 'react'

import styles from './index.module.css'

export type ClayCardTone = 'surface' | 'hint' | 'success' | 'streak'
export type ClayCardPadding = 'none' | 'sm' | 'md' | 'lg'
export type ClayCardRadius = 'sm' | 'md' | 'lg' | 'xl'

export interface ClayCardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'li'
  tone?: ClayCardTone
  padding?: ClayCardPadding
  radius?: ClayCardRadius
  children?: ReactNode
}

export const ClayCard = ({
  as: Tag = 'div',
  tone = 'surface',
  padding = 'md',
  radius = 'xl',
  className,
  children,
  ...rest
}: ClayCardProps) => {
  return (
    <Tag
      className={[
        styles.card,
        styles[`tone-${tone}`],
        styles[`padding-${padding}`],
        styles[`radius-${radius}`],
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
