"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function StarShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20.5 L12 16.5 L7.5 20.5 L9.5 13.5 L4 9 L10.5 9 Z" />
    </svg>
  );
}

function DiamondSparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
    </svg>
  );
}

const SPARKLE_DATA = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 8 + Math.floor(Math.random() * 14),
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
  type: Math.random() > 0.5 ? "star" : "diamond",
  color: ["#FF9EC4", "#C4A8FF", "#A8D8FF", "#FFB347", "#FFD6E7"][Math.floor(Math.random() * 5)],
}));

export default function Sparkles() {
  const sparkles = useMemo(() => SPARKLE_DATA, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-4">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          {s.type === "star" ? (
            <StarShape size={s.size} color={s.color} />
          ) : (
            <DiamondSparkle size={s.size} color={s.color} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
