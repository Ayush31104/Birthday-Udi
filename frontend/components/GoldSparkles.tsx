"use client";

import { motion } from "framer-motion";

const SPARKLE_DATA = [
  { id: 0,  x: "4%",  y: "10%", size: 7,  delay: 0,    duration: 2.6, color: "#D4AF97" },
  { id: 1,  x: "13%", y: "32%", size: 5,  delay: 0.9,  duration: 3.2, color: "#C85A5A" },
  { id: 2,  x: "21%", y: "65%", size: 8,  delay: 1.7,  duration: 2.1, color: "#D4AF97" },
  { id: 3,  x: "30%", y: "18%", size: 5,  delay: 0.4,  duration: 2.9, color: "#FF7F9B" },
  { id: 4,  x: "41%", y: "80%", size: 4,  delay: 2.2,  duration: 3.5, color: "#D4AF97" },
  { id: 5,  x: "52%", y: "7%",  size: 9,  delay: 0.7,  duration: 2.3, color: "#C85A5A" },
  { id: 6,  x: "60%", y: "52%", size: 5,  delay: 1.5,  duration: 3.0, color: "#D4AF97" },
  { id: 7,  x: "69%", y: "26%", size: 7,  delay: 2.6,  duration: 2.7, color: "#FF7F9B" },
  { id: 8,  x: "77%", y: "72%", size: 4,  delay: 1.0,  duration: 3.3, color: "#D4AF97" },
  { id: 9,  x: "86%", y: "40%", size: 8,  delay: 1.9,  duration: 2.2, color: "#C85A5A" },
  { id: 10, x: "93%", y: "14%", size: 5,  delay: 0.5,  duration: 2.8, color: "#D4AF97" },
  { id: 11, x: "8%",  y: "86%", size: 4,  delay: 3.1,  duration: 3.6, color: "#FF7F9B" },
  { id: 12, x: "47%", y: "44%", size: 6,  delay: 1.3,  duration: 2.4, color: "#D4AF97" },
  { id: 13, x: "34%", y: "58%", size: 5,  delay: 2.9,  duration: 3.0, color: "#C85A5A" },
  { id: 14, x: "64%", y: "88%", size: 4,  delay: 0.8,  duration: 3.1, color: "#D4AF97" },
  { id: 15, x: "81%", y: "5%",  size: 7,  delay: 1.6,  duration: 2.6, color: "#FF7F9B" },
  { id: 16, x: "25%", y: "45%", size: 5,  delay: 3.4,  duration: 2.9, color: "#D4AF97" },
  { id: 17, x: "72%", y: "60%", size: 6,  delay: 0.2,  duration: 2.5, color: "#C85A5A" },
];

function Sparkle({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* Four-pointed star */}
      <path
        d="M10 1 L11.4 8.6 L19 10 L11.4 11.4 L10 19 L8.6 11.4 L1 10 L8.6 8.6 Z"
        fill={color}
        opacity="0.88"
      />
      {/* Inner highlight */}
      <path
        d="M10 4 L10.8 9.2 L16 10 L10.8 10.8 L10 16 L9.2 10.8 L4 10 L9.2 9.2 Z"
        fill="rgba(255,255,255,0.4)"
      />
    </svg>
  );
}

export default function GoldSparkles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {SPARKLE_DATA.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            opacity: [0, 1, 0],
            scale:   [0, 1.1, 0],
            rotate:  [0, 45, 90],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkle size={s.size} color={s.color} />
        </motion.div>
      ))}
    </div>
  );
}
