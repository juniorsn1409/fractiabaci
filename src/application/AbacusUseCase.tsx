//  S# SEVERITY
//
//  AbacusUseCase.tsx
//  Application
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
//  Motor puro do ábaco: pegar / soltar discos, reagrupar e limitar em 999.
//  Nada aqui toca no DOM — o componente mede os retângulos e entrega.
//
//  Os discos ficam soltos exatamente onde a criança solta (como no app
//  original). Um disco é reconhecido (conta) quando o centro dele está
//  dentro da coluna da mesma casa; a contagem é derivada das posições.
//

import {
  AbacusBox,
  AbacusDisc,
  AbacusDropTarget,
  AbacusEvent,
  AbacusMerge,
  AbacusMetrics,
  AbacusPickSource,
  AbacusPlace,
  AbacusPoint,
  AbacusRect,
  AbacusState,
  AbacusZone,
  AbacusZoneRects,
  PlaceCounts,
} from '@/domain/AbacusModel'
import { PlaceValueType } from '@/domain/CustomTypesModel'

export const MAX_TOTAL = 999
export const LIMIT_MESSAGE = 'O ábaco vai até 999!'
/** RF-004: tempo que o aviso fica na tela. */
export const TOAST_MS = 7000

/** Da esquerda para a direita, como no quadro. */
export const PLACE_ORDER: AbacusPlace[] = [
  PlaceValueType.hundred,
  PlaceValueType.ten,
  PlaceValueType.unit,
]

export const PLACE_VALUE: Record<AbacusPlace, number> = {
  [PlaceValueType.unit]: 1,
  [PlaceValueType.ten]: 10,
  [PlaceValueType.hundred]: 100,
}

const PLURAL: Record<AbacusPlace, string> = {
  [PlaceValueType.unit]: 'unidades',
  [PlaceValueType.ten]: 'dezenas',
  [PlaceValueType.hundred]: 'centenas',
}

/** 10 discos de `from` viram 1 disco de `to`. */
const REGROUP_RULES: { from: AbacusPlace; to: AbacusPlace; message: string }[] =
  [
    {
      from: PlaceValueType.unit,
      to: PlaceValueType.ten,
      message: 'Juntou! 10 unidades viraram 1 dezena',
    },
    {
      from: PlaceValueType.ten,
      to: PlaceValueType.hundred,
      message: 'Juntou! 10 dezenas viraram 1 centena',
    },
  ]

/** RF-004: mensagem gentil quando o disco cai na coluna errada. */
export const wrongColumnMessage = (place: AbacusPlace): string =>
  `Esse disco é da casa das ${PLURAL[place]}! Procure a coluna da mesma cor.`

/* ------------------------------------------------------------------ */
/*  Contagem                                                           */
/* ------------------------------------------------------------------ */

export const emptyCounts = (): PlaceCounts => ({
  [PlaceValueType.unit]: 0,
  [PlaceValueType.ten]: 0,
  [PlaceValueType.hundred]: 0,
})

export const toTotal = (counts: PlaceCounts): number =>
  counts[PlaceValueType.hundred] * 100 +
  counts[PlaceValueType.ten] * 10 +
  counts[PlaceValueType.unit]

export const toCounts = (total: number): PlaceCounts => ({
  [PlaceValueType.unit]: total % 10,
  [PlaceValueType.ten]: Math.floor(total / 10) % 10,
  [PlaceValueType.hundred]: Math.floor(total / 100) % 10,
})

/**
 * Regra de reconhecimento (como o `detecting()` do app original): o disco
 * vale quando o centro dele está dentro da coluna da MESMA casa. Soltos no
 * quadro ou numa coluna de outra cor não valem nada.
 */
export const isRecognized = (disc: AbacusDisc): boolean =>
  disc.zone === disc.place

/** Contagem derivada só das posições dos discos (fonte única da verdade). */
export const countDiscs = (discs: AbacusDisc[]): PlaceCounts => {
  const counts = emptyCounts()
  discs.forEach((disc) => {
    if (isRecognized(disc)) counts[disc.place] += 1
  })
  return counts
}

export const totalOf = (discs: AbacusDisc[]): number =>
  toTotal(countDiscs(discs))

/* ------------------------------------------------------------------ */
/*  Estado                                                             */
/* ------------------------------------------------------------------ */

export const createAbacus = (): AbacusState => ({
  discs: [],
  nextId: 1,
  drag: null,
  toast: null,
  flash: null,
  regroupNonce: 0,
  regroupTo: null,
  dropNonce: 0,
  event: null,
})

/** Limpa o quadro mantendo os contadores (animações não "voltam no tempo"). */
export const clearBoard = (state: AbacusState): AbacusState => ({
  ...state,
  discs: [],
  drag: null,
  toast: null,
  flash: null,
  regroupTo: null,
  event: null,
})

/** `dropNonce` só cresce, então serve de identidade única para o aviso. */
const withToast = (state: AbacusState, message: string): AbacusState => ({
  ...state,
  toast: { message, nonce: state.dropNonce },
})

export const dismissToast = (
  state: AbacusState,
  nonce?: number,
): AbacusState =>
  state.toast && (nonce === undefined || state.toast.nonce === nonce)
    ? { ...state, toast: null }
    : state

/* ------------------------------------------------------------------ */
/*  Geometria dos discos (px)                                          */
/* ------------------------------------------------------------------ */

type Size = { width: number; height: number }
type Px = { x: number; y: number }

/** Fração da área de dois discos iguais que se sobrepõe (0..1). */
export const overlapRatio = (a: Px, b: Px, diameter: number): number => {
  const r = diameter / 2
  const d = Math.hypot(a.x - b.x, a.y - b.y)
  if (d >= diameter) return 0
  if (d <= 0) return 1
  const lens =
    2 * r * r * Math.acos(d / (2 * r)) - (d / 2) * Math.sqrt(4 * r * r - d * d)
  return lens / (Math.PI * r * r)
}

/** Mantém o centro do disco longe das bordas (disco inteiro na área). */
const clampPx = (p: Px, size: Size, radius: number): Px => {
  const fit = (value: number, length: number) =>
    radius * 2 > length
      ? length / 2
      : Math.min(Math.max(value, radius), length - radius)
  return { x: fit(p.x, size.width), y: fit(p.y, size.height) }
}

const toPx = (disc: AbacusDisc, size: Size): Px => ({
  x: disc.x * size.width,
  y: disc.y * size.height,
})

/** Acima disso o disco está "em cima" de outro e é empurrado de leve. */
export const MAX_OVERLAP = 0.6
/** Um lugar só serve para o empurrão se cobrir no máximo isto. */
const NUDGE_OK = 0.2

const worstOverlap = (p: Px, others: Px[], diameter: number): number =>
  others.reduce((worst, o) => Math.max(worst, overlapRatio(p, o, diameter)), 0)

/**
 * Se o disco cair quase em cima de outro (> 60%), procura um lugar livre
 * bem perto, na mesma área. Se não houver, fica onde caiu.
 */
export const nudgeAway = (
  p: Px,
  others: Px[],
  size: Size,
  diameter: number,
): Px => {
  if (worstOverlap(p, others, diameter) <= MAX_OVERLAP) return p
  const radius = diameter / 2
  const rings = [0.45, 0.65, 0.85, 1.05, 1.3, 1.6, 2]
  for (const ring of rings) {
    let best: Px | null = null
    let bestScore = Infinity
    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2 - Math.PI / 2
      const candidate = clampPx(
        {
          x: p.x + Math.cos(angle) * diameter * ring,
          y: p.y + Math.sin(angle) * diameter * ring,
        },
        size,
        radius,
      )
      const cover = worstOverlap(candidate, others, diameter)
      const score =
        Math.hypot(candidate.x - p.x, candidate.y - p.y) + cover * diameter
      if (cover <= NUDGE_OK && score < bestScore) {
        best = candidate
        bestScore = score
      }
    }
    if (best) return best
  }
  return p
}

/** Pseudo-aleatório determinístico (o motor continua puro). */
const random = (seed: number) => {
  let t = Math.imul(seed + 1, 2654435761) >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Um lugar livre "ao acaso" dentro da área (para o disco que nasce do
 * reagrupamento): evita cobrir os discos que já estão lá.
 */
export const freeSpot = (
  others: Px[],
  size: Size,
  diameter: number,
  seed: number,
): Px => {
  const radius = diameter / 2
  const next = random(seed)
  let best: Px = clampPx(
    { x: size.width / 2, y: size.height / 2 },
    size,
    radius,
  )
  let bestGap = -Infinity
  for (let i = 0; i < 120; i += 1) {
    const candidate = clampPx(
      { x: next() * size.width, y: next() * size.height },
      size,
      radius,
    )
    const gap = others.reduce(
      (min, o) =>
        Math.min(min, Math.hypot(candidate.x - o.x, candidate.y - o.y)),
      Infinity,
    )
    // O primeiro lugar que não encosta em ninguém já serve.
    if (gap >= diameter * 1.15) return candidate
    if (gap > bestGap) {
      bestGap = gap
      best = candidate
    }
  }
  return best
}

const sizeOfZone = (
  metrics: AbacusMetrics | undefined,
  zone: AbacusZone,
): Size | null => {
  if (!metrics) return null
  const box = zone === 'free' ? metrics.board : metrics.fields[zone]
  return box && box.width > 0 && box.height > 0
    ? { width: box.width, height: box.height }
    : null
}

/* ------------------------------------------------------------------ */
/*  Arrastar                                                           */
/* ------------------------------------------------------------------ */

/**
 * Começa o arraste. Do pote nasce um disco novo (pote infinito); um disco
 * do quadro continua na lista (escondido) até ser solto, então a contagem
 * só muda quando ele é solto em outro lugar.
 */
export const pickDisc = (
  state: AbacusState,
  source: AbacusPickSource,
): AbacusState => {
  if (state.drag) return state

  if (source.kind === 'source') {
    return { ...state, drag: { place: source.place, origin: null } }
  }

  const origin = state.discs.find((disc) => disc.id === source.id)
  if (!origin) return state
  return { ...state, drag: { place: origin.place, origin } }
}

/** Cancela o arraste (ex.: pointercancel): tudo fica como estava. */
export const cancelDrag = (state: AbacusState): AbacusState =>
  state.drag ? { ...state, drag: null } : state

type RegroupResult = {
  discs: AbacusDisc[]
  nextId: number
  to: AbacusPlace | null
  message: string
  merged: AbacusMerge[]
  born: number[]
}

/**
 * 10 discos reconhecidos numa coluna viram 1 da próxima casa (em cascata).
 * O disco novo aparece num lugar livre dentro da coluna da próxima casa.
 */
export const regroup = (
  discs: AbacusDisc[],
  nextId: number,
  metrics?: AbacusMetrics,
): RegroupResult => {
  let list = discs
  let id = nextId
  let to: AbacusPlace | null = null
  let message = ''
  const merged: AbacusMerge[] = []
  const born: number[] = []

  REGROUP_RULES.forEach((rule) => {
    const inColumn = list.filter(
      (disc) => disc.place === rule.from && isRecognized(disc),
    )
    if (inColumn.length < 10) return
    const group = inColumn.slice(0, 10)
    const removed = new Set(group.map((disc) => disc.id))
    list = list.filter((disc) => !removed.has(disc.id))

    let x = 0.5
    let y = 0.5
    const size = sizeOfZone(metrics, rule.to)
    if (size && metrics) {
      const others = list
        .filter((disc) => disc.zone === rule.to)
        .map((disc) => toPx(disc, size))
      const spot = freeSpot(others, size, metrics.disc, id)
      x = spot.x / size.width
      y = spot.y / size.height
    }

    list = [...list, { id, place: rule.to, zone: rule.to, x, y }]
    merged.push({ place: rule.from, discs: group })
    born.push(id)
    id += 1
    to = rule.to
    message = rule.message
  })

  return { discs: list, nextId: id, to, message, merged, born }
}

/**
 * Solta o disco arrastado. Ele fica exatamente onde caiu (nada de grade):
 * - lixeira / potes → o disco é descartado;
 * - dentro de uma coluna → fica ali, inteiro dentro da coluna; só conta se
 *   a coluna for da mesma casa (RF-003). Coluna errada: fica solto, não
 *   conta e mostra o aviso (RF-004). 10 reconhecidos → reagrupa. Passar de
 *   999 → fica onde caiu, mas não conta;
 * - fora das colunas → fica flutuando onde caiu (RF-002).
 * `metrics` (px) evita que um disco caia exatamente em cima de outro.
 */
export const dropDisc = (
  state: AbacusState,
  target: AbacusDropTarget,
  metrics?: AbacusMetrics,
): AbacusState => {
  const drag = state.drag
  if (!drag) return state

  const origin = drag.origin
  const isNew = origin === null
  const id = origin?.id ?? state.nextId
  const others = state.discs.filter((disc) => disc.id !== id)
  const nonce = state.dropNonce + 1
  const event: AbacusEvent = {
    nonce,
    landed: null,
    recognized: [],
    merged: [],
    born: [],
  }
  const base: AbacusState = {
    ...state,
    discs: others,
    drag: null,
    nextId: isNew ? state.nextId + 1 : state.nextId,
    dropNonce: nonce,
    event,
  }

  if (target.kind === 'trash' || target.kind === 'source') {
    return base
  }

  const zone: AbacusZone = target.kind === 'column' ? target.place : 'free'

  // Empurra de leve se cair em cima de outro disco da mesma área.
  let x = target.x
  let y = target.y
  let pushX = 0
  let pushY = 0
  const size = sizeOfZone(metrics, zone)
  if (size && metrics) {
    const p = { x: x * size.width, y: y * size.height }
    const neighbours = others
      .filter((disc) => disc.zone === zone)
      .map((disc) => toPx(disc, size))
    const q = nudgeAway(p, neighbours, size, metrics.disc)
    x = q.x / size.width
    y = q.y / size.height
    pushX = q.x - p.x
    pushY = q.y - p.y
  }

  const placed: AbacusDisc = { id, place: drag.place, zone, x, y }
  /** O disco parte do ponteiro e desliza (mola suave) até o lugar final. */
  const landed = {
    id,
    dx: -(target.dx + pushX),
    dy: -(target.dy + pushY),
  }

  if (zone === 'free') {
    return {
      ...base,
      discs: [...others, placed],
      event: { ...event, landed },
    }
  }

  if (zone !== drag.place) {
    // RF-004: fica onde caiu, solto e sem contar.
    return withToast(
      { ...base, discs: [...others, placed], event: { ...event, landed } },
      wrongColumnMessage(drag.place),
    )
  }

  if (totalOf(others) + PLACE_VALUE[drag.place] > MAX_TOTAL) {
    // Fica onde caiu, mas solto no quadro (não conta).
    const box = metrics?.fields[zone]
    const board = metrics?.board
    const loose: AbacusDisc =
      box && board && board.width > 0 && board.height > 0
        ? {
            ...placed,
            zone: 'free',
            x: (box.left + x * box.width) / board.width,
            y: (box.top + y * box.height) / board.height,
          }
        : { ...placed, zone: 'free', x: 0.5, y: 0.5 }
    return withToast(
      { ...base, discs: [...others, loose], event: { ...event, landed } },
      LIMIT_MESSAGE,
    )
  }

  const wasRecognized = origin ? isRecognized(origin) : false
  const result = regroup([...others, placed], base.nextId, metrics)
  const nextEvent: AbacusEvent = {
    ...event,
    landed,
    recognized: wasRecognized ? [] : [id],
    merged: result.merged,
    born: result.born,
  }

  if (!result.to) {
    return {
      ...base,
      discs: result.discs,
      nextId: result.nextId,
      event: nextEvent,
    }
  }

  return {
    ...base,
    discs: result.discs,
    nextId: result.nextId,
    event: nextEvent,
    flash: { message: result.message, nonce: state.regroupNonce + 1 },
    regroupNonce: state.regroupNonce + 1,
    regroupTo: result.to,
  }
}

/* ------------------------------------------------------------------ */
/*  Hit-test (geometria pura; os retângulos vêm do DOM)                */
/* ------------------------------------------------------------------ */

export const contains = (rect: AbacusRect | null | undefined, p: AbacusPoint) =>
  !!rect &&
  p.x >= rect.left &&
  p.x <= rect.right &&
  p.y >= rect.top &&
  p.y <= rect.bottom

/** RF-001: o disco nunca sai do quadro. */
export const clampToRect = (
  p: AbacusPoint,
  rect: AbacusRect,
  margin = 0,
): AbacusPoint => {
  const minX = rect.left + margin
  const maxX = rect.right - margin
  const minY = rect.top + margin
  const maxY = rect.bottom - margin
  return {
    x:
      minX > maxX
        ? (rect.left + rect.right) / 2
        : Math.min(Math.max(p.x, minX), maxX),
    y:
      minY > maxY
        ? (rect.top + rect.bottom) / 2
        : Math.min(Math.max(p.y, minY), maxY),
  }
}

const boxOf = (rect: AbacusRect, board: AbacusRect): AbacusBox => ({
  left: rect.left - board.left,
  top: rect.top - board.top,
  width: rect.right - rect.left,
  height: rect.bottom - rect.top,
})

/** Medidas em px (relativas ao quadro) que o motor usa ao soltar. */
export const metricsOf = (
  zones: AbacusZoneRects,
  disc: number,
): AbacusMetrics => {
  const fields: AbacusMetrics['fields'] = {}
  PLACE_ORDER.forEach((place) => {
    const rect = zones.fields[place]
    if (rect) fields[place] = boxOf(rect, zones.board)
  })
  return {
    disc,
    board: {
      width: zones.board.right - zones.board.left,
      height: zones.board.bottom - zones.board.top,
    },
    fields,
  }
}

/**
 * Descobre onde o ponteiro está. O centro do disco é o ponteiro, e a coluna
 * em que o centro cair é a que reconhece o disco. `radius` (px) é o raio do
 * disco: ele é limitado para ficar inteiro dentro da área de discos da
 * coluna (ou do quadro — RF-001). x/y saem em fração dessa área.
 */
export const resolveDropTarget = (
  point: AbacusPoint,
  zones: AbacusZoneRects,
  radius = 0,
): AbacusDropTarget => {
  if (contains(zones.trash, point)) return { kind: 'trash' }

  const column = PLACE_ORDER.find((place) =>
    contains(zones.columns[place], point),
  )
  const field =
    column !== undefined
      ? zones.fields[column] ?? zones.columns[column] ?? null
      : null
  if (column !== undefined && field) {
    const clamped = clampToRect(point, field, radius)
    return {
      kind: 'column',
      place: column,
      x: (clamped.x - field.left) / (field.right - field.left || 1),
      y: (clamped.y - field.top) / (field.bottom - field.top || 1),
      dx: clamped.x - point.x,
      dy: clamped.y - point.y,
    }
  }

  if (contains(zones.source, point)) return { kind: 'source' }

  const { board } = zones
  const clamped = clampToRect(point, board, radius)
  return {
    kind: 'free',
    x: (clamped.x - board.left) / (board.right - board.left || 1),
    y: (clamped.y - board.top) / (board.bottom - board.top || 1),
    dx: clamped.x - point.x,
    dy: clamped.y - point.y,
  }
}
