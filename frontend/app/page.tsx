"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GradientBackground from "@/components/GradientBackground";
import FloatingPetals from "@/components/FloatingPetals";
import GoldSparkles from "@/components/GoldSparkles";
import BokehLights from "@/components/BokehLights";
import ElegantButton from "@/components/ElegantButton";
import ElegantCard from "@/components/ElegantCard";
import BirthdayCake from "@/components/BirthdayCake";
import PageTransition from "@/components/PageTransition";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { BIRTHDAY_NAME } from "@/lib/constants";
import { useParallax } from "@/hooks/useParallax";

// Ornamental divider — thin lines + diamond
function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Left line with dots */}
      <div className="flex items-center gap-1.5 flex-1">
        <div className="divider-warm flex-1" />
        <div className="w-1 h-1 rounded-full" style={{ background: "#D4AF97", opacity: 0.6 }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C85A5A", opacity: 0.5 }} />
      </div>
      {/* Center diamond */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#D4AF97" opacity="0.8" />
        <path d="M6 2.5 L9.5 6 L6 9.5 L2.5 6 Z" fill="#FAF6F1" opacity="0.7" />
      </svg>
      {/* Right line with dots */}
      <div className="flex items-center gap-1.5 flex-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C85A5A", opacity: 0.5 }} />
        <div className="w-1 h-1 rounded-full" style={{ background: "#D4AF97", opacity: 0.6 }} />
        <div className="divider-warm flex-1" />
      </div>
    </div>
  );
}

// Corner floral ornaments
function CornerOrnaments() {
  const corners = [
    { top: "5%",  left: "3%",  rotate: 0,   delay: 0   },
    { top: "5%",  right: "3%", rotate: 90,  delay: 1.2 },
    { top: "88%", left: "3%",  rotate: 270, delay: 0.6 },
    { top: "88%", right: "3%", rotate: 180, delay: 1.8 },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none select-none"
          style={{
            top: c.top,
            left: (c as { left?: string }).left,
            right: (c as { right?: string }).right,
            opacity: 0.14,
          }}
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
            style={{ transform: `rotate(${c.rotate}deg)` }}>
            {/* Corner bracket */}
            <path d="M4 4 L4 20 M4 4 L20 4" stroke="#C85A5A" strokeWidth="1.5" strokeLinecap="round" />
            {/* Small flower */}
            {[0, 72, 144, 216, 288].map((a, j) => {
              const r = (a * Math.PI) / 180;
              return (
                <ellipse key={j}
                  cx={36 + Math.cos(r) * 7} cy={36 + Math.sin(r) * 7}
                  rx="4" ry="2.8" fill="#D5A6A6"
                  transform={`rotate(${a}, ${36 + Math.cos(r) * 7}, ${36 + Math.sin(r) * 7})`}
                />
              );
            })}
            <circle cx="36" cy="36" r="3" fill="#D4AF97" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { x: springX, y: springY } = useParallax(0.01);

  const handleStart = () => {
    setTimeout(() => router.push("/surprise"), 300);
  };

  return (
    <PageTransition>
      {/* Background layers */}
      <GradientBackground />
      <BokehLights />
      <FloatingPetals />
      <GoldSparkles />
      <CornerOrnaments />

      {/* Main content */}
      <main className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          style={{ x: springX, y: springY }}
          className="w-full max-w-[500px]"
        >
          <ElegantCard className="text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center gap-6"
            >

              {/* Eyebrow label */}
              <motion.div variants={staggerItem} className="flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: "rgba(200,90,90,0.35)" }} />
                <span
                  className="text-[11px] tracking-[0.35em] uppercase"
                  style={{
                    color: "#A87A8A",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 500,
                  }}
                >
                  A Birthday Surprise
                </span>
                <div className="w-8 h-px" style={{ background: "rgba(200,90,90,0.35)" }} />
              </motion.div>

              {/* Main heading */}
              <motion.div variants={staggerItem} className="space-y-1">
                <h1
                  className="text-3xl sm:text-[2.6rem] font-normal leading-snug"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    color: "#7A4A5A",
                    letterSpacing: "0.015em",
                  }}
                >
                  Happy Birthday,
                </h1>
                <motion.h2
                  className="text-5xl sm:text-[3.8rem] font-semibold italic leading-tight"
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                    background: "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 45%, #D5A6A6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.01em",
                  }}
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {BIRTHDAY_NAME}
                </motion.h2>
              </motion.div>

              {/* Ornamental divider */}
              <motion.div variants={staggerItem} className="w-full px-1">
                <OrnamentalDivider />
              </motion.div>

              {/* Subtitle copy */}
              <motion.div variants={staggerItem} className="space-y-2 px-3">
                <p
                  className="text-[15px] leading-[1.8]"
                  style={{
                    color: "#7A4A5A",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Today is all about celebrating the most amazing person.
                </p>
                <p
                  className="text-sm leading-[1.75]"
                  style={{
                    color: "#A87A8A",
                    fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  I made this little surprise just for you.
                </p>
              </motion.div>

              {/* Birthday cake */}
              <motion.div variants={staggerItem} className="w-full py-1">
                <BirthdayCake />
              </motion.div>

              {/* Second divider */}
              <motion.div variants={staggerItem} className="w-full px-1">
                <OrnamentalDivider />
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={staggerItem} className="pt-1">
                <ElegantButton onClick={handleStart}>
                  <span>Start Your Surprise</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7H13M8 2L13 7L8 12"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ElegantButton>
              </motion.div>

              {/* Hint */}
              <motion.p
                variants={staggerItem}
                className="text-[11px] tracking-[0.28em] uppercase"
                style={{
                  color: "#C85A5A",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  opacity: 0.7,
                }}
                animate={{ opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Something beautiful awaits
              </motion.p>

            </motion.div>
          </ElegantCard>
        </motion.div>
      </main>
    </PageTransition>
  );
}
