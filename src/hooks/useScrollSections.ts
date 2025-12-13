/**
 * useScrollSections Hook
 * Automatically animates all elements with data-fade-section attribute
 * Checks if elements exist before applying animations
 *
 * Usage:
 *   useScrollSections();
 *   // Add 'data-fade-section' attribute to any section you want to animate
 */

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

export function useScrollSections() {
  useEffect(() => {
    // Safety check: find all sections with data-fade-section attribute
    const sections = document.querySelectorAll("[data-fade-section]");

    // Only proceed if sections exist
    if (sections.length === 0) return;

    // Create animation context for cleanup
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
}
