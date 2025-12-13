/**
 * useGsapParallax Hook
 * Creates smooth parallax scrolling effect for elements
 * Element moves at different speed than scroll for depth effect
 *
 * Usage:
 *   const ref = useGsapParallax<HTMLDivElement>({ speed: 0.5 });
 *   return <div ref={ref}>Parallax Content</div>
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

interface UseGsapParallaxOptions {
  speed?: number; // 0.5 = half speed, 2 = double speed
  direction?: "vertical" | "horizontal";
}

export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapParallaxOptions = {}
) {
  const ref = useRef<T>(null);
  const { speed = 0.5, direction = "vertical" } = options;

  useEffect(() => {
    // Safety check: element must exist
    if (!ref.current) return;

    const element = ref.current;

    // Calculate movement distance based on speed
    const movement =
      direction === "vertical" ? { y: 100 * speed } : { x: 100 * speed };

    // Create animation context for cleanup
    const ctx = gsap.context(() => {
      gsap.to(element, {
        ...movement,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // Smooth scrubbing effect
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [speed, direction]);

  return ref;
}
