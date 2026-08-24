import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  pageKey: string;
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  pageKey,
  children,
  className = 'w-full h-full flex-1 flex flex-col',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 8 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.24,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          x: -8,
          transition: {
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          },
        },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
