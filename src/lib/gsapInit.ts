/**
 * GSAP Global Initializer
 * Registers ScrollTrigger plugin and ensures it's only registered once
 * Import this file in your root layout before any GSAP animations
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isInitialized = false;

export function initGsap() {
  if (isInitialized) return;

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set default GSAP configurations for performance
  gsap.defaults({
    duration: 0.6,
    ease: "power2.out",
  });

  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false, // Set to true for debugging
    toggleActions: "play none none reverse",
  });

  isInitialized = true;
}

// Auto-initialize on import
if (typeof window !== "undefined") {
  initGsap();
}

export { gsap, ScrollTrigger };
