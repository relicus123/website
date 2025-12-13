/**
 * useGsapFadeUp Hook
 * Animates element fade-in with upward slide when it enters viewport
 *
 * Usage:
 *   const ref = useGsapFadeUp<HTMLDivElement>({ delay: 0.2, duration: 0.7 });
 *   return <div ref={ref}>Content</div>
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

interface UseGsapFadeUpOptions {
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export function useGsapFadeUp<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapFadeUpOptions = {}
) {
  const ref = useRef<T>(null);
  const { delay = 0, duration = 0.7, yOffset = 30, once = true } = options;

  useEffect(() => {
    // Safety check: element must exist
    if (!ref.current) return;

    const element = ref.current;

    // Create animation context for cleanup
    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: yOffset,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    });

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, [delay, duration, yOffset, once]);

  return ref;
}
