"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type EnvelopeProps = {
  onOpen: () => void;
};

export default function Envelope({ onOpen }: EnvelopeProps) {
    const [opening, setOpening] = useState(false);

const handleClick = () => {
  if (opening) return;

  setOpening(true);

  setTimeout(() => {
    onOpen();
  }, 1400);
};
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={
          opening
            ? {
                y: -40,
                scale: 0.96,
              }
            : {
                y: 0,
                scale: 1,
                opacity: 1,
              }
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        {/* Envelope Shadow */}
        <div className="absolute left-1/2 top-full h-8 w-72 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />

        {/* Envelope Body */}
        <motion.div
          whileHover={{
            scale: 1.03,
            y: -5,
          }}
          transition={{ duration: 0.3 }}
          className="relative h-64 w-[430px] overflow-hidden rounded-xl border border-[#e4d4b0] bg-gradient-to-b from-[#fff8ef] to-[#f4e8d3] shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
        >
          {/* Top Flap */}
          <motion.div
            animate={
              opening
                ? {
                    rotateX: -180,
                  }
                : {
                    rotateX: 0,
                  }
            }
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
              clipPath: "polygon(0 0,100% 0,50% 100%)",
            }}
            className="absolute top-0 left-0 h-36 w-full bg-[#f2e2c5]"
          />
          <motion.div
            initial={{
              y: 120,
            }}
            animate={
              opening
                ? {
                    y: -30,
                  }
                : {
                    y: 120,
                  }
            }
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
            className="absolute left-1/2 top-28 h-60 w-72 -translate-x-1/2 rounded-lg bg-[#fffdf8] shadow-xl"
          />

          {/* Bottom Left */}
          <div
            className="absolute bottom-0 left-0 h-44 w-1/2 bg-[#f8edd8]"
            style={{
              clipPath: "polygon(0 100%,100% 0,100% 100%)",
            }}
          />

          {/* Bottom Right */}
          <div
            className="absolute bottom-0 right-0 h-44 w-1/2 bg-[#f8edd8]"
            style={{
              clipPath: "polygon(0 0,100% 100%,0 100%)",
            }}
          />

          {/* Wax Seal */}
          <motion.div
            animate={
              opening
                ? {
                    scale: [1, 1.3, 0],
                    rotate: [0, 20, -40],
                    opacity: [1, 1, 0],
                  }
                : {
                    scale: [1, 1.08, 1],
                  }
            }
            transition={
              opening
                ? {
                    duration: 0.5,
                  }
                : {
                    repeat: Infinity,
                    duration: 2,
                  }
            }
            className="absolute left-1/2 top-[120px] z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-2xl text-white shadow-xl"
          >
            ❤️
          </motion.div>

          {/* Message */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute bottom-6 w-full text-center text-sm tracking-widest text-stone-700"
          >
            CLICK TO OPEN
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}