export const TRANSITION = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1.0] as const, // cubic-bezier similar to easeOut
};

export const TRANSITION_SLOW = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1.0] as const,
};

export const VARIANTS_FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITION 
  },
};

export const VARIANTS_FADE_IN = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: TRANSITION 
  },
};

export const VARIANTS_STAGGER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const VARIANTS_SCALE_IN = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: TRANSITION
  },
};

export const VIEWPORT_SETTINGS = {
  once: true,
  margin: "-50px", // Triggers when 50px into the viewport
};
