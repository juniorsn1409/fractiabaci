import { motion } from "framer-motion";

interface InteractiveObjectProps {
  color?: string;
  parentWidth: number; // Pass the parent width from CasaDecimal
  parentHeight: number; // Pass the parent height from CasaDecimal
}

export function InteractiveObject({ color, parentWidth, parentHeight }: InteractiveObjectProps) {
  const circleSize = 50;

  return (
    <motion.div
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: "50%",
        opacity: 0.75,
        backgroundColor: `${color}`,
        transition: "width 0.2s, height 0.2s",
        position: "absolute", // Add position absolute
      }}
      whileHover={{ scale: 1.1 }}
      drag
      dragConstraints={{
        top: 10,
        left: 10,
        right: parentWidth,
        bottom: parentHeight,
      }}
      dragElastic={0.2}
    />
  );
}
