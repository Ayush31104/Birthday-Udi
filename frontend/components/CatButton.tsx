"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeartAnimation, { useHearts } from "./HeartAnimation";

interface CatButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

function PawPrintSmall({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, rotate }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0.8] }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <svg width="14" height="14" viewBox="0 0 40 40" fill="white" opacity={0.85}>
        <ellipse cx="20" cy="28" rx="9" ry="7" />
        <ellipse cx="10" cy="18" rx="4.5" ry="5" />
        <ellipse cx="20" cy="15" rx="4.5" ry="5" />
        <ellipse cx="30" cy="18" rx="4.5" ry="5" />
        <ellipse cx="6" cy="27" rx="3.5" ry="4" />
        <ellipse cx="34" cy="27" rx="3.5" ry="4" />
      </svg>
    </motion.div>
  );
}

export default function CatButton({ onClick, children, className = "" }: CatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [paws, setPaws] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);
  const { hearts, spawnHearts } = useHearts();

  const handleHoverStart = () => {
    setIsHovered(true);
    // Spawn paw prints
    const newPaws = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 180 - 20,
      y: Math.random() * 40 - 10,
      rotate: Math.random() * 60 - 30,
    }));
    setPaws(newPaws);
    setTimeout(() => setPaws([]), 800);
  };

  const handleClick = () => {
    spawnHearts(8);
    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <motion.button
        className={`relative overflow-visible cursor-pointer select-none
          bg-gradient-to-r from-[#FF9EC4] to-[#C4A8FF]
          text-white font-bold text-lg px-10 py-4 rounded-full
          shadow-kawaii-lg border-2 border-white/40
          ${className}`}
        onHoverStart={handleHoverStart}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{
          scale: 1.08,
          y: -4,
          boxShadow: "0 0 40px rgba(255, 158, 196, 0.7), 0 0 80px rgba(196, 168, 255, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        aria-label="Birthday surprise button"
      >
        {/* Glow ring on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              style={{
                background: "transparent",
                border: "2px solid rgba(255, 158, 196, 0.6)",
                boxShadow: "0 0 20px rgba(255, 158, 196, 0.5)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Button text */}
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Paw prints on hover */}
        {paws.map((paw) => (
          <PawPrintSmall key={paw.id} x={paw.x} y={paw.y} rotate={paw.rotate} />
        ))}
      </motion.button>

      {/* Hearts burst on click */}
      <HeartAnimation hearts={hearts} />
    </div>
  );
}
