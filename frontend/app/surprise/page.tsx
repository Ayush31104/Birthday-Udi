"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GradientBackground from "@/components/GradientBackground";
import GoldSparkles from "@/components/GoldSparkles";
import BokehLights from "@/components/BokehLights";
import FloatingPetals from "@/components/FloatingPetals";
import { pageVariants } from "@/animations/variants";

export default function SurprisePage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <GradientBackground />
      <BokehLights />
      <FloatingPetals />
      <GoldSparkles />

      <motion.div
        className="glass-warm text-center shadow-warm-xl max-w-md w-full"
        style={{ borderRadius: "24px", padding: "3rem 2.5rem" }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Gold diamond icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 2 L34 18 L18 34 L2 18 Z" fill="#D4AF97" opacity="0.85" />
              <path d="M18 7 L29 18 L18 29 L7 18 Z"  fill="#FAF6F1" opacity="0.65" />
              <path d="M18 11 L25 18 L18 25 L11 18 Z" fill="#D4AF97" opacity="0.5" />
            </svg>
          </motion.div>
        </div>

        <p
          className="text-[11px] tracking-[0.35em] uppercase mb-4"
          style={{
            color: "#A87A8A",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
          }}
        >
          Coming Soon
        </p>

        <h1
          className="text-3xl font-semibold italic mb-3"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            background: "linear-gradient(135deg, #C85A5A, #FF7F9B, #D5A6A6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Page 2 is on its way
        </h1>

        <p
          className="text-sm mb-8 leading-relaxed"
          style={{
            color: "#A87A8A",
            fontFamily: "var(--font-lora), serif",
            fontStyle: "italic",
          }}
        >
          Something beautiful is being crafted with love.
        </p>

        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 rounded-full text-sm text-white cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #C85A5A 0%, #A85555 100%)",
            boxShadow: "0 5px 22px rgba(200,90,90,0.32)",
            letterSpacing: "0.12em",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          ← Return
        </button>
      </motion.div>
    </motion.div>
  );
}
