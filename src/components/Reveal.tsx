'use client';
import { motion, useReducedMotion } from 'framer-motion';

type Props = { children: React.ReactNode; delay?: number; y?: number; x?: number; className?: string };

export default function Reveal({ children, delay = 0, y = 28, x = 0, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }} whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
