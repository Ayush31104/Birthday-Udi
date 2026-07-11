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
      <motion.div
        className="absolute inset-0"
        style={{ borderRadius: "32px" }}
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(200,90,90,0.16), 0 26px 84px rgba(200,90,90,0.15), 0 10px 28px rgba(213,166,166,0.16), 0 2px 8px rgba(255,127,155,0.1)",
            "0 0 0 1px rgba(200,90,90,0.24), 0 30px 92px rgba(200,90,90,0.2), 0 14px 36px rgba(213,166,166,0.2), 0 4px 16px rgba(255,127,155,0.14)",
            "0 0 0 1px rgba(200,90,90,0.16), 0 26px 84px rgba(200,90,90,0.15), 0 10px 28px rgba(213,166,166,0.16), 0 2px 8px rgba(255,127,155,0.1)",
          ],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className={`glass-warm px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9 ${className}`}
        style={{
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0 20px 60px rgba(200,90,90,0.12)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
