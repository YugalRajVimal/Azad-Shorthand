'use client';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(255,255,255,.4), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    mx.set(px); my.set(py);
    ry.set((px / r.width - 0.5) * 12);
    rx.set(-(py / r.height - 0.5) * 12);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div onMouseMove={reduce ? undefined : onMove} onMouseLeave={reduce ? undefined : reset}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-6 shadow-glass backdrop-blur-xl ${className}`}>
      <motion.div aria-hidden style={{ background: spot }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
