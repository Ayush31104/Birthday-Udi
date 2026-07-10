"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface Heart {
  id: number;
  x: number;
  drift: number;
  size: number;
  color: string;
}

const HEART_COLORS = ["#FF9EC4", "#FF6B9D", "#C4A8FF", "#FFB3D1", "#FF7BAC"];

export function useHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const spawnHearts = useCallback((count = 6) => {
    const newHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 120 - 60,
      drift: Math.random() * 40 - 20,
      size: 12 + Math.floor(Math.random() * 14),
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((n) => n.id === h.id)));
    }, 2000);
  }, []);

  return { hearts, spawnHearts };
}

export default function HeartAnimation({ hearts }: { hearts: Heart[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-full left-1/2"
            style={{ x: heart.x }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-10, -50, -80, -110],
              x: [heart.x, heart.x + heart.drift, heart.x - heart.drift / 2, heart.x + heart.drift],
              scale: [0, 1, 0.85, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill={heart.color}>
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
