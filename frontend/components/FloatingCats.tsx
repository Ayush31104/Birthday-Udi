"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Inline SVG kawaii cat face
function KawaiiCat({ size = 48, color = "#FF9EC4", sleeping = false }: { size?: number; color?: string; sleeping?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cat ears */}
      <polygon points="6,22 14,6 22,22" fill={color} />
      <polygon points="38,22 46,6 54,22" fill={color} />
      <polygon points="9,22 14,10 19,22" fill="#FFB3D1" />
      <polygon points="41,22 46,10 51,22" fill="#FFB3D1" />
      {/* Head */}
      <ellipse cx="30" cy="36" rx="22" ry="20" fill={color} />
      {/* Face */}
      {sleeping ? (
        <>
          {/* Sleeping eyes */}
          <path d="M20 34 Q23 31 26 34" stroke="#5a3e6b" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M34 34 Q37 31 40 34" stroke="#5a3e6b" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Zzz */}
          <text x="44" y="22" fontSize="8" fill="#C4A8FF" fontWeight="bold">z</text>
          <text x="48" y="16" fontSize="6" fill="#C4A8FF" fontWeight="bold">z</text>
        </>
      ) : (
        <>
          {/* Eyes */}
          <ellipse cx="22" cy="34" rx="4" ry="4.5" fill="#5a3e6b" />
          <ellipse cx="38" cy="34" rx="4" ry="4.5" fill="#5a3e6b" />
          <ellipse cx="23" cy="32.5" rx="1.5" ry="1.5" fill="white" />
          <ellipse cx="39" cy="32.5" rx="1.5" ry="1.5" fill="white" />
        </>
      )}
      {/* Nose */}
      <ellipse cx="30" cy="40" rx="2.5" ry="2" fill="#FF7BAC" />
      {/* Mouth */}
      <path d="M27 42 Q30 45 33 42" stroke="#FF7BAC" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Whiskers */}
      <line x1="8" y1="39" x2="22" y2="40" stroke="#9b7bb0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="8" y1="43" x2="22" y2="42" stroke="#9b7bb0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="40" x2="52" y2="39" stroke="#9b7bb0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="38" y1="42" x2="52" y2="43" stroke="#9b7bb0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Blush */}
      <ellipse cx="18" cy="42" rx="5" ry="3" fill="#FFB3D1" opacity="0.5" />
      <ellipse cx="42" cy="42" rx="5" ry="3" fill="#FFB3D1" opacity="0.5" />
    </svg>
  );
}

const CAT_CONFIGS = [
  { size: 44, color: "#FF9EC4", top: "8%", delay: 0, duration: 22, sleeping: false },
  { size: 36, color: "#C4A8FF", top: "20%", delay: 4, duration: 28, sleeping: true },
  { size: 52, color: "#FFB3D1", top: "55%", delay: 8, duration: 20, sleeping: false },
  { size: 38, color: "#A8D8FF", top: "75%", delay: 2, duration: 25, sleeping: true },
  { size: 42, color: "#FF9EC4", top: "40%", delay: 12, duration: 30, sleeping: false },
  { size: 30, color: "#C4A8FF", top: "88%", delay: 6, duration: 18, sleeping: true },
];

export default function FloatingCats() {
  const cats = useMemo(() => CAT_CONFIGS, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {cats.map((cat, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: cat.top, left: "-80px" }}
          animate={{
            x: ["0px", `calc(100vw + 120px)`],
            y: [0, -20, 10, -15, 0],
          }}
          transition={{
            x: { duration: cat.duration, repeat: Infinity, ease: "linear", delay: cat.delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: cat.delay },
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <KawaiiCat size={cat.size} color={cat.color} sleeping={cat.sleeping} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
