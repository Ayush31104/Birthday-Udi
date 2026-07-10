"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function PawPrint({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill={color} opacity={0.55}>
      {/* Main pad */}
      <ellipse cx="20" cy="28" rx="9" ry="7" />
      {/* Toe pads */}
      <ellipse cx="10" cy="18" rx="4.5" ry="5" />
      <ellipse cx="20" cy="15" rx="4.5" ry="5" />
      <ellipse cx="30" cy="18" rx="4.5" ry="5" />
      <ellipse cx="6" cy="27" rx="3.5" ry="4" />
      <ellipse cx="34" cy="27" rx="3.5" ry="4" />
    </svg>
  );
}

const PAW_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  size: 18 + Math.floor(Math.random() * 16),
  delay: Math.random() * 12,
  duration: 10 + Math.random() * 8,
  color: ["#FF9EC4", "#C4A8FF", "#A8D8FF", "#FFB3D1"][Math.floor(Math.random() * 4)],
  rotate: Math.random() * 60 - 30,
}));

export default function PawTrail() {
  const paws = useMemo(() => PAW_DATA, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-4">
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          className="absolute"
          style={{ left: paw.x, top: "-50px", rotate: paw.rotate }}
          animate={{ y: ["0px", "110vh"], opacity: [0, 0.7, 0.5, 0] }}
          transition={{
            duration: paw.duration,
            repeat: Infinity,
            delay: paw.delay,
            ease: "linear",
          }}
        >
          <PawPrint size={paw.size} color={paw.color} />
        </motion.div>
      ))}
    </div>
  );
}
