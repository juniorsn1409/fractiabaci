import { motion, useDragControls } from 'framer-motion';
import React from 'react';

interface ArtefatoProps {
  qtdArtefato: number; // Alterado para o tipo 'number'
  refExterna: React.RefObject<HTMLDivElement>;
  setQtdArtefato: React.Dispatch<React.SetStateAction<number>>;
}

export default function Artefato({ refExterna, qtdArtefato, setQtdArtefato }: ArtefatoProps) {
  const size = 50;
  var isInCasaDecimal: boolean = false;
  var beforeIsInCasaDecimal: boolean = false
  const controls = useDragControls();

  function startDrag(event: React.PointerEvent) {
    controls.start(event, { snapToCursor: true });
    console.log("event: " + event);
  }

  const handlerDragEnd = (info: any) => {
    console.log("[dragEnd] verificando se info existe: ")
    console.log("info: " + info)
    console.log("info.point: " + info.point)
    if (info && info.point) {
      const casaDecimal = document.getElementById('casaDecimal');
      console.log("[dragEnd] info existe!");
      console.log("[dragEnd] se casaDecimal existe: " + casaDecimal)
      if (casaDecimal) {
        console.log("[dragEnd] casaDecimal existe!")
        const casaDecimalRect = casaDecimal.getBoundingClientRect();
        console.log("[dragEnd]  verificando se estamos dentro!")
        if (
          info.point.x >= casaDecimalRect.left &&
          info.point.x <= casaDecimalRect.right &&
          info.point.y >= casaDecimalRect.top &&
          info.point.y <= casaDecimalRect.bottom
        ) {
          console.log("[dragEnd] estamos dentro!")
          beforeIsInCasaDecimal = isInCasaDecimal
          isInCasaDecimal = true
        } else {
          console.log("[dragEnd] estamos fora!")
          beforeIsInCasaDecimal = isInCasaDecimal
          isInCasaDecimal = false
        }

        console.log("[dragEnd][Verificação]")
        console.log("beforeIsInCasaDecimal: " + beforeIsInCasaDecimal)
        console.log("isInCasaDecimal: " + isInCasaDecimal)

        verificandoCondicaoParaArtefato(beforeIsInCasaDecimal, isInCasaDecimal);
        setQtdArtefato(qtdArtefato + 1)
      }
    }
  };

  const verificandoCondicaoParaArtefato = (before: boolean, actual: boolean) => {

  }

  return (
    <>
      <motion.div
        drag
        onPointerDown={startDrag}
        dragConstraints={refExterna}
        dragElastic={0.85}
        dragListener={true}
        dragControls={controls}
        // onDragEnd={handlerDragEnd(event, info)}
        onDrag={(event, info) => console.log(info.point.x, info.point.y)}
        onDragEnd={(event, info) => {
          handlerDragEnd(info)
          console.log(info.point.x, info.point.y);
        }}
        style={{
          touchAction: 'none',
          zIndex: 1,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: "var(--azul-atlatico)",
        }}
      />
    </>
  );
}
