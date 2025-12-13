/**
 * AnimatedInput Component
 * Input with smooth focus/blur glow animations
 *
 * Usage:
 *   <AnimatedInput placeholder="Enter name" />
 */

"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, useState } from "react";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function AnimatedInput({
  label,
  className = "",
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-brand-dark mb-2">
          {label}
        </label>
      )}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 3px rgba(95, 139, 112, 0.1)"
            : "0 0 0 0px rgba(95, 139, 112, 0)",
        }}
        transition={{ duration: 0.2 }}
        className="rounded-lg"
      >
        <input
          className={`w-full px-4 py-2.5 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${
            isFocused
              ? "border-brand-green bg-white"
              : "border-gray-300 bg-white hover:border-gray-400"
          } ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </motion.div>
    </div>
  );
}
