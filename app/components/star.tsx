import { motion } from 'motion/react';
import { Star as StarType, getStarPlottingDetails } from '../utils/stars';

type StarProps = {
  star: StarType;
  location: {
    latitude: number;
    longitude: number;
  };
  time: Date;
};

export default function Star({ star, location, time }: StarProps) {
  const { x, y, color, size } = getStarPlottingDetails(
    star,
    location.latitude,
    location.longitude,
    time,
  );

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
