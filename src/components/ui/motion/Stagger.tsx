'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { VARIANTS_STAGGER, VIEWPORT_SETTINGS } from '@/lib/animations';

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Stagger({ 
  children, 
  className = "",
  delay = 0,
  ...props 
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SETTINGS}
      variants={VARIANTS_STAGGER}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
