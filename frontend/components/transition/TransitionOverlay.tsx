"use client";
import Envelope from "@/components/letter/Envelope";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  onFinish: () => void;
};

const messages = [
  "I made something just for you...",
  "Because someone as special as you deserves it.",
  "Happy Birthday ❤️",
];

export default function TransitionOverlay({ onFinish }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1800),
      setTimeout(() => setStep(2), 3600),
      setTimeout(() => onFinish(), 6500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background:
            "linear-gradient(180deg,#130e14 0%,#0c0a0f 100%)",
        }}
      />

      {/* Floating Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#F6D7A8]"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Text */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={step}
          className="absolute text-center text-white text-2xl font-serif px-10"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -30,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {messages[step]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}