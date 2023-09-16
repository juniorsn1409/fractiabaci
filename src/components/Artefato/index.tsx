// Artefato.js

import { motion, useDragControls } from 'framer-motion';
import React from 'react';

interface ArtefatoProps {
  refExterna: React.RefObject<HTMLDivElement>;
}

export default function Artefato({ refExterna }: ArtefatoProps) {
  const size = 50;
  const controls = useDragControls();

  function startDrag(event: React.PointerEvent) {
    controls.start(event, { snapToCursor: true });
    console.log("event: " + event);
  }

  return (
    <>
      <div onPointerDown={startDrag} style={{ position: "absolute", touchAction: "none" }} ></div>
      <motion.div
        drag
        dragConstraints={refExterna}
        dragElastic={0.85}
        dragListener={true}
        dragControls={controls}
        onDrag={(event, info) => console.log(info.point.x, info.point.y)}
        onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
        style={{
          zIndex: 1,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: "var(--azul-atlatico)",
        }}
        onMeasureDragConstraints={console.log}
      />
    </>
  );
}
