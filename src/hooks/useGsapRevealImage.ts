/**
 * useGsapRevealImage Hook
 * Creates a cinematic clip-path reveal animation for images
 * Reveals from left to right when scrolled into view
 *
 * Usage:
 *   const ref = useGsapRevealImage<HTMLDivElement>({ duration: 0.8 });
 *   return <div ref={ref}><img src="..." /></div>
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

interface UseGsapRevealImageOptions {
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom";
  once?: boolean;
}

export function useGsapRevealImage<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealImageOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    delay = 0,
    duration = 0.8,
    direction = "left",
    once = true,
  } = options;

  useEffect(() => {
    // Safety check: element must exist
    if (!ref.current) return;

    const element = ref.current;

    // Get clip-path values based on direction
    const getClipPath = () => {
      switch (direction) {
        case "left":
          return {
            from: "inset(0 100% 0 0)",
            to: "inset(0 0% 0 0)",
          };
        case "right":
          return {
            from: "inset(0 0 0 100%)",
            to: "inset(0 0 0 0)",
          };
        case "top":
          return {
            from: "inset(100% 0 0 0)",
            to: "inset(0 0 0 0)",
          };
        case "bottom":
          return {
            from: "inset(0 0 100% 0)",
            to: "inset(0 0 0 0)",
          };
      }
    };

    const clipPath = getClipPath();

    // Create animation context for cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          clipPath: clipPath.from,
        },
        {
          clipPath: clipPath.to,
          duration,
          delay,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [delay, duration, direction, once]);

  return ref;
}
