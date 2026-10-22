'use client';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type Props = { src?: string; alt?: string; children?: React.ReactNode; tilt?: boolean; className?: string; priority?: boolean };

export default function PhoneMockup({ src, alt = '', children, tilt = true, className = 'w-[260px]', priority = false }: Props) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const enabled = tilt && !reduce;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      onMouseMove={enabled ? onMove : undefined} onMouseLeave={enabled ? reset : undefined}
      style={enabled ? { rotateX: srx, rotateY: sry, transformPerspective: 1000 } : undefined}
      className={`relative aspect-[9/19] rounded-[2.4rem] bg-slate-900 p-[9px] shadow-glow ring-1 ring-white/25 ${className}`}
    >
      <span aria-hidden className="absolute -right-[3px] top-24 h-14 w-[3px] rounded-r bg-slate-700" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
        <span aria-hidden className="absolute left-1/2 top-0 z-10 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
        {src ? <Image src={src} alt={alt} fill sizes="300px" priority={priority} draggable={false} className="select-none object-cover object-top" /> : children}
      </div>
    </motion.div>
  );
}
