"use client";

import { motion } from "framer-motion";
import { cardVariants } from "@/animations/variants";

interface CatCardProps {
  children: React.ReactNode;
  className?: string;
  withEars?: boolean;
  delay?: number;
}

export default function CatCard({ children, className = "", withEars = true, delay = 0 }: CatCardProps) {
  return (
    <motion.div
      className="relative"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Cat ears */}
      {withEars && (
        <div className="absolute -top-6 left-0 right-0 flex justify-between px-10 pointer-events-none">
          {/* Left ear */}
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #FF9EC4, #FFB3D1)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                borderRadius: "4px 4px 0 0",
              }}
            />
            <div
              className="absolute inset-[4px]"
              style={{
                background: "linear-gradient(135deg, #FFD6E7, #FFC0D8)",
                clipPath: "polygon(50% 15%, 10% 90%, 90% 90%)",
              }}
            />
          </div>
          {/* Right ear */}
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #C4A8FF, #D8C4FF)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                borderRadius: "4px 4px 0 0",
              }}
            />
            <div
              className="absolute inset-[4px]"
              style={{
                background: "linear-gradient(135deg, #E8D9FF, #D8C4FF)",
                clipPath: "polygon(50% 15%, 10% 90%, 90% 90%)",
              }}
            />
          </div>
        </div>
      )}

      {/* Card body */}
      <div
        className={`glass-card rounded-3xl shadow-kawaii-xl p-8 ${className}`}
        style={{ marginTop: withEars ? "12px" : "0" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
