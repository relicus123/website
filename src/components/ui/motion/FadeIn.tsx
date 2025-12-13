'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { VARIANTS_FADE_IN_UP, VARIANTS_FADE_IN, VIEWPORT_SETTINGS } from '@/lib/animations';

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none';
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = "",
  ...props 
}: FadeInProps) {
  
  const variants = direction === 'up' ? VARIANTS_FADE_IN_UP : VARIANTS_FADE_IN;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SETTINGS}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
