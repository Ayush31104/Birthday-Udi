"use client";

import { motion } from "framer-motion";

const BOKEH_DATA = [
  { id: 0,  left: "5%",  top: "12%", size: 140, color: "rgba(255,192,203,0.22)", delay: 0,   duration: 9  },
  { id: 1,  left: "78%", top: "6%",  size: 200, color: "rgba(247,231,206,0.28)", delay: 2,   duration: 12 },
  { id: 2,  left: "42%", top: "70%", size: 160, color: "rgba(255,212,196,0.25)", delay: 1,   duration: 10 },
  { id: 3,  left: "86%", top: "58%", size: 110, color: "rgba(200,90,90,0.1)",    delay: 3.5, duration: 13 },
  { id: 4,  left: "18%", top: "78%", size: 180, color: "rgba(255,228,225,0.3)",  delay: 1.5, duration: 11 },
  { id: 5,  left: "62%", top: "28%", size: 100, color: "rgba(212,175,151,0.18)", delay: 4,   duration: 8  },
  { id: 6,  left: "32%", top: "4%",  size: 150, color: "rgba(255,192,203,0.2)",  delay: 0.5, duration: 14 },
  { id: 7,  left: "55%", top: "88%", size: 120, color: "rgba(247,231,206,0.22)", delay: 6,   duration: 10 },
  { id: 8,  left: "90%", top: "35%", size: 90,  color: "rgba(232,213,227,0.2)",  delay: 2.5, duration: 9  },
];

export default function BokehLights() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {BOKEH_DATA.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 72%)`,
            filter: "blur(22px)",
          }}
          animate={{
            scale:   [1, 1.15, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
