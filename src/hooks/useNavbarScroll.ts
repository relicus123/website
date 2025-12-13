/**
 * useNavbarScroll Hook
 * Animates navbar on scroll: shrinks height, changes background, scales logo
 *
 * Usage:
 *   useNavbarScroll('navbar');
 */

import { useEffect } from "react";
import { gsap } from "@/lib/gsapInit";

export function useNavbarScroll(navbarId: string = "navbar") {
  useEffect(() => {
    // Safety check: navbar must exist
    const navbar = document.getElementById(navbarId);
    if (!navbar) return;

    let lastScroll = 0;
    let isScrolled = false;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Trigger animation after 50px scroll
      if (currentScroll > 50 && !isScrolled) {
        isScrolled = true;

        gsap.to(navbar, {
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        });

        // Scale down logo if it exists
        const logo = navbar.querySelector(".navbar-logo");
        if (logo) {
          gsap.to(logo, {
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else if (currentScroll <= 50 && isScrolled) {
        isScrolled = false;

        gsap.to(navbar, {
          backgroundColor: "rgba(255, 255, 255, 1)",
          backdropFilter: "blur(0px)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });

        // Reset logo scale
        const logo = navbar.querySelector(".navbar-logo");
        if (logo) {
          gsap.to(logo, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      lastScroll = currentScroll;
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarId]);
}
