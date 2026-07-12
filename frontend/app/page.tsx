"use client";
import TransitionOverlay from "@/components/transition/TransitionOverlay";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

// Edit these values to change the visible text on the landing page.
const pageContent = {
  eyebrow: "A Birthday Surprise",
  title: "Happy Birthday",
  name: BIRTHDAY_NAME,
  introLine1: "Today is all about celebrating the most amazing person.",
  introLine2: "I made this little surprise just for you.",
  buttonLabel: "Start Your Surprise",
  footerLabel: "Something beautiful awaits",
};

function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center gap-1.5 flex-1">
        <div className="divider-warm flex-1" />
        <div className="w-1 h-1 rounded-full" style={{ background: "#D4AF97", opacity: 0.6 }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C85A5A", opacity: 0.5 }} />
      </div>
      <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#D4AF97" opacity="0.8" />
        <path d="M6 2.5 L9.5 6 L6 9.5 L2.5 6 Z" fill="#FAF6F1" opacity="0.7" />
      </svg>
      <div className="flex items-center gap-1.5 flex-1">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C85A5A", opacity: 0.5 }} />
        <div className="w-1 h-1 rounded-full" style={{ background: "#D4AF97", opacity: 0.6 }} />
        <div className="divider-warm flex-1" />
      </div>
    </div>
  );
}

function SparkleAccent({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0.3, scale: 0.8 }}
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1, 0.8], y: [0, -4, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L9.4 6.6L15 8L9.4 9.4L8 15L6.6 9.4L1 8L6.6 6.6L8 1Z" fill="#D4AF97" />
      </svg>
    </motion.div>
  );
}

function CornerOrnaments() {
  const corners = [
    { top: "5%", left: "3%", rotate: 0, delay: 0 },
    { top: "5%", right: "3%", rotate: 90, delay: 1.2 },
    { top: "88%", left: "3%", rotate: 270, delay: 0.6 },
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
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ transform: `rotate(${c.rotate}deg)` }}>
            <path d="M4 4 L4 20 M4 4 L20 4" stroke="#C85A5A" strokeWidth="1.5" strokeLinecap="round" />
            {[0, 72, 144, 216, 288].map((a, j) => {
              const r = (a * Math.PI) / 180;
              return (
                <ellipse
                  key={j}
                  cx={36 + Math.cos(r) * 7}
                  cy={36 + Math.sin(r) * 7}
                  rx="4"
                  ry="2.8"
                  fill="#D5A6A6"
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
  const [transitioning, setTransitioning] = useState(false);
  const { x: springX, y: springY } = useParallax(0.01);

const handleStart = () => {
  if (transitioning) return;

  setTransitioning(true);
};
  return (
    <PageTransition>
      <GradientBackground />
      <BokehLights />
      <FloatingPetals />
      <GoldSparkles />
      <CornerOrnaments />

      <main className="relative min-h-screen flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8 sm:py-6">
        <motion.div
          style={{ x: springX, y: springY }}
          className="w-full max-w-[720px]"
          animate={
            transitioning
              ? {
                  scale: 1.08,
                  opacity: 0.3,
                  filter: "blur(8px)",
                }
              : {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ElegantCard className="relative text-center">
            <div className="absolute inset-0 pointer-events-none">
              <SparkleAccent
                className="left-6 top-8 sm:left-8 sm:top-10"
                delay={0.2}
              />
              <SparkleAccent
                className="right-6 top-10 sm:right-8 sm:top-12"
                delay={0.8}
              />
              <SparkleAccent
                className="left-8 bottom-8 sm:left-10 sm:bottom-10"
                delay={1.2}
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="relative flex flex-col items-center gap-4 sm:gap-5"
            >
              {/* --- Top heading and title area --- */}
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-3"
              >
                <div
                  className="w-8 sm:w-10 h-px"
                  style={{ background: "rgba(200,90,90,0.35)" }}
                />
                <span
                  className="text-[11px] sm:text-[12px] tracking-[0.38em] uppercase"
                  style={{
                    color: "#A87A8A",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {pageContent.eyebrow}
                </span>
                <div
                  className="w-8 sm:w-10 h-px"
                  style={{ background: "rgba(200,90,90,0.35)" }}
                />
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-1.5">
                <h1
                  className="text-[2rem] sm:text-[2.45rem] lg:text-[2.8rem] font-normal leading-[1.04]"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    color: "#7A4A5A",
                    letterSpacing: "0.015em",
                  }}
                >
                  {pageContent.title}
                </h1>
                <motion.h2
                  className="text-[3.2rem] sm:text-[4rem] lg:text-[4.7rem] font-semibold italic"
                  style={{
                    fontFamily:
                      "var(--font-great-vibes), 'Great Vibes', cursive",
                    background:
                      "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 45%, #D5A6A6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.01em",
                    textShadow: "0 0 20px rgba(255,127,155,0.18)",
                    lineHeight: 1.5,
                    marginTop: "0.5rem",
                  }}
                  animate={{
                    opacity: [0.9, 1, 0.9],
                    scale: [0.98, 1.01, 0.98],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {pageContent.name}
                </motion.h2>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="w-full max-w-[430px] px-1"
              >
                <OrnamentalDivider />
              </motion.div>

              {/* --- Main descriptive text area --- */}
              <motion.div
                variants={staggerItem}
                className="max-w-[500px] space-y-2 px-2 sm:px-4"
              >
                <p
                  className="text-[13px] sm:text-[17px] leading-[1.9]"
                  style={{
                    color: "#7A4A5A",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 450,
                  }}
                >
                  {pageContent.introLine1}
                </p>
                <p
                  className="text-[13px] sm:text-[16px] leading-[1.7]"
                  style={{
                    color: "#A87A8A",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontWeight: 350,
                  }}
                >
                  {pageContent.introLine2}
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="w-full py-1">
                <BirthdayCake />
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="w-full max-w-[430px] px-1"
              >
                <OrnamentalDivider />
              </motion.div>

              {/* --- Call-to-action button --- */}
              <motion.div variants={staggerItem} className="pt-1">
                <ElegantButton onClick={handleStart}>
                  <span>{pageContent.buttonLabel}</span>
                  <motion.svg
                    width="17"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      d="M1 7H13M8 2L13 7L8 12"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </ElegantButton>
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="text-[11px] tracking-[0.32em] uppercase"
                style={{
                  color: "#C85A5A",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontWeight: 400,
                  opacity: 0.7,
                }}
                animate={{ opacity: [0.45, 0.75, 0.45] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {pageContent.footerLabel}
              </motion.p>
            </motion.div>
          </ElegantCard>
        </motion.div>
      </main>
      <AnimatePresence>
  {transitioning && (
    <TransitionOverlay
      onFinish={() => router.push("/surprise")}
    />
  )}
</AnimatePresence>
    </PageTransition>
  );
}
