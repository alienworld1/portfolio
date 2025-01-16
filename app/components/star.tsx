import { motion } from 'motion/react';
import { Star as StarType } from '../utils/stars';

type StarProps = {
  star: StarType;
  x: number;
  y: number;
  color: { red: number; green: number; blue: number };
  size: number;
};

export default function Star({ x, y, color, size }: StarProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        delay: Math.random() * 2,
        repeat: Infinity,
      }}
    />
  );
}
