'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setShow(false), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader" role="status" aria-label="Loading Azad Shorthand"
          className="fixed inset-0 z-[10000] grid place-items-center bg-brand-gradient"
          exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
            <Image src="/images/brand/logo.jpeg" alt="Azad Shorthand" width={112} height={112} priority className="relative h-28 w-28 rounded-full bg-white shadow-glow" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
