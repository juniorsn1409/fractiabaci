import { PanInfo, motion, useDragControls } from 'framer-motion'
import React, { useState } from 'react'

interface ArtefatoProps {
  tipo: string
  qtdArtefato: number
  refExterna: React.RefObject<HTMLDivElement>
  setQtdArtefato: React.Dispatch<React.SetStateAction<number>>
}

const Artefato = ({
  tipo,
  refExterna,
  qtdArtefato,
  setQtdArtefato,
}: ArtefatoProps) => {
  const size = 50
  const controls = useDragControls()
  const [isIn, setIsIn] = useState(false)

  const handleColor = (tipo: string) => {
    switch (tipo) {
      case 'unidade':
        return 'var(--vermelho-urucum)'
        break
      case 'dezena':
        return 'var(--azul-atlatico)'
        break
      case 'centena':
        return 'var(--amarelo-sol)'
        break
      default:
        return 'var(--cinza-harpia)'
        break
    }
  }

  function startDrag(event: React.PointerEvent) {
    controls.start(event, { snapToCursor: true })
  }

  const handleDragEnd = (info: PanInfo) => {
    const checkIfInside = (info: PanInfo) => {
      const casaDecimal = document.getElementById(`${tipo}`)
      if (casaDecimal) {
        const casaDecimalRect = casaDecimal.getBoundingClientRect()
        return (
          info.point.x >= casaDecimalRect.left &&
          info.point.x <= casaDecimalRect.right &&
          info.point.y >= casaDecimalRect.top &&
          info.point.y <= casaDecimalRect.bottom
        )
      }
      return false
    }

    const isInside = checkIfInside(info)
    if (isInside && !isIn && qtdArtefato < 9) {
      setIsIn(true)
      setQtdArtefato(qtdArtefato + 1)
    } else if (!isInside && isIn) {
      setIsIn(false)
      setQtdArtefato(qtdArtefato - 1)
    }
  }

  return (
    <motion.div
      drag
      onPointerDown={startDrag}
      dragConstraints={refExterna}
      dragElastic={0.0}
      dragListener={true}
      dragControls={controls}
      onDragEnd={(event, info) => {
        handleDragEnd(info)
      }}
      style={{
        touchAction: 'none',
        position: 'absolute',
        zIndex: 1,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: `${handleColor(tipo)}`,
      }}
    />
  )
}

export default Artefato
