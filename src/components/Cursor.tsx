'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a,button,input,textarea,summary,[data-cursor]');
      setActive(!!t);
      setLabel(t?.dataset.cursor ?? '');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = active ? (label ? 88 : 56) : 36;
  return (
    <>
      <motion.div aria-hidden style={{ x, y, translateX: '-50%', translateY: '-50%' }} className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-azure-brand" />
      <motion.div
        aria-hidden style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] grid place-items-center rounded-full border border-azure-brand/70 bg-sky-brand/10 backdrop-blur-[1px]"
      >
        {label && <span className="text-[11px] font-semibold uppercase tracking-wide text-azure-brand">{label}</span>}
      </motion.div>
    </>
  );
}
