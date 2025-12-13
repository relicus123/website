/**
 * PageTransition Component
 * Wraps page content with smooth entry/exit animations
 * Uses AnimatePresence for clean transitions between routes
 *
 * Usage: Wrap your page content with this component
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "@/lib/motionVariants";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
