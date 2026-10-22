'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Props = {
  children: React.ReactNode; href?: string; onClick?: () => void; className?: string;
  cursorLabel?: string; strength?: number; type?: 'button' | 'submit'; ariaLabel?: string; disabled?: boolean;
};

export default function MagneticButton({ children, href, onClick, className, cursorLabel, strength = 0.3, type = 'button', ariaLabel, disabled }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  const external = !!href && href.startsWith('http');

  return (
    <motion.div ref={wrap} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={reset} className="inline-block">
      {href ? (
        <a href={href} onClick={onClick} className={className} data-cursor={cursorLabel} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={className} data-cursor={cursorLabel} aria-label={ariaLabel} disabled={disabled}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
