//  S# SEVERITY
//
//  AbacusBoard.tsx
//
//  Created by Edson Júnior Ananias de Lima on 28/09/26.
//  Copyright © 2023 Fracti Abacus, FA. All rights reserved.
//
//  Quadro reutilizável: lixeira, 3 colunas, potes, discos e o fantasma do
//  arraste. Os discos só se movem arrastando (mouse ou dedo) e ficam soltos
//  exatamente onde a criança solta — também dentro das colunas. Um disco é
//  reconhecido (conta) quando o centro dele está na coluna da mesma casa.
//

'use client'

import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

import {
  AnimatePresence,
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

import {
  PLACE_ORDER,
  clampToRect,
  isRecognized,
  metricsOf,
  resolveDropTarget,
} from '@/application/AbacusUseCase'
import { Disc } from '@/components/Disc'
import {
  AbacusDisc,
  AbacusDropTarget,
  AbacusEvent,
  AbacusPickSource,
  AbacusPlace,
  AbacusRect,
  AbacusZoneRects,
} from '@/domain/AbacusModel'
import { PlaceValueType } from '@/domain/CustomTypesModel'
import { useAbacusStore } from '@/stores/useAbacusStore'

import {
  bob,
  flash,
  pulse,
  springs,
  useMotionSafe,
  useSafeVariants,
  wobble,
} from '@/styles/motion'

import { PLACE_META } from './places'

import styles from './index.module.css'

export { AbacusToast } from './AbacusToast'

export interface AbacusBoardProps {
  /** Mostra 1 / 10 / 100 dentro dos discos (ajuda crianças daltônicas). */
  showNumerals?: boolean
  /** Quadro travado: nada pode ser arrastado (ex.: depois do acerto). */
  locked?: boolean
  /** Chamado quando um disco começa a ser arrastado. */
  onDragStart?: () => void
  className?: string
  style?: CSSProperties
}

/** Proporção da fonte do numeral em relação ao disco (igual ao <Disc>). */
const FONT_RATIO: Record<AbacusPlace, number> = {
  [PlaceValueType.unit]: 0.39,
  [PlaceValueType.ten]: 0.34,
  [PlaceValueType.hundred]: 0.31,
}

/** Tamanho do disco vindo de uma variável CSS (muda por breakpoint). */
const discStyle = (place: AbacusPlace, sizeVar: string): CSSProperties => ({
  width: `var(${sizeVar})`,
  height: `var(${sizeVar})`,
  fontSize: `calc(var(${sizeVar}) * ${FONT_RATIO[place]})`,
})

const toRect = (element: Element | null): AbacusRect | null => {
  if (!element) return null
  const { left, top, right, bottom } = element.getBoundingClientRect()
  return { left, top, right, bottom }
}

const readPx = (element: Element, name: string, fallback: number): number => {
  const value = parseFloat(getComputedStyle(element).getPropertyValue(name))
  return Number.isFinite(value) ? value : fallback
}

type HoverKey = AbacusDropTarget['kind'] | `column-${AbacusPlace}` | null

const hoverKeyOf = (target: AbacusDropTarget): HoverKey =>
  target.kind === 'column' ? `column-${target.place}` : target.kind

type Grab = (source: AbacusPickSource, event: React.PointerEvent) => void

/** Duração da fusão dos 10 discos; o disco novo aparece logo depois. */
const MERGE_S = 0.55

/* ------------------------------------------------------------------ */
/*  Disco no quadro (solto, na coluna certa ou na coluna errada)       */
/* ------------------------------------------------------------------ */

interface BoardDiscProps {
  disc: AbacusDisc
  index: number
  /** Está sendo arrastado: o lugar fica vazio até soltar. */
  hidden: boolean
  showNumerals: boolean
  event: AbacusEvent | null
  onGrab: Grab
}

/** "Encaixou!": achata e volta, com um anel suave na cor da casa. */
const SETTLE = {
  scaleX: [1, 1.2, 0.93, 1.03, 1],
  scaleY: [1, 0.82, 1.07, 0.98, 1],
}
const BORN = {
  scaleX: [0, 1.2, 0.93, 1.03, 1],
  scaleY: [0, 1.1, 1.05, 0.98, 1],
}

const BoardDisc = ({
  disc,
  index,
  hidden,
  showNumerals,
  event,
  onGrab,
}: BoardDiscProps) => {
  const reduce = Boolean(useReducedMotion())
  const bobVariants = useSafeVariants(bob)
  const meta = PLACE_META[disc.place]
  const recognized = isRecognized(disc)
  const wrong = disc.zone !== 'free' && !recognized

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const body = useAnimationControls()
  const ring = useAnimationControls()
  const playedRef = useRef(0)

  /* Disco que nasce do reagrupamento começa invisível (aparece após a fusão). */
  const bornNow =
    !!event && event.born.includes(disc.id) && playedRef.current !== event.nonce

  useEffect(() => {
    if (!event || playedRef.current === event.nonce) return
    playedRef.current = event.nonce
    const born = event.born.includes(disc.id)
    const landed = event.landed?.id === disc.id ? event.landed : null
    const settle = born || event.recognized.includes(disc.id)

    if (reduce) {
      body.set({ scaleX: 1, scaleY: 1 })
      return
    }

    // Parte de onde o ponteiro soltou e desliza até o lugar final.
    if (landed && (landed.dx !== 0 || landed.dy !== 0)) {
      offsetX.set(landed.dx)
      offsetY.set(landed.dy)
      animate(offsetX, 0, springs.gentle)
      animate(offsetY, 0, springs.gentle)
    }

    if (settle) {
      const delay = born ? MERGE_S : 0
      body.start({
        ...(born ? BORN : SETTLE),
        transition: { delay, duration: 0.5, ease: 'easeOut' },
      })
      ring.start({
        opacity: [0, 0.9, 0],
        scale: [0.7, 1.15, 1.7],
        transition: { delay: delay + 0.05, duration: 0.7, ease: 'easeOut' },
      })
    }
  }, [event, disc.id, reduce, body, ring, offsetX, offsetY])

  const label = recognized
    ? `Disco da ${meta.singular} na casa certa. Arraste para mover.`
    : wrong
    ? `Disco da ${meta.singular} na casa errada. Arraste para a coluna da mesma cor.`
    : `Disco da ${meta.singular} solto. Arraste para uma coluna ou para a lixeira.`

  return (
    <motion.div
      className={[
        styles.placed,
        disc.zone === 'free' ? styles.loose : '',
        hidden ? styles.hidden : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: `${disc.x * 100}%`,
        top: `${disc.y * 100}%`,
        x: offsetX,
        y: offsetY,
      }}
    >
      <motion.div
        variants={bobVariants}
        custom={index % 3}
        initial="rest"
        animate={recognized ? 'rest' : 'float'}
      >
        <motion.div
          className={styles.settle}
          initial={bornNow && !reduce ? { scaleX: 0, scaleY: 0 } : false}
          animate={body}
        >
          <motion.span
            className={`${styles.ring} ${styles[meta.tone]}`}
            initial={{ opacity: 0 }}
            animate={ring}
            aria-hidden="true"
          />
          <Disc
            place={disc.place}
            showNumeral={showNumerals}
            label={label}
            className={[
              styles.disc,
              recognized ? styles.recognized : '',
              wrong ? styles.wrong : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={discStyle(disc.place, '--ab-disc')}
            data-disc-id={disc.id}
            data-tone={meta.tone}
            data-free={disc.zone === 'free' ? 'true' : undefined}
            data-recognized={recognized ? 'true' : 'false'}
            onPointerDown={(pointer) =>
              onGrab({ kind: 'disc', id: disc.id }, pointer)
            }
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Fusão dos 10 discos (reagrupamento)                                */
/* ------------------------------------------------------------------ */

interface MergeProps {
  place: AbacusPlace
  event: AbacusEvent | null
  showNumerals: boolean
}

type Merging = { nonce: number; discs: AbacusDisc[] }

/** Os 10 discos correm para o centro da coluna e se fundem. */
const Merge = ({ place, event, showNumerals }: MergeProps) => {
  const reduce = Boolean(useReducedMotion())
  const [merging, setMerging] = useState<Merging | null>(null)

  useEffect(() => {
    if (!event || reduce) return
    const group = event.merged.find((item) => item.place === place)
    if (!group) return
    setMerging({ nonce: event.nonce, discs: group.discs })
    const timer = window.setTimeout(
      () => setMerging(null),
      MERGE_S * 1000 + 300,
    )
    return () => window.clearTimeout(timer)
  }, [event, place, reduce])

  if (!merging) return null

  return (
    <>
      {merging.discs.map((disc, index) => (
        <motion.div
          key={`${merging.nonce}-${disc.id}`}
          className={styles.placed}
          initial={{
            left: `${disc.x * 100}%`,
            top: `${disc.y * 100}%`,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            left: '50%',
            top: '50%',
            scale: [1, 1.05, 0.35],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: MERGE_S,
            delay: index * 0.012,
            ease: 'easeIn',
          }}
          aria-hidden="true"
          data-merging="true"
        >
          <Disc
            place={disc.place}
            showNumeral={showNumerals}
            role="presentation"
            className={styles.recognized}
            data-tone={PLACE_META[disc.place].tone}
            style={discStyle(disc.place, '--ab-disc')}
          />
        </motion.div>
      ))}
      <motion.span
        key={`burst-${merging.nonce}`}
        className={`${styles.burst} ${styles[PLACE_META[place].tone]}`}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.3, 1.2, 2] }}
        transition={{ delay: MERGE_S - 0.1, duration: 0.5, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Coluna                                                             */
/* ------------------------------------------------------------------ */

interface ColumnProps {
  place: AbacusPlace
  /** Discos cujo centro está nesta coluna (de qualquer casa). */
  discs: AbacusDisc[]
  hover: 'ok' | 'no' | null
  showNumerals: boolean
  dragId: number | null
  event: AbacusEvent | null
  regroupNonce: number
  regroupTo: AbacusPlace | null
  columnRef: (element: HTMLDivElement | null) => void
  fieldRef: (element: HTMLDivElement | null) => void
  onGrab: Grab
}

const Column = ({
  place,
  discs,
  hover,
  showNumerals,
  dragId,
  event,
  regroupNonce,
  regroupTo,
  columnRef,
  fieldRef,
  onGrab,
}: ColumnProps) => {
  const meta = PLACE_META[place]
  const variants = useSafeVariants(pulse)
  const countVariants = useSafeVariants(flash)
  const controls = useAnimationControls()
  const count = discs.filter(isRecognized).length

  useEffect(() => {
    if (regroupNonce > 0 && regroupTo === place) controls.start('pulse')
  }, [regroupNonce, regroupTo, place, controls])

  return (
    <motion.div
      ref={columnRef}
      className={[
        styles.column,
        styles[meta.tone],
        hover === 'ok' ? styles.hoverOk : '',
        hover === 'no' ? styles.hoverNo : '',
      ]
        .filter(Boolean)
        .join(' ')}
      variants={variants}
      initial="idle"
      animate={controls}
      role="group"
      aria-label={`${meta.title}: ${count}`}
      data-place={meta.tone}
    >
      <span className={styles.heading}>{meta.title}</span>
      <div ref={fieldRef} className={styles.field} data-field={meta.tone}>
        {discs.map((disc, index) => (
          <BoardDisc
            key={disc.id}
            disc={disc}
            index={index}
            hidden={disc.id === dragId}
            showNumerals={showNumerals}
            event={event}
            onGrab={onGrab}
          />
        ))}
        <Merge place={place} event={event} showNumerals={showNumerals} />
      </div>
      <motion.span
        key={count}
        className={styles.count}
        variants={countVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {count}
      </motion.span>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pote (fonte infinita de discos)                                    */
/* ------------------------------------------------------------------ */

interface SourceProps {
  place: AbacusPlace
  index: number
  showNumerals: boolean
  onGrab: Grab
}

const Source = ({ place, index, showNumerals, onGrab }: SourceProps) => {
  const meta = PLACE_META[place]
  const variants = useSafeVariants(wobble)
  const { reduce } = useMotionSafe()

  return (
    <div className={`${styles.sourceItem} ${styles[meta.tone]}`}>
      <div className={styles.sourcePile}>
        <Disc
          place={place}
          showNumeral={false}
          aria-hidden="true"
          role="presentation"
          className={styles.sourceShadow}
          style={discStyle(place, '--ab-source')}
        />
        <motion.div
          className={styles.sourceGrab}
          variants={variants}
          custom={index}
          initial="rest"
          animate="wobble"
          whileHover={reduce ? undefined : { scale: 1.08, rotate: 0 }}
          data-source={meta.tone}
          onPointerDown={(event) => onGrab({ kind: 'source', place }, event)}
        >
          <Disc
            place={place}
            showNumeral={showNumerals}
            label={`Pote de ${meta.title.toLowerCase()}. Arraste um disco para o quadro.`}
            style={discStyle(place, '--ab-source')}
          />
        </motion.div>
      </div>
      <span className={styles.sourceLabel}>{meta.name}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Quadro                                                             */
/* ------------------------------------------------------------------ */

type Session = {
  pointerId: number
  move: (event: PointerEvent) => void
  up: (event: PointerEvent) => void
  cancel: (event: PointerEvent) => void
}

export const AbacusBoard = ({
  showNumerals = true,
  locked = false,
  onDragStart,
  className,
  style,
}: AbacusBoardProps) => {
  const { abacus, actions } = useAbacusStore()
  const { discs, drag, regroupNonce, regroupTo, event } = abacus
  const { variants } = useMotionSafe()

  const rootRef = useRef<HTMLDivElement>(null)
  const trashRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const columnRefs = useRef<
    Partial<Record<AbacusPlace, HTMLDivElement | null>>
  >({})
  const fieldRefs = useRef<Partial<Record<AbacusPlace, HTMLDivElement | null>>>(
    {},
  )
  const sessionRef = useRef<Session | null>(null)

  const ghostX = useMotionValue(0)
  const ghostY = useMotionValue(0)
  const [hover, setHover] = useState<HoverKey>(null)
  const hoverRef = useRef<HoverKey>(null)

  /* Pílula "Juntou!" some sozinha depois de alguns segundos. */
  const [flashVisible, setFlashVisible] = useState(false)
  useEffect(() => {
    if (!abacus.flash) {
      setFlashVisible(false)
      return
    }
    setFlashVisible(true)
    const timer = window.setTimeout(() => setFlashVisible(false), 3500)
    return () => window.clearTimeout(timer)
  }, [abacus.flash])

  /** Mede as áreas do quadro agora (o layout pode ter mudado). */
  const measure = useCallback((): AbacusZoneRects | null => {
    const board = toRect(rootRef.current)
    if (!board) return null
    const columns: AbacusZoneRects['columns'] = {}
    const fields: AbacusZoneRects['fields'] = {}
    PLACE_ORDER.forEach((place) => {
      columns[place] = toRect(columnRefs.current[place] ?? null)
      fields[place] = toRect(fieldRefs.current[place] ?? null)
    })
    return {
      board,
      trash: toRect(trashRef.current),
      source: toRect(sourceRef.current),
      columns,
      fields,
    }
  }, [])

  const endSession = useCallback(() => {
    const session = sessionRef.current
    if (!session) return
    window.removeEventListener('pointermove', session.move)
    window.removeEventListener('pointerup', session.up)
    window.removeEventListener('pointercancel', session.cancel)
    sessionRef.current = null
    hoverRef.current = null
    setHover(null)
  }, [])

  // Se o quadro sair da tela no meio de um arraste, nada fica pendurado.
  useEffect(
    () => () => {
      if (sessionRef.current) {
        endSession()
        useAbacusStore.getState().actions.cancel()
      }
    },
    [endSession],
  )

  const handleGrab = useCallback(
    (source: AbacusPickSource, event: React.PointerEvent) => {
      if (locked || sessionRef.current || useAbacusStore.getState().abacus.drag)
        return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      const root = rootRef.current
      if (!root) return

      event.preventDefault()
      event.stopPropagation()

      const ghostRadius = readPx(root, '--ab-ghost', 60) / 2
      const disc = readPx(root, '--ab-disc', 52)
      /** Raio + respiro: o disco fica inteiro dentro da coluna/quadro. */
      const discRadius = disc / 2 + 3

      /** Posiciona o fantasma (RF-001: preso dentro do quadro) e o destaque. */
      const track = (clientX: number, clientY: number) => {
        const zones = measure()
        if (!zones) return null
        const point = { x: clientX, y: clientY }
        const clamped = clampToRect(point, zones.board, ghostRadius)
        ghostX.set(clamped.x - zones.board.left)
        ghostY.set(clamped.y - zones.board.top)
        const target = resolveDropTarget(point, zones, discRadius)
        const key = hoverKeyOf(target)
        if (hoverRef.current !== key) {
          hoverRef.current = key
          setHover(key)
        }
        return { target, zones }
      }

      const session: Session = {
        pointerId: event.pointerId,
        move: (moveEvent) => {
          if (moveEvent.pointerId !== session.pointerId) return
          moveEvent.preventDefault()
          track(moveEvent.clientX, moveEvent.clientY)
        },
        up: (upEvent) => {
          if (upEvent.pointerId !== session.pointerId) return
          const result = track(upEvent.clientX, upEvent.clientY)
          endSession()
          if (result) actions.drop(result.target, metricsOf(result.zones, disc))
          else actions.cancel()
        },
        cancel: (cancelEvent) => {
          if (cancelEvent.pointerId !== session.pointerId) return
          endSession()
          actions.cancel()
        },
      }

      sessionRef.current = session
      window.addEventListener('pointermove', session.move, { passive: false })
      window.addEventListener('pointerup', session.up)
      window.addEventListener('pointercancel', session.cancel)

      actions.pick(source)
      track(event.clientX, event.clientY)
      onDragStart?.()
    },
    [locked, measure, ghostX, ghostY, endSession, actions, onDragStart],
  )

  const columnHover = (place: AbacusPlace): 'ok' | 'no' | null => {
    if (!drag || hover !== `column-${place}`) return null
    return drag.place === place ? 'ok' : 'no'
  }

  const dragId = drag?.origin?.id ?? null
  const freeDiscs = discs.filter((disc) => disc.zone === 'free')

  return (
    <div
      ref={rootRef}
      className={[
        styles.board,
        locked ? styles.locked : '',
        drag ? styles.dragging : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      role="region"
      aria-label={locked ? 'Ábaco (travado)' : 'Ábaco'}
    >
      <div className={styles.flashWrap}>
        <AnimatePresence>
          {abacus.flash && flashVisible && (
            <motion.span
              key={abacus.flash.nonce}
              role="status"
              className={styles.flash}
              variants={variants(flash)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {abacus.flash.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={trashRef}
        className={`${styles.trash} ${
          drag && hover === 'trash' ? styles.trashHover : ''
        }`}
        data-zone="trash"
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M9 7V4.5h6V7" />
          <path d="M6.5 7l1 13h9l1-13" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
        <span>Lixeira</span>
      </div>

      {PLACE_ORDER.map((place) => (
        <Column
          key={place}
          place={place}
          discs={discs.filter((disc) => disc.zone === place)}
          hover={columnHover(place)}
          showNumerals={showNumerals}
          dragId={dragId}
          event={event}
          regroupNonce={regroupNonce}
          regroupTo={regroupTo}
          columnRef={(element) => {
            columnRefs.current[place] = element
          }}
          fieldRef={(element) => {
            fieldRefs.current[place] = element
          }}
          onGrab={handleGrab}
        />
      ))}

      <div ref={sourceRef} className={styles.sources} data-zone="source">
        <span className={styles.sourcesTitle}>POTES</span>
        {PLACE_ORDER.map((place, index) => (
          <Source
            key={place}
            place={place}
            index={index}
            showNumerals={showNumerals}
            onGrab={handleGrab}
          />
        ))}
      </div>

      {freeDiscs.map((disc, index) => (
        <BoardDisc
          key={disc.id}
          disc={disc}
          index={index}
          hidden={disc.id === dragId}
          showNumerals={showNumerals}
          event={event}
          onGrab={handleGrab}
        />
      ))}

      {drag && (
        <motion.div
          className={styles.ghost}
          style={{ x: ghostX, y: ghostY, scale: 1.15 }}
          aria-hidden="true"
          data-ghost="true"
        >
          <Disc
            place={drag.place}
            showNumeral={showNumerals}
            className={styles.ghostDisc}
            style={discStyle(drag.place, '--ab-ghost')}
          />
        </motion.div>
      )}
    </div>
  )
}
