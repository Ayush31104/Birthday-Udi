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
      className={`relative cursor-pointer select-none overflow-hidden text-white
        px-6 py-[12px] sm:px-10 sm:py-[13px] rounded-full border border-white/30
        text-[12px] sm:text-[16px] ${className}`}
      style={{
        background: isHovered
          ? "linear-gradient(135deg, rgba(255,127,155,0.96) 0%, rgba(200,90,90,0.95) 40%, rgba(168,85,85,0.95) 100%)"
          : "linear-gradient(135deg, rgba(200,90,90,0.92) 0%, rgba(168,85,85,0.92) 45%, rgba(213,166,166,0.95) 100%)",
        boxShadow: isHovered
          ? "0 14px 40px rgba(200,90,90,0.32), inset 0 1px 0 rgba(255,255,255,0.24)"
          : "0 10px 30px rgba(200,90,90,0.22), inset 0 1px 0 rgba(255,255,255,0.18)",
        letterSpacing: "0.15em",
        fontFamily: "var(--font-poppins), system-ui, sans-serif",
        fontWeight: 500,
        textTransform: "uppercase",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      aria-label="Start birthday surprise"
    >
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

      <div
        className="absolute top-0 left-[15%] right-[15%] h-px rounded-full"
        style={{ background: "rgba(255,255,255,0.34)" }}
      />

      <motion.span
        className="relative z-10 flex items-center justify-center gap-3"
        animate={{ x: isHovered ? 3 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
