"use client";

import { motion } from "framer-motion";
import { cardVariants } from "@/animations/variants";

interface ElegantCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ElegantCard({ children, className = "", delay = 0 }: ElegantCardProps) {
  return (
    <motion.div
      className="relative"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Ambient glow ring — breathes slowly */}
      <motion.div
        className="absolute inset-0"
        style={{ borderRadius: "24px" }}
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(200,90,90,0.15), 0 24px 72px rgba(200,90,90,0.14), 0 8px 24px rgba(213,166,166,0.12), 0 2px 6px rgba(255,127,155,0.08)",
            "0 0 0 1px rgba(200,90,90,0.25), 0 24px 72px rgba(200,90,90,0.24), 0 8px 24px rgba(213,166,166,0.2),  0 2px 6px rgba(255,127,155,0.14)",
            "0 0 0 1px rgba(200,90,90,0.15), 0 24px 72px rgba(200,90,90,0.14), 0 8px 24px rgba(213,166,166,0.12), 0 2px 6px rgba(255,127,155,0.08)",
          ],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card body */}
      <div
        className={`glass-warm p-8 sm:p-10 ${className}`}
        style={{ borderRadius: "24px" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
