"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function CloudShape({ width, opacity }: { width: number; opacity: number }) {
  const h = width * 0.55;
  return (
    <svg width={width} height={h} viewBox="0 0 200 110" fill="none">
      <ellipse cx="100" cy="80" rx="90" ry="35" fill="white" opacity={opacity} />
      <ellipse cx="70" cy="65" rx="50" ry="40" fill="white" opacity={opacity} />
      <ellipse cx="130" cy="68" rx="45" ry="36" fill="white" opacity={opacity} />
      <ellipse cx="100" cy="58" rx="38" ry="32" fill="white" opacity={opacity} />
    </svg>
  );
}

const CLOUD_DATA = [
  { width: 180, top: "6%", delay: 0, duration: 40, opacity: 0.75 },
  { width: 130, top: "14%", delay: 10, duration: 55, opacity: 0.6 },
  { width: 220, top: "3%", delay: 20, duration: 48, opacity: 0.5 },
  { width: 100, top: "22%", delay: 5, duration: 35, opacity: 0.65 },
  { width: 160, top: "10%", delay: 30, duration: 60, opacity: 0.55 },
];

export default function Clouds() {
  const clouds = useMemo(() => CLOUD_DATA, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-3">
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: cloud.top, left: "-250px" }}
          animate={{ x: ["0px", `calc(100vw + 280px)`] }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
            delay: cloud.delay,
          }}
        >
          <CloudShape width={cloud.width} opacity={cloud.opacity} />
        </motion.div>
      ))}
    </div>
  );
}
