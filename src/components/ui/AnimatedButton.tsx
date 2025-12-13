/**
 * AnimatedButton Component
 * Button with built-in hover, tap, and focus animations
 * GPU-accelerated and performance optimized
 *
 * Usage:
 *   <AnimatedButton variant="primary" onClick={handleClick}>Click Me</AnimatedButton>
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: AnimatedButtonProps) {
  const baseStyles =
    "relative overflow-hidden rounded-lg font-semibold transition-colors";

  const variantStyles = {
    primary: "bg-brand-green text-white hover:bg-brand-green/90",
    secondary: "bg-brand-blue text-white hover:bg-brand-blue/90",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark/5",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const MotionButton = motion.button;

  return (
    <MotionButton
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {/* Animated fill effect on hover */}
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </MotionButton>
  );
}
