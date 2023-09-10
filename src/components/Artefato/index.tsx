import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ArtefatoProps {
  color?: string;
}

export default function Artefato({ color = "#CF4D6F" }: ArtefatoProps) {
  const circleSize = 50;
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Atualizar o tamanho da janela quando a janela for redimensionada
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Remover o ouvinte de redimensionamento quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Adicione overflow: hidden ao elemento pai */}
      <motion.div
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: "50%",
          opacity: 0.75,
          backgroundColor: `${color}`,
          transition: "width 0.2s, height 0.2s",
          position: "absolute",
        }}
        whileHover={{ scale: 1.1 }}
        drag
        dragConstraints={{
          top: circleSize * 2,
          left: circleSize * 2,
          right: windowSize.width - circleSize * 2,
          bottom: windowSize.height - circleSize * 2,
        }}
        dragElastic={0.2}
      />
    </div>
  );
}
