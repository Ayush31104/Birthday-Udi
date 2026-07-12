"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import GradientBackground from "@/components/GradientBackground";
import GoldSparkles from "@/components/GoldSparkles";
import BokehLights from "@/components/BokehLights";
import FloatingPetals from "@/components/FloatingPetals";
import {
  HERO,
  GALLERY_ITEMS,
  HEARTFELT_NOTES,
  AMAZING_REASONS,
  FINAL_MESSAGE,
  LETTER,
} from "@/lib/birthdayData";

// ─── Live image manifest from Image Manager ───────────────────────────────────
type GalleryItem = { id: number; src: string; caption: string };
type ImageManifest = { hero: string | null; gallery: GalleryItem[] };

function useImageManifest() {
  const [manifest, setManifest] = useState<ImageManifest | null>(null);
  useEffect(() => {
    let active = true;
    fetch("/api/images")
      .then((r) => r.json())
      .then((data) => {
        if (active) setManifest(data);
      })
      .catch(() => {}); // silently fall back to static data
    return () => {
      active = false;
    };
  }, []);
  return manifest;
}

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}
// ─── Section wrapper with reveal ──────────────────────────────────────────────
function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const { ref, visible } = useReveal();
  const initial =
    direction === "up" ? { opacity: 0, y: 48 }
    : direction === "left" ? { opacity: 0, x: -48 }
    : direction === "right" ? { opacity: 0, x: 48 }
    : { opacity: 0, scale: 0.92 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={visible ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[13px] tracking-[0.38em] uppercase mb-3"
      style={{ color: "#A87A8A", fontFamily: "var(--font-lora)", fontWeight: 600 }}
    >
      {children}
    </p>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl sm:text-4xl font-semibold italic mb-2"
      style={{
        fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
        background: "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 50%, #D5A6A6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </h2>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs mx-auto mt-6 mb-20">
      <div className="divider-warm flex-1" />
      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0L10 5L5 10L0 5Z" fill="#D4AF97" opacity="0.8" /></svg>
      <div className="divider-warm flex-1" />
    </div>
  );
}

// ─── Section Separator ────────────────────────────────────────────────────────
function SectionSeparator() {
  const particles = ["🌸", "✨", "💗", "🌸", "✨"];
  return (
    <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto py-2 overflow-hidden">
      {/* Glowing line */}
      <div className="w-full h-px mb-4" style={{
        background: "linear-gradient(90deg, transparent, rgba(200,90,90,0.25) 20%, rgba(255,127,155,0.5) 50%, rgba(200,90,90,0.25) 80%, transparent)",
      }} />
      {/* Floating particles */}
      <div className="relative flex items-center justify-center gap-6 h-8">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="text-sm select-none pointer-events-none"
            style={{ opacity: 1, fontSize: `${14 + i * 2}px` }}
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            {p}
          </motion.span>
        ))}
      </div>
      {/* Glowing line */}
      <div className="w-full h-px mt-4" style={{
        background: "linear-gradient(90deg, transparent, rgba(200,90,90,0.25) 20%, rgba(255,127,155,0.5) 50%, rgba(200,90,90,0.25) 80%, transparent)",
      }} />
    </div>
  );
}

function HeroSection({ heroSrc }: { heroSrc: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, -80]);
  const opacity = useTransform(scrollY, [0, 900], [1, 0.4]);

  return (
    <section
      id="surprise-section"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <motion.div style={{ y, opacity }} className="flex flex-col items-center gap-6 w-full max-w-xl">
        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold italic leading-tight"
          style={{
            fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
            background: "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 45%, #D5A6A6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Happy Birthday ❤️
        </motion.h1>

        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(200,90,90,0.35) 0%, rgba(255,127,155,0.2) 50%, transparent 70%)",
                filter: "blur(14px)",
                transform: "scale(1.25)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative w-46 h-46 sm:w-62 sm:h-62 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(212,175,151,0.7)",
                boxShadow: "0 0 0 6px rgba(255,192,203,0.25), 0 20px 60px rgba(200,90,90,0.25)",
              }}
            >
              <img
                src={heroSrc}
                alt={HERO.name}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const parent = t.parentElement!;
                  parent.style.background = "linear-gradient(135deg, #FFE4E1, #FFC0CB, #D5A6A6)";
                  parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">🌸</div>`;
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.p
          className="text-2xl tracking-[0.3em] uppercase"
          style={{ color: "#c93669", fontFamily: "var(--font-lora)", fontWeight: 600 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {HERO.name}
        </motion.p>

        {/* Message card */}
        <motion.div
          className="glass-warm shadow-warm-xl w-full rounded-2xl px-7 py-6 text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[15px] leading-[1.9] text-center"
            style={{
              color: "#7A4A5A",
              fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {HERO.message}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#C85A5A", opacity: 0.7 }}>
          Scroll
        </span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7L10 13L16 7" stroke="#C85A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}

// ─── Letter Modal ─────────────────────────────────────────────────────────────
function LetterModal({ onClose }: { onClose: () => void }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl rounded-[32px] bg-white/95 border border-slate-300 shadow-[0_40px_120px_rgba(15,23,42,0.18)] overflow-hidden"
        initial={{ scale: 0.96, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.98, opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm text-xl text-slate-700 transition-transform hover:scale-110"
          aria-label="Close letter"
        >
          x
        </button>

        <div className="px-8 py-8 sm:px-12 sm:py-10">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="text-3xl font-semibold tracking-tight text-slate-900 bg-amber-50 italic" >
              {LETTER.heading}
            </h3>
          </div>

          <div className="mt-10 rounded-3xl overflow-y-auto hide-scrollbar border border-slate-200 bg-amber-50 shadow-inner">
            <div
              className="max-h-[75vh] overflow-y-scroll hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className="py-10"
                style={{
                  paddingLeft: "64px",
                  paddingRight: "64px",
                }}
              >
                {LETTER.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="mb-8 whitespace-pre-line leading-9 text-justify first-line:indent-8"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  items, index, onClose, onPrev, onNext,
}: {
  items: GalleryItem[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const item = items[index];

  const resetZoom = () => setZoom(1);
  useEffect(() => {
    resetZoom();
  }, [index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    setZoom(z => Math.min(3, Math.max(1, z - e.deltaY * 0.001)));
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(20,8,14,0.92)", backdropFilter: "blur(18px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Prev */}
      <button
        className="absolute left-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: "rgba(250,246,241,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
        onClick={e => { e.stopPropagation(); onPrev(); }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: "rgba(250,246,241,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
        onClick={e => { e.stopPropagation(); onNext(); }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Close */}
      <button
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ background: "rgba(200,90,90,0.7)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: "18px" }}
        onClick={e => { e.stopPropagation(); onClose(); }}
      >
        ×
      </button>

      {/* Image */}
      <motion.div
        key={index}
        className="flex flex-col items-center px-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <motion.img
          src={item.src}
          alt={item.caption || `Memory ${item.id}`}
          animate={{ y: [0, -6, 0], scale: zoom }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.2 } }}
          style={{
            maxHeight: "82vh",
            maxWidth: "90vw",
            objectFit: "contain",
            borderRadius: "16px",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            cursor: zoom > 1 ? "zoom-out" : "zoom-in",
            transformOrigin: "center center",
          }}
          onClick={() => setZoom(z => z > 1 ? 1 : 2)}
        />
        {item.caption && (
          <p className="mt-4 text-lg text-center" style={{ color: "rgba(250,246,241,0.75)", fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
            {item.caption}
          </p>
        )}
        {/* Counter */}
        <p className="mt-2 text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)", fontStyle: "italic" }}>
          {index + 1} / {items.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-warm"
      style={{
        border: "2px solid rgba(255,255,255,0.85)",
        background: "linear-gradient(135deg,#FFE4E1,#FFC0CB)",
        aspectRatio: "1/1",
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.07,
      }}
      whileHover={{
        scale: 1.06,
        rotate: 1.5,
        boxShadow: "0 20px 50px rgba(200,90,90,0.3)",
      }}
      onClick={onClick}
    >
      <img
        src={item.src}
        alt={item.caption || `Memory ${item.id}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          const t = e.currentTarget;
          t.style.display = "none";
          const p = t.parentElement!;
          p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;background:linear-gradient(135deg,#FFE4E1,#FFC0CB,#D5A6A6)">🌸</div>`;
        }}
      />
      <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pb-4">
        <p
          className="translate-y-3 text-center group-hover:translate-y-0 transition-all duration-300 text-white text-m font-semibold"
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            WebkitTextStroke: "1px rgba(0, 0, 0.1, 0.1)",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          {item.caption}
        </p>
      </div>
      <motion.div
        className="absolute top-1.5 right-1.5 text-sm opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
}

// ─── 2. GALLERY SECTION ───────────────────────────────────────────────────────
function GallerySection({ liveGallery }: { liveGallery?: GalleryItem[] }) {
  const [letterOpen, setLetterOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = (liveGallery && liveGallery.length > 0) ? liveGallery.slice(0, 8) : GALLERY_ITEMS.slice(0, 8);

  return (
    <section className="px-4 w-full max-w-4xl mx-auto" style={{ paddingTop: "140px", paddingBottom: "140px" }}>
      <RevealSection className="text-center mb-16">
        <SectionLabel>Captured Moments</SectionLabel>
        <div className="h-5" />
        <SectionHeading>Memory Gallery</SectionHeading>
        <Divider />
        <div className="h-10" />
      </RevealSection>

      {/* 3x3 grid: [img1][img2][img3] / [img4][btn][img5] / [img6][img7][img8] */}
      <div className="grid grid-cols-3 gap-4">
        <GalleryCard key={items[0].id} item={items[0]} index={0} onClick={() => setLightboxIndex(0)} />
        <GalleryCard key={items[1].id} item={items[1]} index={1} onClick={() => setLightboxIndex(1)} />
        <GalleryCard key={items[2].id} item={items[2]} index={2} onClick={() => setLightboxIndex(2)} />

        <GalleryCard key={items[3].id} item={items[3]} index={3} onClick={() => setLightboxIndex(3)} />

        {/* Center button */}
        <div className="flex items-center justify-center" style={{ aspectRatio: "1/1" }}>
          <motion.button
            className="w-full h-full flex flex-col items-center justify-center gap-1.5 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(200,90,90,0.18) 0%, rgba(255,127,155,0.22) 50%, rgba(213,166,166,0.18) 100%)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255,255,255,0.85)",
              boxShadow: "0 0 30px rgba(255,127,155,0.25), 0 8px 32px rgba(200,90,90,0.2)",
            }}
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 0 30px rgba(255,127,155,0.25), 0 8px 32px rgba(200,90,90,0.2)",
                "0 0 50px rgba(255,127,155,0.45), 0 12px 40px rgba(200,90,90,0.35)",
                "0 0 30px rgba(255,127,155,0.25), 0 8px 32px rgba(200,90,90,0.2)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setLetterOpen(true)}
          >
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              
            </motion.span>
            <span
              className="text-center leading-tight px-2"
              style={{
                fontSize: "14px",
                fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
                fontStyle: "italic",
                color: "#7A4A5A",
                fontWeight: 500,
              }}
            >
              Click this💖
            </span>
          </motion.button>
        </div>

        <GalleryCard key={items[4].id} item={items[4]} index={4} onClick={() => setLightboxIndex(4)} />

        <GalleryCard key={items[5].id} item={items[5]} index={5} onClick={() => setLightboxIndex(5)} />
        <GalleryCard key={items[6].id} item={items[6]} index={6} onClick={() => setLightboxIndex(6)} />
        <GalleryCard key={items[7].id} item={items[7]} index={7} onClick={() => setLightboxIndex(7)} />
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {letterOpen && <LetterModal onClose={() => setLetterOpen(false)} />}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + items.length) % items.length : 0)}
            onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % items.length : 0)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── 3. HEARTFELT NOTES ───────────────────────────────────────────────────────
function HeartfeltNotes() {
  return (
    <section className="px-6 w-full max-w-4xl mx-auto" style={{ paddingTop: "140px", paddingBottom: "140px" }}>
      <RevealSection className="text-center mb-14">
        <SectionLabel>With Love</SectionLabel>
        <div className="h-5" />
        <SectionHeading>Heartfelt Notes</SectionHeading>
        <Divider />
        <div className="h-10" />
      </RevealSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HEARTFELT_NOTES.map((note, i) => (
          <RevealSection key={note.id} delay={i * 0.08} direction="scale">
            <motion.div
              className="glass-warm rounded-2xl p-8 shadow-warm text-center h-full"
              style={{ border: "3px solid rgba(255,255,255,0.85)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 24px 60px rgba(200,90,90,0.2)" }}
            >
              <div className="mb-4 text-2xl">💕</div>
              <p
                className="text-[17px] leading-[1.95]"
                style={{
                  color: "#7A4A5A",
                  fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                “{note.text}”
              </p>
            </motion.div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ─── 4. REASONS YOU'RE AMAZING ────────────────────────────────────────────────
function AmazingReasons() {
  return (
    <section className="px-6 w-full max-w-4xl mx-auto" style={{ paddingTop: "140px", paddingBottom: "140px" }}>
      <RevealSection className="text-center pb-16 mb-16">
        <SectionLabel>Because You Are</SectionLabel>
        <div className="h-5" />
        <SectionHeading>Reasons You’re Amazing</SectionHeading>
        <Divider />
        <div className="h-10" />
      </RevealSection>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-7">
        {AMAZING_REASONS.map((reason, i) => (
          <RevealSection key={reason.id} delay={i * 0.07} direction="scale">
            <motion.div
              className="glass-warm rounded-2xl p-6 text-center shadow-warm cursor-default"
              style={{ border: "3px solid rgba(255,255,255,0.85)", paddingTop: "1px", paddingBottom: "1px" }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 56px rgba(200,90,90,0.22)",
                borderColor: "rgba(200,90,90,0.3)",
              }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-3xl mb-3">{reason.icon}</div>
              <h3
                className="text-base font-semibold mb-1"
                style={{ color: "#7A4A5A", fontFamily: "var(--font-lora)" }}
              >
                {reason.quality}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#A87A8A", fontFamily: "var(--font-lora)", fontStyle: "italic" }}
              >
                {reason.detail}
              </p>
            </motion.div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

// ─── 5. FINAL MESSAGE ─────────────────────────────────────────────────────────
function FinalMessage() {
  return (
    <section className="px-6 w-full max-w-4xl mx-auto flex flex-col items-center text-center" style={{ paddingTop: "140px", paddingBottom: "140px" }}>
      <RevealSection className="w-full">
        <SectionLabel>With All My Heart</SectionLabel>
        <div className="h-5" />
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold italic mb-10 leading-tight"
          style={{
            fontFamily: "var(--font-lora), 'Playfair Display', Georgia, serif",
            background: "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 50%, #D5A6A6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {FINAL_MESSAGE.heading}
        </h2>
        <div className="h-10" />

        {/* Message glass card */}
        <div
          className="glass-warm rounded-3xl px-9 py-9 shadow-warm-xl mb-16 text-left"
          style={{ border: "1px solid rgba(255,255,255,0.9)" }}
        >
          {FINAL_MESSAGE.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[15px] leading-[1.95] ${i > 0 ? "mt-5" : ""} text-center`}
              style={{
                color: "#7A4A5A",
                fontFamily: "var(--font-lora), 'Lora', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        <div className="h-10" />
        <Divider />

        {/* Closing */}
        <p
          className="text-base mb-6"
          style={{ color: "#A87A8A", fontFamily: "var(--font-lora)", fontStyle: "italic" }}
        >
          {FINAL_MESSAGE.closing}
        </p>

        {/* Glowing heart */}
        <motion.div
          className="mb-6"
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 16px rgba(200,90,90,0.6))" }}
        >
          <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
            <path
              d="M24 40C24 40 4 28 4 14C4 8.477 8.477 4 14 4C17.314 4 20.314 5.686 22.314 8.314C22.686 8.8 23.314 9.1 24 9.1C24.686 9.1 25.314 8.8 25.686 8.314C27.686 5.686 30.686 4 34 4C39.523 4 44 8.477 44 14C44 28 24 40 24 40Z"
              fill="url(#heartGrad)"
            />
            <defs>
              <linearGradient id="heartGrad" x1="4" y1="4" x2="44" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C85A5A" />
                <stop offset="0.5" stopColor="#FF7F9B" />
                <stop offset="1" stopColor="#D5A6A6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.p
          className="text-2xl sm:text-3xl font-semibold italic"
          style={{
            fontFamily: "var(--font-lora), 'Playfair Display', Georgia, serif",
            background: "linear-gradient(135deg, #C85A5A 0%, #FF7F9B 50%, #D5A6A6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {FINAL_MESSAGE.sign}
        </motion.p>
      </RevealSection>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SurprisePage() {
  const manifest = useImageManifest();
  const heroSrc = manifest?.hero ?? HERO.profileImage;

  useEffect(() => {
    const target = document.getElementById("surprise-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [heroSrc]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />
      <BokehLights />
      <FloatingPetals />
      <GoldSparkles />

      <main className="relative z-10 flex flex-col items-center w-full">
        <HeroSection heroSrc={heroSrc} />
        <SectionSeparator />
        <GallerySection liveGallery={manifest?.gallery} />
        <SectionSeparator />
        <HeartfeltNotes />
        <SectionSeparator />
        <AmazingReasons />
        <SectionSeparator />
        <FinalMessage />
      </main>
    </div>
  );
}
