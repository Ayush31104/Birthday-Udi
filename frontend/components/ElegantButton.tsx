"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ElegantButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ElegantButton({ onClick, children, className = "" }: ElegantButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative cursor-pointer select-none overflow-hidden
        text-white font-medium text-sm
        px-10 py-[14px] rounded-full
        ${className}`}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #A85555 0%, #C85A5A 35%, #FF7F9B 75%, #D5A6A6 100%)"
          : "linear-gradient(135deg, #C85A5A 0%, #A85555 40%, #C85A5A 100%)",
        boxShadow: isHovered
          ? "0 10px 36px rgba(200,90,90,0.5), 0 4px 12px rgba(168,85,85,0.35), inset 0 1px 0 rgba(255,255,255,0.22)"
          : "0 5px 22px rgba(200,90,90,0.32), 0 2px 6px rgba(168,85,85,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.25)",
        letterSpacing: "0.13em",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        textTransform: "uppercase",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      aria-label="Start birthday surprise"
    >
      {/* Shimmer sweep */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Top highlight line */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px rounded-full"
        style={{ background: "rgba(255,255,255,0.35)" }}
      />

      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  );
}
