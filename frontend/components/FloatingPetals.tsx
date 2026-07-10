"use client";

import { motion } from "framer-motion";

// Static seed — no Math.random() at module level (prevents SSR hydration mismatch)
const PETAL_DATA = [
  { id: 0,  left: "4%",  delay: 0,    duration: 15, size: 20, drift: 28,  colorA: "#FFC0CB", colorB: "#FF7F9B" },
  { id: 1,  left: "12%", delay: 3.5,  duration: 19, size: 15, drift: -22, colorA: "#D5A6A6", colorB: "#C85A5A" },
  { id: 2,  left: "22%", delay: 7,    duration: 17, size: 22, drift: 32,  colorA: "#FFD4C4", colorB: "#FF7F9B" },
  { id: 3,  left: "33%", delay: 1.5,  duration: 21, size: 13, drift: -30, colorA: "#FFC0CB", colorB: "#D5A6A6" },
  { id: 4,  left: "44%", delay: 5,    duration: 16, size: 18, drift: 20,  colorA: "#FF7F9B", colorB: "#A85555" },
  { id: 5,  left: "54%", delay: 9.5,  duration: 18, size: 24, drift: -26, colorA: "#FFD4C4", colorB: "#D5A6A6" },
  { id: 6,  left: "63%", delay: 2,    duration: 20, size: 14, drift: 24,  colorA: "#FFC0CB", colorB: "#C85A5A" },
  { id: 7,  left: "72%", delay: 6.5,  duration: 14, size: 19, drift: -18, colorA: "#D4A5A5", colorB: "#FF7F9B" },
  { id: 8,  left: "81%", delay: 11,   duration: 22, size: 16, drift: 30,  colorA: "#FFE4E1", colorB: "#FFC0CB" },
  { id: 9,  left: "90%", delay: 4,    duration: 17, size: 21, drift: -24, colorA: "#FF7F9B", colorB: "#D5A6A6" },
  { id: 10, left: "8%",  delay: 13,   duration: 19, size: 12, drift: 22,  colorA: "#FFC0CB", colorB: "#A85555" },
  { id: 11, left: "38%", delay: 8,    duration: 23, size: 17, drift: -28, colorA: "#FFD4C4", colorB: "#C85A5A" },
  { id: 12, left: "68%", delay: 15,   duration: 15, size: 15, drift: 18,  colorA: "#D5A6A6", colorB: "#FF7F9B" },
  { id: 13, left: "50%", delay: 10,   duration: 18, size: 20, drift: -32, colorA: "#FFC0CB", colorB: "#D4A5A5" },
  { id: 14, left: "27%", delay: 16,   duration: 20, size: 13, drift: 26,  colorA: "#FF7F9B", colorB: "#C85A5A" },
  { id: 15, left: "78%", delay: 12,   duration: 16, size: 18, drift: -20, colorA: "#FFE4E1", colorB: "#D5A6A6" },
];

function RosePetal({ size, colorA, colorB, id }: { size: number; colorA: string; colorB: string; id: number }) {
  const gradId = `petal-grad-${id}`;
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 28 38" fill="none">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={colorA} stopOpacity="0.9" />
          <stop offset="60%"  stopColor={colorB} stopOpacity="0.75" />
          <stop offset="100%" stopColor={colorB} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Petal body — organic teardrop */}
      <path
        d="M14 2 C7 2 2 9 2 16 C2 25 7 35 14 36 C21 35 26 25 26 16 C26 9 21 2 14 2Z"
        fill={`url(#${gradId})`}
      />
      {/* Central vein */}
      <path
        d="M14 4 C13.5 12 14 24 14 34"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Side veins */}
      <path d="M14 12 C11 14 8 15 6 14" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" fill="none" />
      <path d="M14 12 C17 14 20 15 22 14" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export default function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {PETAL_DATA.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.left, top: "-50px", willChange: "transform, opacity" }}
          animate={{
            y: ["0px", "112vh"],
            x: [0, petal.drift * 0.5, petal.drift, petal.drift * 0.7, petal.drift * 1.1],
            rotate: [0, 45, 110, 180, 240],
            opacity: [0, 0.75, 0.6, 0.45, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <RosePetal size={petal.size} colorA={petal.colorA} colorB={petal.colorB} id={petal.id} />
        </motion.div>
      ))}
    </div>
  );
}
