"use client";

import { motion } from "framer-motion";

export default function BirthdayCake() {
  return (
    <motion.div
      className="flex justify-center items-center relative"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ willChange: "transform" }}
      aria-label="Elegant birthday cake"
    >
      {/* Warm ambient glow behind cake */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "260px",
          height: "200px",
          background: "radial-gradient(ellipse, rgba(200,90,90,0.14) 0%, rgba(255,127,155,0.08) 50%, transparent 70%)",
          filter: "blur(28px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        width="240"
        height="265"
        viewBox="0 0 240 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tier gradients — warm rose to burgundy */}
          <linearGradient id="ck-tier1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FAF6F1" />
            <stop offset="50%"  stopColor="#FFE4E1" />
            <stop offset="100%" stopColor="#FFC0CB" />
          </linearGradient>
          <linearGradient id="ck-tier2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFC0CB" />
            <stop offset="50%"  stopColor="#FF7F9B" />
            <stop offset="100%" stopColor="#D5A6A6" />
          </linearGradient>
          <linearGradient id="ck-tier3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#D5A6A6" />
            <stop offset="50%"  stopColor="#C85A5A" />
            <stop offset="100%" stopColor="#A85555" />
          </linearGradient>
          <linearGradient id="ck-frosting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#FFFDFB" />
            <stop offset="100%" stopColor="#FAF6F1" />
          </linearGradient>
          <linearGradient id="ck-plate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#F7E7CE" />
            <stop offset="100%" stopColor="#D4AF97" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="ck-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#A85555" />
            <stop offset="35%"  stopColor="#D4AF97" />
            <stop offset="65%"  stopColor="#F7E7CE" />
            <stop offset="100%" stopColor="#D4AF97" />
          </linearGradient>
          <linearGradient id="ck-candle1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#FAF6F1" />
            <stop offset="100%" stopColor="#FFE4E1" />
          </linearGradient>
          <linearGradient id="ck-candle2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#FFE4E1" />
            <stop offset="100%" stopColor="#FFC0CB" />
          </linearGradient>
          <filter id="ck-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#C85A5A" floodOpacity="0.15" />
          </filter>
          <filter id="ck-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Plate ── */}
        <ellipse cx="120" cy="242" rx="80" ry="13" fill="url(#ck-plate)" opacity="0.65" />
        <ellipse cx="120" cy="240" rx="76" ry="9"  fill="url(#ck-gold)"  opacity="0.55" />

        {/* ── Bottom tier ── */}
        <rect x="42" y="188" width="156" height="48" rx="7" fill="url(#ck-tier1)" filter="url(#ck-shadow)" />
        <ellipse cx="120" cy="188" rx="78" ry="11" fill="url(#ck-frosting)" />
        {/* Frosting drips */}
        {[58, 76, 94, 112, 130, 148, 166, 182].map((x, i) => (
          <path key={i} d={`M${x} 188 Q${x+4} 200 ${x} 206 Q${x-4} 200 ${x} 188`}
            fill="#FFFDFB" opacity="0.82" />
        ))}
        {/* Gold band */}
        <rect x="42" y="210" width="156" height="3.5" rx="1.75" fill="url(#ck-gold)" opacity="0.65" />
        {/* Pearl dots */}
        {[60, 80, 100, 120, 140, 160, 178].map((x, i) => (
          <circle key={i} cx={x} cy="222" r="2.8" fill="#D4AF97" opacity="0.85" />
        ))}
        {/* Subtle side shadow */}
        <rect x="42" y="188" width="8" height="48" rx="4" fill="rgba(168,85,85,0.08)" />
        <rect x="190" y="188" width="8" height="48" rx="4" fill="rgba(168,85,85,0.06)" />

        {/* ── Middle tier ── */}
        <rect x="66" y="138" width="108" height="52" rx="6" fill="url(#ck-tier2)" filter="url(#ck-shadow)" />
        <ellipse cx="120" cy="138" rx="54" ry="9" fill="url(#ck-frosting)" />
        {[78, 94, 110, 126, 142, 158, 172].map((x, i) => (
          <path key={i} d={`M${x} 138 Q${x+3} 149 ${x} 154 Q${x-3} 149 ${x} 138`}
            fill="#FFFDFB" opacity="0.78" />
        ))}
        <rect x="66" y="158" width="108" height="3" rx="1.5" fill="url(#ck-gold)" opacity="0.6" />
        {[80, 100, 120, 140, 160].map((x, i) => (
          <circle key={i} cx={x} cy="170" r="2.2" fill="#D4AF97" opacity="0.8" />
        ))}
        <rect x="66" y="138" width="7" height="52" rx="3.5" fill="rgba(168,85,85,0.1)" />
        <rect x="167" y="138" width="7" height="52" rx="3.5" fill="rgba(168,85,85,0.07)" />

        {/* ── Top tier ── */}
        <rect x="88" y="96" width="64" height="44" rx="5" fill="url(#ck-tier3)" filter="url(#ck-shadow)" />
        <ellipse cx="120" cy="96" rx="32" ry="7" fill="url(#ck-frosting)" />
        {[94, 106, 118, 130, 142].map((x, i) => (
          <path key={i} d={`M${x} 96 Q${x+3} 106 ${x} 111 Q${x-3} 106 ${x} 96`}
            fill="#FFFDFB" opacity="0.78" />
        ))}
        <rect x="88" y="114" width="64" height="2.5" rx="1.2" fill="url(#ck-gold)" opacity="0.55" />
        <rect x="88" y="96" width="6" height="44" rx="3" fill="rgba(168,85,85,0.12)" />
        <rect x="146" y="96" width="6" height="44" rx="3" fill="rgba(168,85,85,0.08)" />

        {/* ── Flowers on top ── */}
        {/* Center flower — white */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const r = (angle * Math.PI) / 180;
          return (
            <ellipse key={i} cx={120 + Math.cos(r) * 8} cy={96 + Math.sin(r) * 6}
              rx="4.5" ry="3.2" fill="#FFFDFB" opacity="0.95"
              transform={`rotate(${angle}, ${120 + Math.cos(r) * 8}, ${96 + Math.sin(r) * 6})`}
            />
          );
        })}
        <circle cx="120" cy="96" r="3.5" fill="#D4AF97" opacity="0.95" />

        {/* Left flower — blush */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const r = (angle * Math.PI) / 180;
          return (
            <ellipse key={i} cx={96 + Math.cos(r) * 5.5} cy={106 + Math.sin(r) * 4.5}
              rx="3.2" ry="2.4" fill="#FFC0CB" opacity="0.9"
              transform={`rotate(${angle}, ${96 + Math.cos(r) * 5.5}, ${106 + Math.sin(r) * 4.5})`}
            />
          );
        })}
        <circle cx="96" cy="106" r="2.2" fill="#C85A5A" opacity="0.85" />

        {/* Right flower — blush */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const r = (angle * Math.PI) / 180;
          return (
            <ellipse key={i} cx={144 + Math.cos(r) * 5.5} cy={106 + Math.sin(r) * 4.5}
              rx="3.2" ry="2.4" fill="#FFC0CB" opacity="0.9"
              transform={`rotate(${angle}, ${144 + Math.cos(r) * 5.5}, ${106 + Math.sin(r) * 4.5})`}
            />
          );
        })}
        <circle cx="144" cy="106" r="2.2" fill="#C85A5A" opacity="0.85" />

        {/* Leaf accents */}
        <path d="M108 92 Q103 85 110 83 Q113 89 108 92Z" fill="#B8C8A0" opacity="0.65" />
        <path d="M132 92 Q137 85 130 83 Q127 89 132 92Z" fill="#B8C8A0" opacity="0.65" />

        {/* ── Candles ── */}
        <rect x="103" y="68" width="8"  height="28" rx="4"   fill="url(#ck-candle1)" />
        <rect x="103" y="68" width="8"  height="28" rx="4"   fill="url(#ck-gold)" opacity="0.2" />
        <rect x="116" y="63" width="8"  height="33" rx="4"   fill="url(#ck-candle2)" />
        <rect x="116" y="63" width="8"  height="33" rx="4"   fill="url(#ck-gold)" opacity="0.18" />
        <rect x="129" y="68" width="8"  height="28" rx="4"   fill="url(#ck-candle1)" />
        <rect x="129" y="68" width="8"  height="28" rx="4"   fill="url(#ck-gold)" opacity="0.2" />

        {/* ── Flames ── */}
        <motion.g
          animate={{ scaleY: [1, 1.18, 0.88, 1.12, 1], scaleX: [1, 0.88, 1.06, 0.94, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "107px 66px" }}
        >
          <ellipse cx="107" cy="64" rx="4"   ry="5.5" fill="#FF7F9B" opacity="0.88" />
          <ellipse cx="107" cy="62" rx="2.2" ry="3.2" fill="#FAF6F1" opacity="0.95" />
          <ellipse cx="107" cy="61" rx="1.1" ry="1.6" fill="#D4AF97" />
        </motion.g>

        <motion.g
          animate={{ scaleY: [1, 1.22, 0.84, 1.16, 1], scaleX: [1, 0.86, 1.1, 0.9, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          style={{ transformOrigin: "120px 61px" }}
        >
          <ellipse cx="120" cy="59" rx="4.2" ry="6.2" fill="#FF7F9B" opacity="0.9" />
          <ellipse cx="120" cy="57" rx="2.4" ry="3.8" fill="#FAF6F1" opacity="0.95" />
          <ellipse cx="120" cy="56" rx="1.2" ry="2"   fill="#D4AF97" />
        </motion.g>

        <motion.g
          animate={{ scaleY: [1, 1.14, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          style={{ transformOrigin: "133px 66px" }}
        >
          <ellipse cx="133" cy="64" rx="4"   ry="5.5" fill="#FF7F9B" opacity="0.88" />
          <ellipse cx="133" cy="62" rx="2.2" ry="3.2" fill="#FAF6F1" opacity="0.95" />
          <ellipse cx="133" cy="61" rx="1.1" ry="1.6" fill="#D4AF97" />
        </motion.g>

        {/* Flame halos */}
        <motion.ellipse cx="107" cy="63" rx="7" ry="8" fill="#C85A5A" opacity="0.1"
          animate={{ opacity: [0.06, 0.18, 0.06] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse cx="120" cy="58" rx="8" ry="9" fill="#C85A5A" opacity="0.1"
          animate={{ opacity: [0.06, 0.22, 0.06] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.ellipse cx="133" cy="63" rx="7" ry="8" fill="#C85A5A" opacity="0.1"
          animate={{ opacity: [0.06, 0.16, 0.06] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Ground shadow */}
        <ellipse cx="120" cy="246" rx="72" ry="8" fill="rgba(168,85,85,0.1)" />
      </svg>
    </motion.div>
  );
}
