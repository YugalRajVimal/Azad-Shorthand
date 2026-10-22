'use client';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';

type Props = { mx: MotionValue<number>; my: MotionValue<number>; depth: number; className?: string; children?: React.ReactNode };

export default function ParallaxLayer({ mx, my, depth, className, children }: Props) {
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), { stiffness: 70, damping: 20 });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-depth, depth]), { stiffness: 70, damping: 20 });
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}
