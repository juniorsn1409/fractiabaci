import { motion, useDragControls } from 'framer-motion';
import React, { useState } from 'react';

interface ArtefatoProps {
  tipo: String;
  qtdArtefato: number;
  refExterna: React.RefObject<HTMLDivElement>;
  setQtdArtefato: React.Dispatch<React.SetStateAction<number>>;
}

const Artefato = ({ tipo, refExterna, qtdArtefato, setQtdArtefato }: ArtefatoProps) => {
  const size = 50;
  const controls = useDragControls();
  const [isIn, setIsIn] = useState(false);

  function startDrag(event: React.PointerEvent) {
    controls.start(event, { snapToCursor: true });
  }

  const handleDragEnd = (info: any) => {
    const checkIfInside = (info: any) => {
      const casaDecimal = document.getElementById(`${tipo}`);
      if (casaDecimal) {
        const casaDecimalRect = casaDecimal.getBoundingClientRect();
        return (
          info.point.x >= casaDecimalRect.left &&
          info.point.x <= casaDecimalRect.right &&
          info.point.y >= casaDecimalRect.top &&
          info.point.y <= casaDecimalRect.bottom
        );
      }
      return false;
    };

    const isInside = checkIfInside(info);

    console.log(isInside ? "[DragEnd] Estou Dentro" : "[DragEnd] Estou Fora");

    if (isInside && !isIn && qtdArtefato < 9) {
      setIsIn(true);
      setQtdArtefato(qtdArtefato + 1);
    } else if (!isInside && isIn) {
      setIsIn(false);
      setQtdArtefato(qtdArtefato - 1);
    }
  };

  return (
    <motion.div
      drag
      onPointerDown={startDrag}
      dragConstraints={refExterna}
      dragElastic={0.0}
      dragListener={true}
      dragControls={controls}
      onDragEnd={(event, info) => {
        handleDragEnd(info);
      }}
      style={{
        touchAction: 'none',
        zIndex: 1,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'var(--azul-atlatico)',
      }}
    />
  );
}

export default Artefato;