/**
 * animation.js — Shared Framer Motion variants
 * Import these instead of re-defining per component.
 */

export const EASE = [0.22, 1, 0.36, 1];

/** Staggered container — use with staggerChildren */
export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

/** Fade up — children of a stagger container */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade in — simple opacity */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/** Slide in from right */
export const slideRight = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide in from left */
export const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scale in — cards, tiles */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Mask wipe — used for section reveals */
export const maskWipe = {
  hidden: { scaleX: 1 },
  show: {
    scaleX: 0,
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  },
};

/** Step transition — used in multi-step forms */
export const stepTransition = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -16 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};
