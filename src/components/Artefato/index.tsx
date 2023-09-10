import { motion, useDragControls } from 'framer-motion';
import React, { useRef } from 'react';
import { styled } from 'styled-components';



interface ArtefatoProps {
}

const AreaLimite = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
const Logo = styled.h1`
`

export default function Artefato({ }: ArtefatoProps) {
  const size = 75;
  const controls = useDragControls();
  const ref = useRef(null);

  function startDrag(event: React.PointerEvent) {
    controls.start(event, { snapToCursor: true });
    console.log("event: " + event);
  }

  return (
    <AreaLimite ref={ref}>
      <div onPointerDown={startDrag} style={{ touchAction: "none" }} ></div>
      <motion.div
        drag
        dragConstraints={ref}
        dragElastic={0.90}
        dragListener={true}
        dragControls={controls}
        style={{
          zIndex: 99,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: "#ff0066",
        }}
        onMeasureDragConstraints={console.log}
      />
    </AreaLimite>
  );
}


