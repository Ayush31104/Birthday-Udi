"use client";

import { motion } from "framer-motion";

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated warm base gradient */}
      <div className="absolute inset-0 bg-warm-gradient" />

      {/* Blush pink blob — top left */}
      <motion.div
        className="absolute -top-48 -left-48 w-[650px] h-[650px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,192,203,0.45) 0%, rgba(255,228,225,0.2) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 22, 0], y: [0, 14, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Champagne/peach blob — bottom right */}
      <motion.div
        className="absolute -bottom-52 -right-52 w-[750px] h-[750px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(247,231,206,0.55) 0%, rgba(255,212,196,0.25) 50%, transparent 68%)",
          filter: "blur(10px)",
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -18, 0], y: [0, -14, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Deep rose accent — center, very subtle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,90,90,0.08) 0%, rgba(255,127,155,0.06) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Soft mauve — top right */}
      <motion.div
        className="absolute top-[8%] right-[6%] w-[380px] h-[380px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,165,165,0.22) 0%, rgba(232,213,227,0.12) 50%, transparent 70%)",
          filter: "blur(14px)",
        }}
        animate={{ scale: [1, 1.14, 1], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />

      {/* Pale pink — bottom left */}
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,228,225,0.4) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{ scale: [1, 1.18, 1], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Subtle warm noise texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
