import { Variants } from "framer-motion";

// Page transition — soft fade + gentle lift
export const pageVariants: Variants = {
  initial: { opacity: 0, scale: 0.97, y: 16 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    y: -12,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// Card entrance
export const cardVariants: Variants = {
  initial: { opacity: 0, y: 36, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

// Stagger container — initial key added to fix SSR mismatch
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

// Stagger item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Button hover — subtle lift, no bounce
export const buttonHover = {
  scale: 1.04,
  y: -3,
  transition: { duration: 0.25, ease: "easeOut" },
};

export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.12, ease: "easeOut" },
};
