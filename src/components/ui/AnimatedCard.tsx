/**
 * AnimatedCard Component
 * Card with hover lift and shadow animations
 * Perfect for service cards, product cards, etc.
 *
 * Usage:
 *   <AnimatedCard><YourContent /></AnimatedCard>
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className = "",
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`rounded-xl bg-white border border-gray-200 cursor-pointer ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        rest: {
          scale: 1,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        hover: {
          scale: 1.03,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
