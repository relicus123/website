"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function GlobalScroll({ children }: { children: React.ReactNode }) {
  const smootherInitialized = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener("load", () => resolve());
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(script);
      });

    const initSmoother = async () => {
      // Always re-check/re-init if needed, but here we just ensure scripts are loaded once
      if (typeof window === "undefined") return;
      const win = window as any;

      if (!win.gsap) {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
        );
      }
      if (!win.ScrollSmoother) {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"
        );
      }
      if (!win.ScrollTrigger) {
         await loadScript(
            "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"
         );
      }

      // Initialize ScrollSmoother
      if (win.gsap && win.ScrollSmoother && !win.ScrollSmoother.get()) {
        win.gsap.registerPlugin(win.ScrollSmoother, win.ScrollTrigger);
        win.ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
        });
        smootherInitialized.current = true;
      } else if (win.ScrollSmoother) {
          // If it exists, maybe refresh?
          const smoother = win.ScrollSmoother.get();
          if(smoother) smoother.refresh();
      }
    };

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
        initSmoother().catch(() => {});
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); 

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
