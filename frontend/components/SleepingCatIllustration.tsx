"use client";

import { motion } from "framer-motion";

export default function SleepingCatIllustration() {
  return (
    <motion.div
      className="flex justify-center items-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="220"
        height="180"
        viewBox="0 0 220 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sleeping cat illustration"
      >
        {/* Body */}
        <ellipse cx="110" cy="140" rx="75" ry="38" fill="#FFB3D1" />
        <ellipse cx="110" cy="140" rx="75" ry="38" fill="url(#bodyGrad)" />

        {/* Tail */}
        <path
          d="M180 148 Q210 130 205 110 Q200 95 188 105 Q182 115 185 130 Q188 142 180 148Z"
          fill="#FF9EC4"
        />

        {/* Head */}
        <ellipse cx="80" cy="108" rx="38" ry="34" fill="#FFB3D1" />

        {/* Cat ears */}
        <polygon points="52,88 60,62 74,88" fill="#FF9EC4" />
        <polygon points="86,88 94,62 108,88" fill="#FF9EC4" />
        <polygon points="55,88 60,68 72,88" fill="#FFD6E7" />
        <polygon points="89,88 94,68 106,88" fill="#FFD6E7" />

        {/* Sleeping eyes (curved lines) */}
        <path d="M65 108 Q70 103 75 108" stroke="#5a3e6b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M83 108 Q88 103 93 108" stroke="#5a3e6b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <ellipse cx="79" cy="115" rx="3.5" ry="2.5" fill="#FF7BAC" />

        {/* Mouth */}
        <path d="M75 118 Q79 122 83 118" stroke="#FF7BAC" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Whiskers */}
        <line x1="42" y1="113" x2="66" y2="114" stroke="#9b7bb0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="42" y1="118" x2="66" y2="117" stroke="#9b7bb0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="92" y1="114" x2="116" y2="113" stroke="#9b7bb0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="92" y1="117" x2="116" y2="118" stroke="#9b7bb0" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

        {/* Blush */}
        <ellipse cx="62" cy="120" rx="8" ry="5" fill="#FF9EC4" opacity="0.45" />
        <ellipse cx="98" cy="120" rx="8" ry="5" fill="#FF9EC4" opacity="0.45" />

        {/* Paws */}
        <ellipse cx="68" cy="155" rx="16" ry="10" fill="#FF9EC4" />
        <ellipse cx="100" cy="158" rx="16" ry="10" fill="#FF9EC4" />
        <ellipse cx="132" cy="157" rx="14" ry="9" fill="#FF9EC4" />

        {/* Paw toe details */}
        <ellipse cx="62" cy="152" rx="4" ry="3" fill="#FFB3D1" />
        <ellipse cx="68" cy="150" rx="4" ry="3" fill="#FFB3D1" />
        <ellipse cx="74" cy="152" rx="4" ry="3" fill="#FFB3D1" />

        {/* Bow on head */}
        <path d="M78 82 Q82 76 86 82 Q82 86 78 82Z" fill="#C4A8FF" />
        <path d="M86 82 Q90 76 94 82 Q90 86 86 82Z" fill="#C4A8FF" />
        <circle cx="86" cy="82" r="3" fill="#E8D9FF" />

        {/* Zzz floating */}
        <motion.text
          x="115"
          y="90"
          fontSize="14"
          fill="#C4A8FF"
          fontWeight="bold"
          fontFamily="Nunito, sans-serif"
          animate={{ opacity: [0.4, 1, 0.4], y: [90, 82, 90] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          z
        </motion.text>
        <motion.text
          x="128"
          y="76"
          fontSize="11"
          fill="#C4A8FF"
          fontWeight="bold"
          fontFamily="Nunito, sans-serif"
          animate={{ opacity: [0.3, 0.9, 0.3], y: [76, 68, 76] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          z
        </motion.text>
        <motion.text
          x="138"
          y="64"
          fontSize="8"
          fill="#C4A8FF"
          fontWeight="bold"
          fontFamily="Nunito, sans-serif"
          animate={{ opacity: [0.2, 0.7, 0.2], y: [64, 57, 64] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          z
        </motion.text>

        {/* Small hearts around */}
        <motion.path
          d="M155 75 Q157 71 159 75 Q161 71 163 75 Q163 79 159 83 Q155 79 155 75Z"
          fill="#FF9EC4"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 95 Q32 91 34 95 Q36 91 38 95 Q38 99 34 103 Q30 99 30 95Z"
          fill="#C4A8FF"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.05, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Gradient defs */}
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFD6E7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF9EC4" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
