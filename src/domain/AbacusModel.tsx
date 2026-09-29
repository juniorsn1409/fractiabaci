//  S# SEVERITY
//
//  AbacusModel.tsx
//  Domain
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//

import { PlaceValueType } from '@/domain/CustomTypesModel'

/** Casas do ábaco (regra pedagógica: o disco só muda de cor, nunca de forma). */
export type AbacusPlace =
  | PlaceValueType.unit
  | PlaceValueType.ten
  | PlaceValueType.hundred

export type PlaceCounts = Record<AbacusPlace, number>

/**
 * Em que área o disco está: solto no quadro ('free') ou dentro da área de
 * uma coluna. Estar numa coluna não basta para contar: o disco só é
 * reconhecido quando a coluna é da mesma casa dele (ver `isRecognized`).
 */
export type AbacusZone = 'free' | AbacusPlace

export type AbacusDisc = {
  id: number
  /** Valor do disco (cor). Nunca muda. */
  place: AbacusPlace
  zone: AbacusZone
  /**
   * Centro do disco em fração (0..1) da área onde ele está: do quadro
   * quando `zone === 'free'`, ou da área de discos da coluna `zone`.
   * O disco fica exatamente onde a criança soltou — nada é reorganizado.
   */
  x: number
  y: number
}

/** Retângulo em coordenadas da janela (getBoundingClientRect). */
export type AbacusRect = {
  left: number
  top: number
  right: number
  bottom: number
}

export type AbacusPoint = { x: number; y: number }

/** Áreas do quadro medidas no DOM para o hit-test. */
export type AbacusZoneRects = {
  board: AbacusRect
  trash: AbacusRect | null
  source: AbacusRect | null
  /** Coluna inteira: é a área que reconhece o disco. */
  columns: Partial<Record<AbacusPlace, AbacusRect | null>>
  /** Área de discos de cada coluna (entre o título e o contador). */
  fields: Partial<Record<AbacusPlace, AbacusRect | null>>
}

/** Retângulo relativo ao quadro, em px. */
export type AbacusBox = {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Medidas em px que o motor precisa para não empilhar discos e para achar
 * um lugar livre no reagrupamento (o motor continua sem tocar no DOM).
 */
export type AbacusMetrics = {
  /** Diâmetro do disco no quadro. */
  disc: number
  board: { width: number; height: number }
  fields: Partial<Record<AbacusPlace, AbacusBox>>
}

/** De onde vem o disco que começou a ser arrastado. */
export type AbacusPickSource =
  | { kind: 'source'; place: AbacusPlace }
  | { kind: 'disc'; id: number }

/** Resultado do hit-test ao soltar (ou ao passar por cima). */
export type AbacusDropTarget =
  | { kind: 'trash' }
  | { kind: 'source' }
  /**
   * Centro do disco dentro da coluna. x/y em fração da área de discos da
   * coluna (já limitados para o disco ficar inteiro lá dentro); `dx`/`dy`
   * (px) é quanto o limite deslocou o disco em relação ao ponteiro.
   */
  | {
      kind: 'column'
      place: AbacusPlace
      x: number
      y: number
      dx: number
      dy: number
    }
  /** Fora das colunas: o disco fica flutuando (x/y em fração do quadro). */
  | { kind: 'free'; x: number; y: number; dx: number; dy: number }

export type AbacusDrag = {
  place: AbacusPlace
  /**
   * Disco do quadro sendo arrastado (null = disco novo tirado do pote).
   * Ele continua na lista (escondido) até ser solto, então a contagem só
   * muda quando a criança solta o disco.
   */
  origin: AbacusDisc | null
}

/** Um grupo de 10 discos que se juntou (para animar a fusão). */
export type AbacusMerge = {
  place: AbacusPlace
  discs: AbacusDisc[]
}

/** O que aconteceu na última soltura (a interface anima a partir disso). */
export type AbacusEvent = {
  nonce: number
  /** Disco solto: `dx`/`dy` (px) = de onde ele parte até o lugar final. */
  landed: { id: number; dx: number; dy: number } | null
  /** Discos que acabaram de ser reconhecidos (animação de encaixe). */
  recognized: number[]
  /** Grupos de 10 que se juntaram. */
  merged: AbacusMerge[]
  /** Discos criados pelo reagrupamento (aparecem depois da fusão). */
  born: number[]
}

export type AbacusToast = {
  message: string
  nonce: number
}

export type AbacusFlash = {
  message: string
  nonce: number
}

export type AbacusState = {
  discs: AbacusDisc[]
  nextId: number
  drag: AbacusDrag | null
  /** RF-004: aviso no canto inferior esquerdo (some depois de 7s). */
  toast: AbacusToast | null
  /** Pílula "Juntou! ..." do reagrupamento. */
  flash: AbacusFlash | null
  /** Muda a cada reagrupamento; a coluna `regroupTo` pulsa. */
  regroupNonce: number
  regroupTo: AbacusPlace | null
  /** Muda a cada soltura (útil para animações/telemetria). */
  dropNonce: number
  /** Última soltura, para as animações de encaixe/fusão. */
  event: AbacusEvent | null
}
