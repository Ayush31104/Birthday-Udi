"use client";

import { useMotionValue, useSpring, MotionValue } from "framer-motion";
import { useEffect } from "react";

interface ParallaxMotionValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useParallax(strength = 0.01): ParallaxMotionValues {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring — high damping keeps it silky, never jittery
  const x = useSpring(rawX, { stiffness: 40, damping: 30, mass: 1 });
  const y = useSpring(rawY, { stiffness: 40, damping: 30, mass: 1 });

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel any pending frame to avoid queuing
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        rawX.set((e.clientX - cx) * strength);
        rawY.set((e.clientY - cy) * strength);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [rawX, rawY, strength]);

  return { x, y };
}
