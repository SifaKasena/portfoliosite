import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: FadeInProps) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: prefersReducedMotion ? 0.01 : duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
