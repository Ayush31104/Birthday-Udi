"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { LETTER } from "@/lib/birthdayData";

type Props = {
  onClose: () => void;
};

export default function LetterPaper({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="
          relative
          w-full
          max-w-[360px]
sm:max-w-2xl
          h-[82vh]
          sm:h-[90vh]
          max-h-[750px]
          flex
          flex-col
          overflow-hidden
          rounded-[36px]
          border
          border-[#e7d8b8]
          bg-gradient-to-b
          from-[#fffdf8]
          via-[#faf5eb]
          to-[#f2e8d8]
          shadow-[0_35px_120px_rgba(0,0,0,.18)]
        "
        initial={{
          y: 80,
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] z-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0,0,0,0.08) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "18px 18px",
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            sm:top-6
sm:right-6
h-9
w-9
sm:h-10
sm:w-10
            z-40
            flex
            items-center
            justify-center
            rounded-full
            border
            border-[#eadcc4]
            bg-[#fffaf3]
            text-[#6a5340]
            shadow-md
            transition
            hover:scale-105
            hover:bg-white
          "
        >
          ✕
        </button>

        {/* 1. HEADER SECTION (Fixed inside border) */}
        <div className="relative px-5 sm:px-16 pt-12 pb-2 text-center shrink-0 z-20">
          <h2
            className="
              mx-auto
              max-w-[580px]
              text-lg
sm:text-2xl
lg:text-3xl
              font-serif
              italic
              leading-tight
              text-[#6b5441]
            "
            style={{ paddingLeft: 0 }}
          >
            {LETTER.heading}
          </h2>
          <div className="mx-auto mt-4 h-px w-44 bg-gradient-to-r from-transparent via-[#d7bc83] to-transparent" />
        </div>

        {/* 2. SCROLLABLE INNER BODY CONTENT */}
        <div className="overflow-y-auto flex-1 z-20 px-8 sm:px-16 my-2">
          <div className="mx-auto w-full max-w-[580px] py-4">
            {/* Greeting */}
            <p
              className="
                mb-6
                text-center
sm:text-left
                text-lg
sm:text-xl
                font-['Great_Vibes']
                text-[#6b4e3c]
              "
              style={{ paddingLeft: 0 }}
            >
              Dear Udi,
            </p>

            {/* Letter Body Paragraphs */}
            {LETTER.body.split("\n\n").map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className="
                  mb-6
                  text-justify
                  font-serif
                 text-[13px]
sm:text-[15px]
                  leading-7
sm:leading-[1.9]
                  tracking-[0.01em]
                  text-[#4f4032]
                  first-line:indent-0
sm:first-line:indent-8
                "
                style={{ paddingLeft: 0 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* 3. FOOTER SIGNATURE SECTION (Fixed inside border at bottom) */}
        <div className="relative px-5 sm:px-10 pt-2 pb-10 text-center sm:text-right shrink-0 z-20 bg-gradient-to-t from-[#f2e8d8]/80 to-transparent">
          <div className="mx-auto w-full max-w-[580px]">
            <p className="text-xs sm:text-sm text-[#6b4e3c] italic">
              Yours Truly,
            </p>
            <p className="mt-1 text-lg sm:text-2xl font-['Great_Vibes'] text-[#6b4e3c]">
              Ayush ❤️
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}