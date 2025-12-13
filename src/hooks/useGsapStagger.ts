/**
 * useGsapStagger Hook
 * Animates multiple child elements with staggered timing
 *
 * Usage:
 *   const ref = useGsapStagger<HTMLDivElement>('.child-class', { stagger: 0.1 });
 *   return <div ref={ref}><div className="child-class">1</div><div className="child-class">2</div></div>
 */

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

interface UseGsapStaggerOptions {
  stagger?: number;
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
}

export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: UseGsapStaggerOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    stagger = 0.1,
    delay = 0,
    duration = 0.6,
    yOffset = 30,
    once = true,
  } = options;

  useEffect(() => {
    // Safety check: container must exist
    if (!ref.current) return;

    const container = ref.current;
    const children = container.querySelectorAll(childSelector);

    // Safety check: children must exist
    if (children.length === 0) return;

    // Create animation context for cleanup
    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: yOffset,
        duration,
        delay,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [childSelector, stagger, delay, duration, yOffset, once]);

  return ref;
}
